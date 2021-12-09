import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authSlice } from "./features/auth.slice";
import { rtkQueryErrorLogger } from "./middlewares/rtk-query-error-logger.middleware";
import { authApi } from "./services/auth";

export function createStore() {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(rtkQueryErrorLogger)
        .concat(authApi.middleware),
  });
}

export const store = createStore();

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
