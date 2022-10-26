-- Not pgtyped since it does not have .sql extension.
begin;

create function add (int, int)
    returns int return $1 + $2;

select add (1,
        2);

create function test1_add_stuff (int, int, int, int)
    returns int return add (
        add ($1, $2), add ($3, $4)
);

select test1_add_stuff (1, 2, 3, 4);

create or replace function asterisks (n int)
    returns setof text
    language sql
    immutable strict PARALLEL SAFE
begin
    ATOMIC
    select repeat('*', g)
    from generate_series(1, n) g;

end;

select *
from asterisks (5);

create or replace function get_access_hub ()
    returns table (
        access_hub_id access_hub.access_hub_id%type)
begin
    atomic
    select access_hub_id
    from access_hub;

    end;

select *
from get_access_hub ();

rollback;

