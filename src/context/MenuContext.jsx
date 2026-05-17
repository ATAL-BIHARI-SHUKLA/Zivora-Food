// src/context/MenuContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { menuItems as initialMenuItems } from "../data/sampleMenuData";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState(() => {
    // Try to get from localStorage first, fallback to initialMenuItems
    const savedMenu = localStorage.getItem("menuItems");
    return savedMenu ? JSON.parse(savedMenu) : initialMenuItems;
  });

  // Sync with localStorage whenever menuItems changes
  useEffect(() => {
    localStorage.setItem("menuItems", JSON.stringify(menuItems));
  }, [menuItems]);

  // Add new dish
  const addDish = (newDish) => {
    const category = newDish.category.toLowerCase();
    setMenuItems((prev) => ({
      ...prev,
      [category]: [
        ...(prev[category] || []),
        {
          ...newDish,
          id: Date.now().toString(),
          price: parseFloat(newDish.price),
          isNew: true,
          createdAt: new Date().toISOString(),
        },
      ],
    }));
  };

  // Update existing dish
  const updateDish = (id, updatedDish) => {
    setMenuItems((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((category) => {
        updated[category] = updated[category].map((item) =>
          item.id === id
            ? {
                ...item,
                ...updatedDish,
                price: parseFloat(updatedDish.price),
                updatedAt: new Date().toISOString(),
              }
            : item,
        );
      });
      return updated;
    });
  };

  // Delete dish
  const deleteDish = (id) => {
    setMenuItems((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((category) => {
        updated[category] = updated[category].filter((item) => item.id !== id);
      });
      return updated;
    });
  };

  // Get all dishes flattened
  const getAllDishes = () => {
    return Object.values(menuItems).flat();
  };

  // Get dish by ID
  const getDishById = (id) => {
    return getAllDishes().find((dish) => dish.id === id);
  };

  // Add to cart function
  const addToCart = (dish) => {
    const savedCart = localStorage.getItem("cartItems");
    const cartItems = savedCart ? JSON.parse(savedCart) : [];

    const existingItem = cartItems.find((item) => item.id === dish.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cartItems.map((item) =>
        item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item,
      );
    } else {
      updatedCart = [...cartItems, { ...dish, quantity: 1 }];
    }

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    return updatedCart;
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        setMenuItems, // Expose setter for backward compatibility
        addDish,
        updateDish,
        deleteDish,
        getAllDishes,
        getDishById,
        addToCart,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
