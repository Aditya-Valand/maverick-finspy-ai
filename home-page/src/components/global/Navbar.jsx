import { useState } from "react";
import { NavLink } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { IoMenu } from "react-icons/io5";

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <nav>
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex mx-auto justify-between w-5/6 ">
          {/* Primary menu and logo */}
          <div className="flex items-center gap-52 my-12">
            {/* logo */}
            <div>
              <NavLink
                to="/"
                className="flex gap-2 font-bold text-gray-700 text-2xl items-center"
              >
                <span>FinSpy AI</span>
              </NavLink>
            </div>
            {/* primary */}
            <div className="hidden lg:flex gap-8 ">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "border-l-4 pl-3 border-gray-600"
                    : "pl-3"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/ai-assistant"
                className={({ isActive }) =>
                  isActive
                    ? "border-l-4 pl-3 border-gray-600"
                    : "pl-3"
                }
              >
                AI Assistant
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "border-l-4 pl-3 border-gray-600"
                    : "pl-3"
                }
              >
                Contact US
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "border-l-4 pl-3 border-gray-600"
                    : "pl-3"
                }
              >
                About Us
              </NavLink>
            </div>
          </div>
          {/* secondary */}
          <div className="flex gap-6">
            <div className="hidden lg:flex items-center gap-2">
              <button>
                <VscAccount className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile navigation toggle */}
            <div className="lg:hidden flex items-center">
              <button onClick={() => setToggleMenu(!toggleMenu)}>
                <IoMenu className="h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* mobile navigation */}
      <div
        className={`fixed z-40 w-full  bg-gray-100 overflow-hidden flex flex-col lg:hidden gap-12  origin-top duration-700 ${
          !toggleMenu ? "h-0" : "h-full"
        }`}
      >
        <div className="px-8">
          <div className="flex flex-col gap-8 font-bold tracking-wider">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "border-l-4 pl-3 border-gray-600"
                  : "pl-3"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/ai-assistant"
              className={({ isActive }) =>
                isActive
                  ? "border-l-4 pl-3 border-gray-600"
                  : "pl-3"
              }
            >
              AI Assistant
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "border-l-4 pl-3 border-gray-600"
                  : "pl-3"
              }
            >
              Contact US
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "border-l-4 pl-3 border-gray-600"
                  : "pl-3"
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "border-l-4 pl-3 border-gray-600"
                  : "pl-3"
              }
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
