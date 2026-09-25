# Cheil Recruitment Tasks

## Project Structure

- [Frontend task](./frontend-task/) - the React app is in [vite-project](./frontend-task/vite-project/).
- [Backend task](./fs-test-task-main/) - the full-stack task starter and requirements.

## How to Run

## Frontend task
To run the frontend app, install Node.js 22.12+ and pnpm, then run these commands from the repository root:

```bash
cd frontend-task/vite-project
pnpm install
pnpm dev
```

Open the local URL printed in the terminal (usually [http://localhost:5173](http://localhost:5173)).

## Backend task
With startup script:
```sh
yarn run dev:fe
yarn run dev:be
```

With Docker Compose Only:
```sh
docker compose up --build -d
docker compose exec api npm run migrate # (migration script)
```

## Assumptions

- All UI text is in Polish, matching the example.
- I did not use Tailwind to keep this task simple and straightforward.
- I intentionally left one product card without a working image to demonstrate loading and error states when fetching an image from a URL.
- I did not implement and state manager (zustand or redux) as it was not required for this task and was unnecessary for the current scope. However, current approach allows to scale up potential frontend aplication
- I did not implement rate limiting, caching, or additional performance optimizations on backend because they were outside the assignment’s requirements and scope. I kept the backend simple; these features can be added later if usage and performance measurements justify them.
- I do not add frontend to a dockercompose due to initial script in package.json. It specifically runs front-end locally without container '"dev:fe": "cd fe && npm run dev '
