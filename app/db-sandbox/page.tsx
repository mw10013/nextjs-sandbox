import { pgTypedClient } from "../../db";
import { getAccessPoint } from "../../db/get_access_point.queries";
import { IDatabaseConnection, PreparedQuery } from "@pgtyped/query/lib/tag";
import { getAccessHub } from "../../db/get_access_hub.queries";
import { getAccessUsersByPoint } from "../../db/get_access_users_by_point.queries";
import _ from "lodash";

/* 
pgTyped camelCaseColumnNames config seems to be implemented on types, but not values.
PreparedQuery.run returns results that may not align with its type. 
We mutate results as needed for camelCaseColumnNames.
Note that pgTyped mapQueryResultRows also mutates.
*/

function camelCaseResultMutation(result: Record<string, unknown>) {
  for (const k of Object.keys(result)) {
    if (k.indexOf("_")) {
      result[_.camelCase(k)] = result[k];
      delete result[k];
    }
  }
}

async function findUniqueOrThrow<TParamType, TResultType>(
  preparedQuery: PreparedQuery<TParamType, TResultType>,
  params: TParamType,
  conn: IDatabaseConnection
) {
  const results = await preparedQuery.run(params, conn);
  if (results.length === 1) {
    camelCaseResultMutation(results[0] as Record<string, unknown>);
    return results[0];
  } else if (results.length === 0) {
    throw new Error(`findUnique: empty results`);
  } else {
    throw new Error(`findUnique: >1 row in results (${results.length} rows)`);
  }
}

async function findMany<TParamType, TResultType>(
  preparedQuery: PreparedQuery<TParamType, TResultType>,
  params: TParamType,
  conn: IDatabaseConnection
) {
  const results = await preparedQuery.run(params, conn);
  for (const result of results) {
    camelCaseResultMutation(result as Record<string, unknown>);
  }
  return results;
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
  const accessHub = await findUniqueOrThrow(
    getAccessHub,
    { accessHubId: 4, authUserId: "733e54ae-c9dc-4b9a-94d0-764fbd1bd76e" },
    pgTypedClient
  );
  const accessUsers = await findMany(
    getAccessUsersByPoint,
    { accessPointId: 14 },
    pgTypedClient
  );

  return {
    dt: new Date().toISOString(),
    accessPoint: { ...accessPoint, accessHub, accessUsers },
  };
}

export default async function Page() {
  const { dt, accessPoint } = await fetchData();
  return (
    <div>
      <p>{dt}</p>
      <pre>{JSON.stringify(accessPoint, null, 2)}</pre>
    </div>
  );
}
