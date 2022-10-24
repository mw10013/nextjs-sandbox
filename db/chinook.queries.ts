/** Types generated for queries found in "db/chinook.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'FindTopGenres' parameters type */
export interface IFindTopGenresParams {
  n: string;
}

/** 'FindTopGenres' return type */
export interface IFindTopGenresResult {
  count: string | null;
  name: string | null;
}

/** 'FindTopGenres' query type */
export interface IFindTopGenresQuery {
  params: IFindTopGenresParams;
  result: IFindTopGenresResult;
}

const findTopGenresIR: any = {"usedParamSet":{"n":true},"params":[{"name":"n","required":true,"transform":{"type":"scalar"},"locs":[{"a":150,"b":153}]}],"statement":"select\n    genre.name,\n    count(*) as count\nfrom\n    genre\n    left join track using (genreid)\ngroup by\n    genre.name\norder by\n    count desc\nlimit :n !"};

/**
 * Query generated from SQL:
 * ```
 * select
 *     genre.name,
 *     count(*) as count
 * from
 *     genre
 *     left join track using (genreid)
 * group by
 *     genre.name
 * order by
 *     count desc
 * limit :n !
 * ```
 */
export const findTopGenres = new PreparedQuery<IFindTopGenresParams,IFindTopGenresResult>(findTopGenresIR);


/** 'FindAlbumsByArtist' parameters type */
export interface IFindAlbumsByArtistParams {
  name: string;
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

const findAlbumsByArtistIR: any = {"usedParamSet":{"name":true},"params":[{"name":"name","required":true,"transform":{"type":"scalar"},"locs":[{"a":280,"b":286}]}],"statement":"-- name: list-albums-by-artist\n-- List the album titles and duration of a given artist\nselect\n    album.title as album,\n    sum(milliseconds) * interval '1 ms' as duration\nfrom\n    album\n    join artist using (artistid)\n    left join track using (albumid)\nwhere\n    artist.name = :name !\ngroup by\n    album\norder by\n    album"};

/**
 * Query generated from SQL:
 * ```
 * -- name: list-albums-by-artist
 * -- List the album titles and duration of a given artist
 * select
 *     album.title as album,
 *     sum(milliseconds) * interval '1 ms' as duration
 * from
 *     album
 *     join artist using (artistid)
 *     left join track using (albumid)
 * where
 *     artist.name = :name !
 * group by
 *     album
 * order by
 *     album
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

const findTopArtistsByAlbumIR: any = {"usedParamSet":{"n":true},"params":[{"name":"n","required":true,"transform":{"type":"scalar"},"locs":[{"a":240,"b":243}]}],"statement":"-- name: top-artists-by-album\n-- Get the list of the N artists with the most albums\nselect\n    artist.name,\n    count(*) as albums\nfrom\n    artist\n    left join album using (artistid)\ngroup by\n    artist.name\norder by\n    albums desc\nlimit :n !"};

/**
 * Query generated from SQL:
 * ```
 * -- name: top-artists-by-album
 * -- Get the list of the N artists with the most albums
 * select
 *     artist.name,
 *     count(*) as albums
 * from
 *     artist
 *     left join album using (artistid)
 * group by
 *     artist.name
 * order by
 *     albums desc
 * limit :n !
 * ```
 */
export const findTopArtistsByAlbum = new PreparedQuery<IFindTopArtistsByAlbumParams,IFindTopArtistsByAlbumResult>(findTopArtistsByAlbumIR);


/** 'GetAllAlbums' parameters type */
export interface IGetAllAlbumsParams {
  artistid: string;
}

/** 'GetAllAlbums' return type */
export interface IGetAllAlbumsResult {
  album: string | null;
  duration: string | null;
}

/** 'GetAllAlbums' query type */
export interface IGetAllAlbumsQuery {
  params: IGetAllAlbumsParams;
  result: IGetAllAlbumsResult;
}

const getAllAlbumsIR: any = {"usedParamSet":{"artistid":true},"params":[{"name":"artistid","required":true,"transform":{"type":"scalar"},"locs":[{"a":38,"b":48}]}],"statement":"select\n    *\nfrom\n    get_all_albums (:artistid !)"};

/**
 * Query generated from SQL:
 * ```
 * select
 *     *
 * from
 *     get_all_albums (:artistid !)
 * ```
 */
export const getAllAlbums = new PreparedQuery<IGetAllAlbumsParams,IGetAllAlbumsResult>(getAllAlbumsIR);


/** 'GetAllAlbumsByArtist' parameters type */
export interface IGetAllAlbumsByArtistParams {
  name: string | null | void;
}

/** 'GetAllAlbumsByArtist' return type */
export interface IGetAllAlbumsByArtistResult {
  album: string | null;
  artistid: string;
  duration: string | null;
  name: string | null;
}

/** 'GetAllAlbumsByArtist' query type */
export interface IGetAllAlbumsByArtistQuery {
  params: IGetAllAlbumsByArtistParams;
  result: IGetAllAlbumsByArtistResult;
}

const getAllAlbumsByArtistIR: any = {"usedParamSet":{"name":true},"params":[{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":92,"b":96}]}],"statement":"select\n    *\nfrom\n    artist,\n    lateral get_all_albums (artistid)\nwhere\n    artist.name = :name"};

/**
 * Query generated from SQL:
 * ```
 * select
 *     *
 * from
 *     artist,
 *     lateral get_all_albums (artistid)
 * where
 *     artist.name = :name
 * ```
 */
export const getAllAlbumsByArtist = new PreparedQuery<IGetAllAlbumsByArtistParams,IGetAllAlbumsByArtistResult>(getAllAlbumsByArtistIR);


