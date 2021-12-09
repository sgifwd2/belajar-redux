import { createSlice } from "@reduxjs/toolkit";
import { AccessTokenEntity } from "../domain/access-token.entity";
import { UserEntity } from "../domain/user.entity";
import { authApi } from "../services/auth";
import { RootState } from "../store";

export interface AuthState {
  token: AccessTokenEntity | null;
  user: UserEntity | null;
}

const oldToken =
  typeof window !== "undefined"
    ? window.localStorage.getItem("token") &&
      JSON.parse(window.localStorage.getItem("token")!)
    : null;

const initialState: AuthState = {
  token: oldToken ?? null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;

      if (typeof window !== undefined) window.localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.getAccessToken.matchFulfilled,
      (state, { payload }) => {
        state.token = payload;

        if (typeof window !== undefined)
          window.localStorage.setItem("token", JSON.stringify(payload));
      }
    );

    builder.addMatcher(
      authApi.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
      }
    );

    builder.addMatcher(
      authApi.endpoints.getUser.matchRejected,
      (state, { payload }) => {
        if (payload?.status === 401) {
          state.token = null;
          state.user = null;

          if (typeof window !== undefined)
            window.localStorage.removeItem("token");
        }
      }
    );
  },
});

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthToken = (state: RootState) => state.auth.token;

export const {logout}  = authSlice.actions