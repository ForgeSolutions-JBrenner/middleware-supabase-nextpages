import React from "react";

function AuthLayout({ children }) {
  return (
    <main className="">
      <div className="flex flex-col h-screen">
        <div className="header border-b border-gray-300 py-8 px-4 mx-8">
          <h1 className="font-semibold text-2xl text-[#e4e7eb]">
            User Profile BST Test
          </h1>
        </div>
        <div className="grid place-items-center md:my-auto h-screen ">
          {children}
        </div>
      </div>
    </main>
  );
}

export default AuthLayout;
