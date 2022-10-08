import { Pool } from "pg";

// https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var pgPool: Pool | undefined;
}

export const pgPool =
  global.pgPool ??
  new Pool({
    connectionString: "postgresql://postgres:postgres@localhost:54322/postgres",
  });

if (process.env.NODE_ENV !== "production") global.pgPool = pgPool;
