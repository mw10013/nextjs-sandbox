/* @name GetAccessHubs */
-- \set authUserId '\'733e54ae-c9dc-4b9a-94d0-764fbd1bd76e\''
select access_hub.*
from access_hub
    join auth.users on id = auth_user_id
where auth_user_id = :authUserId
order by name;

