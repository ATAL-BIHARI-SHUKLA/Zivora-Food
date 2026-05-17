// src/pages/AdminPanel.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMenu } from "../context/MenuContext";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaUtensils,
  FaSearch,
  FaTimes,
  FaCheck,
  FaImage,
  FaDollarSign,
  FaTag,
  FaList,
  FaArrowLeft,
  FaExclamationTriangle,
  FaStar,
  FaLeaf,
  FaFire,
  FaSave,
  FaEye,
  FaTh,
  FaThList,
} from "react-icons/fa";

const AdminPanel = () => {
  const location = useLocation();
  const { menuItems, addDish, updateDish, deleteDish } = useMenu();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "starters",
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

  // Reset form when closing
  useEffect(() => {
    if (!showForm && !editingItem) {
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "starters",
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
    }
  }, [showForm, editingItem]);

  // Handle edit from navigation state
  useEffect(() => {
    if (location.state?.editDishId) {
      // Find the dish in menuItems
      const allDishesArray = Object.entries(menuItems).flatMap(
        ([category, items]) =>
          Array.isArray(items)
            ? items.map((item) => ({ ...item, category }))
            : [],
      );
      const dishToEdit = allDishesArray.find(
        (dish) => dish.id === location.state.editDishId,
      );
      if (dishToEdit) {
        handleEdit(dishToEdit);
      }
      // Clear the state from URL
      window.history.replaceState({}, document.title);
    }
  }, [location, menuItems]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dishData = {
      ...formData,
      price: parseFloat(formData.price),
      ingredients: formData.ingredients.split(",").map((item) => item.trim()),
      updatedAt: new Date().toISOString(),
    };

    if (editingItem) {
      updateDish(editingItem.id, dishData);
      alert("✅ Dish updated successfully!");
    } else {
      addDish(dishData);
      alert("✅ New dish added successfully!");
    }

    setShowForm(false);
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || "",
      description: item.description || "",
      price: item.price || "",
      category: item.category || "starters",
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
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = (id) => {
    deleteDish(id);
    setDeleteConfirm(null);
    alert("🗑️ Dish deleted successfully!");
  };

  // Flatten all dishes for display
  const allDishes = menuItems
    ? Object.entries(menuItems).flatMap(([category, items]) =>
        Array.isArray(items)
          ? items.map((item) => ({ ...item, category }))
          : [],
      )
    : [];

  const filteredDishes = allDishes.filter((dish) => {
    const matchesSearch =
      dish.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dish.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === "all" || dish.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  const categoryList = [
    { id: "all", name: "All Items", icon: FaList, count: allDishes.length },
    {
      id: "starters",
      name: "Starters",
      icon: FaUtensils,
      count: menuItems?.starters?.length || 0,
    },
    {
      id: "mains",
      name: "Main Courses",
      icon: FaUtensils,
      count: menuItems?.mains?.length || 0,
    },
    {
      id: "desserts",
      name: "Desserts",
      icon: FaUtensils,
      count: menuItems?.desserts?.length || 0,
    },
    {
      id: "drinks",
      name: "Drinks",
      icon: FaUtensils,
      count: menuItems?.drinks?.length || 0,
    },
  ];

  const stats = {
    total: allDishes.length,
    starters: menuItems?.starters?.length || 0,
    mains: menuItems?.mains?.length || 0,
    desserts: menuItems?.desserts?.length || 0,
    drinks: menuItems?.drinks?.length || 0,
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-gray-50 to-amber-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col items-start justify-between mb-8 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-transparent md:text-4xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your restaurant menu - Add, edit, or remove dishes
            </p>
          </div>
          <Link
            to="/menu"
            className="flex items-center gap-2 px-4 py-2 mt-4 transition-all duration-300 bg-white border-2 rounded-lg md:mt-0 text-amber-600 hover:bg-amber-50 border-amber-200"
          >
            <FaArrowLeft />
            Back to Menu
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-5">
          <div className="p-4 bg-white border shadow-md rounded-xl border-amber-100">
            <p className="text-sm text-gray-500">Total Items</p>
            <p className="text-2xl font-bold text-amber-600">{stats.total}</p>
          </div>
          <div className="p-4 bg-white border shadow-md rounded-xl border-amber-100">
            <p className="text-sm text-gray-500">Starters</p>
            <p className="text-2xl font-bold text-amber-600">
              {stats.starters}
            </p>
          </div>
          <div className="p-4 bg-white border shadow-md rounded-xl border-amber-100">
            <p className="text-sm text-gray-500">Mains</p>
            <p className="text-2xl font-bold text-amber-600">{stats.mains}</p>
          </div>
          <div className="p-4 bg-white border shadow-md rounded-xl border-amber-100">
            <p className="text-sm text-gray-500">Desserts</p>
            <p className="text-2xl font-bold text-amber-600">
              {stats.desserts}
            </p>
          </div>
          <div className="p-4 bg-white border shadow-md rounded-xl border-amber-100">
            <p className="text-sm text-gray-500">Drinks</p>
            <p className="text-2xl font-bold text-amber-600">{stats.drinks}</p>
          </div>
        </div>

        {/* ===== ACTION BAR - ADD BUTTON IS HERE ===== */}
        <div className="p-6 mb-8 bg-white border shadow-lg rounded-xl border-amber-100">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <FaSearch className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 pl-10 pr-4 transition-all border-2 border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-3">
              {/* View Toggle */}
              <div className="flex overflow-hidden border-2 border-gray-200 rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-2 flex items-center gap-1 ${
                    viewMode === "grid"
                      ? "bg-amber-500 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <FaTh className="w-4 h-4" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 flex items-center gap-1 ${
                    viewMode === "list"
                      ? "bg-amber-500 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <FaThList className="w-4 h-4" />
                  <span className="hidden sm:inline">List</span>
                </button>
              </div>

              {/* ===== ADD NEW DISH BUTTON - VISIBLE HERE ===== */}
              <button
                onClick={() => {
                  setEditingItem(null);
                  setShowForm(true);
                }}
                className="flex items-center gap-2 px-6 py-2 font-medium text-white transition-all duration-300 rounded-lg shadow-md bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg"
              >
                <FaPlus />
                <span className="hidden sm:inline">Add New Dish</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categoryList.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeTab === category.id
                    ? "bg-amber-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-amber-100 hover:text-amber-600"
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{category.name}</span>
                <span className="sm:hidden">
                  {category.id === "all" ? "All" : category.id}
                </span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === category.id
                      ? "bg-white text-amber-600"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 flex items-center justify-between p-6 bg-white border-b border-gray-200">
                <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text">
                  {editingItem ? "✏️ Edit Dish" : "➕ Add New Dish"}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingItem(null);
                  }}
                  className="p-2 transition-colors rounded-lg hover:bg-gray-100"
                >
                  <FaTimes className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    className="flex items-center justify-center flex-1 gap-2 px-6 py-3 font-medium text-white transition-all duration-300 rounded-lg shadow-md bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg"
                  >
                    <FaSave />
                    {editingItem ? "Update Dish" : "Add Dish"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
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

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md p-6 bg-white shadow-2xl rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <FaExclamationTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Delete Dish</h3>
              </div>
              <p className="mb-6 text-gray-600">
                Are you sure you want to delete this dish? This action cannot be
                undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => confirmDelete(deleteConfirm)}
                  className="flex-1 px-4 py-2 font-medium text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Menu Items Grid with Edit/Delete Buttons */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDishes.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden transition-all duration-500 bg-white border border-gray-100 shadow-md rounded-xl hover:shadow-2xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={
                      item.image ||
                      "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={item.name}
                    className="object-cover w-full h-full"
                  />
                  <span className="absolute px-3 py-1 text-xs font-semibold rounded-full top-4 left-4 bg-white/90">
                    {item.category}
                  </span>
                  <span className="absolute px-3 py-1 text-sm font-bold text-white rounded-full top-4 right-4 bg-amber-500">
                    $
                    {typeof item.price === "number"
                      ? item.price.toFixed(2)
                      : parseFloat(item.price).toFixed(2)}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="mb-3 text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>

                  {/* ===== EDIT/DELETE BUTTONS - VISIBLE HERE ===== */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex items-center justify-center flex-1 gap-2 px-3 py-2 transition-colors rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200"
                    >
                      <FaEdit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-red-700 transition-colors bg-red-100 rounded-lg hover:bg-red-200"
                    >
                      <FaTrash className="w-4 h-4" />
                      Delete
                    </button>
                    <Link
                      to={`/dish/${item.id}`}
                      className="px-3 py-2 text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      <FaEye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="max-w-md p-12 mx-auto bg-white shadow-lg rounded-xl">
              <FaUtensils className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                No dishes found
              </h3>
              <p className="mb-6 text-gray-600">
                {searchTerm
                  ? `No results for "${searchTerm}"`
                  : "Start by adding your first dish"}
              </p>
              {/* ===== ADD BUTTON IN EMPTY STATE ===== */}
              <button
                onClick={() => {
                  setEditingItem(null);
                  setShowForm(true);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 text-white transition-colors rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                <FaPlus />
                Add Your First Dish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
