import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-3 h-[60px]  text-white">
      <div className="logo">
        <img
          src="/images/logo.png"
          alt="logo"
          className="w-[70px] h-[25px] lg:w-[100px] lg:h-[30px] object-contain"
        />
      </div>
      <Link to="/login">
        <button className="flex items-center justify-center text-xs font-light w-[70px] h-[30px] bg-[#32CD32] text-white p-1 rounded-md lg:text-xl lg:font-semibold lg:w-[100px] lg:h-[40px] lg:rounded-lg">
          Login
        </button>
      </Link>
    </header>
  );
};

export default Header;
