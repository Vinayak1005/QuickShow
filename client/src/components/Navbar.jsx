import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { XIcon, MenuIcon, SearchIcon, TicketPlus } from "lucide-react";
import { useState } from "react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import useAutoDetectCity from "../hooks/useAutoDetectCity";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();
  const city = useAutoDetectCity();

  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5 bg-black/60 backdrop-blur text-white">
      <Link to="/" className="max-md:flex-1">
        <img src={assets.logo} alt="Logo" className="w-36 h-auto" />
      </Link>

      <div
        className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 max-md:w-full max-md:h-screen px-8 py-3
                    ${isOpen ? "max-md:flex" : "max-md:hidden"}
                    max-md:bg-black/90 md:bg-transparent md:border md:border-gray-300/20
                    backdrop-blur transition-all duration-300`}
      >
        {/* Close (X) icon on mobile */}
        <XIcon
          className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer text-white"
          onClick={() => setIsOpen(false)}
        />

        {/* 📍 City for mobile only */}
        <div className="flex md:hidden items-center gap-1 text-base text-gray-300 mt-6">
          <span>📍</span>
          <span>{city}</span>
        </div>

        {/* Navigation links */}
        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          className="text-white hover:text-primary-dull transition-colors"
          to="/"
        >
          Home
        </Link>
        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          className="text-white hover:text-primary-dull transition-colors"
          to="/movies"
        >
          Movies
        </Link>
        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          className="text-white hover:text-primary-dull transition-colors"
          to="/live-shows"
        >
          Live Shows
        </Link>
        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          className="text-white hover:text-primary-dull transition-colors"
          to="/releases"
        >
          Releases
        </Link>
        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          className="text-white hover:text-primary-dull transition-colors"
          to="/favourite"
        >
          Favourite
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-1 text-sm text-gray-300">
          <span>📍</span>
          <span>{city}</span>
        </div>

        <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer hover:text-primary-dull" />

        {!user ? (
          <button
            onClick={() => openSignIn()}
            className="px-4 py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
          >
            Login
          </button>
        ) : (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<TicketPlus size={16} />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
      </div>

      {/* Hamburger icon (opens menu) */}
      <MenuIcon
        className="md:hidden ml-4 w-8 h-8 cursor-pointer"
        onClick={() => setIsOpen(true)}
      />
    </div>
  );
};

export default Navbar;
