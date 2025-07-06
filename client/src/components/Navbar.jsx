import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const Navbar = () => {
  const { isRegistered, updateRegistrationStatus } = useGlobalContext();

  useEffect(() => {
    updateRegistrationStatus();
  }, [updateRegistrationStatus]);

  return (
    <nav className="bg-gradient-to-b from-gray-900 to-black px-6 py-4 flex justify-between items-center shadow-lg">
      {isRegistered ? (
        <div
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500"
        >
          SpaceWars
        </div>
      ) : (
        <Link
          to="/"
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500"
        >
          SpaceWars
        </Link>
      )}
      {isRegistered && (
        <div className="flex space-x-6">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `text-lg font-semibold ${
                isActive
                  ? "text-white underline underline-offset-4"
                  : "text-gray-400 hover:text-white"
              } transition-all duration-300`
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="/market"
            className={({ isActive }) =>
              `text-lg font-semibold ${
                isActive
                  ? "text-white underline underline-offset-4"
                  : "text-gray-400 hover:text-white"
              } transition-all duration-300`
            }
          >
            Market
          </NavLink>
          <NavLink
            to="/game"
            className={({ isActive }) =>
              `text-lg font-semibold ${
                isActive
                  ? "text-white underline underline-offset-4"
                  : "text-gray-400 hover:text-white"
              } transition-all duration-300`
            }
          >
            Game
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
