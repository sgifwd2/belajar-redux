import { Login } from "@containers/login/Login";
import { guest } from "@hooks/guest";
import { HomeLayout } from "@layouts/HomeLayout";
import type { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <HomeLayout title="Login">
      <div className="flex-grow w-full h-0 flex justify-center items-center">
        <Login />
      </div>
    </HomeLayout>
  );
};

export default guest(Page);
