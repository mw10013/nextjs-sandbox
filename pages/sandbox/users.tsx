import { InferGetServerSidePropsType } from "next";
import type { Database } from "../../DatabaseDefinitions";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// https://supabase.com/docs/reference/javascript/next/initializing
const supabaseAdmin = createClient<Database>(
  supabaseUrl ?? "",
  supabaseServiceRoleKey ?? ""
);

export const getServerSideProps = async () => {
  const {
    data: { users },
    error,
  } = await supabaseAdmin.auth.admin.listUsers();
  if (error) throw error;
  return {
    props: {
      data: users,
    },
  };
};

function Page({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Page;
