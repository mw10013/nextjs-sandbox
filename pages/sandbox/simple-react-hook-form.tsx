import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};

export default function SimpleReactHookForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  //   const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const onSubmit: SubmitHandler<Inputs> = (data) => alert(JSON.stringify(data));

  console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <div className="mx-auto max-w-sm pt-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Simple React Hook Form
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Based on{" "}
            <a
              className="text-indigo-600 hover:text-indigo-900"
              href="https://react-hook-form.com/get-started#Quickstart"
            >
              quick start
            </a>{" "}
            example.
          </p>
        </div>
        <div className="mt-6">
          <label
            htmlFor="example"
            className="block text-sm font-medium text-gray-700"
          >
            Example
          </label>
          <input
            type="text"
            {...register("example")}
            defaultValue="test"
            className="mt-1 block rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          <label
            htmlFor="exampleRequired"
            className="mt-6 block text-sm font-medium text-gray-700"
          >
            ExampleRequired
          </label>
          <input
            type="text"
            {...register("exampleRequired", { required: true, maxLength: 10 })}
            className="mt-1 block rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.exampleRequired && (
            <p className="mt-2 text-sm text-red-600">This field is required</p>
          )}
          <button
            type="submit"
            className="mt-6 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
