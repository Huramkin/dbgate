[![NPM version](https://img.shields.io/npm/v/dbgate-serve.svg)](https://www.npmjs.com/package/dbgate-serve)
![GitHub All Releases](https://img.shields.io/github/downloads/dbgate/dbgate/total) 
[![dbgate](https://snapcraft.io/dbgate/badge.svg)](https://snapcraft.io/dbgate)
[![dbgate](https://snapcraft.io/dbgate/trending.svg?name=0)](https://snapcraft.io/dbgate)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

<img src="https://raw.githubusercontent.com/dbgate/dbgate/master/app/icon.png" width="64" align="right"/>

# DbGate - (no)SQL database client

DbGate is cross-platform database manager. 
It's designed to be simple to use and effective, when working with more databases simultaneously.
But there are also many advanced features like schema compare, visual query designer, chart visualisation or batch export and import.

DbGate is licensed under GPL-3.0 license and is free to use for any purpose.

* Try it online - [demo.dbgate.org](https://demo.dbgate.org) - online demo application
* **Download** application for Windows, Linux or Mac from [dbgate.io](https://www.dbgate.io/download/)
* Looking for DbGate Community? **Download** from [dbgate.io](https://www.dbgate.io/download-community/)
* Run web version as [NPM package](https://www.npmjs.com/package/dbgate-serve) or as [docker image](https://hub.docker.com/r/dbgate/dbgate)
* Use nodeJs [scripting interface](https://docs.dbgate.io/scripting) ([API documentation](https://docs.dbgate.io/apidoc))

## Supported databases
* MySQL
* PostgreSQL
* SQL Server
* Oracle
* MongoDB
* Redis
* SQLite
* Amazon Redshift (Premium)
* CockroachDB
* MariaDB
* CosmosDB (Premium)
* ClickHouse
* Apache Cassandra
* libSQL/Turso (Premium)
* DuckDB
* Firebird
* Firestore (Premium)


<a href="https://raw.githubusercontent.com/dbgate/dbgate/master/img/screenshot1.png">
    <img src="https://raw.githubusercontent.com/dbgate/dbgate/master/img/screenshot1.png" width="400"/>
</a>
<a href="https://raw.githubusercontent.com/dbgate/dbgate/master/img/screenshot2.png">
    <img src="https://raw.githubusercontent.com/dbgate/dbgate/master/img/screenshot2.png" width="400"/>
</a>
<a href="https://raw.githubusercontent.com/dbgate/dbgate/master/img/screenshot4.png">
    <img src="https://raw.githubusercontent.com/dbgate/dbgate/master/img/screenshot4.png" width="400"/>
</a>
<a href="https://raw.githubusercontent.com/dbgate/dbgate/master/img/screenshot3.png">
    <img src="https://raw.githubusercontent.com/dbgate/dbgate/master/img/screenshot3.png" width="400"/>
</a>

<!-- ![Screenshot](https://raw.githubusercontent.com/dbgate/dbgate/master/screenshot.png) -->

## Features
* Browse table data with many filtering options, Excel-like filters, multi-value filters
* Table data editing, with SQL change script preview
* Edit table schema, indexes, primary and foreign keys
* Compare and synchronize database structure
* ER diagram
* Light and dark theme, next themes available from DbGate Cloud
* Huge support for work with related data - master/detail views, foreign key lookups, expanding columns from related tables in flat data view
* Query designer - visual SQL query builder without writing SQL code. Complex conditions like WHERE NOT EXISTS.
* Query perspectives – innovative nested table view over complex relational data, something like query designer on MongoDB databases
* Form view for comfortable work with tables with many columns
* JSON view on MongoDB collections
* Explore tables, views, procedures, functions, MongoDB collections
* SQL editor
  * execute SQL script
  * SQL code formatter
  * SQL code completion
  * Add SQL LEFT/INNER/RIGHT join utility
* Mongo JavaScript editor, execute Mongo script (with NodeJs syntax)
* Redis tree view, generate script from keys, run Redis script
* Runs as application for Windows, Linux and Mac. Or in Docker container on server and in web Browser on client.
* Import, export from/to CSV, Excel, JSON, NDJSON, XML, DBF
* Archives - backup your data in NDJSON files on local filesystem (or on DbGate server, when using web application)
* NDJSON data viewer and editor - browse NDJSON data, edit data and structure directly on NDJSON files. Works also for big NDSON files
* Charts, export chart to HTML page
* AI powered database chat
* Show GEO data on map, export map to HTML page
* For detailed info, how to run DbGate in docker container, visit [docker hub](https://hub.docker.com/r/dbgate/dbgate)
* Extensible plugin architecture

## How to contribute
Any contributions are welcome. If you want to contribute without coding, consider following:

* Tell your friends about DbGate or share on social networks - when more people will use DbGate, it will grow to be better
* Purchase a [DbGate Premium](https://www.dbgate.io/purchase/premium/) license
* Create issue, if you find problem in app, or you have idea to new feature. If issue already exists, you could leave comment on it, to prioritise most wanted issues
* Create some tutorial video on [youtube](https://www.youtube.com/playlist?list=PLCo7KjCVXhr0RfUSjM9wJMsp_ShL1q61A)
* Become a backer on [GitHub sponsors](https://github.com/sponsors/dbgate) or [Open collective](https://opencollective.com/dbgate)
* Add a SQL script to [Public Knowledge Base](https://github.com/dbgate/dbgate-knowledge-base)
* Where a small coding is acceptable for you, you could [create plugin](https://docs.dbgate.io/plugin-development)
* Create a new custom theme and share it on [DbGate Cloud](https://github.com/dbgate/dbgate-knowledge-base/tree/master/folder-Themes)

Thank you!

## Why is DbGate different
There are many database managers now, so why DbGate? 
* Works everywhere - Windows, Linux, Mac, Web browser (+mobile web is planned), without compromises in features
* Based on standalone NPM packages, scripts can be run without DbGate (example - [CSV export](https://www.npmjs.com/package/dbgate-plugin-csv) )
* Many data browsing functions based using foreign keys - master/detail, expand columns, expandable form view

## Design goals
* Application simplicity - DbGate takes the best and only the best from old DbGate, [DatAdmin](https://www.softpedia.com/get/Internet/Servers/Database-Utils/DatAdmin-Personal.shtml), [DbMouse](https://www.softpedia.com/get/Internet/Servers/Database-Utils/DbMouse.shtml) and [SQL Database Studio](https://en.wikipedia.org/wiki/SQL_Database_Studio)
* Minimal dependencies
    * Frontend - Svelte
    * Backend - NodeJs, ExpressJs, database connection drivers
    * JavaScript + TypeScript
    * App - electron
* Platform independent - runs as web application in single docker container on server, or as application using Electron platform on Linux, Windows and Mac

<!-- ## Plugins
Plugins are standard NPM packages published on [npmjs.com](https://www.npmjs.com).  
See all [existing DbGate plugins](https://www.npmjs.com/search?q=keywords:dbgateplugin).  
Visit [dbgate generator homepage](https://github.com/dbgate/generator-dbgate) to see, how to create your own plugin.  

Currently following extensions can be implemented using plugins:
- File format parsers/writers
- Database engine connectors

Basic set of plugins is part of DbGate git repository and is installed with app. Additional plugins pust be downloaded from NPM (this task is handled by DbGate) -->

## How to run development environment

> **Prerequisites**: Node.js 22+, pnpm 9+  
> Install pnpm: `npm install -g pnpm@9`

### Quick start (Web application)

```sh
pnpm install    # install all dependencies and build libraries/plugins
pnpm start      # run API (port 3000) + Web frontend (port 5001) concurrently
```

Open http://localhost:5001 in your browser.

### Run with more control (3 terminals)

```sh
pnpm install           # install dependencies
```

Then run in 3 separate terminals:
```sh
pnpm start:api         # Terminal 1: API server on port 3000
pnpm start:web         # Terminal 2: Web frontend on port 5001
pnpm lib               # Terminal 3: Watch TypeScript libraries and plugins
```

### Run Electron desktop app

```sh
pnpm install           # install dependencies
cd app && pnpm install # install Electron dependencies
```

Then run in 3 separate terminals:
```sh
pnpm start:web         # Terminal 1: Web frontend (static files)
pnpm lib               # Terminal 2: Watch TypeScript libraries
pnpm start:app         # Terminal 3: Electron app
```

### Build for production

```sh
pnpm build:lib         # build TypeScript libraries (sqltree, tools, filterparser, datalib, rest)
pnpm build:web         # build web frontend
pnpm build:api         # build API backend
pnpm ts                # TypeScript type-check
```

### Build Electron app locally

```sh
cd app && pnpm install
pnpm build:app:local   # build Electron app
pnpm start:app:local   # run built Electron app
```

### Docker

```sh
pnpm prepare:docker    # build and prepare Docker image files
cd docker && docker build -t dbgate .
docker run -p 3000:3000 dbgate
```

## How to create plugin
Creating plugin is described in [documentation](https://github.com/dbgate/dbgate/wiki/Plugin-development)

```sh
npm install -g yo                # install yeoman
npm install -g generator-dbgate  # install dbgate generator
cd dbgate-plugin-my-new-plugin   # created by wizard
pnpm plugin                      # compile and install plugin
```

After restarting DbGate, your new plugin will be available.

## Logging
DbGate uses [pinomin logger](https://github.com/dbgate/pinomin). So by default, it produces JSON log messages into console and log files. If you want to see formatted logs, please use [pino-pretty](https://github.com/pinojs/pino-pretty) log formatter.
