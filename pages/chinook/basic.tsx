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
import { findGenreTopN } from "../../db/genre-topn.queries";
import { findTopNArtistsByAlbum } from "../../db/top-artists-by-album.queries";
import { findInspiredArtists } from "../../db/inspired-artists.queries";

export const getServerSideProps = async () => {
  const inspiredArtists = await findInspiredArtists.run(undefined, pgPool);
  const topNArtistsByAlbum = await findTopNArtistsByAlbum.run(
    { n: "3" },
    pgPool
  );
  const genres = await findTopGenres.run({ n: "2" }, pgPool);
  const genreTopN = await findGenreTopN.run({ n: "2" }, pgPool);
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
  )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ duration, ...rest }) => rest);

  return {
    props: {
      data: {
        inspiredArtists,
        topNArtistsByAlbum,
        genreTopN,
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
