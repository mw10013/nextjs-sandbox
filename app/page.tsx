import Link from "next/link";
import Image from "next/image";

const cards = [
  {
    href: "/db-sandbox",
    title: "DB sandbox",
    description: "Sandbox for db.",
  },
  {
    href: "/supabase-sandbox",
    title: "Supabase sandbox",
    description: "Sandbox for supabase.",
  },
  {
    href: "/access",
    title: "Access",
    description: "Access area",
  },
  {
    href: "/admin",
    title: "Admin",
    description: "Admin area",
  },
  {
    href: "/sandbox/simple-form",
    title: "Simple Form",
    description: "Simple form.",
  },
  {
    href: "/sandbox/simple-react-hook-form",
    title: "Simple React Hook Form",
    description: "Simple react hook form.",
  },
  {
    href: "/sandbox/simple-zod-form",
    title: "Simple Zod Form",
    description: "Simple zod form.",
  },
  {
    href: "/sandbox/simple-react-query-form",
    title: "Simple React Query Form",
    description: "Simple react query form.",
  },
];

function Card({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="m-4 max-w-[300px] rounded-[10px] border p-[1.5rem] hover:border-indigo-500 hover:text-indigo-500"
    >
      <h2 className="mb-4 text-2xl">{title} &rarr;</h2>
      <p className="text-xl leading-[1.5]">{description}</p>
    </Link>
  );
}

export default async function Page() {
  return (
    <div className="px-8">
      <main className="flex min-h-screen flex-1 flex-col items-center justify-center py-16">
        <h1 className="text-[4rem] leading-[1.15]">
          Welcome to{" "}
          <a
            className="text-indigo-500 hover:underline"
            href="https://nextjs.org"
          >
            Next.js Sandbox
          </a>
        </h1>

        <div className="flex max-w-[800px] flex-col flex-wrap items-center justify-center md:flex-row">
          {cards.map((props) => (
            <Card key={props.href} {...props} />
          ))}
        </div>
      </main>

      <footer className="flex flex-1 items-center justify-center border-t py-8">
        <a
          className="flex flex-grow items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className="ml-2 h-4">
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
