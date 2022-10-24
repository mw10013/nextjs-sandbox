import { InferGetServerSidePropsType } from "next";
import { supabaseAdminClient } from "../../utils/supabaseClient";
import { pgPool } from "../../db";
import { findUniqueAccessHub } from "../../db/find_unique_access_hub.queries";
import { findAppUserCounts } from "../../db/access.queries";

export const getServerSideProps = async () => {
  for (const { id, appRole } of [
    { id: "f47bfe76-134c-4b27-859f-8007451a2522", appRole: "customer" },
    { id: "733e54ae-c9dc-4b9a-94d0-764fbd1bd76e", appRole: "customer" },
    { id: "b6d21aab-58ec-4122-be89-ca6355dc52f5", appRole: "admin" },
  ]) {
    const { data, error } = await supabaseAdminClient.auth.admin.updateUserById(
      id,
      { user_metadata: { appRole } }
    );
    console.log(data);
    if (error) throw error;
  }

  const appUserCounts = await findAppUserCounts.run(undefined, pgPool);
  const hub = await findUniqueAccessHub.run({ access_hub_id: 1 }, pgPool);
  // const {
  //   data: { user },
  //   error: createUserError,
  // } = await supabaseAdminClient.auth.admin.createUser({
  //   email: "user@email.com",
  //   password: "password",
  //   user_metadata: { name: "Yoda" },
  // });
  // if (createUserError) throw createUserError;
  const {
    data: { users },
    error: listUsersError,
  } = await supabaseAdminClient.auth.admin.listUsers();
  if (listUsersError) throw listUsersError;
  return {
    props: {
      appUserCounts,
      hub,
      users,
    },
  };
};

function Page({
  appUserCounts,
  hub,
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <pre>{JSON.stringify(appUserCounts, null, 2)}</pre>
      <pre>{JSON.stringify(hub, null, 2)}</pre>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}

export default Page;
