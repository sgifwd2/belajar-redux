import type { NextPage } from "next";
import Head from "next/head";

const Page: NextPage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center items-center">
      <Head>
        <title>Create Next App</title>
      </Head>

      <main>
        <h1 className="text-7xl text-gray-500">Hello world</h1>
      </main>
    </div>
  );
};

export default Page;
