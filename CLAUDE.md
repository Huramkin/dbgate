# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DbGate is a cross-platform (no)SQL database manager supporting MySQL, PostgreSQL, SQL Server, Oracle, MongoDB, Redis, SQLite, and more. It runs as a web app (Docker/NPM), an Electron desktop app, or in a browser. The monorepo uses pnpm workspaces.

## Development Commands

```sh
pnpm install  # install all packages (also builds TS libraries and plugins)
pnpm start    # run API (port 3000) + web (port 5001) concurrently
```

For more control, run these 3 commands in separate terminals:
```sh
pnpm start:api    # Express API on port 3000
pnpm start:web    # Svelte frontend on port 5001
pnpm lib          # watch-compile TS libraries and plugins
```

For Electron development:
```sh
pnpm start:web     # web on port 5001
pnpm lib           # watch TS libs/plugins
pnpm start:app     # Electron app
```

### Building

```sh
pnpm build:lib          # build all TS libraries (sqltree, tools, filterparser, datalib, rest)
pnpm build:api          # build API
pnpm build:web          # build web frontend
pnpm ts                 # TypeScript type-check API and web
pnpm prettier           # format all source files
```

### Testing

Unit tests (in packages like `dbgate-tools`):
```sh
pnpm --filter dbgate-tools test
```

Integration tests (requires Docker for database containers):
```sh
cd integration-tests
pnpm test:local                                              # run all tests
pnpm test:local:path __tests__/alter-database.spec.js       # run a single test file
```

E2E tests (Cypress):
```sh
pnpm cy:open                    # open Cypress UI
cd e2e-tests && pnpm cy:run:browse-data   # run a specific spec headlessly
```

## Architecture

### Monorepo Structure

| Path | Package | Purpose |
|---|---|---|
| `packages/api` | `dbgate-api` | Express.js backend server |
| `packages/web` | `dbgate-web` | Svelte 4 frontend (built with Rolldown) |
| `packages/tools` | `dbgate-tools` | Shared TS utilities: SQL dumping, schema analysis, diffing, driver base classes |
| `packages/datalib` | `dbgate-datalib` | Grid display logic, changeset management, perspectives, chart definitions |
| `packages/sqltree` | `dbgate-sqltree` | SQL AST representation and dumping |
| `packages/filterparser` | `dbgate-filterparser` | Parses filter strings into SQL/Mongo conditions |
| `packages/rest` | `dbgate-rest` | REST connection support |
| `packages/types` | `dbgate-types` | TypeScript type definitions (`.d.ts` only) |
| `packages/aigwmock` | `dbgate-aigwmock` | Mock AI gateway server for E2E testing |
| `plugins/dbgate-plugin-*` | — | Database drivers and file format handlers |
| `app/` | — | Electron shell |
| `integration-tests/` | — | Jest-based DB integration tests (Docker) |
| `e2e-tests/` | — | Cypress E2E tests |

### API Backend (`packages/api`)

- Express.js server with controllers in `src/controllers/` — each file exposes REST endpoints via the `useController` utility
- Database connections run in child processes (`src/proc/`) to isolate crashes and long-running operations
- `src/shell/` contains stream-based data pipeline primitives (readers, writers, transforms) used for import/export and replication
- Plugin drivers are loaded dynamically via `requireEngineDriver`; each plugin in `plugins/` exports a driver conforming to `DriverBase` from `dbgate-tools`

### Frontend (`packages/web`)

- Svelte 4 components; builds with Rolldown (not Vite/Webpack)
- Global state in `src/stores.ts` using Svelte writable stores, with `writableWithStorage` / `writableWithForage` helpers for persistence
- API calls go through `src/utility/api.ts` (`apiCall`, `apiOff`, etc.) which handles auth, error display, and cache invalidation
- Tab system: each open editor/viewer is a "tab" tracked in `openedTabs` store; tab components live in `src/tabs/`
- Left-panel tree items are "AppObjects" in `src/appobj/`
- Metadata (table lists, column info) is loaded reactively via hooks in `src/utility/metadataLoaders.ts`
- Commands/keybindings are registered in `src/commands/`

### Plugin Architecture

Each `plugins/dbgate-plugin-*` package provides:
- **Frontend build** (`build:frontend`): bundled JS loaded by the web UI for query formatting, data rendering
- **Backend build** (`build:backend`): Node.js driver code loaded by the API for actual DB connections

Plugins are copied to `plugins/dist/` via `plugins:copydist` before building the app or Docker image.

### Key Conventions

- Error/message codes use `DBGM-00000` as placeholder — do not introduce new numbered `DBGM-NNNNN` codes
- Frontend uses **Svelte 4** (not Svelte 5)
- E2E test selectors use `data-testid` attribute with format `ComponentName_identifier`
- Prettier config: single quotes, 2-space indent, 120-char line width, trailing commas ES5
- Logging via `pinomin`; pipe through `pino-pretty` for human-readable output

### Translation System

```sh
pnpm translations:extract        # extract new strings
pnpm translations:add-missing    # add missing translations
pnpm translations:check          # check for issues
```
