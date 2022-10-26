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

rollback;

