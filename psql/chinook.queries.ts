/** Types generated for queries found in "psql/chinook.psql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'FindGenres' parameters type */
export type IFindGenresParams = void;

/** 'FindGenres' return type */
export interface IFindGenresResult {
  count: string | null;
  name: string | null;
}

/** 'FindGenres' query type */
export interface IFindGenresQuery {
  params: IFindGenresParams;
  result: IFindGenresResult;
}

const findGenresIR: any = {"usedParamSet":{},"params":[],"statement":"select genre.name, count(*) as count\nfrom genre\nleft join track using(genreid)\ngroup by genre.name\norder by count desc"};

/**
 * Query generated from SQL:
 * ```
 * select genre.name, count(*) as count
 * from genre
 * left join track using(genreid)
 * group by genre.name
 * order by count desc
 * ```
 */
export const findGenres = new PreparedQuery<IFindGenresParams,IFindGenresResult>(findGenresIR);


/** 'FindAlbumsByArtist' parameters type */
export interface IFindAlbumsByArtistParams {
  name: string | null | void;
}

/** 'FindAlbumsByArtist' return type */
export interface IFindAlbumsByArtistResult {
  album: string | null;
  duration: string | null;
}

/** 'FindAlbumsByArtist' query type */
export interface IFindAlbumsByArtistQuery {
  params: IFindAlbumsByArtistParams;
  result: IFindAlbumsByArtistResult;
}

const findAlbumsByArtistIR: any = {"usedParamSet":{"name":true},"params":[{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":254,"b":258}]}],"statement":"-- name: list-albums-by-artist\n-- List the album titles and duration of a given artist\nselect album.title as album,\nsum(milliseconds) * interval '1 ms' as duration\nfrom album\njoin artist using(artistid)\nleft join track using(albumid)\nwhere artist.name = :name\ngroup by album\norder by album"};

/**
 * Query generated from SQL:
 * ```
 * -- name: list-albums-by-artist
 * -- List the album titles and duration of a given artist
 * select album.title as album,
 * sum(milliseconds) * interval '1 ms' as duration
 * from album
 * join artist using(artistid)
 * left join track using(albumid)
 * where artist.name = :name
 * group by album
 * order by album
 * ```
 */
export const findAlbumsByArtist = new PreparedQuery<IFindAlbumsByArtistParams,IFindAlbumsByArtistResult>(findAlbumsByArtistIR);


/** 'FindTopArtistsByAlbum' parameters type */
export interface IFindTopArtistsByAlbumParams {
  n: string;
}

/** 'FindTopArtistsByAlbum' return type */
export interface IFindTopArtistsByAlbumResult {
  albums: string | null;
  name: string | null;
}

/** 'FindTopArtistsByAlbum' query type */
export interface IFindTopArtistsByAlbumQuery {
  params: IFindTopArtistsByAlbumParams;
  result: IFindTopArtistsByAlbumResult;
}

const findTopArtistsByAlbumIR: any = {"usedParamSet":{"n":true},"params":[{"name":"n","required":true,"transform":{"type":"scalar"},"locs":[{"a":215,"b":217}]}],"statement":"-- name: top-artists-by-album\n-- Get the list of the N artists with the most albums\nselect artist.name, count(*) as albums\nfrom artist\nleft join album using(artistid)\ngroup by artist.name\norder by albums desc\nlimit :n!"};

/**
 * Query generated from SQL:
 * ```
 * -- name: top-artists-by-album
 * -- Get the list of the N artists with the most albums
 * select artist.name, count(*) as albums
 * from artist
 * left join album using(artistid)
 * group by artist.name
 * order by albums desc
 * limit :n!
 * ```
 */
export const findTopArtistsByAlbum = new PreparedQuery<IFindTopArtistsByAlbumParams,IFindTopArtistsByAlbumResult>(findTopArtistsByAlbumIR);


