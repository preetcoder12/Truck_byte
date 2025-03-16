import { useState, useEffect } from "react";
import {
  FaTruck,
  FaUsers,
  FaMoneyCheckAlt,
  FaShieldAlt,
  FaMoon,
  FaSun,
  FaChartLine,
  FaMobileAlt,
  FaClock,
  FaGlobe,
  FaHandshake,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from "react-icons/fa";

const LearnMore = () => {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('users');

  // Check for user's preferred color scheme on initial load
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }

    // Check for saved preference in localStorage
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    }
  }, []);

  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Stats data
  const stats = [
    { value: "5000+", label: "Trucks" },
    { value: "200+", label: "Cities" },
    { value: "95%", label: "Customer Satisfaction" },
    { value: "24/7", label: "Support" }
  ];

  return (
    <div className={`transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Theme toggle button */}
      <button
        onClick={toggleDarkMode}
        className={`fixed top-4 right-4 p-3 rounded-full z-50 ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-blue-700'}`}
        aria-label="Toggle dark mode"
      >
        {darkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
      </button>

      {/* Navigation */}
      <nav className={`sticky top-0 z-40 ${darkMode ? 'bg-gray-800 shadow-lg' : 'bg-white shadow-md'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <FaTruck className="text-blue-500 text-2xl" />
              <span className="ml-2 font-bold text-xl">TruckByte</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a href="#how-it-works" className={`px-3 py-2 rounded-md text-sm font-medium ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>How It Works</a>
              <a href="#features" className={`px-3 py-2 rounded-md text-sm font-medium ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>Features</a>
              <a href="#benefits" className={`px-3 py-2 rounded-md text-sm font-medium ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>Benefits</a>
              <a href="#testimonials" className={`px-3 py-2 rounded-md text-sm font-medium ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>Testimonials</a>
              <a href="#faq" className={`px-3 py-2 rounded-md text-sm font-medium ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>FAQ</a>
              <a href="#contact" className={`px-3 py-2 rounded-md text-sm font-medium ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* 1. Hero Section with Stats */}
      <div id="hero" className={`relative ${darkMode ? 'bg-gradient-to-r from-blue-900 to-purple-900' : 'bg-gradient-to-r from-blue-600 to-indigo-600'} text-white`}>
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">Revolutionizing Trucking Logistics</h1>
              <p className="mt-6 text-lg md:text-xl opacity-90">TruckByte connects businesses, drivers, and users through our AI-powered platform, making logistics simpler, faster, and more reliable than ever before.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="/" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition">Home</a>
                <a href="#how-it-works" className="px-8 py-3 bg-transparent border-2 border-white rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition">Learn More</a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                  <div className="text-sm uppercase tracking-wider mt-2 opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. How It Works */}
      <div id="how-it-works" className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">How TruckByte Works</h2>
        <p className="text-center mb-12 max-w-2xl mx-auto">Our platform connects all stakeholders in the logistics ecosystem through a single, intuitive interface.</p>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className={`inline-flex rounded-lg p-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            {['users', 'companies', 'drivers'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === tab
                    ? `${darkMode ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white'}`
                    : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'}`
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className={`p-6 shadow-lg rounded-lg transition-all ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {activeTab === 'users' && (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className={`mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-4 ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
                  <FaMobileAlt className="text-blue-500 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Book Easily</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Simple booking process with instant quotes and truck selection.</p>
              </div>
              <div className="text-center">
                <div className={`mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-4 ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
                  <FaGlobe className="text-blue-500 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Shipments</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Real-time GPS tracking of your cargo with status updates.</p>
              </div>
              <div className="text-center">
                <div className={`mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-4 ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
                  <FaHandshake className="text-blue-500 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Safe payments with escrow protection and transparent billing.</p>
              </div>
            </div>
          )}

          {activeTab === 'companies' && (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className={`mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-4 ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
                  <FaTruck className="text-blue-500 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fleet Management</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Monitor your entire fleet with real-time status and utilization data.</p>
              </div>
              <div className="text-center">
                <div className={`mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-4 ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
                  <FaChartLine className="text-blue-500 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Comprehensive analytics to optimize operations and reduce costs.</p>
              </div>
              <div className="text-center">
                <div className={`mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-4 ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
                  <FaClock className="text-blue-500 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Scheduling Tools</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>AI-powered route optimization and scheduling for maximum efficiency.</p>
              </div>
            </div>
          )}

          {activeTab === 'drivers' && (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className={`mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-4 ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
                  <FaMoneyCheckAlt className="text-blue-500 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Maximize Earnings</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Direct access to freight and competitive rates with weekly payments.</p>
              </div>
              <div className="text-center">
                <div className={`mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-4 ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
                  <FaMobileAlt className="text-blue-500 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Mobile App</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Accept jobs, update status, and navigate all from our driver-friendly app.</p>
              </div>
              <div className="text-center">
                <div className={`mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-4 ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
                  <FaUsers className="text-blue-500 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Driver Community</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Connect with other drivers, share tips, and build your network.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Features and Benefits */}
      <div id="features" className={`py-20 px-6 ${darkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">TruckByte Features</h2>
          <p className="text-center mb-12 max-w-2xl mx-auto">Our platform delivers a comprehensive set of features designed to transform your logistics operations.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <FaShieldAlt className="text-blue-500 text-2xl" />, title: "Secure Platform", description: "End-to-end encryption and secure data handling to protect your information." },
              { icon: <FaMoneyCheckAlt className="text-blue-500 text-2xl" />, title: "Transparent Pricing", description: "No hidden fees. Clear and upfront pricing for all services." },
              { icon: <FaChartLine className="text-blue-500 text-2xl" />, title: "Advanced Analytics", description: "Gain insights into your operations with detailed analytics and reports." },
              { icon: <FaTruck className="text-blue-500 text-2xl" />, title: "Fleet Management", description: "Efficiently manage your fleet with real-time tracking and updates." },
              { icon: <FaClock className="text-blue-500 text-2xl" />, title: "24/7 Support", description: "Round-the-clock customer support to assist you whenever you need." },
              { icon: <FaGlobe className="text-blue-500 text-2xl" />, title: "Global Reach", description: "Access to a global network of trucks and logistics partners." }
            ].map((feature, index) => (
              <div key={index} className={`p-6 rounded-lg shadow-md transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'}`}>
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-100">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Benefits Section */}
      <div id="benefits" className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Benefits of Using TruckByte</h2>
        <p className="text-center mb-12 max-w-2xl mx-auto">Discover how TruckByte can streamline your logistics operations and drive your business forward.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: <FaMoneyCheckAlt className="text-blue-500 text-2xl" />, title: "Cost Efficiency", description: "Reduce operational costs with optimized routes and resource allocation." },
            { icon: <FaClock className="text-blue-500 text-2xl" />, title: "Time Savings", description: "Save time with automated scheduling and real-time tracking." },
            { icon: <FaShieldAlt className="text-blue-500 text-2xl" />, title: "Enhanced Security", description: "Ensure the safety of your cargo with advanced security features." },
            { icon: <FaChartLine className="text-blue-500 text-2xl" />, title: "Data-Driven Decisions", description: "Make informed decisions with comprehensive analytics and insights." },
            { icon: <FaUsers className="text-blue-500 text-2xl" />, title: "Improved Collaboration", description: "Enhance collaboration between drivers, companies, and customers." },
            { icon: <FaGlobe className="text-blue-500 text-2xl" />, title: "Global Connectivity", description: "Expand your reach with access to a global logistics network." }
          ].map((benefit, index) => (
            <div key={index} className={`p-6 rounded-lg shadow-md transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'}`}>
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-100">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Testimonials Section */}
      <div id="testimonials" className={`py-20 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">What Our Customers Say</h2>
          <p className="text-center mb-12 max-w-2xl mx-auto">Hear from our satisfied customers who have transformed their logistics operations with TruckByte.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "John Doe", role: "Logistics Manager", testimonial: "TruckByte has revolutionized our logistics operations. The platform is intuitive and the support team is always there to help." },
              { name: "Jane Smith", role: "Fleet Owner", testimonial: "The real-time tracking and analytics have been game-changers for our business. Highly recommend TruckByte!" },
              { name: "Mike Johnson", role: "Driver", testimonial: "The mobile app makes it so easy to manage my jobs and stay connected with the team. Great experience overall." }
            ].map((testimonial, index) => (
              <div key={index} className={`p-6 rounded-lg shadow-md transition-all ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{testimonial.testimonial}</p>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. FAQ Section */}
      <div id="faq" className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Frequently Asked Questions</h2>
        <p className="text-center mb-12 max-w-2xl mx-auto">Find answers to common questions about TruckByte and how it can benefit your business.</p>

        <div className="space-y-4">
          {[
            { question: "How do I get started with TruckByte?", answer: "Simply sign up on our platform, and you'll have access to all our features. Our onboarding team will guide you through the process." },
            { question: "Is TruckByte suitable for small businesses?", answer: "Absolutely! TruckByte is designed to cater to businesses of all sizes, from small startups to large enterprises." },
            { question: "What kind of support does TruckByte offer?", answer: "We offer 24/7 customer support through phone, email, and live chat. Our team is always ready to assist you." },
            { question: "Can I track my shipments in real-time?", answer: "Yes, TruckByte provides real-time GPS tracking for all your shipments, giving you complete visibility." },
            { question: "How secure is my data on TruckByte?", answer: "We use end-to-end encryption and follow industry best practices to ensure your data is always secure." }
          ].map((faq, index) => (
            <div key={index} className={`p-6 rounded-lg shadow-md transition-all ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}>
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Contact Section */}
      <div id="contact" className={`py-20 px-6 ${darkMode ? 'bg-gray-900' : 'bg-blue-50'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Contact Us</h2>
          <p className="text-center mb-12 max-w-2xl mx-auto">Have questions or need assistance? Reach out to our team, and we'll be happy to help.</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className={`p-6 rounded-lg shadow-md transition-all ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}>
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input type="text" id="name" className={`w-full px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`} placeholder="Your Name" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" id="email" className={`w-full px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`} placeholder="Your Email" />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea id="message" rows="4" className={`w-full px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`} placeholder="Your Message"></textarea>
                </div>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Send Message</button>
              </form>
            </div>
            <div className={`p-6 rounded-lg shadow-md transition-all ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaPhoneAlt className="text-blue-500 text-xl mr-4" />
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>+91 2121212121</p>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-blue-500 text-xl mr-4" />
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>support@truckbyte.com</p>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-blue-500 text-xl mr-4" />
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>45-B TruckByte Lane, New Delhi, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMore; 