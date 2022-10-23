import type { Database } from "../DatabaseDefinitions";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseClient = createClient<Database>(
  supabaseUrl ?? "",
  supabaseAnonKey ?? ""
);

export const supabaseAdminClient = createClient<Database>(
  supabaseUrl ?? "",
  supabaseServiceRoleKey ?? ""
);
