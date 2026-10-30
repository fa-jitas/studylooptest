import { useState, type FormEvent } from 'react';
import { listRequests, saveRequest, type HelpRequest } from './lib/requests';
import { listOffers, toggleOffer } from './lib/offers';

function timeAgo(ms: number) {
  const min = Math.round((Date.now() - ms) / 60000);
  if (min < 1) return 'Just now';
  if (min < 60) return `${min} min ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr} hr ago`;
  return `${Math.round(hr / 24)} d ago`;
}

export default function App() {
  const [requests, setRequests] = useState<HelpRequest[]>(listRequests);
  const [offers, setOffers] = useState<string[]>(listOffers);
  const [course, setCourse] = useState('');
  const [topic, setTopic] = useState('');
  const [when, setWhen] = useState('');

  const ready = course.trim() !== '' && topic.trim() !== '';
  const sorted = [...requests].sort((a, b) => b.createdAt - a.createdAt);

  async function post(e: FormEvent) {
    e.preventDefault();
    if (!ready) return;
    const request: HelpRequest = {
      id: crypto.randomUUID(),
      course: course.trim(),
      topic: topic.trim(),
      when: when.trim() || 'Flexible',
      who: 'You',
      createdAt: Date.now(),
    };
    await saveRequest(request);
    setRequests([...requests, request]);
    setCourse('');
    setTopic('');
    setWhen('');
  }

  return (
    <div className="page">
      <header className="nav">
        <div className="logo">
          <span className="mark" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round">
              <path d="M7 7a5 5 0 1 0 10 0" />
              <path d="M17 17a5 5 0 1 0-10 0" />
            </svg>
          </span>
          StudyLoop
        </div>
        <nav aria-label="Main">
          <a href="#requests">Find help</a>
          <a href="#post">Post a request</a>
          <a href="#">Become a tutor</a>
        </nav>
      </header>

      <main className="wrap">
        <section className="hero">
          <span className="chip">For students at State U</span>
          <h1>Stuck on a class? Get help from a classmate who aced it.</h1>
          <p>Post what you need help with. A student tutor who took the course offers to meet you.</p>
        </section>

        <div className="grid">
          <form id="post" className="card form" onSubmit={post}>
            <h2>Post a help request</h2>
            <label>
              <span>Course</span>
              <input value={course} onChange={(e) => setCourse(e.target.value)} placeholder="e.g. CS 61B" />
            </label>
            <label>
              <span>What do you need help with?</span>
              <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Recursion before Friday's midterm" />
            </label>
            <label>
              <span>When works for you?</span>
              <input value={when} onChange={(e) => setWhen(e.target.value)} placeholder="e.g. Thursday after 4pm" />
            </label>
            <button className="btn" type="submit" disabled={!ready}>Post request</button>
          </form>

          <section id="requests" className="list">
            <div className="list-head">
              <h2>Open requests</h2>
              <span>{requests.length} open</span>
            </div>
            {sorted.map((r) => {
              const mine = r.who === 'You';
              const offered = offers.includes(r.id);
              return (
                <article key={r.id} className="card req">
                  <div className="row">
                    <span className="chip">{r.course}</span>
                    <span className="muted small">{timeAgo(r.createdAt)}</span>
                  </div>
                  <h3>{r.topic}</h3>
                  <div className="row">
                    <span className="muted">{r.who} · {r.when}</span>
                    <button
                      className={`btn btn-sm ${offered ? 'done' : 'ghost'}`}
                      type="button"
                      disabled={mine}
                      onClick={() => setOffers(toggleOffer(r.id))}
                    >
                      {mine ? 'Your request' : offered ? '✓ Offer sent' : 'Offer to help'}
                    </button>
                  </div>
                </article>
              );
            })}
          </section>
        </div>
      </main>

      <footer className="foot">Built with Lovable · Requests are saved in this browser only</footer>
    </div>
  );
}
