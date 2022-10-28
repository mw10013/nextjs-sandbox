/* @name GetAccessHub */
-- \set access_hub_id 4
-- \set auth_user_id '\'733e54ae-c9dc-4b9a-94d0-764fbd1bd76e\''
select access_hub.*
from access_hub
    join auth.users on id = auth_user_id
where access_hub_id = :access_hub_id
    and auth_user_id = :auth_user_id;

