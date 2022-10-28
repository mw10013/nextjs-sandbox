/** Types generated for queries found in "db/get_access_point.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetAccessPoint' parameters type */
export interface IGetAccessPointParams {
  accessHubId: number | null | void;
  accessPointId: number | null | void;
  authUserId: string | null | void;
}

/** 'GetAccessPoint' return type */
export interface IGetAccessPointResult {
  accessHubId: number;
  accessPointId: number;
  name: string;
  position: number;
}

/** 'GetAccessPoint' query type */
export interface IGetAccessPointQuery {
  params: IGetAccessPointParams;
  result: IGetAccessPointResult;
}

const getAccessPointIR: any = {"usedParamSet":{"accessPointId":true,"accessHubId":true,"authUserId":true},"params":[{"name":"accessPointId","required":false,"transform":{"type":"scalar"},"locs":[{"a":381,"b":394}]},{"name":"accessHubId","required":false,"transform":{"type":"scalar"},"locs":[{"a":420,"b":431}]},{"name":"authUserId","required":false,"transform":{"type":"scalar"},"locs":[{"a":456,"b":466}]}],"statement":"-- \\set accessPointId 14\n-- \\set accessHubId 4\n-- \\set authUserId '\\'733e54ae-c9dc-4b9a-94d0-764fbd1bd76e\\''\n-- select access_point.*\nselect access_point.access_point_id,\n    access_point.name,\n    access_point.position,\n    access_point.access_hub_id\nfrom access_point\n    join access_hub using (access_hub_id)\n    join auth.users u on u.id = auth_user_id\nwhere access_point_id = :accessPointId\n    and access_hub_id = :accessHubId\n    and auth_user_id = :authUserId"};

/**
 * Query generated from SQL:
 * ```
 * -- \set accessPointId 14
 * -- \set accessHubId 4
 * -- \set authUserId '\'733e54ae-c9dc-4b9a-94d0-764fbd1bd76e\''
 * -- select access_point.*
 * select access_point.access_point_id,
 *     access_point.name,
 *     access_point.position,
 *     access_point.access_hub_id
 * from access_point
 *     join access_hub using (access_hub_id)
 *     join auth.users u on u.id = auth_user_id
 * where access_point_id = :accessPointId
 *     and access_hub_id = :accessHubId
 *     and auth_user_id = :authUserId
 * ```
 */
export const getAccessPoint = new PreparedQuery<IGetAccessPointParams,IGetAccessPointResult>(getAccessPointIR);


