import "server-only";
import { Pool } from "pg";

// https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices

const { DATABASE_URL } = process.env;
if (typeof DATABASE_URL !== "string")
  throw new Error("DATABASE_URL env var not set");

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var pgPool: Pool | undefined;
}

export const pgPool =
  global.pgPool ??
  new Pool({
    connectionString: DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") global.pgPool = pgPool;
