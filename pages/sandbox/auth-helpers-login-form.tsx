import { useUser } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { SupabaseClient } from "@supabase/supabase-js";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const authSchema = z.object({
  email: z.string().min(1, { message: "Required" }).email(),
});

type AuthSchema = z.infer<typeof authSchema>;

function Auth({ supabaseClient }: { supabaseClient: SupabaseClient }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
  });

  return (
    <div className="mx-auto max-w-sm pt-8">
      <form
        onSubmit={handleSubmit(async ({ email }) => {
          const { error } = await supabaseClient.auth.signIn({
            email,
          });
          if (error) throw error;
          alert("Check your email for the login link!");
        })}
      >
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Simple Magic Login Form
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Based on{" "}
            <a
              className="text-indigo-600 hover:text-indigo-900"
              href="https://github.com/supabase/auth-helpers/tree/main/packages/nextjs"
            >
              supabase auth helpers
            </a>{" "}
          </p>
        </div>
        <div className="mt-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="text"
            {...register("email")}
            className="mt-1 block rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          {typeof errors.email?.message === "string" && (
            <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

const LoginPage: NextPage = () => {
  const { isLoading, user, error } = useUser();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from("test").select("*").single();
      setData(data);
    }
    if (user) loadData();
  }, [user]);

  if (!user)
    return (
      <>
        {error && <p>{error.message}</p>}
        {isLoading ? <h1>Loading...</h1> : <h1>Loaded!</h1>}
        <Auth supabaseClient={supabaseClient} />
      </>
    );

  return (
    <>
      <Link href="/api/auth/logout">
        Logout
      </Link>
      {isLoading ? <h1>Loading...</h1> : <h1>Loaded!</h1>}
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <p>client-side data fetching with RLS</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default LoginPage;
