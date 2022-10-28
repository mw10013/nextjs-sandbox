/* @name GetAccessPoint */
-- \set access_point_id 14
-- \set access_hub_id 4
-- \set auth_user_id '\'733e54ae-c9dc-4b9a-94d0-764fbd1bd76e\''
select access_point.*
from access_point
    join access_hub using (access_hub_id)
    join auth.users u on u.id = auth_user_id
where access_point_id = :access_point_id
    and access_hub_id = :access_hub_id
    and auth_user_id = :auth_user_id;

