import React, { useEffect, useRef, useState } from 'react';
import { Truck, BarChart3, Shield, Clock, Zap, Check, X, LayoutDashboard, ChevronRight, Menu, User } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { MdComputer, MdDarkMode } from "react-icons/md";
import { FaEnvelope, FaLightbulb, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [themeText, setThemeText] = useState("Dark Mode");
  const marqueeRef = useRef(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [allusers, setAllUsers] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user/usercontrols/${user.id}`);
        setAllUsers(response.data ? [response.data] : []);
      } catch (error) {
        console.error("Error while fetching:", error);
      }
    };
    if (user.id) fetchAllUsers();
  }, [user.id]);
  // console.log(allusers?.[0]?.username); // This prevents the error
  // console.log(allusers?.[0]?.email); // This prevents the error


  const [activeDashboardItems, setActiveDashboardItems] = useState({
    Account: true,
  });

  useEffect(() => {
    if (allusers.length > 0 && allusers[0].dashboardVisibility) {
      setActiveDashboardItems(allusers[0].dashboardVisibility);
    }
  }, [allusers]);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    setThemeText(savedDarkMode ? "Light Mode" : "Dark Mode");

    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode.toString());
      setThemeText(newMode ? "Light Mode" : "Dark Mode");

      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return newMode;
    });
  };

  const handlepayment = () => {
    navigate("/subscription")
  }
  const handledashboard = () => {
    navigate("/dashboard")
  }

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successful!");
    setTimeout(() => {
      window.location.href = "/selectroles";
    }, 300);
  };

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (marquee) {
      const clone = marquee.innerHTML;
      marquee.innerHTML += clone;
    }
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (allusers.length > 0 && allusers[0].email) {
      setFormData((prev) => ({
        ...prev,
        name: allusers[0].username || "",
        email: allusers[0].email || "",
      }));
    }
  }, [allusers]);


  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure email is not empty
    if (!formData.email || formData.email.trim() === "") {
      alert("Enter a valid email address!");
      return;
    }

    // Regular Expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Enter a valid email address!");
      return;
    }

    if (formData.message && allusers.length > 0) {
      const subject = encodeURIComponent(
        `Help & Support Request from ${formData.name} )`
      );
      const body = encodeURIComponent(
        `Hello Support Team,\n\n${formData.message}\n\nUser Details:\nName: ${formData.name}\nContact: ${allusers[0].phone}\nEmail: ${formData.email}`
      );

      window.location.href = `mailto:Preetgusain84@gmail.com?subject=${subject}&body=${body}`;
      toast.success("Redirecting to Mail... 😊");

      setFormData({
        name: allusers[0].username,
        email: allusers[0].email,
        message: "",
      });
    }
  };

  // console.log("Form Data Email before reset:", formData.email);



  return (
    <div>
      {activeDashboardItems.Account ? (
        <div className="min-h-screen bg-white">
          {/* Navigation - Redesigned */}
          <nav className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-20">
                <div className="flex items-center">
                  <img className="w-40 h-auto" src="/logo.png" alt="logo" />
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                  <a href="#features" className="text-white hover:text-yellow-300 font-medium transition-colors">Features</a>
                  <a href="#benefits" className="text-white hover:text-yellow-300 font-medium transition-colors">Benefits</a>
                  <a href="#testimonials" className="text-white hover:text-yellow-300 font-medium transition-colors">Testimonials</a>
                  <a href="#pricing" className="text-white hover:text-yellow-300 font-medium transition-colors">Pricing</a>
                  <a href="#contact" className="text-white hover:text-yellow-300 font-medium transition-colors">Contact</a>
                </div>

                {/* Right Side (Logout + Theme Toggle) */}
                <div className="hidden md:flex items-center space-x-4">
                  <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors font-medium">
                    Logout
                  </button>

                  <button onClick={handleDarkMode} className={`p-2 rounded-full transition-colors ${darkMode ? "bg-yellow-400 text-gray-900" : "bg-gray-800 text-yellow-400"}`}>
                    {darkMode ? <FaLightbulb size={20} /> : <MdDarkMode size={20} />}
                  </button>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden flex items-center">
                  <button onClick={toggleMenu} className="text-white hover:text-yellow-300 p-2">
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                </div>
              </div>

              {/* Mobile Menu Dropdown */}
              {isMenuOpen && (
                <div className="md:hidden flex flex-col bg-indigo-900 bg-opacity-95 backdrop-blur-md text-white py-4 px-4 space-y-3 rounded-md shadow-xl absolute left-0 right-0 z-50">
                  <a href="#features" className="hover:text-yellow-300 py-2 px-4 rounded-md hover:bg-indigo-800">Features</a>
                  <a href="#benefits" className="hover:text-yellow-300 py-2 px-4 rounded-md hover:bg-indigo-800">Benefits</a>
                  <a href="#testimonials" className="hover:text-yellow-300 py-2 px-4 rounded-md hover:bg-indigo-800">Testimonials</a>
                  <a href="#pricing" className="hover:text-yellow-300 py-2 px-4 rounded-md hover:bg-indigo-800">Pricing</a>
                  <a href="#contact" className="hover:text-yellow-300 py-2 px-4 rounded-md hover:bg-indigo-800">Contact</a>
                  <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors font-medium w-full text-left">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Hero Section - Redesigned */}
          <div className={darkMode ? "bg-[#2A2A2A]" : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"}>
            <div className="max-w-7xl mx-auto px-6 py-24 sm:px-10 lg:px-14">
              <div className="flex flex-col md:flex-row items-center">
                {/* Left Content */}
                <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
                  <h1 className={darkMode ? "darkmode-text text-4xl md:text-5xl font-bold leading-tight mb-4" : "text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4"}>
                    Manage Your Fleet with <span className="text-blue-600 relative">Precision
                      <svg className="absolute bottom-0 left-0 w-full h-2 text-blue-300" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 25 0, 50 5 Q 75 10, 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </span>
                  </h1>

                  <p className={darkMode ? "darkmode-text mt-6 text-lg max-w-2xl leading-relaxed" : "mt-6 text-lg text-gray-700 max-w-2xl leading-relaxed"}>
                    TruckByte gives you complete control over your truck fleet, optimizing routes,
                    reducing costs, and improving efficiency with our advanced management solution.
                  </p>

                  {/* CTA Buttons */}
                  <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                    <a
                      href="/dashboard"
                      className="bg-blue-600 text-white px-8 py-4 rounded-full text-center text-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md"
                    >
                      <LayoutDashboard className="h-5 w-5" />
                      Dashboard
                    </a>
                    <a
                      href="/learnmore"
                      className="bg-transparent text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-full text-center text-lg font-medium hover:bg-blue-50 transition-all transform hover:scale-105"
                    >
                      Learn More
                    </a>
                  </div>
                </div>

                {/* Right Side Image */}
                <div className="md:w-1/2">
                  <div className={darkMode ? "bg-[#121212] p-5 rounded-xl shadow-2xl relative overflow-hidden group" : "bg-white p-5 rounded-xl shadow-2xl relative overflow-hidden group"}>
                    <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
                    <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
                    <img
                      src="/dashboard.png"
                      alt="TruckByte dashboard preview"
                      className="rounded-lg w-full transition-transform duration-500 transform group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section - Redesigned */}
          <div id="features" className={darkMode ? "darkmode py-20" : "py-20 bg-white"}>
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
              <div className="text-center mb-16">
                <h2 className={darkMode ? "darkmode text-4xl md:text-5xl font-bold leading-snug" : "text-4xl md:text-5xl font-bold text-gray-900 leading-snug"}>
                  Powerful Features for <span className="text-blue-600">Complete Fleet Management</span>
                </h2>
                <p className={darkMode ? "darkmode-text mt-4 text-lg max-w-3xl mx-auto" : "mt-4 text-lg text-gray-600 max-w-3xl mx-auto"}>
                  Our comprehensive solution is designed to handle every aspect of your trucking operations.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { icon: <Truck className="h-7 w-7" />, color: "bg-blue-50 text-blue-600", title: "Real-time Fleet Tracking", desc: "Monitor your entire fleet in real-time with GPS tracking and instant status updates." },
                  { icon: <BarChart3 className="h-7 w-7" />, color: "bg-green-50 text-green-600", title: "Advanced Analytics", desc: "Gain actionable insights with comprehensive reporting and performance metrics." },
                  { icon: <Shield className="h-7 w-7" />, color: "bg-purple-50 text-purple-600", title: "Maintenance Management", desc: "Automate maintenance scheduling and receive alerts for preventive service needs." },
                  { icon: <Clock className="h-7 w-7" />, color: "bg-yellow-50 text-yellow-600", title: "Scheduling & Dispatch", desc: "Efficiently assign drivers and vehicles while optimizing delivery schedules." },
                  { icon: <Zap className="h-7 w-7" />, color: "bg-red-50 text-red-600", title: "Fuel Management", desc: "Track fuel consumption, identify efficiency opportunities, and reduce costs." },
                  {
                    icon:
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>, color: "bg-indigo-50 text-indigo-600", title: "Route Optimization", desc: "Plan the most efficient routes to save time, fuel, and operational costs."
                  }].map((feature, index) => (
                    <div
                      key={index}
                      className={`p-8 rounded-xl shadow-lg transition-all transform hover:scale-105 ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
                        }`}
                    >
                      <div
                        className={`${feature.color} w-12 h-12 rounded-full flex items-center justify-center mb-6`}
                      >
                        {feature.icon}
                      </div>
                      <h3 className={darkMode ? "darkmode-text text-xl font-semibold mb-4" : "text-xl font-semibold text-gray-900 mb-4"}>
                        {feature.title}
                      </h3>
                      <p className={darkMode ? "darkmode-text text-gray-300" : "text-gray-600"}>
                        {feature.desc}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Benefits Section - Redesigned */}
          <div id="benefits" className={darkMode ? "darkmode py-20" : "py-20 bg-gray-50"}>
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
              <div className="text-center mb-16">
                <h2 className={darkMode ? "darkmode text-4xl md:text-5xl font-bold leading-snug" : "text-4xl md:text-5xl font-bold text-gray-900 leading-snug"}>
                  Why Choose <span className="text-blue-600">TruckByte?</span>
                </h2>
                <p className={darkMode ? "darkmode-text mt-4 text-lg max-w-3xl mx-auto" : "mt-4 text-lg text-gray-600 max-w-3xl mx-auto"}>
                  Discover the advantages of using TruckByte for your fleet management needs.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Check className="h-7 w-7" />,
                    color: "bg-blue-50 text-blue-600",
                    title: "Cost Efficiency",
                    desc: "Reduce operational costs with optimized routes and resource allocation.",
                  },
                  {
                    icon: <Check className="h-7 w-7" />,
                    color: "bg-green-50 text-green-600",
                    title: "Time Savings",
                    desc: "Save time with automated scheduling and real-time tracking.",
                  },
                  {
                    icon: <Check className="h-7 w-7" />,
                    color: "bg-purple-50 text-purple-600",
                    title: "Enhanced Security",
                    desc: "Ensure the safety of your cargo with advanced security features.",
                  },
                  {
                    icon: <Check className="h-7 w-7" />,
                    color: "bg-yellow-50 text-yellow-600",
                    title: "Data-Driven Decisions",
                    desc: "Make informed decisions with comprehensive analytics and insights.",
                  },
                  {
                    icon: <Check className="h-7 w-7" />,
                    color: "bg-red-50 text-red-600",
                    title: "Improved Collaboration",
                    desc: "Enhance collaboration between drivers, companies, and customers.",
                  },
                  {
                    icon: <Check className="h-7 w-7" />,
                    color: "bg-indigo-50 text-indigo-600",
                    title: "Global Connectivity",
                    desc: "Expand your reach with access to a global logistics network.",
                  },
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className={`p-8 rounded-xl shadow-lg transition-all transform hover:scale-105 ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
                      }`}
                  >
                    <div
                      className={`${benefit.color} w-12 h-12 rounded-full flex items-center justify-center mb-6`}
                    >
                      {benefit.icon}
                    </div>
                    <h3 className={darkMode ? "darkmode-text text-xl font-semibold mb-4" : "text-xl font-semibold text-gray-900 mb-4"}>
                      {benefit.title}
                    </h3>
                    <p className={darkMode ? "darkmode-text text-gray-300" : "text-gray-600"}>
                      {benefit.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonials Section - Redesigned */}
          <div id="testimonials" className={darkMode ? "darkmode py-20" : "py-20 bg-white"}>
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
              <div className="text-center mb-16">
                <h2 className={darkMode ? "darkmode text-4xl md:text-5xl font-bold leading-snug" : "text-4xl md:text-5xl font-bold text-gray-900 leading-snug"}>
                  What Our <span className="text-blue-600">Customers Say</span>
                </h2>
                <p className={darkMode ? "darkmode-text mt-4 text-lg max-w-3xl mx-auto" : "mt-4 text-lg text-gray-600 max-w-3xl mx-auto"}>
                  Hear from our satisfied customers who have transformed their logistics operations with TruckByte.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: "Michael Rodriguez",
                    role: "Fleet Manager, Express Logistics",
                    review: "TruckByte has completely transformed how we manage our fleet. The real-time tracking and maintenance alerts have reduced our downtime by 35%.",
                  },
                  {
                    name: "Sarah Johnson",
                    role: "Operations Director, Midwest Transport",
                    review: "The ROI on this system has been incredible. We've saved over $120,000 in operational costs in the first year alone through better route planning and fuel management.",
                  },
                  {
                    name: "David Chang",
                    role: "CEO, Pacific Freight Solutions",
                    review: "The implementation was seamless and the customer support has been outstanding. Our drivers actually enjoy using the system because it makes their jobs easier.",
                  },
                ].map((testimonial, index) => (
                  <div
                    key={index}
                    className={`p-8 rounded-xl shadow-lg transition-all transform hover:scale-105 ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
                      }`}
                  >
                    <p className={darkMode ? "darkmode-text text-gray-300" : "text-gray-600"}>
                      {testimonial.review}
                    </p>
                    <div className="flex items-center mt-6">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <h3 className={darkMode ? "darkmode-text text-lg font-semibold" : "text-lg font-semibold text-gray-900"}>
                          {testimonial.name}
                        </h3>
                        <p className={darkMode ? "darkmode-text text-gray-400" : "text-gray-500"}>
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Section - Redesigned */}
          <div id="pricing" className={darkMode ? "darkmode py-20" : "py-20 bg-gray-50"}>
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
              <div className="text-center mb-16">
                <h2 className={darkMode ? "darkmode text-4xl md:text-5xl font-bold leading-snug" : "text-4xl md:text-5xl font-bold text-gray-900 leading-snug"}>
                  Affordable Plans for <span className="text-blue-600">Every Business</span>
                </h2>
                <p className={darkMode ? "darkmode-text mt-4 text-lg max-w-3xl mx-auto" : "mt-4 text-lg text-gray-600 max-w-3xl mx-auto"}>
                  Choose the plan that best suits your business needs.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Basic",
                    price: "₹ 999/month",
                    features: ["Real-time Tracking", "Basic Analytics", "Email Support"],
                  },
                  {
                    title: "Pro",
                    price: "₹ 9999/year",
                    features: ["Advanced Analytics", "Route Optimization", "24/7 Support"],
                  },
                  {
                    title: "Enterprise",
                    price: "Custom",
                    features: ["Custom Solutions", "Dedicated Account Manager", "API Access"],
                  },
                ].map((plan, index) => (
                  <div
                    key={index}
                    className={`p-8 rounded-xl shadow-lg transition-all transform hover:scale-105 ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
                      }`}
                  >
                    <h3 className={darkMode ? "darkmode-text text-2xl font-semibold mb-4" : "text-2xl font-semibold text-gray-900 mb-4"}>
                      {plan.title}
                    </h3>
                    <p className={darkMode ? "darkmode-text text-4xl font-bold mb-6" : "text-4xl font-bold text-gray-900 mb-6"}>
                      {plan.price}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, index) => (
                        <li
                          key={index}
                          className={darkMode ? "darkmode-text flex items-center" : "flex items-center text-gray-600"}
                        >
                          <Check className="w-5 h-5 mr-2 text-blue-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {plan.title !== "Enterprise" ? (<button
                      onClick={handlepayment}
                      className={`w-full py-3 rounded-lg font-medium transition-all ${darkMode
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                    >
                      Get Started
                    </button>) : (<button
                      onClick={handledashboard}
                      className={`w-full py-3 rounded-lg font-medium transition-all ${darkMode
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                    >
                      Free
                    </button>)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Section - Redesigned */}
          <div id="contact" className={darkMode ? "darkmode py-20" : "py-20 bg-white"}>
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
              <div className="text-center mb-16">
                <h2 className={darkMode ? "darkmode text-4xl md:text-5xl font-bold leading-snug" : "text-4xl md:text-5xl font-bold text-gray-900 leading-snug"}>
                  Get in <span className="text-blue-600">Touch</span>
                </h2>
                <p className={darkMode ? "darkmode-text mt-4 text-lg max-w-3xl mx-auto" : "mt-4 text-lg text-gray-600 max-w-3xl mx-auto"}>
                  Have questions or need assistance? Reach out to our team, and we'll be happy to help.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div className={`p-8 rounded-xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"
                  }`}>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label htmlFor="name" className={darkMode ? "darkmode-text block text-sm font-medium mb-2" : "block text-sm font-medium text-gray-700 mb-2"}>
                        Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        id="name"
                        className={`w-full px-4 py-3 rounded-lg ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="email" className={darkMode ? "darkmode-text block text-sm font-medium mb-2" : "block text-sm font-medium text-gray-700 mb-2"}>
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        id="email"
                        className={`w-full px-4 py-3 rounded-lg ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        placeholder="Your Email"
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="message" className={darkMode ? "darkmode-text block text-sm font-medium mb-2" : "block text-sm font-medium text-gray-700 mb-2"}>
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        value={formData.message} // Ensure this is present
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        placeholder="Your Message"
                      ></textarea>


                    </div>
                    <button
                      type="submit"
                      className={`w-full py-3 rounded-lg font-medium transition-all ${darkMode
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                    >
                      Send Message
                    </button>
                  </form>
                </div>

                {/* Contact Information */}
                <div className={`p-8 rounded-xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"
                  }`}>
                  <h3 className={darkMode ? "darkmode-text text-2xl font-semibold mb-6" : "text-2xl font-semibold text-gray-900 mb-6"}>
                    Contact Information
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <FaPhoneAlt className="h-6 w-6 text-blue-600 mr-4" />
                      <p className={darkMode ? "darkmode-text" : "text-gray-600"}>+91 1234567890</p>
                    </div>
                    <div className="flex items-center">
                      <FaEnvelope className="h-6 w-6 text-blue-600 mr-4" />
                      <p className={darkMode ? "darkmode-text" : "text-gray-600"}>support@truckbyte.com</p>
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="h-6 w-6 text-blue-600 mr-4" />
                      <p className={darkMode ? "darkmode-text" : "text-gray-600"}>RE-32 TruckByte Lane, New Delhi, India</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer - Redesigned */}
          <footer className={darkMode ? "darkmode py-8 bg-gray-900" : "py-8 bg-gray-800"}>
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
              <div className="flex justify-between items-center">
                <p className={darkMode ? "darkmode-text" : "text-gray-300"}>© 2023 TruckByte. All rights reserved.</p>
                <div className="flex space-x-4">
                  <a href="#" className={darkMode ? "darkmode-text hover:text-yellow-400" : "text-gray-300 hover:text-yellow-400"}>
                    Privacy Policy
                  </a>

                  <a href="#" className={darkMode ? "darkmode-text hover:text-yellow-400" : "text-gray-300 hover:text-yellow-400"}>
                    Terms of Service
                  </a>
                  <div className="mt-4 md:mt-0 flex space-x-6">
                    <a href="https://www.instagram.com/preet_gusain200_/?utm_source=qr&igsh=MXhmenR4ZXgwc2xvbA%3D%3D#" target='_blank'><img className='size-[2rem]' src="/instalogo.png" alt="" /></a>
                    <a href="https://github.com/preetcoder12" target='_blank'><img className='size-[2rem]' src="/githublogo.png" alt="" /></a>
                    <a href="https://www.linkedin.com/in/preet-gusain-986b022a5/" target='_blank'><img className='size-[2rem]' src="/linkedinlogo.png" alt="" /></a>
                    <a href="https://www.youtube.com/@preetgusain" target='_blank'><img className='size-[2rem]' src="/ytlogo.png" alt="" /></a>

                  </div>
                </div>

              </div>
              <h2 className='flex gap-4 text-gray-200 text-sm'> <User className='text-red-400' />Made by Preet Gusain</h2>
              <h2 className='flex gap-4 text-gray-200 text-sm'> <MdComputer className='size-6 text-blue-400' />Project : Truck Management System (TMS)</h2>

            </div>
          </footer>
        </div>
      ) : null}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              background: '#4CAF50',  // Green for success
              color: '#fff',         // White text for contrast
            },
            iconTheme: {
              primary: '#fff',       // White icon
              secondary: '#4CAF50',  // Matches background
            },
          },
        }}
      />

    </div>
  );
};

export default HomePage;