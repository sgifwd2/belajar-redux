import type { NextPage } from "next";
import { Counter } from "../features/counter/Counter";

const Page: NextPage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col justify-center items-center">
        <Counter />
    </div>
  );
};

export default Page;
