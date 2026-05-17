import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import img1 from "../assets/photo-1473093295043-cdd812d0e601.jpeg";
import img2 from "../assets/photo-1551504734-5ee1c4a1479b.jpeg";
import img3 from "../assets/photo-1563805042-7684c019e1cb.jpeg";
import img4 from "../assets/img4.jpeg";
import img5 from "../assets/img5.jpeg";
import img6 from "../assets/img6.jpeg";

import {
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaClock,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaCheckCircle,
} from "react-icons/fa";
import { menuItems } from "../data/sampleMenuData";

const Home = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});
  const scrollContainerRef = useRef(null);

  // Combine all dishes from different categories
  const allDishes = [
    ...(menuItems.starters || []),
    ...(menuItems.mains || []),
    ...(menuItems.desserts || []),
    ...(menuItems.drinks || []),
  ];

  const addToCart = (dish) => {
    setCartItems((prev) => {
      let updatedCart;
      const existingItem = prev.find((item) => item.id === dish.id);

      if (existingItem) {
        updatedCart = prev.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      } else {
        updatedCart = [...prev, { ...dish, quantity: 1 }];
      }

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });

    // Show feedback
    setAddedToCart((prev) => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAddedToCart((prev) => ({ ...prev, [dish.id]: false }));
    }, 1500);
  };
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const specialDishes = [
    {
      id: "special-1",
      name: "Truffle Pasta",
      description: "Handmade pasta with black truffle sauce and parmesan",
      image: img1,
      price: 28,
      rating: 4.8,
      prepTime: "20-25 min",
      category: "Specials",
    },
    {
      id: "special-2",
      name: "Seafood Platter",
      description: "Fresh catch of the day with seasonal seafood",
      image: img2,
      price: 42,
      rating: 4.9,
      prepTime: "25-30 min",
      category: "Specials",
    },
    {
      id: "special-3",
      name: "Chocolate Soufflé",
      description: "Warm chocolate soufflé with vanilla bean ice cream",
      image: img3,
      price: 16,
      rating: 4.7,
      prepTime: "15-20 min",
      category: "Specials",
    },
    {
      id: "special-4",
      name: "Grilled Ribeye",
      description: "Premium cut with herb butter and roasted vegetables",
      image: img4,
      price: 38,
      rating: 4.8,
      prepTime: "25-30 min",
      category: "Specials",
    },
    {
      id: "special-5",
      name: "Mediterranean Salad",
      description: "Fresh greens with feta, olives, and citrus vinaigrette",
      image: img5,
      price: 18,
      rating: 4.6,
      prepTime: "10-15 min",
      category: "Specials",
    },
    {
      id: "special-6",
      name: "Saffron Risotto",
      description: "Creamy arborio rice with saffron and parmesan",
      image: img6,
      price: 24,
      rating: 4.7,
      prepTime: "20-25 min",
      category: "Specials",
    },
  ];

  const events = [
    {
      title: "Wine Pairing Dinner",
      date: "Feb 15, 2026",
      time: "7:00 PM",
      description: "Five-course meal with sommelier-selected premium wines",
      image: img4,
      spots: "12 spots left",
      price: "$89 per person",
    },
    {
      title: "Live Jazz Nights",
      date: "Every Friday",
      time: "8:00 PM",
      description: "Smooth jazz with our signature cocktails and tapas",
      image: img5,
      spots: "Reserve now",
      price: "$35 cover",
    },
    {
      title: "Chef's Table Experience",
      date: "By Reservation",
      time: "Flexible",
      description: "Exclusive kitchen-side dining with our executive chef",
      image: img6,
      spots: "Limited seats",
      price: "$150 per person",
    },
  ];

  // Calculate cart count
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Floating Cart Indicator */}
      {cartCount > 0 && (
        <Link
          to="/cart"
          className="fixed z-50 flex items-center gap-2 p-4 text-white transition-all duration-300 rounded-full shadow-lg bottom-6 right-24 bg-amber-500 hover:bg-amber-600 hover:scale-110 group"
        >
          <FaShoppingCart className="w-5 h-5" />
          <span className="bg-white text-amber-600 rounded-full px-2 py-0.5 text-xs font-bold">
            {cartCount}
          </span>
          <span className="overflow-hidden transition-all duration-300 max-w-0 group-hover:max-w-xs whitespace-nowrap">
            View Cart
          </span>
        </Link>
      )}

      {/* Hero Section */}
      <div className="relative w-full min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070"
            alt="Restaurant interior"
            className="object-cover w-full h-full transition-transform transform scale-105 hover:scale-100 duration-7000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        </div>

        {/* Floating elements for visual interest */}
        <div className="absolute w-32 h-32 rounded-full top-20 left-10 bg-amber-500/20 blur-3xl animate-pulse"></div>
        <div className="absolute w-40 h-40 delay-1000 rounded-full bottom-20 right-10 bg-orange-500/20 blur-3xl animate-pulse"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-start justify-center max-w-4xl min-h-screen px-6 md:px-16 lg:px-24">
          <div className="animate-fadeInUp">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium border rounded-full bg-amber-500/20 backdrop-blur-sm text-amber-300 border-amber-500/30">
              ✦ EST. 2026 ✦
            </span>
            <h1 className="mb-6 text-5xl font-bold leading-tight text-white md:text-7xl">
              Taste the <span className="text-amber-400">Difference</span>
            </h1>
            <p className="max-w-2xl mb-8 text-xl leading-relaxed text-gray-200 md:text-2xl">
              Authentic flavors crafted with passion. Where every dish tells a
              story of tradition and innovation.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to="/menu"
                className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium text-white transition-all duration-300 shadow-lg group bg-amber-500 rounded-xl hover:bg-amber-600 hover:shadow-amber-500/25"
              >
                View Menu
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 text-lg font-medium text-white transition-all duration-300 border bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 border-white/30"
              >
                Book a Table
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 text-white">
              <div>
                <p className="text-3xl font-bold">15+</p>
                <p className="text-sm text-gray-300">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-bold">50+</p>
                <p className="text-sm text-gray-300">Dish Varieties</p>
              </div>
              <div>
                <p className="text-3xl font-bold">10k+</p>
                <p className="text-sm text-gray-300">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Specials Section */}
      <div className="relative px-6 py-20 overflow-hidden lg:px-12 bg-gradient-to-br from-gray-50 to-white">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-amber-100 blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-30"></div>

        <div className="relative mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-sm font-semibold tracking-wider uppercase text-amber-600">
                Fresh from our kitchen
              </span>
              <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
                Today's Specials
              </h2>
              <p className="mt-2 text-gray-600">
                Chef's carefully curated recommendations for you
              </p>
            </div>

            {/* Scroll Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => scroll("left")}
                className="p-3 transition-all duration-300 bg-white border border-gray-100 rounded-full shadow-lg hover:shadow-xl hover:bg-amber-50 group"
                aria-label="Scroll left"
              >
                <FaChevronLeft className="text-gray-600 transition-colors group-hover:text-amber-600" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-3 transition-all duration-300 bg-white border border-gray-100 rounded-full shadow-lg hover:shadow-xl hover:bg-amber-50 group"
                aria-label="Scroll right"
              >
                <FaChevronRight className="text-gray-600 transition-colors group-hover:text-amber-600" />
              </button>
            </div>
          </div>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 pb-8 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {specialDishes.map((dish) => (
              <div
                key={dish.id}
                className="flex-none overflow-hidden transition-all duration-500 bg-white border border-gray-100 shadow-lg w-80 rounded-2xl hover:shadow-2xl group hover:-translate-y-2"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:opacity-100"></div>

                  {/* Badges */}
                  <span className="absolute flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-800 rounded-full shadow-lg top-4 left-4 bg-white/90 backdrop-blur-sm">
                    <FaStar className="text-yellow-400" />
                    {dish.rating}
                  </span>
                  <span className="absolute px-4 py-2 text-sm font-semibold text-white rounded-full shadow-lg top-4 right-4 bg-amber-500">
                    ${dish.price}
                  </span>

                  {/* Quick Add Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:opacity-100">
                    {addedToCart[dish.id] ? (
                      <div className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-green-500 rounded-lg shadow-lg">
                        <FaCheckCircle className="w-4 h-4" />
                        Added to Cart!
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(dish)}
                        className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition-all duration-300 transform translate-y-4 rounded-lg shadow-lg bg-amber-500 group-hover:translate-y-0 hover:bg-amber-600 hover:shadow-amber-500/25"
                      >
                        <FaShoppingCart className="w-4 h-4" />
                        Quick Add +
                      </button>
                    )}
                    <p className="flex items-center gap-1 mt-2 text-xs text-white transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                      <FaClock className="w-3 h-3" />
                      {dish.prepTime} • Fresh preparation
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-amber-600">
                      {dish.name}
                    </h3>
                    <span className="ml-2 text-lg font-bold text-amber-600">
                      ${dish.price}
                    </span>
                  </div>

                  <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                    {dish.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaClock className="text-amber-500" />
                      <span>{dish.prepTime}</span>
                    </div>

                    {/* Mobile/Tablet Quick Add Button */}
                    <button
                      onClick={() => addToCart(dish)}
                      className="flex items-center gap-1 px-4 py-2 text-xs font-medium text-white transition-colors rounded-lg md:hidden bg-amber-500 hover:bg-amber-600"
                    >
                      {addedToCart[dish.id] ? (
                        <>
                          <FaCheckCircle className="w-3 h-3" />
                          Added
                        </>
                      ) : (
                        "Add to Cart"
                      )}
                    </button>

                    <Link
                      to="/menu"
                      className="items-center hidden gap-2 text-sm font-medium md:inline-flex text-amber-600 hover:text-amber-700 group/link"
                    >
                      View Details
                      <span className="transition-transform group-hover/link:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(specialDishes.length)].map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTo({
                      left: i * 344,
                      behavior: "smooth",
                    });
                  }
                }}
                className="group"
              >
                <div className="w-2 h-2 transition-all duration-300 bg-gray-300 rounded-full group-hover:bg-amber-500 group-hover:w-6"></div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top 10 Bestsellers Section */}
      <div className="relative px-6 py-6 overflow-hidden bg-white lg:px-12">
        {/* Background decoration */}
        <div className="absolute right-0 rounded-full top-20 w-72 h-72 bg-amber-100 blur-3xl opacity-20"></div>
        <div className="absolute left-0 bg-orange-100 rounded-full bottom-20 w-72 h-72 blur-3xl opacity-20"></div>

        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between mb-8 md:flex-row md:items-center">
            <div>
              <span className="text-sm font-semibold tracking-wider uppercase text-amber-600">
                Customer Favorites
              </span>
              <h2 className="flex items-center gap-3 mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
                🔥 Top 10 Bestsellers
                <span className="px-4 py-1 text-sm font-medium rounded-full bg-amber-100 text-amber-800 whitespace-nowrap">
                  In Your Locality
                </span>
              </h2>
              <p className="mt-2 text-gray-600">
                Most ordered dishes this week
              </p>
            </div>

            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link
                to="/menu"
                className="flex items-center gap-2 font-medium text-amber-600 hover:text-amber-700 group whitespace-nowrap"
              >
                View Full Menu
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>

              {/* Scroll Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const container =
                      document.getElementById("bestsellers-scroll");
                    if (container)
                      container.scrollBy({ left: -400, behavior: "smooth" });
                  }}
                  className="p-2.5 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:bg-amber-50 border border-gray-200 group"
                  aria-label="Scroll left"
                >
                  <FaChevronLeft className="w-4 h-4 text-gray-600 transition-colors group-hover:text-amber-600" />
                </button>
                <button
                  onClick={() => {
                    const container =
                      document.getElementById("bestsellers-scroll");
                    if (container)
                      container.scrollBy({ left: 400, behavior: "smooth" });
                  }}
                  className="p-2.5 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:bg-amber-50 border border-gray-200 group"
                  aria-label="Scroll right"
                >
                  <FaChevronRight className="w-4 h-4 text-gray-600 transition-colors group-hover:text-amber-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Scrollable Container */}
          <div
            id="bestsellers-scroll"
            className="flex gap-6 pb-6 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {allDishes.slice(0, 10).map((item, index) => (
              <div
                key={item.id}
                className="flex-none w-[280px] bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group hover:-translate-y-2"
              >
                <div className="relative overflow-hidden h-44">
                  <img
                    src={
                      item.image ||
                      "https://via.placeholder.com/300x200?text=No+Image"
                    }
                    alt={item.name}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Ranking Badge */}
                  <div className="absolute flex items-center gap-1 top-3 left-3">
                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                      {index === 0 && "👑 #1"}
                      {index === 1 && "🥈 #2"}
                      {index === 2 && "🥉 #3"}
                      {index > 2 && `#${index + 1}`}
                    </span>
                  </div>

                  {/* Popular badge for top 3 */}
                  {index < 3 && (
                    <span className="absolute px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full shadow-lg top-3 right-3 animate-pulse">
                      🔥 Hot
                    </span>
                  )}

                  {/* Quick add overlay */}
                  <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:opacity-100">
                    {addedToCart[item.id] ? (
                      <div className="bg-green-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-lg flex items-center gap-2">
                        <FaCheckCircle className="w-4 h-4" />
                        Added!
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-amber-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-amber-600 shadow-lg hover:shadow-amber-500/25 flex items-center gap-2"
                      >
                        <FaShoppingCart className="w-4 h-4" />
                        Quick Add
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <h3 className="flex-1 text-base font-bold text-gray-900 truncate transition-colors group-hover:text-amber-600">
                      {item.name}
                    </h3>
                    <span className="ml-2 text-lg font-bold text-amber-600">
                      $
                      {typeof item.price === "string"
                        ? parseFloat(item.price).toFixed(2)
                        : item.price.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-2 mt-1 min-h-[32px]">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-xs text-yellow-400" />
                      <span className="text-xs font-medium text-gray-700">
                        4.8
                      </span>
                      <span className="text-xs text-gray-500">(120+)</span>
                    </div>

                    <button
                      onClick={() => addToCart(item)}
                      className="flex items-center gap-1 px-4 py-2 text-xs font-medium text-white transition-colors rounded-lg shadow-sm bg-amber-500 hover:bg-amber-600 hover:shadow"
                    >
                      {addedToCart[item.id] ? (
                        <>
                          <FaCheckCircle className="w-3 h-3" />
                          Added
                        </>
                      ) : (
                        <>
                          Add
                          <span className="text-lg leading-none">+</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Delivery time estimate */}
                  <div className="flex items-center gap-1 mt-2 text-[10px] text-gray-400 border-t border-gray-100 pt-2">
                    <FaClock className="w-3 h-3" />
                    <span>20-30 min • Free delivery</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="flex gap-1.5">
              {[...Array(10)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const container =
                      document.getElementById("bestsellers-scroll");
                    if (container) {
                      container.scrollTo({
                        left: i * 286,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="relative group"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-amber-500 transition-all duration-300 group-hover:w-4"></div>
                </button>
              ))}
            </div>
            <span className="ml-2 text-xs text-gray-400">10 items</span>
          </div>
        </div>
      </div>

      {/* Events Section - Fixed with working button */}
      <div className="px-6 py-20 lg:px-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold tracking-wider uppercase text-amber-600">
              Don't Miss Out
            </span>
            <h2 className="mt-2 mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Upcoming Events
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Join us for these special occasions and create unforgettable
              memories
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <div
                key={index}
                className="overflow-hidden transition-all duration-500 bg-white border border-gray-100 shadow-lg group rounded-2xl hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                  {/* Date Badge */}
                  <div className="absolute px-4 py-2 rounded-lg bottom-4 left-4 bg-white/90 backdrop-blur-sm">
                    <p className="text-sm font-semibold text-gray-900">
                      {event.date}
                    </p>
                    <p className="text-xs text-gray-600">{event.time}</p>
                  </div>

                  {/* Spots left badge */}
                  <span className="absolute px-3 py-1 text-xs font-semibold text-white rounded-full top-4 right-4 bg-amber-500">
                    {event.spots}
                  </span>

                  {/* Price badge */}
                  <span className="absolute px-3 py-1 text-xs font-semibold text-white rounded-full top-4 left-4 bg-black/70 backdrop-blur-sm">
                    {event.price}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-amber-600">
                    {event.title}
                  </h3>
                  <p className="mb-4 text-gray-600">{event.description}</p>

                  {/* Reserve button - Fixed with onClick handler */}
                  {/* <button
                    className="w-full px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 font-medium shadow-lg hover:shadow-amber-500/25 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <span>Reserve Your Spot</span>
                    <span className="text-lg">→</span>
                  </button> */}
                  {/* Reserve button - Updated with navigation to contact page */}
                  <button
                    onClick={() => {
                      // You can optionally pass event data as state
                      navigate("/contact", {
                        state: {
                          selectedEvent: event.title,
                          eventDate: event.date,
                          eventTime: event.time,
                        },
                      });
                    }}
                    className="w-full px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 font-medium shadow-lg hover:shadow-amber-500/25 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <span>Reserve Your Spot</span>
                    <span className="text-lg">→</span>
                  </button>

                  {/* Additional info */}
                  <p className="mt-3 text-xs text-center text-gray-400">
                    *Cancel up to 24 hours in advance
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="relative px-6 py-24 overflow-hidden lg:px-12">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070"
            alt="Restaurant ambiance"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/85 to-black/90"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="p-12 border bg-white/5 backdrop-blur-sm rounded-3xl border-white/10">
            <FaQuoteLeft className="w-16 h-16 mx-auto mb-8 text-amber-400 opacity-80" />

            <p className="mb-8 text-2xl italic leading-relaxed text-white md:text-3xl">
              "The dining experience here is unparalleled. Every dish tells a
              story of passion and tradition. The seafood pasta is absolutely to
              die for – it's become my weekly ritual!"
            </p>

            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 to-orange-400">
                <span className="text-2xl font-bold text-white">SJ</span>
              </div>
              <div className="text-left">
                <p className="text-lg font-medium text-white">Sarah Johnson</p>
                <p className="text-amber-300">
                  Food Critic, Epicurean Magazine
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex justify-center gap-1 mt-6">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="w-5 h-5 text-yellow-400" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Home;
