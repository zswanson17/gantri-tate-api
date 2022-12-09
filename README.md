# gantri-tate-api

# Setup

1. Clone repo
2. Run `nvm use` to use target node version
3. Run `npm install` to install dependencies
4. Create .env file with variables pointing to Postgres db (refer to .env.example)
5. Run `npm run setupDb` to populate Postgres database. The process will exit when complete (30-60 seconds)
6. Run `npm run dev` to run the API in dev mode

# Routes

1. GET /api/users
2. POST /api/users (name: string; age: number; location: string)
3. GET /api/art
4. GET /api/art/:id
5. POST /api/art/:id/comments (userId?: number; name?: string; content: string)
