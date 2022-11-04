import { hasSubscribers } from "diagnostics_channel";
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

function DataListItem({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex justify-between">
      <div>{label}</div>
      <div>{value}</div>
    </li>
  );
}

function DataList({
  data,
  className = "",
}: {
  data: Array<[string, string]>;
  className?: string;
}) {
  return (
    <ul className={className}>
      {data.map(([label, value]) => (
        <DataListItem key={label} label={label} value={value} />
      ))}
    </ul>
  );
}

function DataComponent({
  title,
  data,
}: {
  title: string;
  data: Array<Array<[string, string]>>;
}) {
  return (
    <div>
      <div className="border-b border-gray-200 pb-2 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
      </div>
      <div className="">
        {data.map((d) => (
          <DataList key={d[0][1]} className="mt-2" data={d} />
        ))}
      </div>
    </div>
  );
}

export default async function Page({
  params,
}: {
  params: { customerId: string };
}) {
  const { customer } = await fetchData(params.customerId);
  return (
    <div className="p-5">
      <h1>Customer</h1>
      <div className="max-w-sm mx-auto mt-5 space-y-3">
        <DataComponent
          title="Properties"
          data={[
            [
              ["Email", customer.email ?? ""],
              ["Id", customer.id],
            ],
          ]}
        />
        <DataComponent
          title="Hubs"
          data={customer.accessHubs.map((hub) => [
            ["Id", hub.accessHubId.toString()],
            ["Name", hub.name],
            ["Description", hub.description],
            ["Heartbeat", hub.heartbeatAt?.toISOString() ?? ""],
            ["API Token", hub.apiToken],
          ])}
        />
        <DataComponent
          title="Users"
          data={customer.accessUsers.map((user) => [
            ["Id", user.accessUserId.toString()],
            ["Name", user.name],
            ["Description", user.description],
            ["Code", user.code],
            ["Activate Code At", user.activateCodeAt?.toISOString() ?? ""],
            ["Expire Code At", user.expireCodeAt?.toISOString() ?? ""],
          ])}
        />
      </div>
    </div>
  );
}
