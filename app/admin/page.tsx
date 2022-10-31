import { findMany, pgTypedClient } from "../../db";
import { getCustomers } from "../../db/get_customers.queries";

async function fetchData() {
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
      <pre>{JSON.stringify(customers, null, 2)}</pre>
    </div>
  );
}
