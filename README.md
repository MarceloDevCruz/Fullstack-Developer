# Fullstack Developer — Rails + React

Modern Rails 8 app with React (bundled via esbuild), PostgreSQL, and a production-grade Dockerfile. A ready-to-run Docker Compose setup is included for local development.

## Tech stack

- Ruby 3.3, Rails 8.0
- PostgreSQL 16
- React 19, esbuild bundling to `app/assets/builds`
- Puma + Thruster
- Devise, Pundit, Draper, FriendlyId, JSON:API Serializer

## Quick start (Docker on Windows/macOS/Linux)

Prerequisite: Docker Desktop installed and running.

```powershell
# Build and start
docker compose build
docker compose up -d

# Open the app
# http://localhost:3000
```

Default credentials (seeded):

- Email: `admin@teste.com`
- Password: `admin123`

If the admin is not present yet, run seeds:

```powershell
docker compose exec web bin/rails db:seed
```

## What’s inside this setup

- `Dockerfile` optimized for production images. Build stage installs gems and JS, bundles React with esbuild, and precompiles assets. Final stage runs the app with Thruster.
- `docker-compose.yml` runs:
	- `db` (PostgreSQL 16)
	- `web` (Rails app, exposed at host `http://localhost:3000` mapping to container `:80`)
- `db/seeds.rb` creates an admin user idempotently:
	- `admin@teste.com` / `admin123`
- `app/views/layouts/application.html.erb` includes the bundled JS via `javascript_include_tag`.
- `package.json` scripts build the React bundle in browser-friendly IIFE format (no ESM imports in the final file).

## Common tasks

Run migrations, seeds, console:

```powershell
# Create DB, run migrations and seeds as needed
docker compose exec web bin/rails db:prepare

# Only migrations
docker compose exec web bin/rails db:migrate

# Only seeds (admin user included)
docker compose exec web bin/rails db:seed

# Rails console
docker compose exec web bin/rails console
```

Run tests (RSpec):

```powershell
docker compose exec web bundle exec rspec
```

Rebuild the JS bundle manually:

```powershell
docker compose exec web sh -lc "yarn install && yarn build"
```

## Live reload options

By default, code changes require a rebuild to be reflected inside the image. If you want hot-ish reload during development, you can mount your project into the container and run a watcher:

```yaml
# docker-compose.override.yml (optional for local dev)
services:
	web:
		volumes:
			- .:/rails
			- bundle:/usr/local/bundle
			- node_modules:/rails/node_modules
		entrypoint: []
		command: ["sh", "-lc", "for f in bin/*; do [ -f \"$f\" ] && sed -i 's/\\r$//' \"$f\"; done; chmod +x bin/* || true; bundle check || bundle install; bin/rails db:prepare; bin/rails server -b 0.0.0.0 -p 3000"]
		ports:
			- "3000:3000"
volumes:
	bundle:
	node_modules:
```

Then, in another terminal, start the JS watcher inside the container:

```powershell
docker compose exec web sh -lc "yarn install && yarn build:watch"
```

## Database reset options

Reset via Rails (drop/create/migrate/seed):

```powershell
docker compose exec web bin/rails db:reset
```

Or completely wipe Compose volumes and start fresh:

```powershell
docker compose down -v
docker compose up -d
docker compose exec web bin/rails db:prepare
docker compose exec web bin/rails db:seed
```
