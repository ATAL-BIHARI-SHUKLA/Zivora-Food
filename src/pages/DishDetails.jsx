// src/pages/DishDetails.jsx
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaShoppingCart,
  FaStar,
  FaClock,
  FaLeaf,
  FaFire,
  FaUtensils,
  FaCheckCircle,
  FaPlus,
  FaMinus,
  FaHeart,
  FaShare,
} from "react-icons/fa";
import { useMenu } from "../context/MenuContext";

const DishDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getDishById, addToCart } = useMenu();

  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const foundDish = getDishById(id);
      setDish(foundDish);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id, getDishById]);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (!dish) return;

    // Add item multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(dish);
    }

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleOrderNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaUtensils className="w-8 h-8 text-amber-500 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-600 mt-4">Loading dish details...</p>
        </div>
      </div>
    );
  }

  if (!dish) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-amber-50 p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md text-center">
          <div className="bg-amber-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaUtensils className="w-12 h-12 text-amber-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Dish Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            We couldn't find the dish you're looking for. It might have been
            removed or moved to a different category.
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  // Mock additional images
  const dishImages = [
    dish.image,
    dish.image?.replace(".jpg", "-2.jpg"),
    dish.image?.replace(".jpg", "-3.jpg"),
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-amber-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/menu"
            className="group flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-amber-50 hover:text-amber-600 transition-all duration-300 shadow-sm border border-gray-200"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Menu
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isFavorite
                  ? "bg-red-50 text-red-600"
                  : "bg-white text-gray-600 hover:bg-red-50 hover:text-red-600"
              }`}
            >
              <FaHeart
                className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
              />
            </button>
            <button className="p-2 bg-white text-gray-600 rounded-lg hover:bg-amber-50 hover:text-amber-600 transition-all duration-300">
              <FaShare className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative h-[400px] lg:h-[600px] bg-gray-900">
              <img
                src={dishImages[activeImage]}
                alt={dish.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                {dish.isNew && (
                  <span className="px-3 py-1.5 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg">
                    NEW
                  </span>
                )}
                {dish.isChefSpecial && (
                  <span className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                    <FaStar className="w-3 h-3" />
                    CHEF'S SPECIAL
                  </span>
                )}
                {dish.isPopular && (
                  <span className="px-3 py-1.5 bg-blue-500 text-white text-xs font-bold rounded-full shadow-lg">
                    🔥 POPULAR
                  </span>
                )}
              </div>

              {/* Thumbnail Navigation */}
              {dishImages.length > 1 && (
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex justify-center gap-2">
                    {dishImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          activeImage === idx
                            ? "border-amber-500 scale-110 shadow-lg"
                            : "border-white/50 hover:border-white"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${dish.name} ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dietary Badges */}
              <div className="absolute top-6 right-6 flex flex-col gap-2">
                {dish.isVegetarian && (
                  <span className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                    <FaLeaf className="w-3 h-3" />
                    VEGETARIAN
                  </span>
                )}
                {dish.isSpicy && (
                  <span className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                    <FaFire className="w-3 h-3" />
                    SPICY
                  </span>
                )}
              </div>
            </div>

            {/* Details Section */}
            <div className="p-8 lg:p-12 flex flex-col">
              {/* Category */}
              <div className="mb-4">
                <span className="text-sm font-medium text-amber-600 uppercase tracking-wider">
                  {dish.category || "Specialty"}
                </span>
              </div>

              {/* Title & Price */}
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  {dish.name}
                </h1>
                <div className="text-right">
                  <span className="text-3xl lg:text-4xl font-bold text-amber-600">
                    $
                    {typeof dish.price === "number"
                      ? dish.price.toFixed(2)
                      : parseFloat(dish.price).toFixed(2)}
                  </span>
                  <p className="text-sm text-gray-500">per serving</p>
                </div>
              </div>

              {/* Rating & Time */}
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(dish.rating || 4.8)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {dish.rating || "4.8"} (120+ reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaClock className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-medium">
                    {dish.prepTime || "20-30 min"}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {dish.description}
                </p>
              </div>

              {/* Ingredients */}
              {dish.ingredients && dish.ingredients.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FaUtensils className="text-amber-500" />
                    Ingredients
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {dish.ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-amber-50 text-amber-800 rounded-full text-sm font-medium border border-amber-200"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Nutritional Info */}
              <div className="mb-8 p-6 bg-gray-50 rounded-2xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Nutritional Information
                </h3>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-500">Calories</p>
                    <p className="text-lg font-bold text-gray-900">
                      {dish.calories || "450"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Protein</p>
                    <p className="text-lg font-bold text-gray-900">
                      {dish.protein || "25g"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Carbs</p>
                    <p className="text-lg font-bold text-gray-900">
                      {dish.carbs || "35g"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fat</p>
                    <p className="text-lg font-bold text-gray-900">
                      {dish.fat || "20g"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Quantity
                </h3>
                <div className="flex items-center">
                  <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={decrementQuantity}
                      className="w-12 h-12 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <FaMinus className="w-4 h-4 text-gray-600" />
                    </button>
                    <div className="w-16 h-12 flex items-center justify-center bg-white font-semibold text-gray-900 text-lg">
                      {quantity}
                    </div>
                    <button
                      onClick={incrementQuantity}
                      className="w-12 h-12 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <FaPlus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <span className="ml-4 text-sm text-gray-500">
                    $
                    {(
                      (typeof dish.price === "number"
                        ? dish.price
                        : parseFloat(dish.price)) * quantity
                    ).toFixed(2)}{" "}
                    total
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3 text-lg ${
                    addedToCart ? "from-green-500 to-green-600" : ""
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <FaCheckCircle className="w-5 h-5" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <FaShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </button>

                <button
                  onClick={handleOrderNow}
                  className="flex-1 px-6 py-4 bg-white border-2 border-amber-500 text-amber-600 font-semibold rounded-xl hover:bg-amber-50 transition-all duration-300 flex items-center justify-center gap-3 text-lg"
                >
                  Order Now
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <FaCheckCircle className="text-green-500 w-4 h-4" />
                  Freshly prepared with premium ingredients
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2 mt-2">
                  <FaCheckCircle className="text-green-500 w-4 h-4" />
                  Free delivery on orders over $50
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Items */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-40 bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishDetails;
