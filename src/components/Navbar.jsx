import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import {
  FaShoppingCart,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUser,
  FaUtensils,
} from "react-icons/fa";

const Navbar = ({ setIsAuthenticated }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const user =
    localStorage.getItem("userName") || localStorage.getItem("userEmail");
  const cartCount = JSON.parse(
    localStorage.getItem("cartItems") || "[]",
  ).reduce((t, i) => t + i.quantity, 0);
  const handleLogout = () => {
    ["authToken", "userName", "userEmail"].forEach((i) =>
      localStorage.removeItem(i),
    );
    setIsAuthenticated(false);
  };

  const navLinks = [
    ["/", "Home"],
    ["/menu", "Menu"],
    ["/about", "About"],
    ["/contact", "Contact"],
  ];

  const isActive = (p) => pathname === p;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow ${scrolled ? "shadow-md" : "shadow-lg"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="Logo"
                className="w-auto mt-2 h-24 hover:scale-105 transition-transform"
              />
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(([p, l]) => (
                <Link
                  key={p}
                  to={p}
                  className={`px-3 py-2 rounded-md font-medium transition-colors ${
                    isActive(p)
                      ? "text-amber-600 bg-amber-50"
                      : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                  }`}
                >
                  {l}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <div className="flex items-center gap-1 px-3 py-2 bg-amber-50 rounded-md">
                    <FaUser className="text-amber-600 text-sm" />
                    <span className="text-sm font-medium text-gray-700">
                      Hi, {user.split("@")[0]}
                    </span>
                  </div>
                  <Link
                    to="/cart"
                    className="relative flex items-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md font-medium transition-colors"
                  >
                    <FaShoppingCart className="mr-1.5" />
                    Cart
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full shadow-md">
                        {cartCount > 9 ? "9+" : cartCount}
                      </span>
                    )}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md font-medium transition-colors"
                  >
                    <FaSignOutAlt className="mr-1.5" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md font-medium transition-colors"
                >
                  Login
                </Link>
              )}
            </div>

            <div className="md:hidden flex items-center gap-2">
              <Link
                to="/cart"
                className="relative p-2 text-gray-700 hover:text-amber-600"
              >
                <FaShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-colors"
              >
                {menuOpen ? (
                  <FaTimes className="w-5 h-5" />
                ) : (
                  <FaBars className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-2 space-y-1">
              {navLinks.map(([p, l]) => (
                <Link
                  key={p}
                  to={p}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-md font-medium transition-colors ${
                    isActive(p)
                      ? "text-amber-600 bg-amber-50"
                      : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                  }`}
                >
                  {l}
                </Link>
              ))}
              {user && (
                <>
                  <div className="border-t border-gray-100 my-2" />
                  <div className="px-3 py-2 flex items-center gap-2 text-sm text-gray-600">
                    <FaUser className="text-amber-600" />
                    <span>
                      Signed in as{" "}
                      <span className="font-medium text-gray-800">
                        {user.split("@")[0]}
                      </span>
                    </span>
                  </div>
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center px-3 py-2.5 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-md font-medium transition-colors"
                  >
                    <FaUtensils className="mr-2" />
                    Admin Panel
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="flex items-center w-full px-3 py-2.5 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md font-medium transition-colors"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      <div className="h-16" />
    </>
  );
};

export default Navbar;
