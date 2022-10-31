import { headers } from "next/headers";
import Link from "next/link";
import { findMany, pgTypedClient } from "../../db";
import { getCustomers } from "../../db/get_customers.queries";

async function fetchData() {
  headers(); // workaround for export const dynamic = 'force-dynamic'
  const customers = await findMany(getCustomers, undefined, pgTypedClient);

  return {
    customers,
  };
}

export default async function Page() {
  const { customers } = await fetchData();
  return (
    <div className="p-5">
      <h1>Admin Page</h1>
        <ul className="max-w-sm mx-auto mt-5 divide-y divide-gray-500">
          {customers.map((c) => (
            <li key={c.id} className="py-2">
              <Link href={`/admin/customer/${c.id}`}>{c.email}</Link>
            </li>
          ))}
        </ul>
      <pre>{JSON.stringify(customers, null, 2)}</pre>
    </div>
  );
}
