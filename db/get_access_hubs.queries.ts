/** Types generated for queries found in "db/get_access_hubs.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetAccessHubs' parameters type */
export interface IGetAccessHubsParams {
  authUserId: string | null | void;
}

/** 'GetAccessHubs' return type */
export interface IGetAccessHubsResult {
  accessHubId: number;
  apiToken: string;
  authUserId: string;
  description: string;
  heartbeatAt: Date | null;
  name: string;
}

/** 'GetAccessHubs' query type */
export interface IGetAccessHubsQuery {
  params: IGetAccessHubsParams;
  result: IGetAccessHubsResult;
}

const getAccessHubsIR: any = {"usedParamSet":{"authUserId":true},"params":[{"name":"authUserId","required":false,"transform":{"type":"scalar"},"locs":[{"a":160,"b":170}]}],"statement":"-- \\set authUserId '\\'733e54ae-c9dc-4b9a-94d0-764fbd1bd76e\\''\nselect access_hub.*\nfrom access_hub\n    join auth.users on id = auth_user_id\nwhere auth_user_id = :authUserId\norder by name"};

/**
 * Query generated from SQL:
 * ```
 * -- \set authUserId '\'733e54ae-c9dc-4b9a-94d0-764fbd1bd76e\''
 * select access_hub.*
 * from access_hub
 *     join auth.users on id = auth_user_id
 * where auth_user_id = :authUserId
 * order by name
 * ```
 */
export const getAccessHubs = new PreparedQuery<IGetAccessHubsParams,IGetAccessHubsResult>(getAccessHubsIR);


