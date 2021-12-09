import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { BaseQuery } from "../config/base-query";
import { AccessTokenEntity } from "../domain/access-token.entity";
import { UserEntity } from "../domain/user.entity";
import { CreateAccessTokenDto } from "../dto/auth/create-access-token.dto";
import { RootState } from "../store";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Auth"],
  baseQuery: BaseQuery.initiate({
    baseUrl: process.env.API_BASE_URL + "/auth",
    prepareHeaders: (headers, { getState }) => {
      const authToken = (getState() as RootState).auth.token?.accessToken;

      if (authToken) headers.set("Authorization", `Bearer ${authToken}`);

      return headers;
    },
  }),
  endpoints: (build) => ({
    getAccessToken: build.mutation<AccessTokenEntity, CreateAccessTokenDto>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Auth", id: "TOKEN" }],
    }),
    getUser: build.mutation<UserEntity, void>({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      invalidatesTags: [{ type: "Auth", id: "USER" }],
    }),
  }),
});
