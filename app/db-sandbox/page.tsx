import { pgTypedClient } from "../../db";
import { findUniqueAccessHub } from "../../db/find_unique_access_hub.queries";
import { findAuthUserCounts } from "../../db/access.queries";
import { getAccessPoint } from "../../db/get_access_point.queries";
import { IDatabaseConnection, PreparedQuery } from "@pgtyped/query/lib/tag";

async function findUniqueOrThrow<TParamType, TResultType>(
  preparedQuery: PreparedQuery<TParamType, TResultType>,
  params: TParamType,
  conn: IDatabaseConnection
) {
  const results = await preparedQuery.run(params, conn);
  if (results.length === 1) {
    return results[0];
  } else if (results.length === 0) {
    throw new Error(`findUnique: empty results`);
  } else {
    throw new Error(`findUnique: >1 row in results (${results.length} rows)`);
  }
}

async function fetchData() {
  const accessPoint = await findUniqueOrThrow(
    getAccessPoint,
    {
      accessPointId: 14,
      accessHubId: 4,
      authUserId: "733e54ae-c9dc-4b9a-94d0-764fbd1bd76e",
    },
    pgTypedClient
  );
  const authUserCounts = await findAuthUserCounts.run(undefined, pgTypedClient);
  const hub = await findUniqueAccessHub.run(
    { access_hub_id: 1 },
    pgTypedClient
  );

  return { dt: new Date().toISOString(), accessPoint, authUserCounts, hub };
}

export default async function Page() {
  const { dt, accessPoint, authUserCounts, hub } = await fetchData();
  return (
    <div>
      <p>{dt}</p>
      <pre>{JSON.stringify(accessPoint, null, 2)}</pre>
      <pre>{JSON.stringify(authUserCounts, null, 2)}</pre>
      <pre>{JSON.stringify(hub, null, 2)}</pre>
    </div>
  );
}
