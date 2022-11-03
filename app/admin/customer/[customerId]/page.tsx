import { findMany, findUniqueOrThrow, pgTypedClient } from "../../../../db";
import { getAccessHubs } from "../../../../db/get_access_hubs.queries";
import { getAccessUsers } from "../../../../db/get_access_users.queries";
import { getCustomer } from "../../../../db/get_customer.queries";

async function fetchData(customerId: string) {
  const customer = await findUniqueOrThrow(
    getCustomer,
    { customerId },
    pgTypedClient
  );
  const accessHubs = await findMany(
    getAccessHubs,
    { customerId },
    pgTypedClient
  );
  const accessUsers = await findMany(
    getAccessUsers,
    { customerId },
    pgTypedClient
  );
  return { customer: { ...customer, accessHubs, accessUsers } };
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
