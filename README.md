# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:
# Fullstack Developer — Rails + React

Modern Rails 8 + React app, backed by PostgreSQL, containerized with Docker. The React code is bundled via esbuild and included as a single browser-friendly script. A production-grade Dockerfile and a simple Compose file are provided.

## Requirements

- Docker Desktop (Windows/macOS) or Docker Engine (Linux)
- Internet access to fetch Ruby gems and npm packages during image build

You do NOT need to install Ruby or Node locally; they’re used in the image build stage.

## How to run

```powershell
# 1) Build and start (Windows PowerShell)
sudo docker compose build
sudo docker compose up -d

# 3) Open the app
# http://localhost:3000
```

Seeded admin user:

- Email: admin@teste.com
- Password: admin123

If needed, re-run seeds:

```powershell
docker compose exec web bin/rails db:seed
```

### Useful commands

```powershell
# Create DB + run migrations (if needed)
docker compose exec web bin/rails db:prepare

# Only migrations
docker compose exec web bin/rails db:migrate

# Rails console
docker compose exec web bin/rails console

# Run tests (RSpec)
docker compose exec web bundle exec rspec

# Rebuild JS bundle manually
docker compose exec web sh -lc "yarn install && yarn build"
```

## Features

- Rails 8 API + server-rendered views
- React 19 UI, bundled with esbuild to `app/assets/builds/application.js`
- PostgreSQL 16 database
- Authentication with Devise
- Decorators (Draper), slugs (FriendlyId), JSON:API serialization
- Puma + Thruster web stack
- ActionCable - to Spreadshet Feature
- Jobs
- Services
- Translates