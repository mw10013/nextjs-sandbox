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
    <div key={label} className="flex justify-between">
      <div>{label}</div>
      <div>{value}</div>
    </div>
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
        <DataListItem label={label} value={value} />
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
      <h3 className="text-center">{title}</h3>
      <div className="-mt-2">
        {data.map((d) => (
          <DataList className="mt-2" data={d} />
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
      <div className="max-w-sm mx-auto mt-5">
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

        <div className="text-center">Hubs</div>
        <div className="-mt-2">
          {customer.accessHubs.map((hub) => (
            <DataList
              className="mt-2"
              data={[
                ["Id", hub.accessHubId.toString()],
                ["Name", hub.name],
                ["Description", hub.description],
                ["Heartbeat", hub.heartbeatAt?.toISOString() ?? ""],
                ["API Token", hub.apiToken],
              ]}
            />
          ))}
        </div>
        <div className="text-center">Users</div>
        {customer.accessUsers.map((user) => (
          <DataList
            data={[
              ["Id", user.accessUserId.toString()],
              ["Name", user.name],
              ["Description", user.description],
              ["Code", user.code],
              ["Activate Code At", user.activateCodeAt?.toISOString() ?? ""],
              ["Expire Code At", user.expireCodeAt?.toISOString() ?? ""],
            ]}
          />
        ))}
      </div>
      {/* <ul className="max-w-sm mx-auto mt-5 divide-y divide-gray-500">
          {customers.map((c) => (
            <li key={c.id} className="py-2">
              <Link href={`/admin/customer/${c.id}`}>{c.email}</Link>
            </li>
          ))}
        </ul> */}
      <pre>{JSON.stringify(customer, null, 2)}</pre>
    </div>
  );
}
