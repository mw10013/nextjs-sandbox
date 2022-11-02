-- Not pgtyped since it does not have .sql extension.
-- For developing schema and seed. Rollsback transaction.
/* Manual reset:
drop schema public cascade;
create schema public;
truncate auth.users cascade;
 */
begin;

drop schema public cascade;

create schema public;

truncate auth.users cascade;

\ir ../supabase/migrations/20221024204916_initial.sql
\ir ../supabase/seed.sql
select email,
    count(distinct access_user_id) as access_user_count,
    count(distinct access_hub.access_hub_id) as access_hub_count,
    count(distinct access_point_id) as access_point_count
from auth.users u
    join access_user on access_user.customer_id = id
    join access_hub on access_hub.customer_id = id
    join access_point on access_hub.access_hub_id = access_point.access_hub_id
group by email
order by email;

-- update
--     access_user
-- set name = 'guest1',
--     code = '111',
--     deleted_at = now()
-- where access_user_id = 1;
insert into access_user (name, code, customer_id)
    values ('master1', '666', 'f47bfe76-134c-4b27-859f-8007451a2522');

select *
from access_user
order by access_user_id;

rollback;

