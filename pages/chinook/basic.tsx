import { Client } from "pg";
import type { InferGetServerSidePropsType } from "next";
import Layout from "../../components/layout";
import { findGenres } from "../../psql/chinook.queries";

const connectionString =
  "postgresql://postgres:postgres@localhost:54322/chinook";

export const getServerSideProps = async () => {
  const client = new Client({
    connectionString,
  });
  await client.connect();
  const genres = await findGenres.run(undefined, client);
  await client.end();

  return {
    props: {
      data: {
        genres,
      },
    },
  };
};

const BasicChinook = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      <h1 className="text-5xl font-bold">Basic Chinook</h1>
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </Layout>
  );
};

export default BasicChinook;
