import {
  Middleware,
  MiddlewareAPI,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { logout } from "../features/auth.slice";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action) && action.payload.status === 401) {
      if (
        typeof window !== "undefined" &&
        window.localStorage.getItem("token")
      ) {
        const { dispatch } = api;

        dispatch(logout());
      }
    }

    return next(action);
  };
