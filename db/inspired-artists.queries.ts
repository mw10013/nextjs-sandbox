/** Types generated for queries found in "db/inspired-artists.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'FindInspiredArtists' parameters type */
export type IFindInspiredArtistsParams = void;

/** 'FindInspiredArtists' return type */
export interface IFindInspiredArtistsResult {
  album: string | null;
  artist: string | null;
  inspired: string | null;
  track: string | null;
}

/** 'FindInspiredArtists' query type */
export interface IFindInspiredArtistsQuery {
  params: IFindInspiredArtistsParams;
  result: IFindInspiredArtistsResult;
}

const findInspiredArtistsIR: any = {"usedParamSet":{},"params":[],"statement":"-- artists names used as track names by other artists\nselect artist.name as artist,\n-- \"inspired\" is the other artist\ninspired.name as inspired,\nalbum.title as album,\ntrack.name as track\nfrom artist\n                                                                                                                                                                                                                                                        \njoin track\non track.name = artist.name\njoin album\non album.albumid = track.albumid\njoin artist inspired\non inspired.artistid = album.artistid\nwhere artist.artistid <> inspired.artistid"};

/**
 * Query generated from SQL:
 * ```
 * -- artists names used as track names by other artists
 * select artist.name as artist,
 * -- "inspired" is the other artist
 * inspired.name as inspired,
 * album.title as album,
 * track.name as track
 * from artist
 *                                                                                                                                                                                                                                                         
 * join track
 * on track.name = artist.name
 * join album
 * on album.albumid = track.albumid
 * join artist inspired
 * on inspired.artistid = album.artistid
 * where artist.artistid <> inspired.artistid
 * ```
 */
export const findInspiredArtists = new PreparedQuery<IFindInspiredArtistsParams,IFindInspiredArtistsResult>(findInspiredArtistsIR);


