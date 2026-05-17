// src/pages/About.jsx
import { Link } from "react-router-dom";
import {
  FaQuoteLeft,
  FaUtensils,
  FaLeaf,
  FaHeart,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaStar,
  FaCheckCircle,
  FaAward,
  FaUsers,
  FaRegSmile,
  FaRegClock,
} from "react-icons/fa";
import { useState, useEffect } from "react";

const About = () => {
  const [activeTab, setActiveTab] = useState("story");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-amber-50 to-white">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070"
            alt="Restaurant ambiance"
            className="object-cover w-full h-full transition-transform transform scale-105 hover:scale-100 duration-7000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-amber-900/40"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute w-32 h-32 rounded-full top-20 left-10 bg-amber-500/20 blur-3xl animate-pulse"></div>
        <div className="absolute w-40 h-40 delay-1000 rounded-full bottom-20 right-10 bg-orange-500/20 blur-3xl animate-pulse"></div>

        <div className="relative flex flex-col items-center justify-center h-full px-4 text-center">
          <span
            className={`px-4 py-2 bg-amber-500/20 backdrop-blur-sm text-amber-300 rounded-full text-sm font-medium border border-amber-500/30 mb-6 transform transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            ✦ EST. 2026 ✦
          </span>
          <h1
            className={`text-5xl md:text-7xl font-bold text-white mb-6 transform transition-all duration-700 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            Our <span className="text-amber-400">Story</span>
          </h1>
          <p
            className={`text-xl md:text-2xl text-gray-200 max-w-3xl leading-relaxed transform transition-all duration-700 delay-400 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            A journey of flavor, passion, and tradition since 2026
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute transform -translate-x-1/2 bottom-8 left-1/2 animate-bounce">
          <div className="flex justify-center w-6 h-10 border-2 rounded-full border-white/30">
            <div className="w-1 h-2 mt-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky z-40 shadow-md top-20 bg-white/80 backdrop-blur-md">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-center py-4 space-x-2">
            {[
              { id: "story", label: "Our Story", icon: FaUtensils },
              { id: "philosophy", label: "Philosophy", icon: FaLeaf },
              { id: "team", label: "Team", icon: FaUsers },
              { id: "testimonials", label: "Reviews", icon: FaStar },
              { id: "visit", label: "Visit Us", icon: FaMapMarkerAlt },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    document
                      .getElementById(tab.id)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-amber-50 hover:text-amber-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Our Story Section - Enhanced */}
        <section id="story" className="mb-24 scroll-mt-24">
          <div className="overflow-hidden transition-all duration-500 transform bg-white shadow-2xl rounded-3xl hover:shadow-2xl">
            <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
              <div className="flex flex-col justify-center order-2 p-8 lg:p-12 lg:order-1">
                <span className="flex items-center gap-2 mb-3 text-sm font-semibold tracking-wider uppercase text-amber-600">
                  <FaHeart className="text-red-500" />
                  Our Journey
                </span>
                <h2 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
                  From <span className="text-amber-500">Family Kitchen</span> to
                  Fine Dining
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p className="text-lg leading-relaxed">
                    Founded in 2026,{" "}
                    <span className="font-semibold text-amber-600">Foodie</span>{" "}
                    began as a small family-owned restaurant with a simple
                    belief: that great food has the power to bring people
                    together and create lasting memories.
                  </p>
                  <p className="text-lg leading-relaxed">
                    What started as Maria Rodriguez's passion project in her
                    home kitchen has grown into one of the city's most beloved
                    dining destinations. Today, we honor that heritage with
                    every plate we serve.
                  </p>
                  <div className="p-6 mt-4 border-l-4 bg-amber-50 rounded-xl border-amber-500">
                    <p className="italic text-gray-700">
                      "Food is more than sustenance – it's love made visible.
                      Every recipe tells a story, every ingredient is chosen
                      with care, and every guest is family."
                    </p>
                    <p className="mt-2 font-medium text-amber-700">
                      — Maria Rodriguez, Founder
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 mt-8">
                  <Link
                    to="/menu"
                    className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl hover:from-amber-600 hover:to-orange-600 hover:shadow-amber-500/30"
                  >
                    <FaUtensils />
                    Explore Our Menu
                  </Link>
                  <Link
                    to="/contact"
                    className="flex items-center gap-2 px-6 py-3 font-medium transition-all duration-300 bg-white border-2 text-amber-600 rounded-xl hover:bg-amber-50 border-amber-200"
                  >
                    <FaHeart />
                    Reserve a Table
                  </Link>
                </div>
              </div>
              <div className="relative order-1 overflow-hidden h-96 lg:h-auto lg:order-2">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074"
                  alt="Restaurant interior"
                  className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                {/* Stats Overlay */}
                <div className="absolute grid grid-cols-3 gap-4 bottom-6 left-6 right-6">
                  <div className="p-3 text-center rounded-lg bg-white/90 backdrop-blur-sm">
                    <p className="text-2xl font-bold text-amber-600">14+</p>
                    <p className="text-xs text-gray-600">Years</p>
                  </div>
                  <div className="p-3 text-center rounded-lg bg-white/90 backdrop-blur-sm">
                    <p className="text-2xl font-bold text-amber-600">50+</p>
                    <p className="text-xs text-gray-600">Dishes</p>
                  </div>
                  <div className="p-3 text-center rounded-lg bg-white/90 backdrop-blur-sm">
                    <p className="text-2xl font-bold text-amber-600">10k+</p>
                    <p className="text-xs text-gray-600">Guests</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section - Enhanced */}
        <section id="philosophy" className="mb-24 scroll-mt-24">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold tracking-wider uppercase text-amber-600">
              Our Values
            </span>
            <h2 className="mt-2 mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              The <span className="text-amber-500">Foodie</span> Philosophy
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600">
              Three core principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Quality Card */}
            <div className="p-8 text-center transition-all duration-500 bg-white shadow-lg group rounded-2xl hover:shadow-2xl hover:-translate-y-2">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 transition-transform duration-500 transform shadow-lg bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl group-hover:rotate-12">
                <FaAward className="w-10 h-10 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900 transition-colors group-hover:text-amber-600">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                We source only the finest ingredients from local farmers and
                trusted producers. No compromises, ever.
              </p>
            </div>

            {/* Sustainability Card */}
            <div className="p-8 text-center transition-all duration-500 bg-white shadow-lg group rounded-2xl hover:shadow-2xl hover:-translate-y-2">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 transition-transform duration-500 transform shadow-lg bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl group-hover:rotate-12">
                <FaLeaf className="w-10 h-10 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900 transition-colors group-hover:text-emerald-600">
                Sustainability
              </h3>
              <p className="text-gray-600">
                From eco-friendly packaging to zero-waste cooking, we're
                committed to protecting our planet.
              </p>
            </div>

            {/* Innovation Card */}
            <div className="p-8 text-center transition-all duration-500 bg-white shadow-lg group rounded-2xl hover:shadow-2xl hover:-translate-y-2">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 transition-transform duration-500 transform shadow-lg bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl group-hover:rotate-12">
                <FaStar className="w-10 h-10 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                Culinary Innovation
              </h3>
              <p className="text-gray-600">
                Traditional techniques meet modern creativity. We're always
                exploring new flavors and presentations.
              </p>
            </div>
          </div>

          {/* Certifications */}
          <div className="p-8 mt-12 border bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border-amber-200">
            <div className="flex flex-wrap items-center justify-center gap-8">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="w-6 h-6 text-green-500" />
                <span className="font-medium text-gray-700">
                  Organic Certified
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="w-6 h-6 text-green-500" />
                <span className="font-medium text-gray-700">
                  Sustainable Seafood
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="w-6 h-6 text-green-500" />
                <span className="font-medium text-gray-700">
                  Zero Food Waste
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="w-6 h-6 text-green-500" />
                <span className="font-medium text-gray-700">
                  Local Partnership
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section - Enhanced */}
        <section id="team" className="mb-24 scroll-mt-24">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold tracking-wider uppercase text-amber-600">
              Our People
            </span>
            <h2 className="mt-2 mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Meet the <span className="text-amber-500">Culinary Artists</span>
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600">
              Passionate professionals dedicated to creating unforgettable
              dining experiences
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Chef Maria Rodriguez",
                role: "Executive Chef",
                bio: "With over 20 years of culinary experience, Maria brings creativity and precision to every dish. Trained at Le Cordon Bleu.",
                img: "https://kickchef.com/wp-content/uploads/slider/cache/7230dfe28628772860b697e07a27b5ba/03-1.png",
                specialty: "Mediterranean Cuisine",
                experience: "20+ years",
              },
              {
                name: "Chef David Chen",
                role: "Sous Chef",
                bio: "Specializing in Asian fusion cuisine, David adds unique flavors to our menu. Previously worked at 3-Michelin star restaurants.",
                img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1976",
                specialty: "Asian Fusion",
                experience: "15 years",
              },
              {
                name: "Chef Sophie Laurent",
                role: "Pastry Chef",
                bio: "French-trained pastry chef creating our delicious desserts and baked goods. Winner of National Pastry Competition 2026.",
                img: "https://media.sciencephoto.com/f0/23/06/63/f0230663-800px-wm.jpg",
                specialty: "French Patisserie",
                experience: "12 years",
              },
              {
                name: "James Wilson",
                role: "Restaurant Manager",
                bio: "Ensuring every guest has an exceptional dining experience. 15 years in hospitality management.",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974",
                specialty: "Guest Relations",
                experience: "15 years",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="overflow-hidden transition-all duration-500 bg-white shadow-lg group rounded-2xl hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="relative overflow-hidden h-72">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/80 via-transparent to-transparent group-hover:opacity-100"></div>

                  {/* Experience Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="flex items-center gap-1 text-xs font-medium text-gray-700">
                      <FaRegClock className="text-amber-500" />
                      {member.experience}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="mb-1 text-xl font-bold text-gray-900 transition-colors group-hover:text-amber-600">
                    {member.name}
                  </h3>
                  <p className="mb-2 font-medium text-amber-600">
                    {member.role}
                  </p>
                  <p className="inline-block px-3 py-1 mb-3 text-sm rounded-full text-amber-500 bg-amber-50">
                    {member.specialty}
                  </p>
                  <p className="text-sm text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Join Our Team CTA */}
          <div className="p-8 mt-12 text-center shadow-xl bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl">
            <h3 className="mb-2 text-2xl font-bold text-white">
              Join Our Team
            </h3>
            <p className="mb-6 text-amber-100">
              We're always looking for passionate culinary professionals
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 font-medium transition-colors bg-white shadow-lg text-amber-600 rounded-xl hover:bg-gray-100"
            >
              <FaUsers />
              View Careers
            </Link>
          </div>
        </section>

        {/* Testimonials Section - Enhanced */}
        <section id="testimonials" className="mb-24 scroll-mt-24">
          <div className="relative p-8 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl md:p-12">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-amber-200 blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-200 rounded-full blur-3xl opacity-30"></div>

            <div className="relative">
              <div className="mb-12 text-center">
                <span className="text-sm font-semibold tracking-wider uppercase text-amber-600">
                  Guest Reviews
                </span>
                <h2 className="mt-2 mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
                  What Our <span className="text-amber-500">Guests Say</span>
                </h2>
                <p className="max-w-2xl mx-auto text-xl text-gray-600">
                  Don't just take our word for it
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {[
                  {
                    quote:
                      "The best dining experience I've had this year! The truffle pasta was absolutely divine, and the service was impeccable.",
                    author: "Sarah Johnson",
                    role: "Food Critic",
                    rating: 5,
                    image:
                      "https://media.istockphoto.com/id/1705503967/photo/confident-businesswoman-in-modern-office.jpg?s=612x612&w=0&k=20&c=_f2sAtCUkBBgKK8oxDnzGs2CLvYBTN5jfOLl1glQ8yw=",
                  },
                  {
                    quote:
                      "Every dish tells a story. You can taste the passion and tradition in every bite. The seafood platter is a must-try!",
                    author: "Michael Tan",
                    role: "Regular Customer",
                    rating: 5,
                    image:
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974",
                  },
                  {
                    quote:
                      "Perfect for special occasions. The ambiance is romantic, the food is exquisite, and the staff goes above and beyond.",
                    author: "Emma Davis",
                    role: "Local Guide",
                    rating: 5,
                    image:
                      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1974",
                  },
                ].map((testimonial, index) => (
                  <div
                    key={index}
                    className="p-6 transition-all duration-300 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-xl hover:-translate-y-2"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="object-cover w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-gray-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                      ))}
                    </div>

                    <FaQuoteLeft className="w-8 h-8 mb-3 text-amber-300" />
                    <p className="mb-4 italic text-gray-700">
                      "{testimonial.quote}"
                    </p>
                  </div>
                ))}
              </div>

              {/* Overall Rating */}
              <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-md">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-medium text-gray-900">4.9/5</span>
                  <span className="text-gray-500">(1,200+ reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visit Us Section - Enhanced */}
        <section id="visit" className="scroll-mt-24">
          <div className="overflow-hidden bg-white shadow-2xl rounded-3xl">
            <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <span className="flex items-center gap-2 mb-3 text-sm font-semibold tracking-wider uppercase text-amber-600">
                  <FaMapMarkerAlt />
                  Visit Us
                </span>
                <h2 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
                  We're <span className="text-amber-500">Waiting</span> for You
                </h2>

                <div className="space-y-6">
                  {/* Hours */}
                  <div className="flex gap-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-amber-100 rounded-xl">
                      <FaClock className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold text-gray-900">
                        Hours of Operation
                      </h3>
                      <div className="space-y-1 text-gray-600">
                        <p>
                          Monday - Thursday:{" "}
                          <span className="font-medium">11am - 10pm</span>
                        </p>
                        <p>
                          Friday - Saturday:{" "}
                          <span className="font-medium">11am - 11pm</span>
                        </p>
                        <p>
                          Sunday:{" "}
                          <span className="font-medium">10am - 9pm</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex gap-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-amber-100 rounded-xl">
                      <FaMapMarkerAlt className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold text-gray-900">
                        Location
                      </h3>
                      <p className="text-gray-600">
                        123 Culinary Avenue
                        <br />
                        Foodie City, FC 10001
                      </p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex gap-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-amber-100 rounded-xl">
                      <FaPhone className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold text-gray-900">
                        Contact
                      </h3>
                      <p className="text-gray-600">(555) 123-4567</p>
                      <p className="text-gray-600">hello@foodie.com</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-8">
                  <Link
                    to="/contact"
                    className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl hover:from-amber-600 hover:to-orange-600 hover:shadow-amber-500/30"
                  >
                    <FaMapMarkerAlt />
                    Get Directions
                  </Link>
                  <Link
                    to="/contact"
                    className="flex items-center gap-2 px-6 py-3 font-medium transition-all duration-300 bg-white border-2 text-amber-600 rounded-xl hover:bg-amber-50 border-amber-200"
                  >
                    <FaEnvelope />
                    Send Message
                  </Link>
                </div>
              </div>

              <div className="overflow-hidden h-96 lg:h-auto">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215209179329!2d-73.987844924525!3d40.74844047138971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjQiTiA3M8KwNTknMTQuMiJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Restaurant Location"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <div className="p-8 mt-16 shadow-2xl bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              Stay in the Loop
            </h3>
            <p className="mb-6 text-amber-100">
              Subscribe to our newsletter for exclusive offers, new menu
              announcements, and event invitations
            </p>
            <div className="flex flex-col max-w-md gap-4 mx-auto sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 text-white border-2 rounded-xl border-white/30 bg-white/10 backdrop-blur-sm placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-6 py-3 font-medium transition-colors bg-white shadow-lg text-amber-600 rounded-xl hover:bg-gray-100">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default About;
