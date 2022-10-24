-- Not pgtyped since it does not have .sql extension.
begin;

create table app_user (
    app_user_id serial primary key,
    email text not null unique check (email <> ''),
    role text not null check (role = 'customer' or role = 'admin'),
    created_at timestamptz default now() not null
);

-- deleted_at?
create table access_user (
    access_user_id serial primary key,
    name text not null check (name <> ''),
    description text default ''::text not null,
    code text not null check (code <> ''),
    activate_code_at timestamptz,
    expire_code_at timestamptz,
    app_user_id integer not null references app_user on delete cascade,
    unique (app_user_id, name),
    unique (app_user_id, code)
);

create index on access_user (app_user_id);

-- create schema if not exists access;
create table access_hub (
    access_hub_id serial primary key,
    name text default 'Hub' ::text not null check (name <> ''),
    description text default ''::text not null,
    heartbeat_at timestamptz,
    -- unique with no default?
    api_token text default ''::text not null,
    app_user_id integer not null references app_user on delete cascade
);

create index on access_hub (app_user_id);

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

commit;

