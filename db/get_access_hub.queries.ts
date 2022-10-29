/** Types generated for queries found in "db/get_access_hub.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetAccessHub' parameters type */
export interface IGetAccessHubParams {
  accessHubId: number | null | void;
  authUserId: string | null | void;
}

/** 'GetAccessHub' return type */
export interface IGetAccessHubResult {
  accessHubId: number;
  apiToken: string;
  authUserId: string;
  description: string;
  heartbeatAt: Date | null;
  name: string;
}

/** 'GetAccessHub' query type */
export interface IGetAccessHubQuery {
  params: IGetAccessHubParams;
  result: IGetAccessHubResult;
}

const getAccessHubIR: any = {"usedParamSet":{"accessHubId":true,"authUserId":true},"params":[{"name":"accessHubId","required":false,"transform":{"type":"scalar"},"locs":[{"a":183,"b":194}]},{"name":"authUserId","required":false,"transform":{"type":"scalar"},"locs":[{"a":219,"b":229}]}],"statement":"-- \\set accessHubId 4\n-- \\set authUserId '\\'733e54ae-c9dc-4b9a-94d0-764fbd1bd76e\\''\nselect access_hub.*\nfrom access_hub\n    join auth.users on id = auth_user_id\nwhere access_hub_id = :accessHubId\n    and auth_user_id = :authUserId"};

/**
 * Query generated from SQL:
 * ```
 * -- \set accessHubId 4
 * -- \set authUserId '\'733e54ae-c9dc-4b9a-94d0-764fbd1bd76e\''
 * select access_hub.*
 * from access_hub
 *     join auth.users on id = auth_user_id
 * where access_hub_id = :accessHubId
 *     and auth_user_id = :authUserId
 * ```
 */
export const getAccessHub = new PreparedQuery<IGetAccessHubParams,IGetAccessHubResult>(getAccessHubIR);


