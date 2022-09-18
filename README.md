[Create Nextjs with typescript eslint prettier tailwind](https://www.sandromaglione.com/techblog/create-nextjs-project-with-typescript-eslint-prettier-tailwindcss)
[Next app typescript eslint prettier tailwind](https://www.felixmokross.dev/blog/next-app-typescript-eslint-prettier-tailwind)
[Tailwind install](https://tailwindcss.com/docs/guides/nextjs)

- npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
- npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-import-resolver-typescript
- echo {}> .prettierrc.json
- cp .gitignore .prettierignore
- npm install -D tailwindcss postcss autoprefixer
- npx tailwindcss init -p
- npm install -D @tailwindcss/forms
- npm install react-hook-form
- npm install @hookform/resolvers
- npm install zod
- npm i @tanstack/react-query
- npm install @supabase/supabase-js@rc

[Prettier](https://prettier.io/docs/en/install.html)

- npx prettier --write .
- npx prettier --check .

## Supabase CLI

[Install via NPM](https://github.com/supabase/cli)
[Supabase Local Development](https://supabase.com/docs/guides/cli/local-development)

- npm i supabase
- npx supabase -h
- npx supabase login
- npx supabase init
- npx supabase start | stop | status
- npx supabase gen types typescript --db-url

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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
