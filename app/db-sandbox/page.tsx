import { pgTypedClient } from "../../db";
import { findUniqueAccessHub } from "../../db/find_unique_access_hub.queries";
import { findAuthUserCounts } from "../../db/access.queries";
import { getAccessPoint } from "../../db/get_access_point.queries";

type T = Awaited<ReturnType<typeof getAccessPoint.run>>[number];
type T1 = T["accessPointId"];

async function fetchData() {
  const accessPointArray = await getAccessPoint.run(
    {
      accessPointId: 14,
      accessHubId: 4,
      authUserId: "733e54ae-c9dc-4b9a-94d0-764fbd1bd76e",
    },
    pgTypedClient
  );
  const accessPoint = accessPointArray.length > 0 ? accessPointArray[0] : null;
  console.log(accessPoint);
  if (accessPoint) {
    console.log(accessPoint.accessPointId);
  }
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
