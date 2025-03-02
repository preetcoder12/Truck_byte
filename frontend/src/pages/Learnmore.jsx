import { FaTruck, FaUsers, FaMoneyCheckAlt, FaShieldAlt } from "react-icons/fa";


const LearnMore = () => {
  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center bg-blue-600 text-white text-center px-6">
        <div>
          <h1 className="text-4xl font-bold">Your Trusted Trucking Solution</h1>
          <p className="mt-4 text-lg">Connecting businesses, drivers, and users with seamless logistics.</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <FaUsers className="text-blue-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold">For Users</h3>
            <p>Find and book trucks easily, track shipments, and get instant pricing.</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <FaTruck className="text-blue-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold">For Companies</h3>
            <p>Manage fleets, optimize routes, and get analytics for better logistics.</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <FaMoneyCheckAlt className="text-blue-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold">For Drivers</h3>
            <p>Get more bookings, maximize earnings, and track trips seamlessly.</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-blue-100 py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose LorryWale?</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 shadow-lg rounded-lg flex items-center">
            <FaShieldAlt className="text-blue-500 text-4xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Secure & Reliable</h3>
              <p>End-to-end encryption and real-time tracking ensure safety.</p>
            </div>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg flex items-center">
            <FaTruck className="text-blue-500 text-4xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Wide Network</h3>
              <p>Thousands of trucks available across multiple cities.</p>
            </div>
          </div>
        </div>
      </div>



      {/* Testimonials */}
      <div className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <p className="text-gray-700">“LorryWale made truck booking seamless for my business. Highly recommended!”</p>
            <p className="mt-4 text-sm text-blue-600">- Rahul Sharma, Logistics Manager</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <p className="text-gray-700">“A game changer for truck drivers. I get more bookings than ever.”</p>
            <p className="mt-4 text-sm text-blue-600">- Pankaj Singh, Truck Owner</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-100 py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">FAQs</h2>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-4 shadow rounded-lg mb-4">
            <h3 className="text-lg font-semibold">How do I book a truck?</h3>
            <p className="text-gray-600">Simply sign up, enter your requirements, and choose from available options.</p>
          </div>
          <div className="bg-white p-4 shadow rounded-lg mb-4">
            <h3 className="text-lg font-semibold">Can I track my shipment?</h3>
            <p className="text-gray-600">Yes, real-time tracking is available for all bookings.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className="mt-4 text-gray-600">Sign up now and experience seamless truck booking.</p>
        <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LearnMore;
