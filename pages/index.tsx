import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const cards = [
  {
    href: "/sandbox/users",
    title: "Users",
    description: "Display supabase users.",
  },
  {
    href: "/sandbox/auth-helpers-login-form",
    title: "Auth Helpers Login Form",
    description: "Uses auth-helpers",
  },
  {
    href: "/middleware-protected",
    title: "Middleware Protected",
    description: "Uses auth-helpers",
  },
  { href: "/sandbox/fee", title: "Fee", description: "Simple fee page." },
  { href: "/sandbox/fi", title: "Fi", description: "Simple fi page." },
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
  {
    href: "/sandbox/simple-magic-login-form",
    title: "Simple Magic Login Form",
    description: "Simple magic login form.",
  },
  {
    href: "/sandbox/supabase-auth-quickstart",
    title: "Supabase Auth Quickstart",
    description: "Supabase auth quickstart.",
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
    <Link href={href}className="m-4 max-w-[300px] rounded-[10px] border p-[1.5rem] hover:border-indigo-500 hover:text-indigo-500">
        <h2 className="mb-4 text-2xl">{title} &rarr;</h2>
        <p className="text-xl leading-[1.5]">{description}</p>
    </Link>
  );
}

const Home: NextPage = () => {
  return (
    <div className="px-8">
      <Head>
        <title>nextjs-sandbox</title>
        <meta name="description" content="Sandbox for learning nextjs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
};

export default Home;
