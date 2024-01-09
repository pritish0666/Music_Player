"use client";

import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-[rgba(22,24,43,0.7)] text-white rounded-[35px] drop-shadow-xl w-full mx-1">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl w-full p-6 font-bold">
            <a href="/">CHARU &#9835;</a>
          </h1>
        </div>

        <div className="flex items-center mx-6">
          <ul className="menu menu-horizontal px-0 flex justify-between space-x-4">
            <li>
              <a href="/music">My Songs</a>
            </li>
            <li>
              <a href="/signin">Login</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
