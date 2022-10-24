/** Types generated for queries found in "db/find_unique_access_hub.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'FindUniqueAccessHub' parameters type */
export interface IFindUniqueAccessHubParams {
  access_hub_id: number | null | void;
}

/** 'FindUniqueAccessHub' return type */
export interface IFindUniqueAccessHubResult {
  accessHubId: number;
  accessPointId: number;
  accessPointName: string;
  accessUserId: number;
  accessUserName: string;
  code: string;
  description: string;
  name: string;
  position: number;
}

/** 'FindUniqueAccessHub' query type */
export interface IFindUniqueAccessHubQuery {
  params: IFindUniqueAccessHubParams;
  result: IFindUniqueAccessHubResult;
}

const findUniqueAccessHubIR: any = {"usedParamSet":{"access_hub_id":true},"params":[{"name":"access_hub_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":400,"b":413}]}],"statement":"select ah.access_hub_id,\n    ah.name,\n    ah.description,\n    ap.access_point_id,\n    ap.name as access_point_name,\n    ap.position,\n    au.access_user_id,\n    au.name as access_user_name,\n    au.code\nfrom access_hub ah\n    join access_point ap using (access_hub_id)\n    join access_point_to_access_user using (access_point_id)\n    join access_user au using (access_user_id)\nwhere ah.access_hub_id = :access_hub_id\norder by ah.access_hub_id,\n    ap.position,\n    au.name"};

/**
 * Query generated from SQL:
 * ```
 * select ah.access_hub_id,
 *     ah.name,
 *     ah.description,
 *     ap.access_point_id,
 *     ap.name as access_point_name,
 *     ap.position,
 *     au.access_user_id,
 *     au.name as access_user_name,
 *     au.code
 * from access_hub ah
 *     join access_point ap using (access_hub_id)
 *     join access_point_to_access_user using (access_point_id)
 *     join access_user au using (access_user_id)
 * where ah.access_hub_id = :access_hub_id
 * order by ah.access_hub_id,
 *     ap.position,
 *     au.name
 * ```
 */
export const findUniqueAccessHub = new PreparedQuery<IFindUniqueAccessHubParams,IFindUniqueAccessHubResult>(findUniqueAccessHubIR);


