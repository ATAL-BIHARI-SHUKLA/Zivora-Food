import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaArrowLeft,
  FaTrash,
  FaPlus,
  FaMinus,
  FaCreditCard,
  FaTruck,
  FaShieldAlt,
  FaRegClock,
  FaTag,
  FaPercent,
  FaGift,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendar,
  FaClock,
  FaLock,
  FaApple,
  FaGooglePay,
  FaPaypal,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [deliveryFee] = useState(0.5);
  const [taxRate] = useState(0.08);

  // Checkout states
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [showCheckout, setShowCheckout] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Form states
  const [deliveryDetails, setDeliveryDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    deliveryDate: "",
    deliveryTime: "",
    specialInstructions: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    // Set default delivery date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDeliveryDetails((prev) => ({
      ...prev,
      deliveryDate: tomorrow.toISOString().split("T")[0],
    }));
  }, []);

  const handleCancelOrder = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item,
    );
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const handlePromoApply = () => {
    if (promoCode.toUpperCase() === "SAVE20") {
      setPromoApplied(true);
    }
  };

  const validateCheckoutForm = () => {
    const newErrors = {};

    if (!deliveryDetails.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!deliveryDetails.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(deliveryDetails.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!deliveryDetails.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,}$/.test(deliveryDetails.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number must be at least 10 digits";
    }

    if (deliveryOption === "delivery") {
      if (!deliveryDetails.address.trim()) {
        newErrors.address = "Address is required";
      }
      if (!deliveryDetails.city.trim()) {
        newErrors.city = "City is required";
      }
      if (!deliveryDetails.zipCode.trim()) {
        newErrors.zipCode = "ZIP code is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToCheckout = () => {
    setShowCheckout(true);
    setCheckoutStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = () => {
    if (validateCheckoutForm()) {
      // Generate random order ID
      const newOrderId =
        "ORD" + Math.random().toString(36).substr(2, 9).toUpperCase();
      setOrderId(newOrderId);
      setOrderPlaced(true);

      // Clear cart after order placed
      setTimeout(() => {
        localStorage.removeItem("cartItems");
        setCartItems([]);
      }, 2000);
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const discount = promoApplied ? subtotal * 0.2 : 0;
  const tax = subtotal * taxRate;
  const total = subtotal + deliveryFee + tax - discount;

  // Order Success View
  if (orderPlaced) {
    return (
      <div className="relative min-h-screen px-4 py-12 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-white sm:px-6 lg:px-8">
        {/* Decorative background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute bg-green-200 rounded-full top-20 left-10 w-96 h-96 mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute rounded-full top-40 right-10 w-96 h-96 bg-emerald-200 mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <div className="p-8 text-center border shadow-2xl bg-white/80 backdrop-blur-lg rounded-3xl md:p-12 border-amber-100">
            <div className="flex items-center justify-center mx-auto mb-6 rounded-full shadow-xl bg-gradient-to-br from-green-400 to-emerald-500 w-28 h-28">
              <FaCheckCircle className="text-white w-14 h-14" />
            </div>

            <h1 className="mb-4 text-4xl font-bold text-transparent bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text">
              Order Placed Successfully!
            </h1>

            <p className="mb-2 text-lg text-gray-600">
              Thank you for your order,{" "}
              <span className="font-semibold text-amber-600">
                {deliveryDetails.fullName}
              </span>
              !
            </p>

            <div className="p-6 my-8 border bg-amber-50 rounded-2xl border-amber-200">
              <p className="mb-2 text-sm text-gray-600">Order Number</p>
              <p className="font-mono text-3xl font-bold text-amber-600">
                {orderId}
              </p>
            </div>

            <div className="mb-8 space-y-4">
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <FaClock className="text-amber-500" />
                <span>Estimated delivery: 30-45 minutes</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <FaEnvelope className="text-amber-500" />
                <span>Confirmation sent to {deliveryDetails.email}</span>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/menu"
                className="px-8 py-3 font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl hover:from-amber-600 hover:to-orange-600 hover:shadow-amber-500/30"
              >
                Order More
              </Link>
              <Link
                to="/"
                className="px-8 py-3 font-semibold transition-all duration-300 bg-white border-2 text-amber-600 rounded-xl border-amber-200 hover:bg-amber-50"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Checkout Section
  if (showCheckout) {
    return (
      <div className="relative min-h-screen px-4 py-12 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-white sm:px-6 lg:px-8">
        {/* Decorative background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute rounded-full top-20 left-10 w-96 h-96 bg-amber-200 mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bg-orange-200 rounded-full top-40 right-10 w-96 h-96 mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Checkout Header */}
          <div className="flex items-center justify-between p-6 mb-8 border shadow-lg bg-white/80 backdrop-blur-lg rounded-2xl border-amber-100">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowCheckout(false)}
                className="flex items-center gap-2 px-4 py-2 transition-all duration-300 bg-white border-2 text-amber-600 rounded-xl hover:bg-amber-50 border-amber-200"
              >
                <FaArrowLeft />
                Back to Cart
              </button>
              <h1 className="text-2xl font-bold text-transparent md:text-3xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text">
                Checkout
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Step {checkoutStep} of 3
              </span>
              <div className="flex gap-1">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      step === checkoutStep
                        ? "w-8 bg-amber-500"
                        : step < checkoutStep
                          ? "bg-green-500"
                          : "bg-gray-300"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Checkout Form */}
            <div className="space-y-6 lg:col-span-2">
              {/* Step 1: Delivery Details */}
              <div className="p-6 border shadow-xl bg-white/80 backdrop-blur-lg rounded-2xl border-amber-100">
                <h2 className="flex items-center gap-2 mb-6 text-xl font-bold text-gray-900">
                  <span className="flex items-center justify-center w-8 h-8 text-sm text-white rounded-full bg-amber-500">
                    1
                  </span>
                  Delivery Details
                </h2>

                {/* Delivery Options */}
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => setDeliveryOption("delivery")}
                    className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300 ${
                      deliveryOption === "delivery"
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 hover:border-amber-200"
                    }`}
                  >
                    <FaTruck
                      className={`w-6 h-6 mx-auto mb-2 ${
                        deliveryOption === "delivery"
                          ? "text-amber-500"
                          : "text-gray-400"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        deliveryOption === "delivery"
                          ? "text-amber-600"
                          : "text-gray-600"
                      }`}
                    >
                      Delivery
                    </span>
                  </button>
                  <button
                    onClick={() => setDeliveryOption("pickup")}
                    className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300 ${
                      deliveryOption === "pickup"
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 hover:border-amber-200"
                    }`}
                  >
                    <FaMapMarkerAlt
                      className={`w-6 h-6 mx-auto mb-2 ${
                        deliveryOption === "pickup"
                          ? "text-amber-500"
                          : "text-gray-400"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        deliveryOption === "pickup"
                          ? "text-amber-600"
                          : "text-gray-600"
                      }`}
                    >
                      Pickup
                    </span>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        Full Name *
                      </label>
                      <div className="relative">
                        <FaUser className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                        <input
                          type="text"
                          value={deliveryDetails.fullName}
                          onChange={(e) =>
                            setDeliveryDetails({
                              ...deliveryDetails,
                              fullName: e.target.value,
                            })
                          }
                          className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all ${
                            errors.fullName
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                          placeholder="John Doe"
                        />
                      </div>
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        Email *
                      </label>
                      <div className="relative">
                        <FaEnvelope className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                        <input
                          type="email"
                          value={deliveryDetails.email}
                          onChange={(e) =>
                            setDeliveryDetails({
                              ...deliveryDetails,
                              email: e.target.value,
                            })
                          }
                          className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all ${
                            errors.email ? "border-red-500" : "border-gray-200"
                          }`}
                          placeholder="john@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                      <input
                        type="tel"
                        value={deliveryDetails.phone}
                        onChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            phone: e.target.value,
                          })
                        }
                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all ${
                          errors.phone ? "border-red-500" : "border-gray-200"
                        }`}
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {deliveryOption === "delivery" && (
                    <>
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Delivery Address *
                        </label>
                        <div className="relative">
                          <FaMapMarkerAlt className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                          <input
                            type="text"
                            value={deliveryDetails.address}
                            onChange={(e) =>
                              setDeliveryDetails({
                                ...deliveryDetails,
                                address: e.target.value,
                              })
                            }
                            className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all ${
                              errors.address
                                ? "border-red-500"
                                : "border-gray-200"
                            }`}
                            placeholder="123 Main St"
                          />
                        </div>
                        {errors.address && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.address}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label className="block mb-1 text-sm font-medium text-gray-700">
                            City *
                          </label>
                          <input
                            type="text"
                            value={deliveryDetails.city}
                            onChange={(e) =>
                              setDeliveryDetails({
                                ...deliveryDetails,
                                city: e.target.value,
                              })
                            }
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all ${
                              errors.city ? "border-red-500" : "border-gray-200"
                            }`}
                            placeholder="New York"
                          />
                          {errors.city && (
                            <p className="mt-1 text-xs text-red-500">
                              {errors.city}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block mb-1 text-sm font-medium text-gray-700">
                            ZIP Code *
                          </label>
                          <input
                            type="text"
                            value={deliveryDetails.zipCode}
                            onChange={(e) =>
                              setDeliveryDetails({
                                ...deliveryDetails,
                                zipCode: e.target.value,
                              })
                            }
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all ${
                              errors.zipCode
                                ? "border-red-500"
                                : "border-gray-200"
                            }`}
                            placeholder="10001"
                          />
                          {errors.zipCode && (
                            <p className="mt-1 text-xs text-red-500">
                              {errors.zipCode}
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        Delivery Date
                      </label>
                      <div className="relative">
                        <FaCalendar className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                        <input
                          type="date"
                          value={deliveryDetails.deliveryDate}
                          onChange={(e) =>
                            setDeliveryDetails({
                              ...deliveryDetails,
                              deliveryDate: e.target.value,
                            })
                          }
                          className="w-full py-3 pl-10 pr-4 transition-all border-2 border-gray-200 outline-none rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        Delivery Time
                      </label>
                      <div className="relative">
                        <FaClock className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                        <select
                          value={deliveryDetails.deliveryTime}
                          onChange={(e) =>
                            setDeliveryDetails({
                              ...deliveryDetails,
                              deliveryTime: e.target.value,
                            })
                          }
                          className="w-full py-3 pl-10 pr-4 transition-all bg-white border-2 border-gray-200 outline-none appearance-none rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        >
                          <option value="">Select time</option>
                          <option value="11:00-12:00">
                            11:00 AM - 12:00 PM
                          </option>
                          <option value="12:00-13:00">
                            12:00 PM - 1:00 PM
                          </option>
                          <option value="13:00-14:00">1:00 PM - 2:00 PM</option>
                          <option value="18:00-19:00">6:00 PM - 7:00 PM</option>
                          <option value="19:00-20:00">7:00 PM - 8:00 PM</option>
                          <option value="20:00-21:00">8:00 PM - 9:00 PM</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Special Instructions
                    </label>
                    <textarea
                      value={deliveryDetails.specialInstructions}
                      onChange={(e) =>
                        setDeliveryDetails({
                          ...deliveryDetails,
                          specialInstructions: e.target.value,
                        })
                      }
                      rows="3"
                      className="w-full px-4 py-3 transition-all border-2 border-gray-200 outline-none rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Any special requests? (allergies, extra napkins, etc.)"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Step 2: Payment Method */}
              <div className="p-6 border shadow-xl bg-white/80 backdrop-blur-lg rounded-2xl border-amber-100">
                <h2 className="flex items-center gap-2 mb-6 text-xl font-bold text-gray-900">
                  <span className="flex items-center justify-center w-8 h-8 text-sm text-white rounded-full bg-amber-500">
                    2
                  </span>
                  Payment Method
                </h2>

                <div className="grid grid-cols-2 gap-3 mb-6 md:grid-cols-4">
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      paymentMethod === "card"
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 hover:border-amber-200"
                    }`}
                  >
                    <FaCreditCard
                      className={`w-6 h-6 mx-auto mb-2 ${
                        paymentMethod === "card"
                          ? "text-amber-500"
                          : "text-gray-400"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        paymentMethod === "card"
                          ? "text-amber-600"
                          : "text-gray-600"
                      }`}
                    >
                      Card
                    </span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod("paypal")}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      paymentMethod === "paypal"
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 hover:border-amber-200"
                    }`}
                  >
                    <FaPaypal
                      className={`w-6 h-6 mx-auto mb-2 ${
                        paymentMethod === "paypal"
                          ? "text-amber-500"
                          : "text-gray-400"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        paymentMethod === "paypal"
                          ? "text-amber-600"
                          : "text-gray-600"
                      }`}
                    >
                      PayPal
                    </span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod("googlepay")}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      paymentMethod === "googlepay"
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 hover:border-amber-200"
                    }`}
                  >
                    <FaGooglePay
                      className={`w-6 h-6 mx-auto mb-2 ${
                        paymentMethod === "googlepay"
                          ? "text-amber-500"
                          : "text-gray-400"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        paymentMethod === "googlepay"
                          ? "text-amber-600"
                          : "text-gray-600"
                      }`}
                    >
                      Google Pay
                    </span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod("applepay")}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      paymentMethod === "applepay"
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 hover:border-amber-200"
                    }`}
                  >
                    <FaApple
                      className={`w-6 h-6 mx-auto mb-2 ${
                        paymentMethod === "applepay"
                          ? "text-amber-500"
                          : "text-gray-400"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        paymentMethod === "applepay"
                          ? "text-amber-600"
                          : "text-gray-600"
                      }`}
                    >
                      Apple Pay
                    </span>
                  </button>
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        Card Number
                      </label>
                      <div className="relative">
                        <FaCreditCard className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full py-3 pl-10 pr-4 transition-all border-2 border-gray-200 outline-none rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                        <div className="absolute flex gap-1 transform -translate-y-1/2 right-3 top-1/2">
                          <FaCcVisa className="w-6 h-6 text-blue-600" />
                          <FaCcMastercard className="w-6 h-6 text-orange-600" />
                          <FaCcAmex className="w-6 h-6 text-blue-400" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 transition-all border-2 border-gray-200 outline-none rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 transition-all border-2 border-gray-200 outline-none rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-3 transition-all border-2 border-gray-200 outline-none rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === "paypal" && (
                  <div className="py-6 text-center">
                    <FaPaypal className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                    <p className="mb-4 text-gray-600">
                      You'll be redirected to PayPal to complete your payment
                    </p>
                    <button className="px-6 py-3 text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700">
                      Continue with PayPal
                    </button>
                  </div>
                )}

                {(paymentMethod === "googlepay" ||
                  paymentMethod === "applepay") && (
                  <div className="py-6 text-center">
                    <div className="inline-flex items-center gap-2 p-4 mb-4 text-white bg-black rounded-xl">
                      {paymentMethod === "googlepay" ? (
                        <FaGooglePay className="w-8 h-8" />
                      ) : (
                        <FaApple className="w-8 h-8" />
                      )}
                      <span className="font-semibold">
                        {paymentMethod === "googlepay"
                          ? "Google Pay"
                          : "Apple Pay"}
                      </span>
                    </div>
                    <p className="text-gray-600">Quick and secure payment</p>
                  </div>
                )}
              </div>

              {/* Step 3: Review Order */}
              <div className="p-6 border shadow-xl bg-white/80 backdrop-blur-lg rounded-2xl border-amber-100">
                <h2 className="flex items-center gap-2 mb-6 text-xl font-bold text-gray-900">
                  <span className="flex items-center justify-center w-8 h-8 text-sm text-white rounded-full bg-amber-500">
                    3
                  </span>
                  Review Order
                </h2>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-2 border-b border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-500">
                          x{item.quantity}
                        </span>
                        <span className="font-medium text-gray-900">
                          {item.name}
                        </span>
                      </div>
                      <span className="font-semibold text-amber-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky p-6 border shadow-xl bg-white/80 backdrop-blur-lg rounded-2xl border-amber-100 top-6">
                <h2 className="flex items-center gap-2 mb-6 text-xl font-bold text-transparent bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text">
                  <FaCreditCard className="text-amber-500" />
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span className="flex items-center gap-1">
                        <FaPercent className="w-3 h-3" />
                        Discount (20%)
                      </span>
                      <span className="font-medium">
                        -${discount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-600">
                    <span className="flex items-center gap-1">
                      <FaTruck className="w-3 h-3" />
                      {deliveryOption === "delivery"
                        ? "Delivery Fee"
                        : "Pickup"}
                    </span>
                    <span className="font-medium">
                      {deliveryOption === "delivery"
                        ? `$${deliveryFee.toFixed(2)}`
                        : "$0.00"}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Tax (8%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>

                  <div className="pt-4 my-4 border-t-2 border-amber-100">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    className="flex items-center justify-center w-full gap-2 px-6 py-4 text-lg font-bold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl hover:from-amber-600 hover:to-orange-600 hover:shadow-amber-500/30 hover:-translate-y-1"
                  >
                    <FaLock className="w-5 h-5" />
                    Place Order
                  </button>

                  <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
                    <FaShieldAlt className="w-3 h-3" />
                    <span>Secure payment</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <FaTruck className="w-3 h-3" />
                    <span>Free delivery on orders $50+</span>
                  </div>

                  <div className="p-4 mt-4 border bg-amber-50 rounded-xl border-amber-200">
                    <p className="flex items-center gap-2 text-xs text-gray-600">
                      <FaCheckCircle className="w-4 h-4 text-green-500" />
                      By placing this order, you agree to our Terms of Service
                      and Privacy Policy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original Cart View
  return (
    <div className="relative min-h-screen px-4 py-12 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-white sm:px-6 lg:px-8">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute rounded-full top-20 left-10 w-96 h-96 bg-amber-200 mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bg-orange-200 rounded-full top-40 right-10 w-96 h-96 mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col items-start justify-between p-6 mb-10 border shadow-lg sm:flex-row sm:items-center bg-white/80 backdrop-blur-lg rounded-2xl border-amber-100">
          <div className="flex items-center gap-4">
            <div className="p-3 shadow-lg bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl">
              <FaShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-transparent md:text-4xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text">
                Your Cart
              </h1>
              <p className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                <FaRegClock className="text-amber-500" />
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}{" "}
                in your cart
              </p>
            </div>
          </div>
          <Link
            to="/"
            className="mt-4 sm:mt-0 group flex items-center gap-2 px-5 py-2.5 bg-white text-amber-600 rounded-xl hover:bg-amber-50 transition-all duration-300 border-2 border-amber-200 font-medium"
          >
            <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items Section */}
          <div className="space-y-6 lg:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden transition-all duration-500 border shadow-lg group bg-white/80 backdrop-blur-lg rounded-2xl hover:shadow-2xl border-amber-100 hover:border-amber-300 hover:-translate-y-1"
              >
                <div className="flex p-6">
                  <div className="relative w-24 h-24 overflow-hidden shadow-md rounded-xl">
                    <img
                      src={
                        item.image ||
                        "https://via.placeholder.com/300x200?text=No+Image"
                      }
                      alt={item.name}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex-1 ml-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-amber-600">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600 line-clamp-1">
                          {item.description || "Delicious restaurant dish"}
                        </p>
                      </div>
                      <button
                        onClick={() => handleCancelOrder(item.id)}
                        className="p-2 text-gray-400 transition-all duration-300 rounded-full hover:text-red-500 hover:scale-110 hover:bg-red-50"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center overflow-hidden bg-white border-2 shadow-sm border-amber-200 rounded-xl">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="px-3 py-2 transition-all duration-300 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-600 hover:from-amber-100 hover:to-orange-100"
                          >
                            <FaMinus className="w-3 h-3" />
                          </button>
                          <span className="px-4 py-2 font-semibold text-gray-700 bg-white min-w-[50px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-3 py-2 transition-all duration-300 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-600 hover:from-amber-100 hover:to-orange-100"
                          >
                            <FaPlus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-sm text-gray-500">
                          ${item.price.toFixed(2)} each
                        </span>
                      </div>

                      <span className="text-lg font-bold text-amber-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Promo Code Section */}
            <div className="p-6 border shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-amber-200">
              <div className="flex items-center gap-2 mb-4">
                <FaTag className="w-5 h-5 text-amber-600" />
                <h3 className="font-semibold text-gray-900">
                  Have a promo code?
                </h3>
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code (SAVE20)"
                  className="flex-1 px-4 py-3 transition-all border-2 outline-none border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                />
                <button
                  onClick={handlePromoApply}
                  disabled={promoApplied}
                  className={`px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <div className="flex items-center gap-2 mt-3 text-sm font-medium text-green-600">
                  <FaShieldAlt className="w-4 h-4" />
                  20% discount applied successfully!
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="sticky p-6 border shadow-xl bg-white/80 backdrop-blur-lg rounded-2xl border-amber-100 top-6">
              <h2 className="flex items-center gap-2 mb-6 text-xl font-bold text-transparent bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text">
                <FaCreditCard className="text-amber-500" />
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-1">
                      <FaPercent className="w-3 h-3" />
                      Discount (20%)
                    </span>
                    <span className="font-medium">-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    <FaTruck className="w-3 h-3" />
                    Delivery Fee
                  </span>
                  <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>

                <div className="pt-4 my-4 border-t-2 border-amber-100">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Including all taxes and delivery charges
                  </p>
                </div>

                {/* Proceed to Checkout Button - Enhanced */}
                <button
                  onClick={handleProceedToCheckout}
                  className="flex items-center justify-center w-full gap-3 px-6 py-4 text-lg font-bold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl hover:from-amber-600 hover:to-orange-600 hover:shadow-amber-500/30 hover:-translate-y-1 group"
                >
                  <span>Proceed to Checkout</span>
                  <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </button>

                {/* Express Checkout Options */}
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 text-gray-500 bg-white/80 backdrop-blur-sm">
                        Express checkout
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <button className="flex items-center justify-center px-4 py-2 transition-all duration-300 bg-white border-2 border-gray-200 rounded-xl hover:border-amber-300 group">
                      <FaPaypal className="w-5 h-5 text-blue-600 transition-transform group-hover:scale-110" />
                    </button>
                    <button className="flex items-center justify-center px-4 py-2 transition-all duration-300 bg-white border-2 border-gray-200 rounded-xl hover:border-amber-300 group">
                      <FaGooglePay className="w-5 h-5 text-gray-700 transition-transform group-hover:scale-110" />
                    </button>
                    <button className="flex items-center justify-center px-4 py-2 transition-all duration-300 bg-white border-2 border-gray-200 rounded-xl hover:border-amber-300 group">
                      <FaApple className="w-5 h-5 text-gray-700 transition-transform group-hover:scale-110" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
                  <FaShieldAlt className="w-3 h-3" />
                  <span>Secure payment</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <FaTruck className="w-3 h-3" />
                  <span>Free delivery on orders $50+</span>
                </div>

                {/* Trust Badges */}
                <div className="p-4 mt-4 border bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-amber-200">
                  <div className="flex items-center gap-2 mb-2">
                    <FaCheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-xs font-medium text-gray-700">
                      30-day money-back guarantee
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-xs font-medium text-gray-700">
                      Fresh preparation guaranteed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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

export default Cart;
