import type { NextPage } from "next";
import { Chat } from "../features/chat/Chat";

const Page: NextPage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <Chat />
    </div>
  );
};

export default Page;
