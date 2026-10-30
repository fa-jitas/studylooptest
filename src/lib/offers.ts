// Which requests this browser has offered to help with.

export function listOffers(): string[] {
  return JSON.parse(localStorage.getItem('offers') ?? '[]');
}

export function toggleOffer(id: string): string[] {
  const offers = listOffers();
  const next = offers.includes(id) ? offers.filter((o) => o !== id) : [...offers, id];
  localStorage.setItem('offers', JSON.stringify(next));
  return next;
}
