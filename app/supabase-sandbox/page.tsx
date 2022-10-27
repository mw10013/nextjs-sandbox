import { supabaseAdminClient } from "../../utils/supabaseClient";

async function fetchData() {
  /*
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
*/
  const {
    data: { users },
    error: listUsersError,
  } = await supabaseAdminClient.auth.admin.listUsers();
  if (listUsersError) throw listUsersError;
  return {
    users,
  };
}

export default async function Page() {
  const { users } = await fetchData();
  return (
    <div>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
