import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
  age: z.number().min(10),
});

type Schema = z.infer<typeof schema>;

export default function SimpleZodForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    // resolver: zodResolver(schema)
    resolver: async (data, context, options) => {
      console.log("formData", data);
      console.log(
        "validation result",
        await zodResolver(schema)(data, context, options)
      );
      return zodResolver(schema)(data, context, options);
    },
  });

  return (
    <div className="mx-auto max-w-sm pt-8">
      <form onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}>
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Simple Zod Form
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Based on{" "}
            <a
              className="text-indigo-600 hover:text-indigo-900"
              href="https://github.com/react-hook-form/resolvers#quickstart"
            >
              zod validation example
            </a>{" "}
          </p>
        </div>
        <div className="mt-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            className="mt-1 block rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          {typeof errors.name?.message === "string" && (
            <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
          )}
          <label
            htmlFor="age"
            className="mt-6 block text-sm font-medium text-gray-700"
          >
            Age
          </label>
          <input
            type="number"
            {...register("age", { valueAsNumber: true })}
            className="mt-1 block rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          {typeof errors.age?.message === "string" && (
            <p className="mt-2 text-sm text-red-600">{errors.age.message}</p>
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
