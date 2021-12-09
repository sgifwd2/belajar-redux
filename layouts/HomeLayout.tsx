import { FC, memo, ReactNode } from "react";
import Head from "next/head";
import { Header } from "../components/Header";

interface HomeLayoutProps {
  title: string;
  children: ReactNode;
}

const HomeLayoutElement: FC<HomeLayoutProps> = ({ title, children }) => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Head>
        <title>{title}</title>
      </Head>

      <div className="max-w-5xl mx-auto px-4">
        {/* header */}
        <Header className="h-16" />

        {/* main */}
        <main className="w-full min-h-[calc(100vh-4rem)] flex flex-col">{children}</main>
      </div>
    </div>
  );
};

export const HomeLayout = memo(HomeLayoutElement);
