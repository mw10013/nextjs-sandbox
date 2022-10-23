import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabaseClient } from "../../utils/supabaseClient";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

const authSchema = z.object({
  email: z.string().min(1, { message: "Required" }).email(),
});

type AuthSchema = z.infer<typeof authSchema>;

function Auth() {
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
          const { error } = await supabaseClient.auth.signInWithOtp({
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
              href="https://supabase.com/docs/guides/with-nextjs#set-up-a-login-component"
            >
              supabase nextjs quickstart
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

const accountSchema = z.object({
  username: z.string().min(1, { message: "Required" }),
});

type AccountSchema = z.infer<typeof accountSchema>;

function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccountSchema>({ resolver: zodResolver(accountSchema) });

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getCurrentUser() {
    const {
      data: { session },
      error,
    } = await supabaseClient.auth.getSession();

    if (error) {
      throw error;
    }

    if (!session?.user) {
      throw new Error("User not logged in");
    }

    return session.user;
  }

  async function getProfile() {
    try {
      setLoading(true);
      const user = await getCurrentUser();

      const { data, error, status } = await supabaseClient
        .from("profiles")
        .select(`username`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data?.username) {
        setUsername(data.username);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username }: { username: string }) {
    try {
      setLoading(true);
      const user = await getCurrentUser();

      const updates = {
        id: user.id,
        username,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabaseClient.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm pt-8">
      <form
        onSubmit={handleSubmit(async ({ username }) => {
          // alert(`username: ${username}`);
          updateProfile({ username });
        })}
      >
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        {/* <input id="email" type="text" value={session.user.email} disabled /> */}
        <input
          type="text"
          id="email"
          defaultValue={session.user.email}
          disabled
          className="mt-1 block rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        />

        <label
          htmlFor="username"
          className="mt-6 block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          {...register("username")}
          defaultValue={username}
          className="mt-1 block rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        />
        {typeof errors.username?.message === "string" && (
          <p className="mt-2 text-sm text-red-600">{errors.username.message}</p>
        )}

        <div className="flex justify-between">
          <button
            type="button"
            className="mt-6 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            onClick={() => supabaseClient.auth.signOut()}
          >
            Sign Out
          </button>
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

export default function Home() {
  //   const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();

      // only update the react state if the component is still mounted
      if (mounted) {
        if (session) {
          setSession(session);
        }

        // setIsLoading(false);
      }
    }

    getInitialSession();

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      mounted = false;

      subscription?.unsubscribe();
    };
  }, []);

  return (
    <div>
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  );
}
