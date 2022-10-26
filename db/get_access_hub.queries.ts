/** Types generated for queries found in "db/get_access_hub.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** Query 'GetAccessHub' is invalid, so its result is assigned type 'never' */
export type IGetAccessHubResult = never;

/** Query 'GetAccessHub' is invalid, so its parameters are assigned type 'never' */
export type IGetAccessHubParams = never;

const getAccessHubIR: any = {"usedParamSet":{},"params":[],"statement":"select * from get_access_hub()"};

/**
 * Query generated from SQL:
 * ```
 * select * from get_access_hub()
 * ```
 */
export const getAccessHub = new PreparedQuery<IGetAccessHubParams,IGetAccessHubResult>(getAccessHubIR);


