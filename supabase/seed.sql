SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

insert into app_user (email, role)
    values ('appuser1@access.com', 'customer'), ('appuser2@access.com', 'customer'), ('admin@access.com', 'admin');

insert into access_hub (name, description, app_user_id)
select 'Hub ' || hub_index,
    'This is hub ' || hub_index,
    app_user_id
from app_user,
    generate_series(1, 2) as t (hub_index)
where role = 'customer'
order by app_user_id;

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