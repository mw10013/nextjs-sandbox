/** Types generated for queries found in "db/access.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'FindAppUserCounts' parameters type */
export type IFindAppUserCountsParams = void;

/** 'FindAppUserCounts' return type */
export interface IFindAppUserCountsResult {
  accessHubCount: string | null;
  accessPointCount: string | null;
  accessUserCount: string | null;
  appUserId: number;
  email: string;
}

/** 'FindAppUserCounts' query type */
export interface IFindAppUserCountsQuery {
  params: IFindAppUserCountsParams;
  result: IFindAppUserCountsResult;
}

const findAppUserCountsIR: any = {"usedParamSet":{},"params":[],"statement":"select app_user_id,\n    app_user.email,\n    count(distinct access_user_id) as access_user_count,\n    count(distinct access_hub.access_hub_id) as access_hub_count,\n    count(distinct access_point_id) as access_point_count\nfrom app_user\n    join access_user using (app_user_id)\n    join access_hub using (app_user_id)\n    join access_point on access_hub.access_hub_id = access_point.access_hub_id\ngroup by app_user_id\norder by app_user_id"};

/**
 * Query generated from SQL:
 * ```
 * select app_user_id,
 *     app_user.email,
 *     count(distinct access_user_id) as access_user_count,
 *     count(distinct access_hub.access_hub_id) as access_hub_count,
 *     count(distinct access_point_id) as access_point_count
 * from app_user
 *     join access_user using (app_user_id)
 *     join access_hub using (app_user_id)
 *     join access_point on access_hub.access_hub_id = access_point.access_hub_id
 * group by app_user_id
 * order by app_user_id
 * ```
 */
export const findAppUserCounts = new PreparedQuery<IFindAppUserCountsParams,IFindAppUserCountsResult>(findAppUserCountsIR);


