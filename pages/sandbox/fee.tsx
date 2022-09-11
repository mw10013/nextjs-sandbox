import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/layout";

const Fee: NextPage = () => {
  return (
    <Layout>
      <h1 className="text-5xl font-bold">Fee</h1>
      <Link href="fi">Fi</Link>
    </Layout>
  );
};

export default Fee;
