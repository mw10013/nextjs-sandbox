/** Types generated for queries found in "db/get_access_point.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetAccessPoint' parameters type */
export interface IGetAccessPointParams {
  access_hub_id: number | null | void;
  access_point_id: number | null | void;
  auth_user_id: string | null | void;
}

/** 'GetAccessPoint' return type */
export interface IGetAccessPointResult {
  accessHubId: number;
  accessPointId: number;
  description: string;
  name: string;
  position: number;
}

/** 'GetAccessPoint' query type */
export interface IGetAccessPointQuery {
  params: IGetAccessPointParams;
  result: IGetAccessPointResult;
}

const getAccessPointIR: any = {"usedParamSet":{"access_point_id":true,"access_hub_id":true,"auth_user_id":true},"params":[{"name":"access_point_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":266,"b":281}]},{"name":"access_hub_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":307,"b":320}]},{"name":"auth_user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":345,"b":357}]}],"statement":"-- \\set access_point_id 14\n-- \\set access_hub_id 4\n-- \\set auth_user_id '\\'733e54ae-c9dc-4b9a-94d0-764fbd1bd76e\\''\nselect access_point.*\nfrom access_point\n    join access_hub using (access_hub_id)\n    join auth.users u on u.id = auth_user_id\nwhere access_point_id = :access_point_id\n    and access_hub_id = :access_hub_id\n    and auth_user_id = :auth_user_id"};

/**
 * Query generated from SQL:
 * ```
 * -- \set access_point_id 14
 * -- \set access_hub_id 4
 * -- \set auth_user_id '\'733e54ae-c9dc-4b9a-94d0-764fbd1bd76e\''
 * select access_point.*
 * from access_point
 *     join access_hub using (access_hub_id)
 *     join auth.users u on u.id = auth_user_id
 * where access_point_id = :access_point_id
 *     and access_hub_id = :access_hub_id
 *     and auth_user_id = :auth_user_id
 * ```
 */
export const getAccessPoint = new PreparedQuery<IGetAccessPointParams,IGetAccessPointResult>(getAccessPointIR);


