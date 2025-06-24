# DaCodes Modular Platform

This repository is a monorepo for a modular web platform using **Micro-Frontends (MFEs)** with React, Vite, Module Federation, and a backend built with **NestJS**. It is managed with **pnpm workspaces** for efficient dependency and project management.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Environment Variables](#environment-variables)
- [Install Dependencies](#install-dependencies)
- [Development](#development)
- [Build for Production](#build-for-production)
- [Run with Docker](#run-with-docker)
- [Shared Library](#shared-library)
- [Troubleshooting](#troubleshooting)

---

## Project Structure

```
Dacodes-mfe-game/
│
├── apps/                # All frontend micro-frontends (MFEs) and shell
│   ├── auth-mfe/        # Authentication MFE (React + Vite)
│   ├── directory-mfe/   # User directory MFE
│   ├── memory-game-mfe/ # Memory game MFE
│   ├── profile-mfe/     # User profile MFE
│   └── shell/           # Main shell/container for MFEs
│
├── apis/                # Backend services
│   └── leaderboard/     # NestJS backend for leaderboard and websocket
│
├── packages/            # Shared libraries
│   └── lib/             # Shared TypeScript code (domain, DTOs, etc.)
│
├── docker-compose.yml   # Docker Compose for infrastructure (e.g., Redis)
├── env.example          # Example environment variables
├── package.json         # Root package.json (pnpm workspaces)
├── pnpm-workspace.yaml  # pnpm workspace configuration
└── tsconfig.base.json   # Base TypeScript config
```

---

## Requirements

- [Node.js](https://nodejs.org/) >= 18.x
- [pnpm](https://pnpm.io/) >= 8.x
- [Docker](https://www.docker.com/) (for running Redis and optionally the backend)

---

## Environment Variables

Copy `.env.example` to `.env` in the root directory and adjust as needed:

```sh
cp env.example .env
```

**Key variables:**

- Service ports (frontend and backend)
- Module federation entrypoints
- API endpoints
- Redis configuration

Example:

```env
VITE_APP_GATEWAY_PORT=8700
VITE_SERVICE_A_ENTRY=http://localhost:8700/assets/root.js
VITE_API_RANK_URL=http://localhost:6999
VITE_CACHE_HOSTNAME=localhost
VITE_CACHE_PORT=6379
```

---

## Install Dependencies

Install all dependencies for every workspace (MFEs, backend, shared lib):

```sh
pnpm install
```

---

## Development

You can run all MFEs and backend in parallel, or individually.

### Run All in Parallel

```sh
pnpm dev
```

This will start all MFEs and backend services in development mode.

### Run Individual Apps

Each MFE and backend can be started individually. For example:

```sh
pnpm --filter @dacodes/auth-mfe dev
pnpm --filter @dacodes/directory-mfe dev
pnpm --filter @dacodes/memory-game-mfe dev
pnpm --filter @dacodes/profile-mfe dev
pnpm --filter @dacodes/shell dev
```

For the backend:

```sh
cd apis/leaderboard
pnpm start
```

---

## Build for Production

Build all apps and packages:

```sh
pnpm build
```

Or build a specific app:

```sh
pnpm --filter @dacodes/auth-mfe build
```

---

## Run with Docker

This project includes a `docker-compose.yml` for running infrastructure services (e.g., Redis):

```sh
docker-compose up -d
```

This will start a Redis instance on port 6379. You can connect your backend and MFEs to this Redis instance using the environment variables.

> **Note:** The current Docker Compose only includes Redis. To dockerize the backend/frontend, you can add more services to `docker-compose.yml` as needed.

---

## Shared Library

The `packages/lib` directory contains shared TypeScript code (domain models, DTOs, repositories) used by both frontend and backend. Import from `@dacodes/lib` in your apps.

---

## Troubleshooting

- Ensure all ports in `.env` match those used in your MFEs and backend.
- If you see errors about missing environment variables, check your `.env` file and Vite/NestJS configs.
- For module federation issues, verify entrypoints and output filenames.
- If you get React version mismatches, ensure all MFEs use the same React version.

---

## Author

Maintained by Jonathan Pernia.
