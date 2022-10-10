import { pgPool } from "../../db";
import type { InferGetServerSidePropsType } from "next";
import Layout from "../../components/layout";
import {
  findAlbumsByArtist,
  findTopArtistsByAlbum,
  findTopGenres,
  getAllAlbums,
  getAllAlbumsByArtist,
} from "../../db/chinook.queries";

export const getServerSideProps = async () => {
  const genres = await findTopGenres.run({ n: "3" }, pgPool);
  const albums = (
    await findAlbumsByArtist.run({ name: "The Who" }, pgPool)
  ).map((x) => x.album);
  const topArtists = await findTopArtistsByAlbum.run({ n: "4" }, pgPool);
  const chiliAlbums = (await getAllAlbums.run({ artistid: "127" }, pgPool)).map(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ duration, ...rest }) => rest
  );
  const chiliAllAlbums = (
    await getAllAlbumsByArtist.run({ name: "Red Hot Chili Peppers" }, pgPool)
  ).map(({ duration, ...rest }) => rest);

  return {
    props: {
      data: {
        chiliAlbums,
        chiliAllAlbums,
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
