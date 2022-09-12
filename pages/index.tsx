import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const cards = [
  { href: "/sandbox/fee", title: "Fee", description: "Simple fee page." },
  { href: "/sandbox/fi", title: "Fi", description: "Simple fi page." },
  { href: "/sandbox/fee", title: "Fee", description: "Simple fee page." },
  { href: "/sandbox/fi", title: "Fi", description: "Simple fi page." },
  { href: "/sandbox/fee", title: "Fee", description: "Simple fee page." },
  { href: "/sandbox/fi", title: "Fi", description: "Simple fi page." },
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
    <Link href={href}>
      <a className="m-4 p-[1.5rem] border rounded-[10px] max-w-[300px] hover:text-indigo-500 hover:border-indigo-500">
        <h2 className="text-2xl mb-4">{title} &rarr;</h2>
        <p className="text-xl leading-[1.5]">{description}</p>
      </a>
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

      <main className="min-h-screen py-16 flex flex-1 flex-col justify-center items-center">
        <h1 className="leading-[1.15] text-[4rem]">
          Welcome to{" "}
          <a
            className="text-indigo-500 hover:underline"
            href="https://nextjs.org"
          >
            Next.js Sandbox
          </a>
        </h1>
        <div className="flex flex-wrap flex-col md:flex-row justify-center items-center max-w-[800px]">
          {cards.map((props) => (
            <Card key={props.href} {...props} />
          ))}
        </div>
      </main>

      <footer className="flex flex-1 py-8 justify-center items-center border-t">
        <a
          className="flex justify-center items-center flex-grow"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className="h-4 ml-2">
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
