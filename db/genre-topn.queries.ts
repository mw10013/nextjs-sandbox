/** Types generated for queries found in "db/genre-topn.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'FindGenreTopN' parameters type */
export interface IFindGenreTopNParams {
  n: string | null | void;
}

/** 'FindGenreTopN' return type */
export interface IFindGenreTopNResult {
  artist: string | null;
  count: string | null;
  genre: string | null;
  track: string | null;
}

/** 'FindGenreTopN' query type */
export interface IFindGenreTopNQuery {
  params: IFindGenreTopNParams;
  result: IFindGenreTopNResult;
}

const findGenreTopNIR: any = {"usedParamSet":{"n":true},"params":[{"name":"n","required":false,"transform":{"type":"scalar"},"locs":[{"a":571,"b":572}]}],"statement":"-- name: genre-top-n\n-- Get the N top tracks by genre\nselect genre.name as genre,\n    case when length(ss.name) > 15 then\n        substring(ss.name from 1 for 15) || '...'\n    else\n        ss.name\n    end as track,\n    ss.count as count,\n    artist.name as artist\nfrom genre\n    left join lateral (\n        select track.name,\n            track.albumid,\n            count(playlistid)\n        from track\n            left join playlisttrack using (trackid)\n        where track.genreid = genre.genreid\n        group by track.trackid\n        order by count desc\n        limit :n) as ss (name,\n        albumid,\n        count) on true\n    join album using (albumid)\n    join artist using (artistid)\norder by genre.name,\n    ss.count desc"};

/**
 * Query generated from SQL:
 * ```
 * -- name: genre-top-n
 * -- Get the N top tracks by genre
 * select genre.name as genre,
 *     case when length(ss.name) > 15 then
 *         substring(ss.name from 1 for 15) || '...'
 *     else
 *         ss.name
 *     end as track,
 *     ss.count as count,
 *     artist.name as artist
 * from genre
 *     left join lateral (
 *         select track.name,
 *             track.albumid,
 *             count(playlistid)
 *         from track
 *             left join playlisttrack using (trackid)
 *         where track.genreid = genre.genreid
 *         group by track.trackid
 *         order by count desc
 *         limit :n) as ss (name,
 *         albumid,
 *         count) on true
 *     join album using (albumid)
 *     join artist using (artistid)
 * order by genre.name,
 *     ss.count desc
 * ```
 */
export const findGenreTopN = new PreparedQuery<IFindGenreTopNParams,IFindGenreTopNResult>(findGenreTopNIR);


