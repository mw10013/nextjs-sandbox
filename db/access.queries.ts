/** Types generated for queries found in "db/access.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'FindAuthUserCounts' parameters type */
export type IFindAuthUserCountsParams = void;

/** 'FindAuthUserCounts' return type */
export interface IFindAuthUserCountsResult {
  accessHubCount: string | null;
  accessPointCount: string | null;
  accessUserCount: string | null;
  email: string | null;
}

/** 'FindAuthUserCounts' query type */
export interface IFindAuthUserCountsQuery {
  params: IFindAuthUserCountsParams;
  result: IFindAuthUserCountsResult;
}

const findAuthUserCountsIR: any = {"usedParamSet":{},"params":[],"statement":"select email,\n    count(distinct access_user_id) as access_user_count,\n    count(distinct access_hub.access_hub_id) as access_hub_count,\n    count(distinct access_point_id) as access_point_count\nfrom auth.users u\n    join access_user on access_user.auth_user_id = id\n    join access_hub on access_hub.auth_user_id = id\n    join access_point on access_hub.access_hub_id = access_point.access_hub_id\ngroup by email\norder by email"};

/**
 * Query generated from SQL:
 * ```
 * select email,
 *     count(distinct access_user_id) as access_user_count,
 *     count(distinct access_hub.access_hub_id) as access_hub_count,
 *     count(distinct access_point_id) as access_point_count
 * from auth.users u
 *     join access_user on access_user.auth_user_id = id
 *     join access_hub on access_hub.auth_user_id = id
 *     join access_point on access_hub.access_hub_id = access_point.access_hub_id
 * group by email
 * order by email
 * ```
 */
export const findAuthUserCounts = new PreparedQuery<IFindAuthUserCountsParams,IFindAuthUserCountsResult>(findAuthUserCountsIR);


