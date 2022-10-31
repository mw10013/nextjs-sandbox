/** Types generated for queries found in "db/find_deny_events.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'FindDenyEvents' parameters type */
export type IFindDenyEventsParams = void;

/** 'FindDenyEvents' return type */
export interface IFindDenyEventsResult {
  access: string;
  accessEventId: number;
  accessPointId: number;
  accessUserId: number | null;
  at: Date;
  code: string;
}

/** 'FindDenyEvents' query type */
export interface IFindDenyEventsQuery {
  params: IFindDenyEventsParams;
  result: IFindDenyEventsResult;
}

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


