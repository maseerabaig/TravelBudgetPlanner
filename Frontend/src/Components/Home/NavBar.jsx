import React, { useState } from "react";
import { Plane } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
          <Plane className="h-6 w-6 text-[#d77a61]" />
            <span className="text-xl font-semibold text-gray-900">
              <Link to="/">Travel Budget Planning Tool</Link>
            </span>
          </div>

          {/* Desktop Navbar Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#features">Features</a>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-900">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navbar Links (Positioned on the right side) */}
      <div
        className={`md:hidden ${isMenuOpen ? "block" : "hidden"} absolute top-16 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 w-36`}
      >
        <div className="flex flex-col items-start py-2 space-y-3 px-3">
          <a href="/#features" onClick={() => setIsMenuOpen(false)}>
            Features
          </a>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
