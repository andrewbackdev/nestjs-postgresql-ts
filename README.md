# NestJS PostgreSQL TS Sample Application

The current version of the backend utilizes Docker for accelerated development, eliminating the need to manage database versions every time you switch projects. Additionally, it provides easier migration generation with built-in scripts.

This repository contains a sample application built using the following technologies:

- NestJS
- TypeORM
- PostgreSQL
- Docker
- Docker Compose

## Getting started

### Prerequisites

Before you begin, make sure you have Docker and Docker Compose installed on your system. If not, follow the instructions in the [Docker documentation](https://docs.docker.com/compose/install/) to install them.

### Installation

1. Clone this repository:

```sh
git clone https://github.com/andrewbackdev/nestjs-postgresql-ts
cd express-mongoose-js
```

2. Install the required npm dependencies:

```sh
npm ci
```

### Usage

1. Start the MongoDB database using Docker:

```sh
npm run db:up
```

2. Prepare the environment by copying and editing the environment file:

```sh
cp environments/example.env environments/.env
```

3. If you need to reconfigure the database, you can edit the `docker-compose.yml` file. Remember to update the `.env` file accordingly.
4. Start the server:

```sh
npm run start
```

5. Access the API at the default URL: http://localhost:3000/api/v1

### Database Migration

The `docker-compose.yml` file includes configurations for local, migration, and CI databases.

```bash
# Generate a migration based on your changes
$ npm run migration:generate

# Create an empty migration
$ npm run migration:create

# Run migrations for the local and migration databases
$ npm run migration:run
```

### Testing

```bash
# Run unit tests
$ npm run test

# Run end-to-end (e2e) tests
$ npm run test:e2e

# Generate test coverage
$ npm run test:cov
```

### Documentation

The API documentation is available via Swagger and can be accessed at http://localhost:3000/docs.
Feel free to explore the various endpoints and their functionality.
