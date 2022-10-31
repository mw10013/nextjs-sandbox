import { findMany, findUniqueOrThrow, pgTypedClient } from "../../db";
import { getAccessPoint } from "../../db/get_access_point.queries";
import {
  getAccessHub,
  IGetAccessHubResult,
} from "../../db/get_access_hub.queries";
import {
  getAccessUsersByPoint,
  IGetAccessUsersByPointResult,
} from "../../db/get_access_users_by_point.queries";

async function fetchData(): Promise<{
  accessPoint: {
    accessHub: IGetAccessHubResult;
    accessUsers: IGetAccessUsersByPointResult[];
    accessHubId: number;
    accessPointId: number;
    name: string;
    position: number;
  };
}> {
  const accessPoint = await findUniqueOrThrow(
    getAccessPoint,
    {
      accessPointId: 14,
      accessHubId: 4,
      customerId: "733e54ae-c9dc-4b9a-94d0-764fbd1bd76e",
    },
    pgTypedClient
  );
  const accessHub = await findUniqueOrThrow(
    getAccessHub,
    { accessHubId: 4, customerId: "733e54ae-c9dc-4b9a-94d0-764fbd1bd76e" },
    pgTypedClient
  );
  const accessUsers = await findMany(
    getAccessUsersByPoint,
    { accessPointId: 14 },
    pgTypedClient
  );

  return {
    accessPoint: { ...accessPoint, accessHub, accessUsers },
  };
}

export default async function Page() {
  const { accessPoint } = await fetchData();
  return (
    <div>
      <pre>{JSON.stringify(accessPoint, null, 2)}</pre>
    </div>
  );
}
