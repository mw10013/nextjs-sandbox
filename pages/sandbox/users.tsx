import {
  InferGetServerSidePropsType,
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";
import type { Database } from "../../DatabaseDefinitions";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// https://supabase.com/docs/reference/javascript/next/initializing
const supabaseAdmin = createClient<Database>(
  supabaseUrl ?? "",
  supabaseServiceRoleKey ?? ""
);

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // Assuming the access token was sent as a header "X-Supabase-Auth"
  // const { access_token } = context.req.get('X-Supabase-Auth')

  const {
    data: { users },
    error,
  } = await supabaseAdmin.auth.admin.listUsers();
  if (error) throw error;
  return {
    props: {
      // data: users,
      data: context.req.headers,
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
