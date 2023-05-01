import Link from "next/link";
import React from "react";

export default function AppLayout({ children }) {
  return (
    <main className="">
      <div className="flex flex-col h-screen">
        <div className="navbar container mx-auto border-b border-gray-600 py-8 px-4">
          <div className="flex-1">
            <h1 className="font-semibold text-white text-2xl hover:underline underline-offset-[12px] transition duration-300 ease-in-out decoration-green-400">
              <Link href="/">User Profile</Link>
            </h1>
          </div>
          <div className="flex-none space-x-2">
            <Link
              className="py-1 px-4 text-white rounded-sm bg-green-400 hover:bg-green-500"
              href="/account"
            >
              Account
            </Link>
            <Link
              className="py-1 px-4 text-white rounded-sm border-[1px] border-gray-600 hover:bg-gray-600"
              href="/auth/signout"
            >
              Sign Out
            </Link>
          </div>
        </div>
        <div className="container mx-auto">{children}</div>
      </div>
    </main>
  );
}
