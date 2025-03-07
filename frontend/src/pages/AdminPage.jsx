import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaCar } from "react-icons/fa6";
import { FaMedal } from "react-icons/fa6";


import {
  Truck, Users, User, LogOut,
  Settings, Search, Moon, Sun,
  AlertCircle, Filter, IndianRupee, Weight
} from 'lucide-react';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('trucks');
  const [darkMode, setDarkMode] = useState(false);
  const [trucks, setTrucks] = useState([]);
  const [drivers, setdrivers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState(null);

  const [filters, setFilters] = useState({
    truckType: "all",
    minCapacity: "",
    maxPrice: ""
  });

  const [showFilters, setShowFilters] = useState(false);

  // Initialize dark mode based on user preference or system preference
  useEffect(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  // Apply theme changes whenever darkMode state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Fetch trucks when the component mounts or when activeTab changes to 'trucks'
  useEffect(() => {
    if (activeTab === 'trucks') {
      fetchAllTrucks();
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'drivers') {
      fetchAllDrivers();
    }
  }, [activeTab]);

  const fetchAllTrucks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/trucks/alltrucks");
      setTrucks(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching trucks:", error);
      setError("Failed to load available trucks");
    } finally {
      setLoading(false);
    }
    console.log("Drivers state:", drivers);

  };

  const fetchAllDrivers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/admin/alldrivers");
      setdrivers(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching drivers:", error);
      setError("Failed to load available drivers");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDriver = async (extractedid) => {
    try {
      await axios.delete(`http://localhost:8000/admin/removedriver/${extractedid}`);
    } catch (error) {
      console.error("Error deleting drivers:", error);
      setError("Failed to delete driver");
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSelectTruck = (truck) => {
    setSelectedTruck(truck._id);
  };

  const handleSubmit = (truckId) => {
    if (!truckId) {
      console.log("Please select a truck first.");
      return;
    }
    localStorage.setItem("selectedtruckid", truckId);
    // Instead of navigating, you could show truck details in a modal or in another section
    console.log("Selected truck ID:", truckId);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const getFilteredTrucks = () => {
    return trucks.filter(truck => {
      if (filters.truckType !== "all" && truck.truckType !== filters.truckType) return false;
      if (filters.minCapacity && truck.capacity < parseInt(filters.minCapacity)) return false;
      if (filters.maxPrice && truck.pricePerKm > parseInt(filters.maxPrice)) return false;
      return true;
    });
  };

  const filteredTrucks = getFilteredTrucks();

  const tabs = [
    { key: 'trucks', label: 'Trucks', icon: <Truck size={20} className="mr-3" /> },
    { key: 'drivers', label: 'Drivers', icon: <User size={20} className="mr-3" /> },
    { key: 'users', label: 'Users', icon: <Users size={20} className="mr-3" /> },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/selectroles";
  };

  const renderTrucksContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className={`border-l-4 border-red-500 p-4 mb-6 ${darkMode ? 'bg-red-900/30' : 'bg-red-50'}`}>
          <div className="flex items-center">
            <AlertCircle className="text-red-500 mr-2" />
            <p className={darkMode ? 'text-red-300' : 'text-red-700'}>{error}</p>
          </div>
        </div>
      );
    }

    if (filteredTrucks.length === 0) {
      return (
        <div className={`text-center py-12 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <Truck size={48} className={`mx-auto mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>No trucks available at the moment</p>
          <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Please check back later or contact support</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrucks.map((truck) => (
          <div
            key={truck._id}
            className={`border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${selectedTruck === truck._id ? "ring-2 ring-blue-500 transform scale-[1.02]" : ""} 
            ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}
            onClick={() => handleSelectTruck(truck)}
          >
            <div className="h-56 overflow-hidden bg-gray-200 relative">
              {truck.images && truck.images.length > 0 ? (
                <img
                  src={`http://localhost:8000${truck.images[0]}`}
                  alt={`${truck.manufacturer} ${truck.model}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              ) : (
                <div className={`flex items-center justify-center h-full ${darkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                  <Truck size={64} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
                  <p className={darkMode ? 'text-gray-400 ml-2' : 'text-gray-500 ml-2'}>No image available</p>
                </div>
              )}
              <span className={`absolute top-4 right-4 px-3 py-1.5 text-xs font-semibold rounded-full ${truck.status === "Available"
                ? darkMode ? "bg-green-900/60 text-green-300" : "bg-green-100 text-green-800"
                : truck.status === "In Transit"
                  ? darkMode ? "bg-yellow-900/60 text-yellow-300" : "bg-yellow-100 text-yellow-800"
                  : darkMode ? "bg-red-900/60 text-red-300" : "bg-red-100 text-red-800"
                }`}>
                {truck.status}
              </span>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{truck.truckNumber}</h2>
                <div className={`px-2 py-1 rounded text-sm font-medium ${darkMode ? 'bg-blue-900/40 text-blue-300' : 'bg-blue-50 text-blue-700'}`}>
                  {truck.manufacturer}
                </div>
              </div>

              <p className={`font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{truck.model}</p>

              <div className={`border-t border-b py-3 mb-3 ${darkMode ? 'border-gray-600' : 'border-gray-100'}`}>
                <div className="grid grid-cols-2 gap-y-3">
                  <div className="flex items-center">
                    <Truck size={16} className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{truck.truckType}</p>
                  </div>
                  <div className="flex items-center">
                    <Weight size={16} className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{truck.capacity} Tons</p>
                  </div>
                  <div className="flex items-center">
                    <IndianRupee size={16} className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>₹{truck.pricePerKm}/km</p>
                  </div>
                </div>
              </div>

              {truck.status === "Available" ? (
                <button
                  onClick={() => handleSubmit(truck._id)}
                  className={`w-full py-2.5 rounded-md transition-colors duration-200 flex items-center justify-center ${darkMode
                    ? 'bg-blue-700 hover:bg-blue-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                >
                  <Truck size={18} className="mr-2" />
                  Book This Truck
                </button>
              ) : (
                <button className={`w-full py-2.5 rounded-md cursor-not-allowed flex items-center justify-center ${darkMode ? 'bg-gray-600 text-gray-400' : 'bg-gray-200 text-gray-500'
                  }`}>
                  <AlertCircle size={18} className="mr-2" />
                  Currently Unavailable
                </button>
              )}
            </div>

            {truck.images && truck.images.length > 1 && (
              <div className="px-5 pb-4">
                <p className={`text-xs mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>More Images</p>
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {truck.images.slice(1).map((img, index) => (
                    <img
                      key={index}
                      src={`http://localhost:8000${img}`}
                      alt={`Truck view ${index + 2}`}
                      className={`w-16 h-12 object-cover rounded border hover:border-blue-400 transition-colors ${darkMode ? 'border-gray-600' : 'border-gray-200'
                        }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'trucks':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Available Trucks</h2>
              <button
                onClick={toggleFilters}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${darkMode ? 'bg-gray-700 text-blue-300 hover:bg-gray-600' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
              >
                <Filter size={18} className="mr-2" />
                Filters
              </button>
            </div>

            {showFilters && (
              <div className={`p-4 rounded-md mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Truck Type</label>
                  <select
                    className={`w-full p-2 border rounded-md ${darkMode ? 'bg-gray-600 border-gray-600 text-white' : 'border-gray-300 text-gray-800'}`}
                    value={filters.truckType}
                    onChange={(e) => setFilters({ ...filters, truckType: e.target.value })}
                  >
                    <option value="all">All Types</option>
                    <option value="Container">Container</option>
                    <option value="Flatbed">Flatbed</option>
                    <option value="Refrigerated">Refrigerated</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Min Capacity (Tons)</label>
                  <input
                    type="number"
                    className={`w-full p-2 border rounded-md ${darkMode ? 'bg-gray-600 border-gray-600 text-white' : 'border-gray-300 text-gray-800'}`}
                    value={filters.minCapacity}
                    onChange={(e) => setFilters({ ...filters, minCapacity: e.target.value })}
                    placeholder="Enter minimum capacity"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Max Price (₹ per km)</label>
                  <input
                    type="number"
                    className={`w-full p-2 border rounded-md ${darkMode ? 'bg-gray-600 border-gray-600 text-white' : 'border-gray-300 text-gray-800'}`}
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    placeholder="Enter maximum price"
                  />
                </div>
              </div>
            )}

            {renderTrucksContent()}
          </div>
        );
      case 'drivers':
        return (
          <div className={`p-6 max-w-6xl mx-auto ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Drivers Management</h2>

            </div>

            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>Manage and monitor all drivers from here.</p>

            {drivers.length === 0 ? (
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-black'} border rounded-lg p-8 text-center`}>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-lg`}>No drivers available</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {drivers.map((person) => (
                  <div
                    key={person._id}
                    className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl shadow-lg overflow-hidden p-4 transition-all duration-300 hover:shadow-xl`}
                  >
                    {/* Circular Profile Image */}
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-blue-500 dark:border-blue-400 shadow-md">
                      {person.photo ? (
                        <img
                          src={`http://localhost:8000/uploads/${person.photo}`}
                          alt={`${person.drivername} photo`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`flex items-center justify-center w-full h-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <svg className={`w-12 h-12 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Driver Details */}
                    <div className="text-center mt-4">
                      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{person.drivername}</h3>
                      <div className="space-y-1 mt-2">
                        <p className={`${darkMode ? 'text-gray-400' : 'text-black'} flex items-center justify-center`}>
                          <span className="mr-1"><FaPhoneAlt />
                          </span> {person.phone}
                        </p>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-black'} flex items-center justify-center`}>
                          <span className="mr-1"><IoMdMail /></span> {person.email}
                        </p>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-black'} flex items-center justify-center`}>
                          <span className="mr-1"><FaCar /></span> License: {person.licenseNumber}
                        </p>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-black'} flex items-center justify-center`}>
                          <span className="mr-1"><FaMedal />
                          </span> Experience: {person.experience} years
                        </p>
                      </div>
                      <p className={`mt-2 px-3 py-1 inline-block text-sm font-medium rounded-lg
                            ${person.status === "Active"
                          ? darkMode ? "bg-green-900 text-green-300" : "bg-green-100 text-green-700"
                          : darkMode ? "bg-red-900 text-red-300" : "bg-red-100 text-red-700"}`}
                      >
                        {person.status}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 flex justify-around">
                      <button className={`${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200`}>
                        Contact
                      </button>
                      <button className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'} px-4 py-2 rounded-lg text-sm transition-colors duration-200`}>
                        View Details
                      </button>
                      <button onClick={() => handleDeleteDriver(person._id)} className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'} px-4 py-2 rounded-lg text-sm transition-colors duration-200`}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'users':
        return (
          <div>
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Users Management</h2>
            <p className={darkMode ? "text-gray-400 mt-2" : "text-gray-500 mt-2"}>
              Manage and monitor all users from here.
            </p>
            {/* User management content will go here */}
          </div>
        );
      default:
        return (
          <div>
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Welcome to Admin Dashboard
            </h2>
            <p className={darkMode ? "text-gray-400 mt-2" : "text-gray-500 mt-2"}>
              Select a tab to manage different aspects of the system.
            </p>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      {/* Sidebar */}
      <div className={`w-64 transition-all ${darkMode ? 'bg-gray-800 shadow-gray-900' : 'bg-white shadow-lg'}`}>
        <div className={`p-6 flex items-center space-x-3 ${darkMode ? 'border-gray-700' : 'border-b'}`}>
          <img className='size-16' src="/logo.png" alt="logo" />
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>LorryWale</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {tabs.map((tab) => (
              <li key={tab.key}>
                <button
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex items-center p-3 rounded-lg transition-transform ${activeTab === tab.key
                    ? darkMode
                      ? "bg-blue-900 text-blue-200 font-semibold scale-105 shadow-md"
                      : "bg-blue-100 text-blue-800 font-semibold scale-105 shadow-md"
                    : darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {tab.icon} {tab.label}
                </button>
              </li>
            ))}

            <li className={`mt-4 pt-4 ${darkMode ? 'border-t border-gray-700' : 'border-t'}`}>
              <button onClick={handleLogout} className={`w-full flex items-center p-3 rounded-lg ${darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'}`}>
                <LogOut className="mr-3" size={20} /> Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className={`pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-shadow ${darkMode
                ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-700'
                : 'bg-white border-gray-300 focus:ring-blue-500'
                }`}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`hover:scale-105 transition p-2 rounded-full ${darkMode ? 'text-yellow-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button className={`hover:scale-105 transition ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}>
              <Settings size={24} />
            </button>
            <div className="flex items-center space-x-2">
              <User className={darkMode ? "text-gray-300" : "text-gray-600"} size={20} />
              <span className="font-medium">Admin</span>
            </div>
          </div>
        </div>

        {/* Dynamic Content */}
        <div className={`rounded-lg p-6 transition-all ${darkMode ? 'bg-gray-800 shadow-gray-900' : 'bg-white shadow-lg'}`}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;