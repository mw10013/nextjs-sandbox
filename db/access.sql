/* @name FindAuthUserCounts */
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

