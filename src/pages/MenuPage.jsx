// src/pages/MenuPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  FaShoppingCart,
  FaLeaf,
  FaFire,
  FaStar,
  FaClock,
  FaUtensils,
  FaWineGlassAlt,
  FaIceCream,
  FaCoffee,
  FaPlusCircle,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaImage,
  FaDollarSign,
  FaTag,
  FaList,
} from "react-icons/fa";
import { useMenu } from "../context/MenuContext";

const MenuPage = () => {
  const {
    menuItems,
    getAllDishes,
    addToCart,
    addDish,
    updateDish,
    deleteDish,
  } = useMenu();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSection, setActiveSection] = useState("food");
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});

  // ✅ Check if current user is admin
  const [isAdmin, setIsAdmin] = useState(false);

  // ✅ State for Add Dish Modal
  const [showAddForm, setShowAddForm] = useState(false);

  // ✅ State for Edit Dish Modal
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // ✅ Form data for both Add and Edit
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "mains",
    image: "",
    ingredients: "",
    isVegetarian: false,
    isSpicy: false,
    isNew: true,
    isPopular: false,
    isChefSpecial: false,
    rating: 4.5,
    prepTime: "20-30 min",
  });

  // Get cart from localStorage and check admin status
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    // ✅ Check if user is admin
    const userRole = localStorage.getItem("userRole");
    setIsAdmin(userRole === "admin");
  }, []);

  // Reset form when closing add modal
  useEffect(() => {
    if (!showAddForm && !showEditForm) {
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "mains",
        image: "",
        ingredients: "",
        isVegetarian: false,
        isSpicy: false,
        isNew: true,
        isPopular: false,
        isChefSpecial: false,
        rating: 4.5,
        prepTime: "20-30 min",
      });
      setEditingItem(null);
    }
  }, [showAddForm, showEditForm]);

  // ✅ Load dish data into form when editing
  const handleEditClick = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || "",
      description: item.description || "",
      price: item.price || "",
      category: item.category || "mains",
      image: item.image || "",
      ingredients: item.ingredients ? item.ingredients.join(", ") : "",
      isVegetarian: item.isVegetarian || false,
      isSpicy: item.isSpicy || false,
      isNew: item.isNew || false,
      isPopular: item.isPopular || false,
      isChefSpecial: item.isChefSpecial || false,
      rating: item.rating || 4.5,
      prepTime: item.prepTime || "20-30 min",
    });
    setShowEditForm(true);
  };

  // Menu sections
  const menuSections = [
    { id: "food", name: "Food", icon: FaUtensils },
    { id: "drinks", name: "Beverages", icon: FaWineGlassAlt },
    { id: "desserts", name: "Desserts", icon: FaIceCream },
  ];

  // Menu categories
  const menuCategories = [
    { id: "all", name: "All Items", icon: FaUtensils },
    { id: "starters", name: "Starters", icon: FaUtensils },
    { id: "mains", name: "Main Course", icon: FaUtensils },
    { id: "desserts", name: "Desserts", icon: FaIceCream },
    { id: "drinks", name: "Drinks", icon: FaCoffee },
  ];

  // Get all dishes
  const allDishes = getAllDishes();

  // Filter dishes based on active section
  const getDishesBySection = () => {
    if (activeSection === "food") {
      return [...(menuItems.starters || []), ...(menuItems.mains || [])];
    } else if (activeSection === "drinks") {
      return menuItems.drinks || [];
    } else if (activeSection === "desserts") {
      return menuItems.desserts || [];
    }
    return [];
  };

  // Filter dishes based on category and search
  const getFilteredDishes = () => {
    let dishes = [];

    if (activeCategory === "all") {
      dishes = getDishesBySection();
    } else {
      dishes = menuItems[activeCategory] || [];
      // Filter by section
      if (activeSection === "food") {
        dishes = dishes.filter(
          (dish) => dish.category === "starters" || dish.category === "mains",
        );
      } else if (activeSection === "drinks") {
        dishes = dishes.filter((dish) => dish.category === "drinks");
      } else if (activeSection === "desserts") {
        dishes = dishes.filter((dish) => dish.category === "desserts");
      }
    }

    // Apply search filter
    if (searchTerm) {
      dishes = dishes.filter(
        (dish) =>
          dish.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dish.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return dishes;
  };

  const filteredItems = getFilteredDishes();

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedToCart((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedToCart((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  // ✅ Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Handle Add Dish Submit
  const handleAddDishSubmit = (e) => {
    e.preventDefault();

    const dishData = {
      ...formData,
      price: parseFloat(formData.price),
      ingredients: formData.ingredients.split(",").map((item) => item.trim()),
      updatedAt: new Date().toISOString(),
    };

    addDish(dishData);
    alert("✅ New dish added successfully!");
    setShowAddForm(false);
  };

  // ✅ Handle Edit Dish Submit - FIXED!
  const handleEditDishSubmit = (e) => {
    e.preventDefault();

    if (!editingItem) return;

    const dishData = {
      ...formData,
      price: parseFloat(formData.price),
      ingredients: formData.ingredients.split(",").map((item) => item.trim()),
      updatedAt: new Date().toISOString(),
    };

    updateDish(editingItem.id, dishData);
    alert("✅ Dish updated successfully!");
    setShowEditForm(false);
    setEditingItem(null);
  };

  // ✅ Admin function to delete dish directly from MenuPage
  const handleAdminDelete = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this dish?")) {
      deleteDish(id);
      alert("🗑️ Dish deleted successfully!");
    }
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Special offer dishes
  const todaysSpecial =
    allDishes.find((dish) => dish.isChefSpecial) || allDishes[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-amber-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden h-96 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070"
            alt="Restaurant dishes"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>

        <div className="relative flex flex-col items-center justify-center h-full px-4 text-center">
          <span className="px-4 py-2 mb-4 text-sm font-medium border rounded-full bg-amber-500/20 backdrop-blur-sm text-amber-300 border-amber-500/30">
            ✦ SINCE 2026 ✦
          </span>
          <h1 className="mb-4 text-5xl font-bold text-white md:text-7xl">
            Our <span className="text-amber-400">Menu</span>
          </h1>
          <p className="max-w-3xl text-xl text-gray-200 md:text-2xl">
            Carefully crafted dishes using the finest seasonal ingredients
          </p>

          {/* ✅ ADMIN QUICK ACTIONS - Only visible to admin */}
          {isAdmin && (
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-6 py-2 text-sm text-white transition-colors rounded-full shadow-lg bg-amber-500 hover:bg-amber-600"
              >
                <FaPlusCircle />
                Add New Dish
              </button>
            </div>
          )}

          {/* Search Bar */}
          <div className="w-full max-w-md mt-8">
            <div className="relative">
              <FaSearch className="absolute text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-12 pr-4 text-white placeholder-gray-300 border rounded-full bg-white/10 backdrop-blur-md border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ✅ ADD DISH MODAL */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between p-6 bg-white border-b border-gray-200">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-transparent bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text">
                <FaPlusCircle className="text-amber-500" />
                Add New Dish
              </h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-2 transition-colors rounded-lg hover:bg-gray-100"
              >
                <FaTimes className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleAddDishSubmit} className="p-6 space-y-6">
              {/* Form fields - same as before */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Dish Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 transition-all border-2 border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="e.g., Truffle Pasta"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Price ($) *
                    </label>
                    <div className="relative">
                      <FaDollarSign className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full py-2 pl-10 pr-4 transition-all border-2 border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 transition-all border-2 border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Describe the dish..."
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2 transition-all border-2 border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="starters">Starters</option>
                      <option value="mains">Main Courses</option>
                      <option value="desserts">Desserts</option>
                      <option value="drinks">Drinks</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Preparation Time
                    </label>
                    <input
                      type="text"
                      name="prepTime"
                      value={formData.prepTime}
                      onChange={handleChange}
                      className="w-full px-4 py-2 transition-all border-2 border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="20-30 min"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Image URL
                  </label>
                  <div className="relative">
                    <FaImage className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      className="w-full py-2 pl-10 pr-4 transition-all border-2 border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Ingredients (comma separated) *
                  </label>
                  <textarea
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                    required
                    rows={2}
                    className="w-full px-4 py-2 transition-all border-2 border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="pasta, truffle oil, parmesan, garlic"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <label className="flex items-center gap-2 p-3 transition-colors rounded-lg cursor-pointer bg-gray-50 hover:bg-amber-50">
                    <input
                      type="checkbox"
                      name="isVegetarian"
                      checked={formData.isVegetarian}
                      onChange={handleChange}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                    />
                    <FaLeaf className="text-green-500" />
                    <span className="text-sm text-gray-700">Vegetarian</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 transition-colors rounded-lg cursor-pointer bg-gray-50 hover:bg-amber-50">
                    <input
                      type="checkbox"
                      name="isSpicy"
                      checked={formData.isSpicy}
                      onChange={handleChange}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                    />
                    <FaFire className="text-red-500" />
                    <span className="text-sm text-gray-700">Spicy</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 transition-colors rounded-lg cursor-pointer bg-gray-50 hover:bg-amber-50">
                    <input
                      type="checkbox"
                      name="isPopular"
                      checked={formData.isPopular}
                      onChange={handleChange}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                    />
                    <FaStar className="text-yellow-500" />
                    <span className="text-sm text-gray-700">Popular</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 transition-colors rounded-lg cursor-pointer bg-gray-50 hover:bg-amber-50">
                    <input
                      type="checkbox"
                      name="isChefSpecial"
                      checked={formData.isChefSpecial}
                      onChange={handleChange}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                    />
                    <FaStar className="text-amber-500" />
                    <span className="text-sm text-gray-700">Chef Special</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex items-center justify-center flex-1 gap-2 px-6 py-3 font-medium text-white transition-all duration-300 rounded-lg shadow-md bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg"
                >
                  <FaSave />
                  Add Dish
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-3 font-medium text-gray-700 transition-all duration-300 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ✅ EDIT DISH MODAL - FIXED! */}
      {showEditForm && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between p-6 bg-white border-b border-gray-200">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-transparent bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text">
                <FaEdit className="text-amber-500" />
                Edit Dish: {editingItem.name}
              </h2>
              <button
                onClick={() => {
                  setShowEditForm(false);
                  setEditingItem(null);
                }}
                className="p-2 transition-colors rounded-lg hover:bg-gray-100"
              >
                <FaTimes className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleEditDishSubmit} className="p-6 space-y-6">
              {/* Form fields - same as add form but with edit button */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Dish Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 transition-all border-2 border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Price ($) *
                    </label>
                    <div className="relative">
                      <FaDollarSign className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full py-2 pl-10 pr-4 transition-all border-2 border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 transition-all border-2 border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2 transition-all border-2 border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="starters">Starters</option>
                      <option value="mains">Main Courses</option>
                      <option value="desserts">Desserts</option>
                      <option value="drinks">Drinks</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Preparation Time
                    </label>
                    <input
                      type="text"
                      name="prepTime"
                      value={formData.prepTime}
                      onChange={handleChange}
                      className="w-full px-4 py-2 transition-all border-2 border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Image URL
                  </label>
                  <div className="relative">
                    <FaImage className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      className="w-full py-2 pl-10 pr-4 transition-all border-2 border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Ingredients (comma separated) *
                  </label>
                  <textarea
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                    required
                    rows={2}
                    className="w-full px-4 py-2 transition-all border-2 border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <label className="flex items-center gap-2 p-3 transition-colors rounded-lg cursor-pointer bg-gray-50 hover:bg-amber-50">
                    <input
                      type="checkbox"
                      name="isVegetarian"
                      checked={formData.isVegetarian}
                      onChange={handleChange}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                    />
                    <FaLeaf className="text-green-500" />
                    <span className="text-sm text-gray-700">Vegetarian</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 transition-colors rounded-lg cursor-pointer bg-gray-50 hover:bg-amber-50">
                    <input
                      type="checkbox"
                      name="isSpicy"
                      checked={formData.isSpicy}
                      onChange={handleChange}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                    />
                    <FaFire className="text-red-500" />
                    <span className="text-sm text-gray-700">Spicy</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 transition-colors rounded-lg cursor-pointer bg-gray-50 hover:bg-amber-50">
                    <input
                      type="checkbox"
                      name="isPopular"
                      checked={formData.isPopular}
                      onChange={handleChange}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                    />
                    <FaStar className="text-yellow-500" />
                    <span className="text-sm text-gray-700">Popular</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 transition-colors rounded-lg cursor-pointer bg-gray-50 hover:bg-amber-50">
                    <input
                      type="checkbox"
                      name="isChefSpecial"
                      checked={formData.isChefSpecial}
                      onChange={handleChange}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                    />
                    <FaStar className="text-amber-500" />
                    <span className="text-sm text-gray-700">Chef Special</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex items-center justify-center flex-1 gap-2 px-6 py-3 font-medium text-white transition-all duration-300 rounded-lg shadow-md bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg"
                >
                  <FaSave />
                  Update Dish
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditForm(false);
                    setEditingItem(null);
                  }}
                  className="px-6 py-3 font-medium text-gray-700 transition-all duration-300 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sticky Navigation */}
      <div className="shadow-md  top-20 bg-white/80 backdrop-blur-md">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Section Tabs */}
          <div className="flex justify-center py-4 space-x-4">
            {menuSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setActiveCategory("all");
                  }}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    activeSection === section.id
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                      : "text-gray-700 hover:bg-amber-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {section.name}
                </button>
              );
            })}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 pb-4">
            {menuCategories
              .filter((cat) => {
                if (activeSection === "food") {
                  return (
                    cat.id === "all" ||
                    cat.id === "starters" ||
                    cat.id === "mains"
                  );
                } else if (activeSection === "drinks") {
                  return cat.id === "all" || cat.id === "drinks";
                } else if (activeSection === "desserts") {
                  return cat.id === "all" || cat.id === "desserts";
                }
                return true;
              })
              .map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === category.id
                        ? "bg-amber-100 text-amber-700 border-2 border-amber-500"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    {category.name}
                  </button>
                );
              })}
          </div>
        </div>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Special Offers Banner */}
        {todaysSpecial && (
          <div className="relative p-8 mb-12 overflow-hidden shadow-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative flex flex-col items-center justify-between md:flex-row">
              <div className="mb-4 md:mb-0">
                <span className="px-4 py-1 text-sm font-medium text-white border rounded-full bg-white/20 backdrop-blur-sm border-white/30">
                  ⭐ Chef's Special
                </span>
                <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl">
                  {todaysSpecial.name}
                </h3>
                <p className="max-w-lg mt-2 text-amber-100">
                  {todaysSpecial.description}
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <span className="text-3xl font-bold text-white">
                    $
                    {typeof todaysSpecial.price === "number"
                      ? todaysSpecial.price.toFixed(2)
                      : todaysSpecial.price}
                  </span>
                  <span className="line-through text-white/80">
                    $
                    {(
                      (typeof todaysSpecial.price === "number"
                        ? todaysSpecial.price
                        : parseFloat(todaysSpecial.price)) * 1.2
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
              <Link
                to={`/dish/${todaysSpecial.id}`}
                className="px-8 py-3 font-semibold transition-all duration-300 transform bg-white rounded-full shadow-lg text-amber-600 hover:bg-gray-100 hover:shadow-xl hover:-translate-y-1"
              >
                View Details →
              </Link>
            </div>
          </div>
        )}

        {/* ✅ ADMIN CONTROLS BAR */}
        {isAdmin && (
          <div className="flex flex-wrap items-center justify-between p-4 mb-8 border-2 bg-amber-50 border-amber-200 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 text-white rounded-lg bg-amber-500">
                <FaUtensils />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Admin Controls</h3>
                <p className="text-xs text-gray-600">
                  Click Edit button on any dish to modify it
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-2 sm:mt-0">
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors rounded-lg shadow-md bg-amber-500 hover:bg-amber-600"
              >
                <FaPlusCircle />
                Add New Dish
              </button>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "Dish" : "Dishes"} Available
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaFilter className="text-amber-500" />
            <span>
              Filtered by{" "}
              {activeCategory === "all" ? "all categories" : activeCategory}
            </span>
          </div>
        </div>

        {/* Menu Items Grid - WITH WORKING EDIT BUTTON! */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  item.isChefSpecial
                    ? "border-2 border-amber-400 relative"
                    : "border border-gray-100"
                }`}
              >
                {item.isChefSpecial && (
                  <div className="absolute z-10 top-4 left-4">
                    <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-amber-500 to-orange-500">
                      <FaStar className="w-3 h-3" />
                      Chef's Special
                    </span>
                  </div>
                )}

                {/* ✅ ADMIN ACTION BUTTONS - EDIT NOW WORKS! */}
                {isAdmin && (
                  <div className="absolute z-20 flex gap-2 top-4 right-4">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleEditClick(item);
                      }}
                      className="p-2 text-white transition-colors bg-blue-500 rounded-full shadow-lg hover:bg-blue-600"
                      title="Edit Dish"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleAdminDelete(item.id, e)}
                      className="p-2 text-white transition-colors bg-red-500 rounded-full shadow-lg hover:bg-red-600"
                      title="Delete Dish"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={
                      item.image ||
                      "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={item.name}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:opacity-100"></div>

                  {/* Badges */}
                  <div className="absolute flex flex-col space-y-2 top-4 right-4">
                    {item.isNew && (
                      <span className="px-3 py-1 text-xs font-bold text-white bg-green-500 rounded-full shadow-md">
                        NEW
                      </span>
                    )}
                    {item.isPopular && (
                      <span className="px-3 py-1 text-xs font-bold text-white bg-blue-500 rounded-full shadow-md">
                        🔥 POPULAR
                      </span>
                    )}
                    {item.isVegetarian && (
                      <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-white rounded-full shadow-md bg-emerald-500">
                        <FaLeaf className="w-3 h-3" />
                        VEG
                      </span>
                    )}
                    {item.isSpicy && (
                      <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-white bg-red-500 rounded-full shadow-md">
                        <FaFire className="w-3 h-3" />
                        SPICY
                      </span>
                    )}
                  </div>

                  {/* Quick Add Overlay */}
                  <div className="absolute bottom-0 transition-transform duration-300 translate-y-full inset-x-4 group-hover:translate-y-0">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex items-center justify-center w-full gap-2 py-3 font-semibold text-white transition-colors bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    >
                      {addedToCart[item.id] ? (
                        <>
                          <FaShoppingCart className="w-4 h-4" />
                          Added to Cart!
                        </>
                      ) : (
                        <>
                          <FaShoppingCart className="w-4 h-4" />
                          Quick Add
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-amber-600">
                      {item.name}
                    </h3>
                    <span className="text-lg font-bold text-amber-600">
                      $
                      {typeof item.price === "number"
                        ? item.price.toFixed(2)
                        : parseFloat(item.price).toFixed(2)}
                    </span>
                  </div>

                  <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Rating & Time */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <FaStar className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-700">
                        {item.rating || "4.8"}
                      </span>
                      <span className="text-xs text-gray-500">(120+)</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <FaClock className="w-3 h-3 text-amber-500" />
                      <span>{item.prepTime || "20-30 min"}</span>
                    </div>
                  </div>

                  {/* Ingredients Preview */}
                  {item.ingredients && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.ingredients.slice(0, 3).map((ing, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full"
                        >
                          {ing}
                        </span>
                      ))}
                      {item.ingredients.length > 3 && (
                        <span className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full">
                          +{item.ingredients.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <Link
                      to={`/dish/${item.id}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-amber-600 hover:text-amber-700 group/link"
                    >
                      View Details
                      <span className="transition-transform group-hover/link:translate-x-1">
                        →
                      </span>
                    </Link>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg md:hidden bg-amber-500 hover:bg-amber-600"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="py-16 text-center">
            <div className="max-w-md p-12 mx-auto bg-white shadow-xl rounded-2xl">
              <FaUtensils className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="mb-2 text-2xl font-bold text-gray-900">
                No dishes found
              </h3>
              <p className="mb-6 text-gray-600">
                {searchTerm
                  ? `No results for "${searchTerm}"`
                  : "No dishes available in this category"}
              </p>

              {isAdmin ? (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 text-white transition-colors rounded-lg shadow-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                >
                  <FaPlusCircle />
                  Add Your First Dish
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory("all");
                  }}
                  className="px-6 py-3 text-white transition-colors rounded-lg bg-amber-500 hover:bg-amber-600"
                >
                  View All Dishes
                </button>
              )}
            </div>
          </div>
        )}

        {/* Dietary Information */}
        <div className="p-8 mt-16 bg-white border shadow-lg rounded-2xl border-amber-100">
          <h3 className="flex items-center gap-2 mb-6 text-xl font-bold text-gray-900">
            <FaLeaf className="text-emerald-500" />
            Dietary Information
          </h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-sm font-medium text-gray-700">
                Vegetarian
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Popular</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-sm font-medium text-gray-700">
                Chef's Special
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">
                New Item
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Spicy</span>
            </div>
          </div>
        </div>

        {/* Private Dining CTA */}
        <div className="mt-16 text-center">
          <div className="p-12 border bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border-amber-200">
            <h3 className="mb-4 text-3xl font-bold text-gray-900">
              Private Dining & Events
            </h3>
            <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-600">
              Host your next special occasion in our private dining room.
              Perfect for birthdays, anniversaries, and corporate events.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-white transition-all duration-300 transform rounded-full shadow-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 hover:shadow-xl hover:-translate-y-1"
            >
              Enquire Now
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Cart Notification */}
      {cartCount > 0 && (
        <Link to="/cart" className="fixed z-50 bottom-6 right-24 group">
          <div className="relative">
            <div className="p-4 text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:shadow-2xl hover:scale-110">
              <FaShoppingCart className="w-6 h-6" />
            </div>
            <span className="absolute flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full shadow-lg -top-2 -right-2">
              {cartCount > 9 ? "9+" : cartCount}
            </span>
            <span className="absolute px-3 py-1 mr-3 text-sm text-white transition-opacity -translate-y-1/2 bg-gray-900 rounded-lg opacity-0 right-full top-1/2 group-hover:opacity-100 whitespace-nowrap">
              View Cart
            </span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default MenuPage;
