import React from "react";
import Link from "next/link";

interface HeaderProps {
  className?: string;
}

const HeaderElement: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header
      className={`${
        className ?? ""
      } w-full flex items-center justify-between py-3`}
    >
      <div>
        <h1 className="text-lg font-bold uppercase text-gray-600 tracking-wide">
          Brand
        </h1>
      </div>
      <div>
        <ul className="flex justify-center items-center space-x-3 uppercase">
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export const Header = React.memo(HeaderElement);
