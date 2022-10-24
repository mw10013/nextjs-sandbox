-- Not pgtyped since it does not have .sql extension.
begin;


/*
create table app_user (
 app_user_id serial primary key,
 email text not null unique check (email <> ''),
 role text not null check (role = 'customer' or role = 'admin'),
 created_at timestamptz default now() not null
);
 */
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


/*
create index on access_user (app_user_id);
 */
-- create schema if not exists access;
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


/*
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

insert into app_user (email, role)
 values ('appuser1@access.com', 'customer'), ('appuser2@access.com', 'customer'), ('admin@access.com', 'admin');
 */
select id,
    email,
    raw_user_meta_data
from auth.users
where raw_user_meta_data @> '{"appRole": "customer"}'::jsonb
order by email;

insert into access_hub (name, description, auth_user_id)
select 'Hub ' || hub_index,
    'This is hub ' || hub_index,
    id
from auth.users,
    generate_series(1, 2) as t (hub_index)
where raw_user_meta_data @> '{"appRole": "customer"}'::jsonb
order by email;

select access_hub.*, email
from access_hub
join auth.users on auth_user_id = id;


/*

insert into access_point (name, position, access_hub_id)
select 'Point ' || position,
 position,
 access_hub_id
from access_hub,
 generate_series(1, 4) as t (position)
order by access_hub_id;

insert into access_user (name, code, app_user_id)
select name,
 code,
 app_user_id
from app_user,
 (
 values ('master', '999'),
 ('guest1', '111'),
 ('guest2', '222')) t (name, code)
where role = 'customer'
order by app_user_id;

insert into access_point_to_access_user (access_point_id, access_user_id)
select access_point_id,
 access_user_id
from access_user
 join access_hub using (app_user_id)
 join access_point using (access_hub_id)
where (access_user.name = 'master')
 or (access_user.name = 'guest1'
 and access_hub.name = 'Hub 1')
 or (access_user.name = 'guest2'
 and access_hub.name = 'Hub 2');

select app_user_id,
 app_user.email,
 count(distinct access_user_id) as access_user_count,
 count(distinct access_hub.access_hub_id) as access_hub_count,
 count(distinct access_point_id) as access_point_count
from app_user
 join access_user using (app_user_id)
 join access_hub using (app_user_id)
 join access_point on access_hub.access_hub_id = access_point.access_hub_id
group by app_user_id
order by app_user_id;
 */
rollback;

