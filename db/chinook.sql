/* @name FindTopGenres */
select
    genre.name,
    count(*) as count
from
    genre
    left join track using (genreid)
group by
    genre.name
order by
    count desc
limit :n !;


/* @name FindAlbumsByArtist */
-- name: list-albums-by-artist
-- List the album titles and duration of a given artist
select
    album.title as album,
    sum(milliseconds) * interval '1 ms' as duration
from
    album
    join artist using (artistid)
    left join track using (albumid)
where
    artist.name = :name !
group by
    album
order by
    album;


/* @name FindTopArtistsByAlbum */
-- name: top-artists-by-album
-- Get the list of the N artists with the most albums
select
    artist.name,
    count(*) as albums
from
    artist
    left join album using (artistid)
group by
    artist.name
order by
    albums desc
limit :n !;


/* @name GetAllAlbums */
select
    *
from
    get_all_albums (:artistid !);


/* @name GetAllAlbumsByArtist */
select
    *
from
    artist,
    lateral get_all_albums (artistid)
where
    artist.name = :name;

