import { selectAuthToken } from "@app/features/auth.slice";
import { authApi } from "@app/services/auth";
import { useAppSelector } from "@app/store";
import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect, useState } from "react";

export const auth = (WrappedComponent: React.FC) => {
  const HOC: React.FC = () => {
    const router = useRouter();
    const authToken = useAppSelector(selectAuthToken);

    const [getUser, { isLoading, error }] = authApi.useGetUserMutation();

    useLayoutEffect(() => {
      let isMounted = true;

      if (!authToken?.accessToken) router.push("/login");

      (async () => {
        const result = getUser();

        if (!isMounted) result.abort();
      })();

      return () => {
        isMounted = false;
      };
    }, [authToken?.accessToken, getUser, router]);

    useLayoutEffect(() => {
      if (error && "status" in error && error.status === 401) {
        router.push("/login");
      }
    }, [router, error]);

    if (isLoading) return <>Loading</>;

    return <WrappedComponent />;
  };

  const WithAuth: React.FC = () => {
    const [showChild, setShowChild] = useState<boolean>(false);

    useEffect(() => {
      setShowChild(true);
    }, []);

    if (!showChild) {
      return null;
    }

    return <HOC />;
  };

  return WithAuth;
};
