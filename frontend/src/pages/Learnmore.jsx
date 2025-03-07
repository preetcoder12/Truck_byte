import { useState, useEffect } from "react";
import { FaTruck, FaUsers, FaMoneyCheckAlt, FaShieldAlt, FaHome, FaMoon, FaSun } from "react-icons/fa";

const LearnMore = () => {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);

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

      {/* Hero Section */}
      <div className={`relative h-[60vh] flex items-center justify-center ${darkMode ? 'bg-blue-800' : 'bg-blue-600'} text-white text-center px-6`}>
        <div>
          <h1 className="text-4xl font-bold">Your Trusted Trucking Solution</h1>
          <p className="mt-4 text-lg">Connecting businesses, drivers, and users with seamless logistics.</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className={`p-6 shadow-lg rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <FaUsers className="text-blue-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold">For Users</h3>
            <p className={darkMode ? 'text-gray-300' : ''}>Find and book trucks easily, track shipments, and get instant pricing.</p>
          </div>
          <div className={`p-6 shadow-lg rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <FaTruck className="text-blue-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold">For Companies</h3>
            <p className={darkMode ? 'text-gray-300' : ''}>Manage fleets, optimize routes, and get analytics for better logistics.</p>
          </div>
          <div className={`p-6 shadow-lg rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <FaMoneyCheckAlt className="text-blue-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold">For Drivers</h3>
            <p className={darkMode ? 'text-gray-300' : ''}>Get more bookings, maximize earnings, and track trips seamlessly.</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`py-16 px-6 ${darkMode ? 'bg-gray-800' : 'bg-blue-100'}`}>
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose LorryWale?</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className={`p-6 shadow-lg rounded-lg flex items-center ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
            <FaShieldAlt className="text-blue-500 text-4xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Secure & Reliable</h3>
              <p className={darkMode ? 'text-gray-300' : ''}>End-to-end encryption and real-time tracking ensure safety.</p>
            </div>
          </div>
          <div className={`p-6 shadow-lg rounded-lg flex items-center ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
            <FaTruck className="text-blue-500 text-4xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Wide Network</h3>
              <p className={darkMode ? 'text-gray-300' : ''}>Thousands of trucks available across multiple cities.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className={`p-6 shadow-lg rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>"LorryWale made truck booking seamless for my business. Highly recommended!"</p>
            <p className={`mt-4 text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>- Rahul Sharma, Logistics Manager</p>
          </div>
          <div className={`p-6 shadow-lg rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>"A game changer for truck drivers. I get more bookings than ever."</p>
            <p className={`mt-4 text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>- Pankaj Singh, Truck Owner</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className={`py-16 px-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <h2 className="text-3xl font-bold text-center mb-12">FAQs</h2>
        <div className="max-w-4xl mx-auto">
          <div className={`p-4 shadow rounded-lg mb-4 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
            <h3 className="text-lg font-semibold">How do I book a truck?</h3>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Simply sign up, enter your requirements, and choose from available options.</p>
          </div>
          <div className={`p-4 shadow rounded-lg mb-4 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
            <h3 className="text-lg font-semibold">Can I track my shipment?</h3>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Yes, real-time tracking is available for all bookings.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className={`mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Sign up now and experience seamless truck booking.</p>
        <a
          href="/"
          className={`mt-6 ${darkMode ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'} text-white px-6 py-3 rounded-lg text-lg transition flex items-center gap-2 justify-center w-fit mx-auto`}
        >
          <FaHome /> Home
        </a>
      </div>
    </div>
  );
};

export default LearnMore;