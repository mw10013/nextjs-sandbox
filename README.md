Uses pnpm.

[Create Nextjs with typescript eslint prettier tailwind](https://www.sandromaglione.com/techblog/create-nextjs-project-with-typescript-eslint-prettier-tailwindcss)
[Next app typescript eslint prettier tailwind](https://www.felixmokross.dev/blog/next-app-typescript-eslint-prettier-tailwind)
[Tailwind install](https://tailwindcss.com/docs/guides/nextjs)

- pnpm add -D prettier eslint-config-prettier eslint-plugin-prettier
- pnpm add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-import-resolver-typescript
- pnpm add -D eslint-plugin-import
- echo {}> .prettierrc.json
- cp .gitignore .prettierignore
- pnpm add -D tailwindcss postcss autoprefixer
- pnpm exec tailwindcss init -p
- pnpm add -D @tailwindcss/forms
- pnpm add react-hook-form
- pnpm add @hookform/resolvers
- pnpm add zod
- pnpm add @tanstack/react-query
- pnpm add @supabase/supabase-js
- pnpm add @supabase/auth-helpers-nextjs
- pnpm add @supabase/auth-helpers-react
- pnpm add -D @pgtyped/cli @pgtyped/query
- pnpm add pg
- pnpm add -D @types/pg

[Prettier](https://prettier.io/docs/en/install.html)

- pnpm exec prettier --write .
- pnpm exec prettier --check .

## Supabase CLI

[Install via NPM](https://github.com/supabase/cli),
[Supabase Local Development](https://supabase.com/docs/guides/cli/local-development)

- pnpm add -D supabase
- pnpm supabase -h
- pnpm supabase login
- pnpm supabase init
- pnpm supabase start | stop | status
- pnpm supabase db diff --use-migra --file [file_name]
- pnpm supabase db reset --debug
- pnpm supabase db branch create | delete | list | switch
- pnpm supabase link -p [db password] --project-ref [string]
- pnpm supabase db push -p [db password]
- psql: \i supabase/seed.sql
- pnpm supabase gen types typescript --local > DatabaseDefinitions.ts
- psql postgresql://postgres:postgres@localhost:54322/postgres

## pgtyped

- pnpm exec pgtyped -w -c pgtyped.json
- psql postgresql://postgres:postgres@localhost:54322/postgres

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Seeding

- [Reddit seeding auth.users](https://www.reddit.com/r/Supabase/comments/uy8lku/comment/iak69o2/)
- [Github seeding auth.user](https://github.com/supabase/supabase/discussions/5043)
- pg_dump -v --data-only --inserts --schema auth -f db/auth_data.pgsql postgresql://postgres:postgres@localhost:54322

## Access Prisma Database

```bash
createdb --echo --owner postgres -T template0 --maintenance-db postgresql://postgres:postgres@localhost:54322/postgres access_prisma
pg_restore -v -d postgresql://postgres:postgres@localhost:54322/access_prisma access_prisma/access_prisma_db_20221015.dump
```

- pg_restore -v --schema-only --file access_prisma/access_prisma_schema_20221015.sql access/access_db_20221015.dump
- pg_restore -v --data-only --file access_prisma/access_prisma_data_20221015.sql access_prisma/access_prisma_db_20221015.dump

## Supabase Profiles Table

Sql from supabase with nextjs [example](https://supabase.com/docs/guides/with-nextjs)

```sql
-- Create a table for public "profiles"
create table profiles (
  id uuid references auth.users not null,
  updated_at timestamp with time zone,
  username text unique,

  primary key (id),
  unique(username),
  constraint username_length check (char_length(username) >= 3)
);

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
