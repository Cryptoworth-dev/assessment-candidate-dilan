# Expenses Project

This repository contains two parts:

- `API/` — Laravel backend serving the Expense Tracker API
- `Frontend/` — Next.js app that consumes the API

## Prerequisites

Before you start, install:

- Docker Desktop (Windows)
- PHP 8.2+ and Composer (optional if you prefer local PHP setup)
- Node.js 18+ and npm

## API setup (Laravel)

The API is located in the `API/` folder.

### Recommended: Docker

This project includes a Docker setup for the Laravel API and a MySQL database.

From the root of the repo:

```bash
cd API
docker compose up --build
```

Once the containers are running:

- API server: `http://localhost:8000`
- MySQL host inside container: `db`
- MySQL credentials:
  - user: `root`
  - password: ``
  - database: `expense_tracker`

If you need to run migrations inside the container:

```bash
docker compose exec app php artisan migrate
```

### Local PHP setup (without Docker)

If you want to run the API directly on your machine:

```bash
cd API
composer install
cp .env.example .env
# edit .env to match your local MySQL settings
php artisan key:generate
php artisan migrate
php artisan serve --host=0.0.0.0 --port=9000
```

## Frontend setup (Next.js)

The Next.js app is in the `Frontend/` folder.

From the root of the repo:

```bash
cd Frontend
npm install
npm run dev
```

Then open:

- `http://localhost:3000`

The frontend assumes the API is available at the configured address, so make sure the API is running first.

## Notes

- The API and frontend are separate applications.
- Use Docker for the cleanest setup if you do not want to install PHP and MySQL locally.
- If needed, update `API/.env` and `Frontend` config once the API URL is finalized.

## Troubleshooting

- If the API container does not start, check the Docker logs:

```bash
docker compose logs -f
```

- If the frontend cannot reach the API, confirm the API is running on `http://localhost:8000`.

- If you change `.env` values, restart the API container.
