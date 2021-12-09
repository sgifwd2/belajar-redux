import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query";
import { FetchBaseQueryArgs } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";

export class BaseQuery {
  static initiate(
    args: FetchBaseQueryArgs
  ): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> {
    const query = fetchBaseQuery(args);

    return async (args, api, extraOptions) => {
      const result = await query(args, api, extraOptions);

      return result;
    };
  }
}
