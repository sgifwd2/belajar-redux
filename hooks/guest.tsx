import { selectAuthToken } from "@app/features/auth.slice";
import { useAppSelector } from "@app/store";
import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect, useState } from "react";

export const guest = (WrappedComponent: React.FC) => {
  const HOC: React.FC = () => {
    const router = useRouter();
    const authToken = useAppSelector(selectAuthToken);

    useLayoutEffect(() => {
      if (authToken) router.push("/");
    }, [router, authToken]);

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
