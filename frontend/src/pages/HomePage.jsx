import React from 'react';
import { Truck, BarChart3, Shield, Clock, Zap, Check, ChevronRight, Menu, X, Home } from 'lucide-react';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Truck className="h-10 w-10 text-blue-600" />
              <a href="/"> <span className="ml-3 text-2xl font-bold text-gray-900">LoadMate</span></a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#benefits" className="text-gray-600 hover:text-blue-600 transition-colors">Benefits</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Testimonials</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                Login
              </a>
              <a href="/dashboard" className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium">
                Dashboard
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex  ">
              <button
                onClick={toggleMenu}
                className="text-gray-500 hover:text-blue-600"
              >
                {isMenuOpen ? <X className="h-6 w-6 " /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white pt-2 pb-4 px-4 border-t">
            <a href="#features" className="block py-2 text-gray-600">Features</a>
            <a href="#benefits" className="block py-2 text-gray-600">Benefits</a>
            <a href="#testimonials" className="block py-2 text-gray-600">Testimonials</a>
            <a href="#pricing" className="block py-2 text-gray-600">Pricing</a>
            <a href="#contact" className="block py-2 text-gray-600">Contact</a>
            <div className="mt-4 pt-4 border-t flex flex-col space-y-4">
              <a href="/login" className="text-blue-600 font-medium">Login</a>
              <a href="#demo" className="bg-blue-600 text-white px-4 py-2 rounded-md text-center">
                Request Demo
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Manage Your Fleet with Precision and Ease
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-2xl">
                LoadMate gives you complete control over your truck fleet, optimizing routes,
                reducing costs, and improving efficiency with our advanced management solution.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a
                  href="/dashboard"
                  className="bg-blue-600 text-white px-8 py-4 rounded-md text-center text-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Request Free Demo
                </a>
                <a
                  href="#learn-more"
                  className="bg-white text-blue-600 border border-blue-600 px-8 py-4 rounded-md text-center text-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-4 rounded-lg shadow-xl">
                <img
                  src="/api/placeholder/600/400"
                  alt="LoadMate dashboard preview"
                  className="rounded-md w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Powerful Features for Complete Fleet Management
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive solution is designed to handle every aspect of your trucking operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="p-3 bg-blue-100 rounded-md w-12 h-12 flex items-center justify-center text-blue-600 mb-4">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Fleet Tracking</h3>
              <p className="text-gray-600">Monitor your entire fleet in real-time with GPS tracking and instant status updates.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="p-3 bg-green-100 rounded-md w-12 h-12 flex items-center justify-center text-green-600 mb-4">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
              <p className="text-gray-600">Gain actionable insights with comprehensive reporting and performance metrics.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="p-3 bg-purple-100 rounded-md w-12 h-12 flex items-center justify-center text-purple-600 mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Maintenance Management</h3>
              <p className="text-gray-600">Automate maintenance scheduling and receive alerts for preventive service needs.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="p-3 bg-yellow-100 rounded-md w-12 h-12 flex items-center justify-center text-yellow-600 mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Scheduling & Dispatch</h3>
              <p className="text-gray-600">Efficiently assign drivers and vehicles while optimizing delivery schedules.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="p-3 bg-red-100 rounded-md w-12 h-12 flex items-center justify-center text-red-600 mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fuel Management</h3>
              <p className="text-gray-600">Track fuel consumption, identify efficiency opportunities, and reduce costs.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="p-3 bg-indigo-100 rounded-md w-12 h-12 flex items-center justify-center text-indigo-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Route Optimization</h3>
              <p className="text-gray-600">Plan the most efficient routes to save time, fuel, and operational costs.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div id="benefits" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 md:pr-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Transform Your Trucking Operations
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Join hundreds of companies that have revolutionized their fleet management with LoadMate
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Reduce Operating Costs</h3>
                    <p className="mt-1 text-gray-600">
                      Our customers report an average of 23% reduction in operational costs after implementing our system.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Increase Fleet Utilization</h3>
                    <p className="mt-1 text-gray-600">
                      Optimize your fleet usage with intelligent scheduling and assignment algorithms.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Improve Driver Satisfaction</h3>
                    <p className="mt-1 text-gray-600">
                      Better routes and schedules lead to happier drivers and lower turnover rates.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Enhance Customer Service</h3>
                    <p className="mt-1 text-gray-600">
                      Provide accurate ETAs and real-time tracking information to your customers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="#case-studies"
                  className="text-blue-600 font-medium inline-flex items-center"
                >
                  View case studies
                  <ChevronRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="mt-10 md:mt-0 md:w-1/2">
              <div className="bg-white p-4 rounded-lg shadow-lg">
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
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="text-3xl font-bold text-blue-600">40%</div>
                    <p className="text-sm text-gray-600">Maintenance Cost Reduction</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="text-3xl font-bold text-blue-600">2.5x</div>
                    <p className="text-sm text-gray-600">ROI Within 6 Months</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="text-3xl font-bold text-blue-600">5 hrs</div>
                    <p className="text-sm text-gray-600">Weekly Admin Time Saved</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="text-3xl font-bold text-blue-600">98%</div>
                    <p className="text-sm text-gray-600">Customer Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Trusted by Industry Leaders
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              See what our customers have to say about LoadMate
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "LoadMate has completely transformed how we manage our fleet. The real-time tracking and maintenance alerts have reduced our downtime by 35%."
              </p>
              <div className="border-t pt-4">
                <p className="font-medium">Michael Rodriguez</p>
                <p className="text-sm text-gray-500">Fleet Manager, Express Logistics</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "The ROI on this system has been incredible. We've saved over $120,000 in operational costs in the first year alone through better route planning and fuel management."
              </p>
              <div className="border-t pt-4">
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-sm text-gray-500">Operations Director, Midwest Transport</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "The implementation was seamless and the customer support has been outstanding. Our drivers actually enjoy using the system because it makes their jobs easier."
              </p>
              <div className="border-t pt-4">
                <p className="font-medium">David Chang</p>
                <p className="text-sm text-gray-500">CEO, Pacific Freight Solutions</p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center flex justify-center items-center mx-auto">
            <div className="relative overflow-hidden w-[40rem] bg-white py-4">
              <div className="flex gap-14 animate-marquee">
                <img src="/amv.png" alt="Client logo" className="h-12" />
                <img src="/ashokleyland.png" alt="Client logo" className="h-12" />
                <img src="/bharat.png" alt="Client logo" className="h-12" />
                <img src="/eicher.png" alt="Client logo" className="h-12" />
                <img src="/tata.png" alt="Client logo" className="h-12" />
                <img src="/force.png" alt="Client logo" className="h-12" />
                <img src="/mahindra.png" alt="Client logo" className="h-12" />
                <img src="/amv.png" alt="Client logo" className="h-12" />
                <img src="/ashokleyland.png" alt="Client logo" className="h-12" />
                <img src="/bharat.png" alt="Client logo" className="h-12" />
                <img src="/eicher.png" alt="Client logo" className="h-12" />
                <img src="/tata.png" alt="Client logo" className="h-12" />
                <img src="/force.png" alt="Client logo" className="h-12" />
                <img src="/mahindra.png" alt="Client logo" className="h-12" />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Fleet Management?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of companies who have optimized their operations with LoadMate.
            Get started with a free demo today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#demo"
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
              <div className="flex items-center">
                <Truck className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">LoadMate</span>
              </div>
              <p className="mt-4 text-gray-400">
                The complete solution for modern fleet management.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#careers" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#blog" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#partners" className="text-gray-400 hover:text-white transition-colors">Partners</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#documentation" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#tutorials" className="text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#support" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
                <li><a href="#api" className="text-gray-400 hover:text-white transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">Email: info@truckmaster.pro</li>
                <li className="text-gray-400">Phone: (555) 123-4567</li>
                <li className="text-gray-400">123 Fleet Street, Suite 100</li>
                <li className="text-gray-400">Chicago, IL 60601</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 LoadMate. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#terms" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#cookies" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;