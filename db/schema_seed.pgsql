-- Not pgtyped since it does not have .sql extension.
-- For developing schema and seed. Rollsback transaction.
begin;

-- deleted_at?
create table access_user (
    access_user_id serial primary key,
    name text not null check (name <> ''),
    description text default ''::text not null,
    code text not null check (code <> ''),
    activate_code_at timestamptz,
    expire_code_at timestamptz,
    auth_user_id uuid not null references auth.users on delete cascade,
    unique (auth_user_id, name),
    unique (auth_user_id, code)
);

create index on access_user (auth_user_id);

create table access_hub (
    access_hub_id serial primary key,
    name text default 'Hub' ::text not null check (name <> ''),
    description text default ''::text not null,
    heartbeat_at timestamptz,
    -- unique with no default?
    api_token text default ''::text not null,
    auth_user_id uuid not null references auth.users on delete cascade
);

create index on access_hub (auth_user_id);

create table access_point (
    access_point_id serial primary key,
    name text not null check (name <> ''),
    description text default ''::text not null,
    position integer not null check (position > 0),
    access_hub_id integer not null references access_hub on delete cascade,
    unique (access_hub_id, position)
);

create index on access_point (access_hub_id);

create table access_point_to_access_user (
    access_point_id integer not null references access_point on delete cascade,
    access_user_id integer not null references access_user on delete cascade,
    unique (access_point_id, access_user_id)
);

create index on access_point_to_access_user (access_point_id);

create index on access_point_to_access_user (access_user_id);

create table access_event (
    access_event_id serial primary key,
    at timestamptz not null,
    access text not null check (access = 'grant' or access = 'deny'),
    code text not null,
    access_user_id integer references access_user (access_user_id) on delete cascade,
    access_point_id integer not null references access_point (access_point_id) on delete cascade
);

create index on access_event (access_user_id);

create index on access_event (access_point_id);

insert into access_hub (name, description, auth_user_id)
select 'Hub ' || hub_index,
    'This is hub ' || hub_index,
    id
from auth.users,
    generate_series(1, 2) as t (hub_index)
where raw_user_meta_data @> '{"appRole": "customer"}'::jsonb
order by email;

insert into access_point (name, position, access_hub_id)
select 'Point ' || position,
    position,
    access_hub_id
from access_hub,
    generate_series(1, 4) as t (position)
order by access_hub_id;

insert into access_user (name, code, auth_user_id)
select name,
    code,
    id
from auth.users,
    (
        values ('master', '999'),
            ('guest1', '111'),
            ('guest2', '222')) t (name, code)
where raw_user_meta_data @> '{"appRole": "customer"}'::jsonb
order by email;

insert into access_point_to_access_user (access_point_id, access_user_id)
select access_point_id,
    access_user_id
from access_user
    join access_hub using (auth_user_id)
    join access_point using (access_hub_id)
where (access_user.name = 'master')
    or (access_user.name = 'guest1'
        and access_hub.name = 'Hub 1')
    or (access_user.name = 'guest2'
        and access_hub.name = 'Hub 2');

with times as (
    select i,
        current_timestamp - i * interval '15 min' as at,
        (i - 1) % (
            select count(*)
            from access_user) + 1 as access_user_id
        from generate_series(1, 75) as t (i)),
    series as (
        select at,
            i,
            access_user_id,
            array_agg(access_point_id) as access_point_ids
        from times
            join access_user using (access_user_id)
            join access_point_to_access_user using (access_user_id)
            join access_point using (access_point_id)
        group by at, i, access_user_id
        order by i)
    insert into access_event (at, access, code, access_user_id, access_point_id)
    select at,
        'grant' as access,
        code,
        access_user_id,
        access_point_ids[ceil(random() * array_length(access_point_ids, 1))] as access_point_id
from series
    join access_user using (access_user_id)
order by at;

insert into access_event (at, access, code, access_point_id)
select current_timestamp - i * interval '41 min' as at,
    'deny',
    '666',
    (i - 1) % (
        select count(*)
        from access_point) + 1 as access_point_id
from generate_series(1, 25) as t (i);

select ah.access_hub_id,
    ah.name,
    ah.auth_user_id,
    email email
from access_hub ah
    join auth.users on auth_user_id = id;

select ah.access_hub_id,
    ah.name,
    u.email,
    ap.access_point_id,
    ap.name,
    ap.position
from access_hub ah
    join auth.users u on auth_user_id = id
    join access_point ap using (access_hub_id)
order by ah.access_hub_id,
    ap.access_point_id,
    ap.position
limit 8;

select au.access_user_id,
    au.name,
    au.code,
    email
from access_user au
    join auth.users u on u.id = au.auth_user_id;

select email,
    count(distinct access_user_id) as access_user_count,
    count(distinct access_hub.access_hub_id) as access_hub_count,
    count(distinct access_point_id) as access_point_count
from auth.users u
    join access_user on access_user.auth_user_id = id
    join access_hub on access_hub.auth_user_id = id
    join access_point on access_hub.access_hub_id = access_point.access_hub_id
group by email
order by email;

select access_event_id,
    at,
    access,
    access_event.code,
    access_user_id,
    access_user.name,
    access_point_id,
    access_point.name
from access_event
    left join access_user using (access_user_id)
    join access_point using (access_point_id)
order by at desc
limit 8;

rollback;

