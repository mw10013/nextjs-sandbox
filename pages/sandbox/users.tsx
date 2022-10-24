import { InferGetServerSidePropsType } from "next";
import { supabaseAdminClient } from "../../utils/supabaseClient";
import { pgPool } from "../../db";
import { findUniqueAccessHub } from "../../db/find_unique_access_hub.queries";
import { findAppUserCounts } from "../../db/access.queries";

export const getServerSideProps = async () => {
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
