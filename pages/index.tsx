import { selectAuthUser } from "@app/features/auth.slice";
import { useAppSelector } from "@app/store";
import { auth } from "@hooks/auth";
import { HomeLayout } from "@layouts/HomeLayout";
import type { NextPage } from "next";

const Page: NextPage = () => {
  const user = useAppSelector(selectAuthUser);

  return (
    <HomeLayout title="Home">
      <div className="flex-grow w-full h-0 flex justify-center items-center">
        <h1 className="text-7xl text-gray-500">Hello {user?.email}</h1>
      </div>
    </HomeLayout>
  );
};

export default auth(Page);
