-- create or replace function get_access_hub ()
--     returns setof int return select access_hub_id from access_hub;
create or replace function get_access_hub ()
    returns table(access_hub_id access_hub.access_hub_id%type) return select access_hub_id from access_hub;

select *
from get_access_hub ();

