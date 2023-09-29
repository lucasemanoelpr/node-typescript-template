### BoxTi Node.js Template

## Routes

/v1/status - Return current timestamp


# Path routes
src/presentation/http/Routes.ts



# Migrations

To create a new migration, you can use:
npm run typeorm migration:create -n src/infrastructure/database/mysql/migrations/create-table-my-table

To use seed:
npm run typeorm:seed


# Setup

1. Install dependencies:
`npm install`

2. Configure a new .env based in .env.local

3. Run migrations:
`npm run migrate`

4. Run seeders:
`npm run seed`

5. Then start application:
`npm run dev`