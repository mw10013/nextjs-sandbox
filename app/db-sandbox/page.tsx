import { pgPool } from "../../db";
import { findUniqueAccessHub } from "../../db/find_unique_access_hub.queries";
import { findAuthUserCounts } from "../../db/access.queries";

async function fetchData() {
  const authUserCounts = await findAuthUserCounts.run(undefined, pgPool);
  const hub = await findUniqueAccessHub.run({ access_hub_id: 1 }, pgPool);

  return { authUserCounts, hub };
}

export default async function Page() {
  const { authUserCounts, hub } = await fetchData();
  return (
    <div>
      <p>{new Date().toISOString()}</p>
      <pre>{JSON.stringify(authUserCounts, null, 2)}</pre>
      <pre>{JSON.stringify(hub, null, 2)}</pre>
    </div>
  );
}
