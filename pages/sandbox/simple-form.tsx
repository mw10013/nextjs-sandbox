import { FormEvent } from "react";

export default function SimpleForm() {
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const data = {
      first: form.first.value as string,
      last: form.last.value as string,
    };

    // const response = await fetch("/api/form", {
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "POST",
    // });

    // const result = await response.json();
    // alert(`Is this your full name: ${result.data}`);

    fetch("/api/simple-form", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        alert(`data: ${JSON.stringify(data, null, 2)}`);
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
  };
  return (
    <div className="mx-auto max-w-sm pt-8">
      <form onSubmit={handleSubmit}>
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Simple Form
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Based on{" "}
            <a
              className="text-indigo-600 hover:text-indigo-900"
              href="https://github.com/vercel/next.js/tree/canary/examples/next-forms"
            >
              next-forms
            </a>{" "}
            example.
          </p>
        </div>
        <div className="mt-6">
          <label
            htmlFor="first"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            id="first"
            name="first"
            required
            className="mt-1 block rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          <label
            htmlFor="last"
            className="mt-6 block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            id="last"
            name="last"
            required
            className="mt-1 block rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
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
