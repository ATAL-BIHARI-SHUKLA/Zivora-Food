// src/App.jsx (Hybrid Version - Context + Local State + Admin Add + Global Chatbot)
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import { MenuProvider, useMenu } from "./context/MenuContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import DishDetails from "./pages/DishDetails";
import AdminPanel from "./pages/AdminPanel";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Chatbot from "./components/Chat"; // Import Chatbot component

// Wrapper component to access menu context
const AppContent = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("authToken") !== null;
  });

  // Get menu functions from context
  const { menuItems } = useMenu();

  // For backward compatibility - expose dishes as a variable
  const dishes = menuItems;

  return (
    <div className="flex flex-col min-h-screen">
      {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}

      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />

          <Route
            path="/menu"
            element={
              isAuthenticated ? (
                <MenuPage dishes={dishes} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/dish/:id"
            element={
              isAuthenticated ? (
                <DishDetails dishes={dishes} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/about"
            element={isAuthenticated ? <About /> : <Navigate to="/login" />}
          />

          <Route
            path="/contact"
            element={isAuthenticated ? <Contact /> : <Navigate to="/login" />}
          />

          <Route
            path="/cart"
            element={isAuthenticated ? <Cart /> : <Navigate to="/login" />}
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="/signup"
            element={
              !isAuthenticated ? (
                <Signup setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </main>

      {/* Global Chatbot - Shows only when authenticated */}
      {isAuthenticated && <Chatbot />}

      {isAuthenticated && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <MenuProvider>
        <AppContent />
      </MenuProvider>
    </Router>
  );
};

export default App;
