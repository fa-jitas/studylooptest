// Help requests live in the browser's localStorage for now, so they vanish on
// another device. Build Shipper swaps saveRequest over to a database later.

export type HelpRequest = {
  id: string;
  course: string;
  topic: string;
  when: string;
  who: string;
  createdAt: number;
};

const SEED: HelpRequest[] = [
  { id: 'seed-1', course: 'ECON 1', topic: 'Supply and demand graphs, I keep mixing up shifts', when: 'This weekend', who: 'Lena', createdAt: Date.now() - 3 * 60 * 60 * 1000 },
  { id: 'seed-2', course: 'CS 61B', topic: 'Recursion and linked lists before Friday’s midterm', when: 'Thu after 4pm', who: 'Marcus', createdAt: Date.now() - 60 * 60 * 1000 },
  { id: 'seed-3', course: 'CHEM 1A', topic: 'Balancing redox reactions for the lab report', when: 'Wed evening', who: 'Priya', createdAt: Date.now() - 12 * 60 * 1000 },
];

export function listRequests(): HelpRequest[] {
  const saved = localStorage.getItem('requests');
  if (!saved) {
    localStorage.setItem('requests', JSON.stringify(SEED));
    return SEED;
  }
  return JSON.parse(saved);
}

export async function saveRequest(request: HelpRequest) {
  const requests = JSON.parse(localStorage.getItem('requests') ?? '[]');
  localStorage.setItem('requests', JSON.stringify([...requests, request]));
}
