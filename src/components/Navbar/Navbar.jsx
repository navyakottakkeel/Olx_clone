import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../../assets/symbol.png";
import search from "../../assets/search1.svg";
import arrow from "../../assets/arrow-down.svg";
import searchwt from "../../assets/search.svg";
import { useAuth } from "../../context/AuthContext";

const Navbar = ({ toggleModal }) => {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setShowMenu(false);
  }, [user]);

  const handleLogout = async () => {
    setShowMenu(false);
    await logout();
  };

  return (
    <div>
      <nav className="fixed z-50 w-full overflow-visible p-2 pl-3 pr-3 shadow-md bg-slate-100 border-b-4 border-solid border-b-white">
        <img src={logo} alt="" className="w-12" />
        <div className="relative location-search ml-5">
          <img src={search} alt="" className="absolute top-4 left-2 w-5" />
          <input
            type="text"
            name=""
            id=""
            placeholder="Search city, area, locality..."
            className="w-[50px] sm:w-[150px] md:w-[250px] lg:w-[270px] p-3 pl-8 pr-8 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300"
          />
          <img
            src={arrow}
            alt=""
            className="absolute top-4 right-3 w-5 cursor-pointer"
          />
        </div>
        <div className="ml-5 mr-2 relative w-full main-search">
          <input
            type="text"
            placeholder="Find Cars, Mobile, Phones, and More... "
            className="w-full p-3 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300"
            name=""
            id=""
          />
          <div
            style={{ backgroundColor: "#002f34" }}
            className="flex justify-center items-center absolute top-0 right-0 h-full rounded-e-md w-12"
          >
            <img src={searchwt} alt="" className="w-5 filter invert" />
          </div>
        </div>
        <div className="mx-1 sm:ml-5 sm:mr-5 relative lang">
          <p className="font-bold mr-3">English</p>
          <img src={arrow} alt="" className="w-5 cursor-pointer" />
        </div>
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="font-bold cursor-pointer"
            >
              {user.displayName}
            </button>

            {showMenu && (
              <div className="absolute right-0 top-10 z-[100] w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                <div className="px-4 py-3 border-b">
                  <p className="font-bold text-sm">{user.displayName}</p>

                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>

                <button className="block w-full text-left px-4 py-3 hover:bg-gray-100">
                  My Profile
                </button>

                <button className="block w-full text-left px-4 py-3 hover:bg-gray-100">
                  My Ads
                </button>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <p onClick={toggleModal} className="font-bold cursor-pointer">
            Login
          </p>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
