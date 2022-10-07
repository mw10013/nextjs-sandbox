import { Client } from "pg";
import type { InferGetServerSidePropsType } from "next";
import Layout from "../../components/layout";
import {
  findAlbumsByArtist,
  findTopArtistsByAlbum,
  findTopGenres,
} from "../../psql/chinook.queries";

const connectionString =
  "postgresql://postgres:postgres@localhost:54322/chinook";

export const getServerSideProps = async () => {
  const client = new Client({
    connectionString,
  });
  await client.connect();

  const genres = await findTopGenres.run({ n: "3" }, client);
  const albums = (
    await findAlbumsByArtist.run({ name: "The Who" }, client)
  ).map((x) => x.album);
  const topArtists = await findTopArtistsByAlbum.run({ n: "4" }, client);

  await client.end();

  return {
    props: {
      data: {
        genres,
        albums,
        topArtists,
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
