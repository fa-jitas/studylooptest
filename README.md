# StudyLoop

Jane Doe's student startup MVP: a campus peer-tutoring board. Students post what they need help with, and classmates who took the course offer to help.

This is the "before AWS" version that Jane uploads to Build Shipper (`studyloop-app.zip`). Requests and offers are saved in the browser's localStorage, so they disappear on another device. There is no sign-in yet.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Where the data lives

- `src/lib/requests.ts` — `listRequests` and `saveRequest` read and write `localStorage`. This is the file Build Shipper changes to use a DynamoDB-backed `HelpRequest` model.
- `src/lib/offers.ts` — which requests this browser has offered to help with.
