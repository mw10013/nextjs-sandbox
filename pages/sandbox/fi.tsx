import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/layout";

const Fi: NextPage = () => {
  return (
    <Layout>
      <h1 className="text-5xl font-bold">Fi</h1>
      <Link href="fee">Fee</Link>
    </Layout>
  );
};

export default Fi;
