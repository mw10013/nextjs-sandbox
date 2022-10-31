/** Types generated for queries found in "db/get_access_hub.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** Query 'GetAccessHub' is invalid, so its result is assigned type 'never' */
export type IGetAccessHubResult = never;

/** Query 'GetAccessHub' is invalid, so its parameters are assigned type 'never' */
export type IGetAccessHubParams = never;

const getAccessHubIR: any = {"usedParamSet":{"accessHubId":true,"customerId":true},"params":[{"name":"accessHubId","required":false,"transform":{"type":"scalar"},"locs":[{"a":182,"b":193}]},{"name":"customerId","required":false,"transform":{"type":"scalar"},"locs":[{"a":217,"b":227}]}],"statement":"-- \\set accessHubId 4\n-- \\set customerId '\\'733e54ae-c9dc-4b9a-94d0-764fbd1bd76e\\''\nselect access_hub.*\nfrom access_hub\n    join auth.users on id = customer_id\nwhere access_hub_id = :accessHubId\n    and customer_id = :customerId"};

/**
 * Query generated from SQL:
 * ```
 * -- \set accessHubId 4
 * -- \set customerId '\'733e54ae-c9dc-4b9a-94d0-764fbd1bd76e\''
 * select access_hub.*
 * from access_hub
 *     join auth.users on id = customer_id
 * where access_hub_id = :accessHubId
 *     and customer_id = :customerId
 * ```
 */
export const getAccessHub = new PreparedQuery<IGetAccessHubParams,IGetAccessHubResult>(getAccessHubIR);


