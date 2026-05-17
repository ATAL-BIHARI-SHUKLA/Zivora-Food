// src/components/Chatbot.jsx
import { useState, useRef, useEffect } from "react";
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaUser,
  FaComment,
} from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Simulate bot response
  const getBotResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();

    if (
      lowerMsg.includes("menu") ||
      lowerMsg.includes("dish") ||
      lowerMsg.includes("food")
    ) {
      return "You can check our full menu in the Menu section! We have delicious starters, mains, desserts, and drinks. 🍽️";
    } else if (lowerMsg.includes("special") || lowerMsg.includes("today")) {
      return "Today's specials include Truffle Pasta, Seafood Platter, and Chocolate Soufflé! Check them out on our homepage. ✨";
    } else if (
      lowerMsg.includes("book") ||
      lowerMsg.includes("reservation") ||
      lowerMsg.includes("table")
    ) {
      return "You can book a table through our Contact page or call us directly at (123) 456-7890. We'd love to have you! 🍷";
    } else if (
      lowerMsg.includes("hour") ||
      lowerMsg.includes("open") ||
      lowerMsg.includes("time")
    ) {
      return "We're open Monday-Thursday: 11am-10pm, Friday-Saturday: 11am-11pm, and Sunday: 10am-9pm. 🕐";
    } else if (lowerMsg.includes("cart") || lowerMsg.includes("order")) {
      return "Your cart is ready! Click the cart icon in the navbar to view and checkout. 🛒";
    } else if (lowerMsg.includes("thank")) {
      return "You're welcome! Anything else I can help with? 😊";
    } else if (
      lowerMsg.includes("hello") ||
      lowerMsg.includes("hi") ||
      lowerMsg.includes("hey")
    ) {
      return "Hello! How can I assist you today? 🎉";
    } else if (lowerMsg.includes("admin") || lowerMsg.includes("manager")) {
      return "For admin assistance, please contact our management team directly. 👨‍💼";
    } else {
      return "I'm not sure about that. Would you like to speak with our staff? You can also check our FAQ or Contact page! 📞";
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMsg = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");

    // Show typing indicator
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(
      () => {
        const botMsg = {
          id: messages.length + 2,
          text: getBotResponse(inputMessage),
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      },
      1000 + Math.random() * 1000,
    );
  };

  // Format timestamp
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Chat Button - Circular Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        aria-label="Open chat"
      >
        <div className="relative">
          <MdSupportAgent className="w-7 h-7" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white animate-pulse"></span>
        </div>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl transition-all duration-500 transform origin-bottom-right ${
          isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-0 opacity-0 translate-y-10 pointer-events-none"
        }`}
        style={{ maxHeight: "calc(100vh - 100px)" }}
      >
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-white/30 blur-sm"></div>
              <FaRobot className="relative w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Restaurant Assistant</h3>
              <p className="flex items-center gap-1 text-xs text-amber-100">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                Online • Usually replies instantly
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
          >
            <FaTimes className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="p-4 overflow-y-auto h-96 bg-gradient-to-b from-gray-50 to-white">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2 ${
                  msg.sender === "user" ? "flex-row-reverse" : ""
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    msg.sender === "bot"
                      ? "bg-gradient-to-r from-amber-500 to-orange-500"
                      : "bg-gray-700"
                  }`}
                >
                  {msg.sender === "bot" ? (
                    <FaRobot className="w-4 h-4 text-white" />
                  ) : (
                    <FaUser className="w-4 h-4 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[70%] ${
                    msg.sender === "user" ? "order-1" : ""
                  }`}
                >
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      msg.sender === "bot"
                        ? "bg-white text-gray-800 border border-gray-200 shadow-sm"
                        : "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  <p
                    className={`text-[10px] mt-1 text-gray-400 ${
                      msg.sender === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500">
                  <FaRobot className="w-4 h-4 text-white" />
                </div>
                <div className="px-4 py-3 text-gray-800 bg-white border border-gray-200 shadow-sm rounded-2xl">
                  <div className="flex gap-1">
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input */}
        <form
          onSubmit={handleSendMessage}
          className="p-4 bg-white border-t border-gray-200 rounded-b-2xl"
        >
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 text-sm transition-all border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="flex-shrink-0 p-3 text-white transition-all duration-300 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
            >
              <FaPaperPlane className="w-4 h-4" />
            </button>
          </div>

          {/* Quick action buttons */}
          <div className="flex gap-2 pb-1 mt-3 overflow-x-auto">
            {["Menu", "Specials", "Hours", "Book Table"].map((action) => (
              <button
                key={action}
                onClick={() => {
                  setInputMessage(action);
                  setTimeout(() => {
                    inputRef.current?.focus();
                  }, 0);
                }}
                className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-amber-700 rounded-full transition-colors whitespace-nowrap flex items-center gap-1"
              >
                <FaComment className="w-3 h-3" />
                {action}
              </button>
            ))}
          </div>
        </form>
      </div>
    </>
  );
};

export default Chatbot;
