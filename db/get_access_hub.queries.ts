/** Types generated for queries found in "db/get_access_hub.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetAccessHub' parameters type */
export interface IGetAccessHubParams {
  access_hub_id: number | null | void;
  auth_user_id: string | null | void;
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

const getAccessHubIR: any = {"usedParamSet":{"access_hub_id":true,"auth_user_id":true},"params":[{"name":"access_hub_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":187,"b":200}]},{"name":"auth_user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":225,"b":237}]}],"statement":"-- \\set access_hub_id 4\n-- \\set auth_user_id '\\'733e54ae-c9dc-4b9a-94d0-764fbd1bd76e\\''\nselect access_hub.*\nfrom access_hub\n    join auth.users on id = auth_user_id\nwhere access_hub_id = :access_hub_id\n    and auth_user_id = :auth_user_id"};

/**
 * Query generated from SQL:
 * ```
 * -- \set access_hub_id 4
 * -- \set auth_user_id '\'733e54ae-c9dc-4b9a-94d0-764fbd1bd76e\''
 * select access_hub.*
 * from access_hub
 *     join auth.users on id = auth_user_id
 * where access_hub_id = :access_hub_id
 *     and auth_user_id = :auth_user_id
 * ```
 */
export const getAccessHub = new PreparedQuery<IGetAccessHubParams,IGetAccessHubResult>(getAccessHubIR);


