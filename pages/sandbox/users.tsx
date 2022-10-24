import { InferGetServerSidePropsType } from "next";
import { supabaseAdminClient } from "../../utils/supabaseClient";
import { pgPool } from "../../db";
import { findUniqueAccessHub } from "../../db/find_unique_access_hub.queries";

export const getServerSideProps = async () => {
  const result = await findUniqueAccessHub.run({ access_hub_id: 1 }, pgPool);
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
      result,
      data: users,
      // user,
      users,
    },
  };
};

function Page({
  // user,
  result,
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <pre>{JSON.stringify(result, null, 2)}</pre>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}

export default Page;
