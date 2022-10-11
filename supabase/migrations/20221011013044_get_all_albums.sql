set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_all_albums(artistid bigint, OUT album text, OUT duration interval)
 RETURNS SETOF record
 LANGUAGE sql
AS $function$
select album.title as album,
    sum(milliseconds) * interval '1 ms' as duration
from album
    join artist using(artistid)
    left join track using(albumid)
where artist.artistid = get_all_albums.artistid
group by album
order by album;
$function$
;


