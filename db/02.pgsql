select access_user_id,
    access_user.name,
    access_hub_id,
    access_point_id,
    access_point.name
from access_point_to_access_user
    join access_user using (access_user_id)
    join access_point using (access_point_id)
    join access_hub using (access_hub_id)
order by access_user_id,
    access_hub_id,
    access_point_id
limit 8;

with times as (
    select i,
        current_timestamp - i * interval '15 min' as at,
        (i - 1) % (
            select count(*)
            from access_user) + 1 as access_user_id
        from generate_series(1, 75) as t (i)),
    series as (
        select at,
            i,
            access_user_id,
            array_agg(access_point_id) as access_point_ids
        from times
            join access_user using (access_user_id)
            join access_point_to_access_user using (access_user_id)
            join access_point using (access_point_id)
        group by at, i, access_user_id
        order by i)
    insert into access_event (at, access, code, access_user_id, access_point_id)
    select at,
        'grant' as access,
        code,
        access_user_id,
        access_point_ids[ceil(random() * array_length(access_point_ids, 1))] as access_point_id
from series
    join access_user using (access_user_id)
order by at;

insert into access_event (at, access, code, access_point_id)
select current_timestamp - i * interval '41 min' as at,
    'deny',
    '666',
    (i - 1) % (
        select count(*)
        from access_point) + 1 as access_point_id
from generate_series(1, 25) as t (i);

select access_event_id,
    at,
    access,
    access_event.code,
    access_user_id,
    access_user.name,
    access_point_id,
    access_point.name
from access_event
    left join access_user using (access_user_id)
    join access_point using (access_point_id)
order by at desc
limit 8;

select ah.access_hub_id,
    ah.name,
    ah.description,
    ap.access_point_id,
    ap.name,
    ap.position,
    au.access_user_id,
    au.name,
    au.code
from access_hub ah
    join access_point ap using (access_hub_id)
    join access_point_to_access_user using (access_point_id)
    join access_user au using (access_user_id)
where ah.app_user_id = 1
order by ah.access_hub_id,
    ap.position,
    au.name
limit 8;

select ah.access_hub_id,
    ah.name,
    ah.description,
    ap.access_point_id,
    ap.name,
    ap.position,
    array_agg(au.access_user_id order by au.name) as access_user_ids
from access_hub ah
    join access_point ap using (access_hub_id)
    join access_point_to_access_user using (access_point_id)
    join access_user au using (access_user_id)
where ah.app_user_id = 1
group by ah.access_hub_id,
    ap.access_point_id
order by ah.access_hub_id,
    ap.position
limit 8;

select ah.access_hub_id,
    ah.name,
    ah.description,
    array_agg(ap.access_point_id order by ap.position) as access_point_ids
from access_hub ah
    join access_point ap using (access_hub_id)
where ah.app_user_id = 1
group by ah.access_hub_id;