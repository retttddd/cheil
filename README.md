# Cheil Recruitment Tasks

## Project Structure

- [Frontend task](./frontend-task/) - the React app is in [vite-project](./frontend-task/vite-project/).
- [Backend task](./fs-test-task-main/) - the full-stack task starter and requirements.

## How to Run

To run the frontend app, install Node.js 22.12+ and pnpm, then run these commands from the repository root:

```bash
cd frontend-task/vite-project
pnpm install
pnpm dev
```

Open the local URL printed in the terminal (usually [http://localhost:5173](http://localhost:5173)).

## Assumptions

- All UI text is in Polish, matching the example.
- I did not use Tailwind to keep this task simple and straightforward.
- I intentionally left one product card without a working image to demonstrate loading and error states when fetching an image from a URL.
- I did not implement and state manager (zustand or redux) as it was not required for this task and was unnecessary for the current scope. However, current approach allows to scale up potential frontend aplication
