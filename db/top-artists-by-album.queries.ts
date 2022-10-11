/** Types generated for queries found in "db/top-artists-by-album.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'FindTopNArtistsByAlbum' parameters type */
export interface IFindTopNArtistsByAlbumParams {
  n: string | null | void;
}

/** 'FindTopNArtistsByAlbum' return type */
export interface IFindTopNArtistsByAlbumResult {
  albums: string | null;
  artistid: string;
  name: string | null;
}

/** 'FindTopNArtistsByAlbum' query type */
export interface IFindTopNArtistsByAlbumQuery {
  params: IFindTopNArtistsByAlbumParams;
  result: IFindTopNArtistsByAlbumResult;
}

const findTopNArtistsByAlbumIR: any = {"usedParamSet":{"n":true},"params":[{"name":"n","required":false,"transform":{"type":"scalar"},"locs":[{"a":236,"b":237}]}],"statement":"-- name: top-artists-by-album\n-- Get the list of the N artists with the most albums\nselect artist.name, artist.artistid, count(*) as albums\nfrom artist\nleft join album using(artistid)\ngroup by artist.artistid\norder by albums desc\nlimit :n"};

/**
 * Query generated from SQL:
 * ```
 * -- name: top-artists-by-album
 * -- Get the list of the N artists with the most albums
 * select artist.name, artist.artistid, count(*) as albums
 * from artist
 * left join album using(artistid)
 * group by artist.artistid
 * order by albums desc
 * limit :n
 * ```
 */
export const findTopNArtistsByAlbum = new PreparedQuery<IFindTopNArtistsByAlbumParams,IFindTopNArtistsByAlbumResult>(findTopNArtistsByAlbumIR);


