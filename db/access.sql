/* @name FindAppUserCounts */
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

