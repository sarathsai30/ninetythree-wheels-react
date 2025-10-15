import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // "news" | "more" | null

  const isActive = (path) =>
    location.pathname === path ? 'text-blue-600 font-semibold' : 'text-gray-700';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-parent")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 h-[105px]">
      <div className="max-w-[1300px] mx-auto px-6 h-full flex items-center justify-between">
        
        {/* Left: Logo + Menu */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <Link to="/">
            <img
              src="/lovable-uploads/c46e1522-af82-4a23-9984-0f13ea99096e.png"
              alt="93Cars logo"
              className="h-20 w-20 object-cover"
            />
          </Link>

          {/* Desktop Menu Items */}
          <nav className="hidden lg:flex items-center space-x-5 text-[17px] font-medium">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/cars" className={isActive('/cars')}>Cars</Link>
            <Link to="/videos" className={isActive('/videos')}>Videos</Link>
            <Link to="/about" className={isActive('/about')}>About</Link>
            <Link to="/contact" className={isActive('/contact')}>Contact</Link>
            <Link to="/dealers" className={isActive('/dealers')}>Dealers</Link>
            {/* News Dropdown */}
            <div className="relative dropdown-parent">
              <button
                onClick={() => toggleDropdown("news")}
                className={`flex items-center gap-1 ${isActive('/news')}`}
              >
                News
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === "news" ? 'rotate-180' : ''}`} />
              </button>
              
              {openDropdown === "news" && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
                  <Link
                    to="/news"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    onClick={() => setOpenDropdown(null)}
                  >
                    Latest News
                  </Link>
                </div>
              )}
            </div>
            
            {/* More Dropdown */}
            <div className="relative dropdown-parent">
              <button
                onClick={() => toggleDropdown("more")}
                className="flex items-center gap-1 text-gray-700 hover:text-blue-600"
              >
                More
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === "more" ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === "more" && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
                  <Link
                    to="/fuelcostcalculator"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    onClick={() => setOpenDropdown(null)}
                  >
                    Fuel Cost Calculator
                  </Link>
                
                  <Link
                    to="/carloanemicalculator"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    onClick={() => setOpenDropdown(null)}
                  >
                    EMI Calculator
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
          >
            <span className={`block w-6 h-0.5 bg-gray-600 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-600 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-600 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Right: Button */}
        <Link
          to="/cars"
          className="hidden lg:block bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-[10px] rounded"
        >
          Browse Cars
        </Link>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 py-4 px-6">
          <nav className="flex flex-col space-y-4 text-[17px] font-medium">
            <Link to="/" className={isActive('/')} onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/cars" className={isActive('/cars')} onClick={() => setIsMenuOpen(false)}>Cars</Link>
            <Link to="/videos" className={isActive('/videos')} onClick={() => setIsMenuOpen(false)}>Videos</Link>
            <Link to="/about" className={isActive('/about')} onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/contact" className={isActive('/contact')} onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <Link to="/dealers" className={isActive('/dealers')} onClick={() => setIsMenuOpen(false)}>Dealers</Link>
            <Link to="/news" className={isActive('/news')} onClick={() => setIsMenuOpen(false)}>Latest News</Link>
            <Link to="/fuelcostcalculator" className={isActive('/fuelcostcalculator')} onClick={() => setIsMenuOpen(false)}>Fuel Cost Calculator</Link>
            <Link
              to="/cars"
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-2 rounded inline-block w-fit"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Cars
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
