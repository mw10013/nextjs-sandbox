/** Types generated for queries found in "db/get_customer.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetCustomer' parameters type */
export interface IGetCustomerParams {
  authUserId: string | null | void;
}

/** 'GetCustomer' return type */
export interface IGetCustomerResult {
  email: string | null;
  id: string;
  lastSignInAt: Date | null;
}

/** 'GetCustomer' query type */
export interface IGetCustomerQuery {
  params: IGetCustomerParams;
  result: IGetCustomerResult;
}

const getCustomerIR: any = {"usedParamSet":{"authUserId":true},"params":[{"name":"authUserId","required":false,"transform":{"type":"scalar"},"locs":[{"a":123,"b":133}]}],"statement":"-- \\set authUserId '\\'733e54ae-c9dc-4b9a-94d0-764fbd1bd76e\\''\nselect email, id, last_sign_in_at\nfrom auth.users\nwhere id = :authUserId"};

/**
 * Query generated from SQL:
 * ```
 * -- \set authUserId '\'733e54ae-c9dc-4b9a-94d0-764fbd1bd76e\''
 * select email, id, last_sign_in_at
 * from auth.users
 * where id = :authUserId
 * ```
 */
export const getCustomer = new PreparedQuery<IGetCustomerParams,IGetCustomerResult>(getCustomerIR);


