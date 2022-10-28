/** Types generated for queries found in "db/get_access_users_by_point.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetAccessUsersByPoint' parameters type */
export interface IGetAccessUsersByPointParams {
  access_point_id: number | null | void;
}

/** 'GetAccessUsersByPoint' return type */
export interface IGetAccessUsersByPointResult {
  accessUserId: number;
  activateCodeAt: Date | null;
  authUserId: string;
  code: string;
  description: string;
  expireCodeAt: Date | null;
  name: string;
}

/** 'GetAccessUsersByPoint' query type */
export interface IGetAccessUsersByPointQuery {
  params: IGetAccessUsersByPointParams;
  result: IGetAccessUsersByPointResult;
}

const getAccessUsersByPointIR: any = {"usedParamSet":{"access_point_id":true},"params":[{"name":"access_point_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":149,"b":164}]}],"statement":"-- \\set access_point_id 14\nselect access_user.*\nfrom access_user\n    join access_point_to_access_user using (access_user_id)\nwhere access_point_id = :access_point_id\norder by name"};

/**
 * Query generated from SQL:
 * ```
 * -- \set access_point_id 14
 * select access_user.*
 * from access_user
 *     join access_point_to_access_user using (access_user_id)
 * where access_point_id = :access_point_id
 * order by name
 * ```
 */
export const getAccessUsersByPoint = new PreparedQuery<IGetAccessUsersByPointParams,IGetAccessUsersByPointResult>(getAccessUsersByPointIR);


