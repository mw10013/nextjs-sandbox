import { findUniqueOrThrow, pgTypedClient } from "../../../../db";
import { getCustomer } from "../../../../db/get_customer.queries";

async function fetchData(customerId: string) {
  const customer = await findUniqueOrThrow(
    getCustomer,
    { customerId },
    pgTypedClient
  );
  return { customer };
}

export default async function Page({
  params,
}: {
  params: { customerId: string };
}) {
  const { customer } = await fetchData(params.customerId);
  return (
    <>
      <pre>{JSON.stringify(customer, null, 2)}</pre>
    </>
  );
}
