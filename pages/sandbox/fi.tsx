import type { NextPage } from "next";
import Link from "next/link";

const Fi: NextPage = () => {
  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-5xl font-bold">Fi</h1>
      <Link href="fee">Fee</Link>
    </div>
  );
};

export default Fi;
