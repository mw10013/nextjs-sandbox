import { pgPool } from "../../db";
import type { InferGetServerSidePropsType } from "next";
import Layout from "../../components/layout";
import {
  findAlbumsByArtist,
  findTopArtistsByAlbum,
  findTopGenres,
} from "../../db/chinook.queries";

export const getServerSideProps = async () => {
  const genres = await findTopGenres.run({ n: "3" }, pgPool);
  const albums = (
    await findAlbumsByArtist.run({ name: "The Who" }, pgPool)
  ).map((x) => x.album);
  const topArtists = await findTopArtistsByAlbum.run({ n: "4" }, pgPool);

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
