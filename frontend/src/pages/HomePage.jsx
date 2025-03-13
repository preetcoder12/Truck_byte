import React, { useEffect, useRef, useState } from 'react';
import { Truck, BarChart3, Shield, Clock, Zap, Check, LayoutDashboard, ChevronRight, Menu } from 'lucide-react';
import toast from 'react-hot-toast';
import { MdDarkMode } from "react-icons/md";
import { FaLightbulb } from "react-icons/fa";
import axios from 'axios';
import { BiPurchaseTag } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [themeText, setThemeText] = useState("Dark Mode");
  const marqueeRef = useRef(null);
  const navigate = useNavigate();

  const [allusers, setAllUsers] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  console.log(user.id)
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

  // Initialize dashboard state when allusers is updated
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
        console.log("Theme set to dark mode");
      } else {
        document.documentElement.classList.remove("dark");
        console.log("Theme set to light mode");
      }

      return newMode;
    });
  };

  const handledashboard = () => {
    navigate("/dashboard");
  }
  const buysubs = () => {
    navigate("/subscription")
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



  // Rest of your HomePage component code...
  return (
    <div>
      {activeDashboardItems.Account ? (<div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="bg-gray-950 text-white shadow-md"> {/* Navbar always in dark mode */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20">
              <div className="flex items-center">
                <img className="w-[12rem]" src="/logo.png" alt="logo" />
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-300 hover:text-yellow-400">Features</a>
                <a href="#benefits" className="text-gray-300 hover:text-yellow-400">Benefits</a>
                <a href="#testimonials" className="text-gray-300 hover:text-yellow-400">Testimonials</a>
                <a href="#pricing" className="text-gray-300 hover:text-yellow-400">Pricing</a>
                <a href="#contact" className="text-gray-300 hover:text-yellow-400">Contact</a>
              </div>

              <div className="hidden md:flex items-center space-x-6">
                <button onClick={handleLogout} className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium">Logout</button>

                {/* Toggle Theme Button (Only for Body) */}
                <button onClick={handleDarkMode}
                  className={darkMode ?
                    "bg-black text-white px-5 py-2 rounded-3xl hover:bg-gray-500 hover:text-yellow-400 transition-colors font-medium"
                    : "bg-yellow-600 text-white px-5 py-2 rounded-3xl hover:bg-yellow-300 hover:text-black transition-colors font-medium"}
                >
                  {darkMode ? <MdDarkMode size={20} /> : <FaLightbulb size={20} />}
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex">
                <button className="text-gray-300 hover:text-yellow-400">
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className={darkMode ? "bg-[#2A2A2A] py-16 md:py-24 " : "bg-gradient-to-r from-blue-50 to-indigo-50 py-16 md:py-24"}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <div className="flex flex-col md:flex-row items-center">
              {/* Left Content */}
              <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">

                <h1 className={darkMode ? "darkmode-text text-4xl md:text-5xl font-extrabold leading-tight" : "text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight"}
                >
                  Manage Your Fleet with <span className="text-blue-600">Precision</span> and Ease
                </h1>

                <p className={darkMode ? "darkmode-text mt-6 text-lg  max-w-2xl leading-relaxed " : "mt-6 text-lg text-gray-700 max-w-2xl leading-relaxed"}
                >
                  LorryWale gives you complete control over your truck fleet, optimizing routes,
                  reducing costs, and improving efficiency with our advanced management solution.
                </p>

                {/* CTA Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                  <a
                    href="/dashboard"
                    className="bg-blue-600 text-white px-8 py-4 rounded-lg text-center text-lg font-semibold flex items-center gap-2 hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md"
                  >
                    <LayoutDashboard className="h-6 w-6" />
                    Dashboard
                  </a>
                  <a
                    href="/learnmore"
                    className="bg-white text-blue-600 border border-blue-600 px-8 py-4 rounded-lg text-center text-lg font-semibold hover:bg-blue-100 transition-all transform hover:scale-105 shadow-md"
                  >
                    Learn More
                  </a>
                </div>
              </div>

              {/* Right Side Image */}
              <div className="md:w-1/2">
                <div className={darkMode ? " bg-[#121212] backdrop-blur-xl p-5 rounded-lg shadow-2xl relative overflow-hidden group" : "bg-white/80 backdrop-blur-xl p-5 rounded-lg shadow-2xl relative overflow-hidden group"}
                >
                  <img
                    src="/dashboard.png"
                    alt="LorryWale dashboard preview"
                    className="rounded-md w-full transition-transform duration-500 transform group-hover:scale-105"
                  />
                  {/* Floating Element for 3D Effect */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className={darkMode ? " darkmode py-16 md:py-24 " : "py-16 md:py-24 bg-white"}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <div className="text-center mb-16">

              <h2 className={darkMode ? " darkmode text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug" : "text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug"}
              >
                Powerful Features for <span className="text-blue-600">Complete Fleet Management</span>
              </h2>
              <p className={darkMode ? " darkmode-text mt-4 text-lg max-w-3xl mx-auto" : "mt-4 text-lg text-gray-700 max-w-3xl mx-auto"}
              >
                Our comprehensive solution is designed to handle every aspect of your trucking operations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: <Truck className="h-6 w-6" />, color: "bg-blue-100 text-blue-600", title: "Real-time Fleet Tracking", desc: "Monitor your entire fleet in real-time with GPS tracking and instant status updates." },
                { icon: <BarChart3 className="h-6 w-6" />, color: "bg-green-100 text-green-600", title: "Advanced Analytics", desc: "Gain actionable insights with comprehensive reporting and performance metrics." },
                { icon: <Shield className="h-6 w-6" />, color: "bg-purple-100 text-purple-600", title: "Maintenance Management", desc: "Automate maintenance scheduling and receive alerts for preventive service needs." },
                { icon: <Clock className="h-6 w-6" />, color: "bg-yellow-100 text-yellow-600", title: "Scheduling & Dispatch", desc: "Efficiently assign drivers and vehicles while optimizing delivery schedules." },
                { icon: <Zap className="h-6 w-6" />, color: "bg-red-100 text-red-600", title: "Fuel Management", desc: "Track fuel consumption, identify efficiency opportunities, and reduce costs." },
                {
                  icon:
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>, color: "bg-indigo-100 text-indigo-600", title: "Route Optimization", desc: "Plan the most efficient routes to save time, fuel, and operational costs."
                }
              ].map((feature, index) => (
                < div key={index} className={darkMode ? " bg-gray-900 relative  p-6 rounded-lg shadow-lg border  transition-all transform hover:scale-105 hover:shadow-2xl" : "relative bg-white p-6 rounded-lg shadow-lg border border-gray-200 transition-all transform hover:scale-105 hover:shadow-2xl"}
                >
                  <div className={`p-3 ${feature.color} rounded-md w-12 h-12 flex items-center justify-center mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className={darkMode ? " darkmode-text" : "text-gray-400"}
                  >{feature.desc}</p>
                  <div className="absolute -top-4 -right-4 w-10 h-10 bg-blue-500/10 rounded-full blur-xl opacity-0 hover:opacity-100 transition-all duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* Benefits Section */}

        <div id="benefits" className={darkMode ? " darkmode py-16 md:py-24 " : "py-16 md:py-24 bg-gray-50"}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-1/2 md:pr-12">

                <h2 className={darkMode ? " darkmode-text text-3xl md:text-4xl font-bold " : "text-3xl md:text-4xl font-bold text-gray-900"}
                >
                  Transform Your Trucking Operations
                </h2>

                <p className={darkMode ? " text-gray-400 mt-4 text-lg " : "mt-4 text-lg text-gray-600"}
                >
                  Join hundreds of companies that have revolutionized their fleet management with LorryWale
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className={darkMode ? " text-white text-lg font-medium " : "text-lg font-medium text-gray-900"}
                      >Reduce Operating Costs</h3>
                      <p className={darkMode ? " text-gray-400 mt-1" : "mt-1 text-gray-600"}
                      >
                        Our customers report an average of 23% reduction in operational costs after implementing our system.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className={darkMode ? " text-white text-lg font-medium " : "text-lg font-medium text-gray-900"}>Increase Fleet Utilization</h3>
                      <p className={darkMode ? " text-gray-400 mt-1" : "mt-1 text-gray-600"}>
                        Optimize your fleet usage with intelligent scheduling and assignment algorithms.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className={darkMode ? " text-white text-lg font-medium " : "text-lg font-medium text-gray-900"}>Improve Driver Satisfaction</h3>
                      <p className={darkMode ? " text-gray-400 mt-1" : "mt-1 text-gray-600"}>
                        Better routes and schedules lead to happier drivers and lower turnover rates.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className={darkMode ? " text-white text-lg font-medium " : "text-lg font-medium text-gray-900"}>Enhance Customer Service</h3>
                      <p className={darkMode ? " text-gray-400 mt-1" : "mt-1 text-gray-600"}>
                        Provide accurate ETAs and real-time tracking information to your customers.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href="#case-studies"
                    className={darkMode ? " darkmode-texttext-blue-600 font-medium inline-flex items-center" : "text-blue-600 font-medium inline-flex items-center"}
                  >
                    View case studies
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="mt-10 md:mt-0 md:w-1/2">

                <div className={darkMode ? "bg-[#3A3A3A] p-4 rounded-lg shadow-lg" : "bg-white p-4 rounded-lg shadow-lg"}
                >
                  <div className="relative aspect-w-16 aspect-h-9 overflow-hidden rounded-md">
                    <div className="absolute inset-0 bg-blue-600 opacity-10"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-blue-600 mb-3">30%</div>
                        <p className="text-lg font-medium">Average Fuel Savings</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">


                    <div className={darkMode ? "bg-[#121212] 50 p-4 rounded-md" : "bg-gray-50 p-4 rounded-md"}
                    >

                      <div className={darkMode ? "text-white text-3xl font-bold " : "text-3xl font-bold text-blue-600"}
                      >40%</div>
                      <p >Maintenance Cost Reduction</p>
                    </div>

                    <div className={darkMode ? "bg-[#121212] 50 p-4 rounded-md" : "bg-gray-50 p-4 rounded-md"}
                    >
                      <div className={darkMode ? "text-white text-3xl font-bold " : "text-3xl font-bold text-blue-600"}>2.5x</div>
                      <p className={darkMode ? "text-white text-sm  " : "text-sm text-gray-600"}
                      >ROI Within 6 Months</p>
                    </div>

                    <div className={darkMode ? "bg-[#121212] 50 p-4 rounded-md" : "bg-gray-50 p-4 rounded-md"}>
                      <div className={darkMode ? "text-white text-3xl font-bold " : "text-3xl font-bold text-blue-600"}>5 hrs</div>
                      <p className={darkMode ? "text-white text-sm  " : "text-sm text-gray-600"}
                      >Weekly Admin Time Saved</p>
                    </div>

                    <div className={darkMode ? "bg-[#121212] 50 p-4 rounded-md" : "bg-gray-50 p-4 rounded-md"}>
                      <div className={darkMode ? "text-white text-3xl font-bold " : "text-3xl font-bold text-blue-600"}>98%</div>
                      <p className={darkMode ? "text-white text-sm  " : "text-sm text-gray-600"}
                      >Customer Satisfaction</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price section */}
        <div className="w-full py-16 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Simple, Transparent Pricing</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Choose the plan that fits your business needs, from small operations to enterprise fleets
              </p>
            </div>

            {/* Phase 2 Plans */}
            <div className="mb-20">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-10 text-center">
                <div className='flex text-3xl items-center justify-center gap-4'>Tiered Subscriptions <BiPurchaseTag /></div>
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Starter Plan */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105">
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Starter Plan</h4>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-6">₹999<span className="text-lg text-gray-500 dark:text-gray-400 font-normal">/month</span></p>

                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">5 truck listings</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">Basic tracking</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">Email support</span>
                      </li>
                    </ul>

                    <button onClick={buysubs} className="w-full py-3 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium transition-colors">
                      Choose Starter
                    </button>
                  </div>
                </div>

                {/* Pro Plan */}
                <div className="bg-blue-50 dark:bg-blue-900 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 border-2 border-blue-500 transform scale-105">
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg text-sm font-bold">
                    MOST POPULAR
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Pro Plan</h4>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-6">₹2,999<span className="text-lg text-gray-500 dark:text-gray-300 font-normal">/month</span></p>

                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">20 truck listings</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">Real-time GPS tracking</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">Advanced analytics</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">Driver ratings</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">Chat support</span>
                      </li>
                    </ul>

                    <button onClick={buysubs} className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
                      Choose Pro
                    </button>
                  </div>
                </div>

                {/* free Plan */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105">
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Free plan</h4>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-6">₹0/month </p>

                    <ul className="space-y-3 mb-8">

                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">Limited truck listings (2-3)</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">Basic dashboard
                        </span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">No analytics or advanced tracking
                        </span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">No priority support
                        </span>
                      </li>

                    </ul>

                    <button onClick={handledashboard} className="w-full py-3 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium transition-colors">
                      Get started Free
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* CTA */}
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Ready to optimize your fleet operations?</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Join thousands of fleet owners who trust our platform</p>
              <button  onClick={buysubs} className="py-4 px-8 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium text-lg transition-colors">
                Start Your Free Trial
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}

        <section id="testimonials" className={darkMode ? "darkmode py-20  " : "py-20 bg-gray-50"}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">

              <h2 className={darkMode ? "text-4xl font-extrabold darkmode-text" : "text-4xl font-extrabold text-gray-900"}
              >Trusted by Industry Leaders</h2>
              <p className={darkMode ? "darkmode-text mt-4 text-lg  max-w-2xl mx-auto " : "mt-4 text-lg text-gray-600 max-w-2xl mx-auto"}
              >
                See what our customers have to say about LorryWale
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[{
                name: "Michael Rodriguez",
                role: "Fleet Manager, Express Logistics",
                review: "LorryWale has completely transformed how we manage our fleet. The real-time tracking and maintenance alerts have reduced our downtime by 35%.",
              }, {
                name: "Sarah Johnson",
                role: "Operations Director, Midwest Transport",
                review: "The ROI on this system has been incredible. We've saved over $120,000 in operational costs in the first year alone through better route planning and fuel management.",
              }, {
                name: "David Chang",
                role: "CEO, Pacific Freight Solutions",
                review: "The implementation was seamless and the customer support has been outstanding. Our drivers actually enjoy using the system because it makes their jobs easier.",
              }].map((testimonial, index) => (

                <div key={index} className={darkMode ? " bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-400 " : "bg-white p-6 rounded-lg shadow-lg border border-gray-200"}
                >
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className={darkMode ? "darkmode-text mb-4" : "text-gray-600 mb-4"}
                  >{testimonial.review}</p>
                  <div className="border-t pt-4">

                    <p className={darkMode ? "darkmode-text font-medium text-gray-900" : "font-medium text-gray-900"}
                    >{testimonial.name}</p>

                    <p className={darkMode ? "darkmode-text text-sm " : "text-sm text-gray-500"}
                    >{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Scrolling client logos */}

            <div className={darkMode ? "mt-16 overflow-hidden relative w-full py-6 bg-gray-400 rounded-3xl" : "mt-16 overflow-hidden relative w-full py-6 bg-white"}
            >
              <div ref={marqueeRef} className="flex gap-14 animate-marquee whitespace-nowrap">
                {["/amv.png", "/ashokleyland.png", "/bharat.png", "/eicher.png", "/tata.png", "/force.png", "/mahindra.png"].map((src, index) => (
                  <img key={index} src={src} alt="Client logo" className="h-12 object-contain" />
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Call to Action Section */}
        <div className="bg-blue-600 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Transform Your Fleet Management?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of companies who have optimized their operations with LorryWale.
              Get started with a free demo today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="/dashboard"
                className="bg-white text-blue-600 px-8 py-4 rounded-md text-lg font-medium hover:bg-blue-50"
              >
                Schedule Free Demo
              </a>
              <a
                href="#contact"
                className="bg-transparent text-white border border-white px-8 py-4 rounded-md text-lg font-medium hover:bg-blue-700"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <img className="w-[12rem] h-[8  rem]" src="/logo.png" alt="logo" />
                  </div>                </div>
                <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                  The complete solution for modern fleet management.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#about" className="text-gray-400 hover:text-white transition duration-300">About Us</a></li>
                  <li><a href="#careers" className="text-gray-400 hover:text-white transition duration-300">Careers</a></li>
                  <li><a href="#blog" className="text-gray-400 hover:text-white transition duration-300">Blog</a></li>
                  <li><a href="#partners" className="text-gray-400 hover:text-white transition duration-300">Partners</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#documentation" className="text-gray-400 hover:text-white transition duration-300">Documentation</a></li>
                  <li><a href="#tutorials" className="text-gray-400 hover:text-white transition duration-300">Tutorials</a></li>
                  <li><a href="#support" className="text-gray-400 hover:text-white transition duration-300">Support</a></li>
                  <li><a href="#api" className="text-gray-400 hover:text-white transition duration-300">API</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact</h3>
                <ul className="space-y-2 text-sm">
                  <li className="text-gray-400">📧 preetgusain84@gmail.com</li>
                  <li className="text-gray-400">📞 1234567890</li>
                  <li className="text-gray-400">📍 123 Fleet Street, Suite 100</li>
                  <div className='flex gap-2' > <img className='size-[20px]' src="indian.png" alt="IN flag" /> <li className="text-gray-400">New Delhi - Dwarka</li></div>
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm">
              <p className="text-gray-400">© 2025 LorryWale. All rights reserved.</p>
              <div className="mt-4 md:mt-0 flex space-x-6">
                <a href="https://www.instagram.com/preet_gusain200_/?utm_source=qr&igsh=MXhmenR4ZXgwc2xvbA%3D%3D#" target='_blank'><img className='size-[3rem]' src="/instalogo.png" alt="" /></a>
                <a href="https://github.com/preetcoder12" target='_blank'><img className='size-[3rem]' src="/githublogo.png" alt="" /></a>
                <a href="https://www.linkedin.com/in/preet-gusain-986b022a5/" target='_blank'><img className='size-[3rem]' src="/linkedinlogo.png" alt="" /></a>
                <a href="https://www.youtube.com/@preetgusain" target='_blank'><img className='size-[3rem]' src="/ytlogo.png" alt="" /></a>

              </div>
            </div>
          </div>
        </footer>

      </div >) : (<div>
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
          {/* Blurred background elements */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute top-20 left-20 w-64 h-64 bg-red-500 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-600 rounded-full filter blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-600 rounded-full filter blur-3xl"></div>
          </div>

          {/* Header/Logo Area */}
          <div className="absolute top-8 left-8 flex items-center z-20">
            <img className="w-12 h-12" src="/logo.png" alt="logo" />
            <div className="flex flex-col ml-2">
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">LorryWale</h1>
              <span className="text-xs text-gray-400">Fleet Management</span>
            </div>
          </div>

          {/* Main Card content */}
          <div className="relative z-10 max-w-md w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl shadow-2xl border border-white border-opacity-20 p-8 mx-4">
            <div className="flex flex-col items-center text-center">
              <div className="bg-red-500 bg-opacity-20 p-4 rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Account Suspended</h2>
              <p className="text-gray-300 mb-6">Your account has been temporarily suspended. Please contact our support team for assistance.</p>

              <div className="w-full bg-white bg-opacity-5 rounded-lg p-4 mb-6 border border-white border-opacity-10">
                <p className="text-gray-400 text-sm">This may be due to payment issues, policy violations, or account security concerns. Our support team can help resolve this matter promptly.</p>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full">
                <a href="/contact" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-md flex-1 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Contact Support
                </a>
                <a href="/faq" className="px-6 py-3 bg-transparent border border-gray-400 hover:border-white text-gray-300 hover:text-white rounded-lg transition-colors flex-1 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  FAQs
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-4 left-0 right-0 text-center text-gray-500 text-sm z-10">
            <p>© 2025 LorryWale Fleet Management. All rights reserved.</p>
          </div>
        </div>
      </div>)}
    </div>
  );
};

export default HomePage;