import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../../assets/symbol.png";
import searchwt from "../../assets/search.svg";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleModal }) => {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchTerm.trim();

    if (query) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/products");
    }
  };

  useEffect(() => {
    setShowMenu(false);
  }, [user]);

  const handleLogout = async () => {
    setShowMenu(false);
    await logout();
  };

  return (
    <div>
      <nav className="fixed top-0 z-50 flex w-full items-center gap-3 border-b border-gray-200 bg-white px-3 py-3 shadow-sm sm:gap-5 sm:px-6 lg:px-8">
        <img onClick={() => navigate("/")} src={logo} alt="" className="w-12" />

        <form
          onSubmit={handleSearch}
          className="mx-4 flex min-w-0 flex-1 overflow-hidden rounded-lg border-2 border-[#002f34] bg-white transition focus-within:shadow-md"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search cars, mobiles, electronics and more..."
            className="min-w-0 flex-1 px-4 py-3 text-sm text-gray-800 outline-none"
            aria-label="Search products"
          />

          <button
            type="submit"
            aria-label="Search"
            className="flex w-12 shrink-0 items-center justify-center bg-[#002f34] transition hover:bg-[#00474d] sm:w-14"
          >
            <img
              src={searchwt}
              alt=""
              className="h-5 w-5 brightness-0 invert"
            />
          </button>
        </form>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="font-bold cursor-pointer"
            >
              {user.displayName}
            </button>

            {showMenu && (
              <div className="absolute right-0 top-12 z-[100] w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                <div className="px-4 py-3 border-b">
                  <p className="font-bold text-sm">{user.displayName}</p>

                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>

                <button
                  type="button"
                  className="block w-full px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-100"
                >
                  My Profile
                </button>

                <button
                  onClick={() => {
                    setShowMenu(false);
                    navigate("/my-ads");
                  }}
                  className="block w-full px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-100"
                >
                  My Ads
                </button>

                <button
                  onClick={() => {
                    setShowMenu(false);
                    navigate("/wishlist");
                  }}
                  className="block w-full px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-100"
                >
                  My Wishlist
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="block w-full border-t border-gray-100 px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={toggleModal}
            className="shrink-0 rounded-md bg-[#002f34] px-4 py-2 font-semibold text-white transition hover:bg-[#00474d]"
          >
            Login
          </button>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
