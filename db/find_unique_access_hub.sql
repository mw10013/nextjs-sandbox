/* @name FindUniqueAccessHub */
select ah.access_hub_id,
    ah.name,
    ah.description,
    ap.access_point_id,
    ap.name as access_point_name,
    ap.position,
    au.access_user_id,
    au.name as access_user_name,
    au.code
from access_hub ah
    join access_point ap using (access_hub_id)
    join access_point_to_access_user using (access_point_id)
    join access_user au using (access_user_id)
where ah.access_hub_id = :access_hub_id
order by ah.access_hub_id,
    ap.position,
    au.name;
