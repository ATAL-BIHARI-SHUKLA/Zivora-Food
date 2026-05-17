// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Predefined admin credentials
  const ADMIN_EMAIL = "admin@restaurant.com";
  const ADMIN_PASSWORD = "admin123";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      return;
    }

    // Check if it's admin login
    if (
      formData.email === ADMIN_EMAIL &&
      formData.password === ADMIN_PASSWORD
    ) {
      localStorage.setItem("authToken", "admin_token_123");
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userName", "Admin");
      localStorage.setItem("userRole", "admin");
      setIsAuthenticated(true);
      navigate("/admin");
      return;
    }

    // Regular user login
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password,
    );

    if (user) {
      localStorage.setItem("authToken", "user_token_" + Date.now());
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userRole", "user");
      setIsAuthenticated(true);
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen py-12 bg-gradient-to-br from-amber-50 via-orange-50 to-white sm:px-6 lg:px-8">
      {/* Decorative elements */}
      <div className="absolute w-64 h-64 rounded-full top-20 left-10 bg-amber-200 mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute w-64 h-64 bg-orange-200 rounded-full top-40 right-10 mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="p-3 shadow-lg bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-center text-transparent bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text">
          Welcome Back
        </h2>
        <p className="mt-2 text-sm text-center text-gray-600">
          Sign in to your account to continue
        </p>
      </div>

      <div className="relative z-10 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 border shadow-2xl bg-white/80 backdrop-blur-lg sm:rounded-2xl sm:px-10 border-amber-100">
          {error && (
            <div className="p-4 mb-4 border-l-4 border-red-500 rounded-lg bg-red-50">
              <div className="flex">
                <div className="flex-shrink-0">
                  <MdError className="w-5 h-5 text-red-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full px-3 py-3 placeholder-gray-400 transition-all border-2 border-gray-200 shadow-sm appearance-none rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-3 py-3 placeholder-gray-400 transition-all border-2 border-gray-200 shadow-sm appearance-none rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="w-4 h-4 border-gray-300 rounded text-amber-600 focus:ring-amber-500"
                />
                <label
                  htmlFor="remember-me"
                  className="block ml-2 text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-amber-600 hover:text-amber-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white transition-all duration-300 transform border border-transparent shadow-sm rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 hover:-translate-y-1"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-white">
                  New to our restaurant?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/signup"
                className="flex justify-center w-full px-4 py-3 text-sm font-medium transition-all duration-300 bg-white border-2 shadow-sm border-amber-200 rounded-xl text-amber-700 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                Create new account
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default Login;
