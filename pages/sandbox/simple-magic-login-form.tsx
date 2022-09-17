import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "../../utils/supabaseClient";

const schema = z.object({
  email: z.string().min(1, { message: "Required" }).email(),
});

type Schema = z.infer<typeof schema>;

export default function SimpleMagicLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="mx-auto max-w-sm pt-8">
      <form
        onSubmit={handleSubmit(async ({ email }) => {
          const { error } = await supabase.auth.signInWithOtp({
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
            <p className="mt-2 text-sm text-red-600">{errors.email?.message}</p>
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
