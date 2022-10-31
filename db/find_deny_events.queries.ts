/** Types generated for queries found in "db/find_deny_events.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** Query 'FindDenyEvents' is invalid, so its result is assigned type 'never' */
export type IFindDenyEventsResult = never;

/** Query 'FindDenyEvents' is invalid, so its parameters are assigned type 'never' */
export type IFindDenyEventsParams = never;

const findDenyEventsIR: any = {"usedParamSet":{},"params":[],"statement":"select *\nfrom access_event\nwhere access = 'deny'"};

/**
 * Query generated from SQL:
 * ```
 * select *
 * from access_event
 * where access = 'deny'
 * ```
 */
export const findDenyEvents = new PreparedQuery<IFindDenyEventsParams,IFindDenyEventsResult>(findDenyEventsIR);


