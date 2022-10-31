/** Types generated for queries found in "db/get_access_hubs.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** Query 'GetAccessHubs' is invalid, so its result is assigned type 'never' */
export type IGetAccessHubsResult = never;

/** Query 'GetAccessHubs' is invalid, so its parameters are assigned type 'never' */
export type IGetAccessHubsParams = never;

const getAccessHubsIR: any = {"usedParamSet":{"customerId":true},"params":[{"name":"customerId","required":false,"transform":{"type":"scalar"},"locs":[{"a":158,"b":168}]}],"statement":"-- \\set customerId '\\'733e54ae-c9dc-4b9a-94d0-764fbd1bd76e\\''\nselect access_hub.*\nfrom access_hub\n    join auth.users on id = customer_id\nwhere customer_id = :customerId\norder by name"};

/**
 * Query generated from SQL:
 * ```
 * -- \set customerId '\'733e54ae-c9dc-4b9a-94d0-764fbd1bd76e\''
 * select access_hub.*
 * from access_hub
 *     join auth.users on id = customer_id
 * where customer_id = :customerId
 * order by name
 * ```
 */
export const getAccessHubs = new PreparedQuery<IGetAccessHubsParams,IGetAccessHubsResult>(getAccessHubsIR);


