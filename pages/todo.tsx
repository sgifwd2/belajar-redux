import type { NextPage } from "next";
import { Todo } from "../features/todo/Todo";

const Page: NextPage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <Todo />
    </div>
  );
};

export default Page;
