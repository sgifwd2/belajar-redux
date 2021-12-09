import { CreateAccessTokenDto } from "@app/dto/auth/create-access-token.dto";
import { authApi } from "@app/services/auth";
import { useMountedTracker } from "@hooks/useMountTracker";
import React, { useState } from "react";

export const Login: React.FC = () => {
  const { isMounted } = useMountedTracker();
  const [loginForm, setLoginForm] = useState<CreateAccessTokenDto>({
    email: "",
    password: "",
  });

  const [login, { data, isLoading, isError, isSuccess }] =
    authApi.useGetAccessTokenMutation();

  const handleLogin = () => {
    if (loginForm.email !== "" && loginForm.password !== "") {
      const result = login(loginForm);

      if (!isMounted) result.abort();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col">
      <input
        onChange={(e) =>
          setLoginForm((prev) => {
            const newLoginForm: CreateAccessTokenDto = {
              ...prev,
              email: e.target.value,
            };

            return newLoginForm;
          })
        }
        type="text"
        placeholder="Username"
        className="block w-full px-4 py-2 rounded-md shadow-md bg-gray-200 focus:bg-white my-2 focus:outline-none text-gray-600"
      />
      <input
        onChange={(e) =>
          setLoginForm((prev) => {
            const newLoginForm: CreateAccessTokenDto = {
              ...prev,
              password: e.target.value,
            };

            return newLoginForm;
          })
        }
        type="password"
        placeholder="Password"
        className="block w-full px-4 py-2 rounded-md shadow-md bg-gray-200 focus:bg-white my-2 focus:outline-none text-gray-600"
      />
      <button
        onClick={handleLogin}
        className="block w-full px-4 py-2 rounded-md bg-blue-500 mt-3 text-white font-semibold"
      >
        Login
      </button>
    </div>
  );
};
