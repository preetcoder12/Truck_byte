  import React, { useState } from 'react';
  import {
    Truck, Users, User, LogOut,
    ListChecks, Settings,
    PlusCircle, Search,
    Edit, Trash2
  } from 'lucide-react';

  const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('trucks');

    const tabs = [
      { key: 'trucks', label: 'Trucks', icon: <Truck size={20} className="mr-3" /> },
      { key: 'drivers', label: 'Drivers', icon: <User size={20} className="mr-3" /> },
      { key: 'users', label: 'Users', icon: <Users size={20} className="mr-3" /> },
    ];

    const handleLogout = () => {
      localStorage.clear();
      window.location.href = "/selectroles";
    }

    return (
      <div className="min-h-screen flex bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg transition-all">
          <div className="p-6 border-b flex items-center space-x-3">
            <img className='size-[4rem]' src="/logo.png" alt="logo" />
            <h1 className="text-2xl font-bold text-gray-800">LorryWale</h1>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {tabs.map(tab => (
                <li key={tab.key}>
                  <button
                    onClick={() => setActiveTab(tab.key)}
                    className={`w-full flex items-center p-3 rounded-lg transition-transform ${activeTab === tab.key
                      ? 'bg-blue-100 text-blue-800 font-semibold scale-105 shadow-md'
                      : 'hover:bg-gray-100 hover:scale-105'
                      }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                </li>
              ))}
              <li className="border-t mt-4 pt-4">
                <button onClick={handleLogout} className="w-full flex items-center p-3 text-red-600 hover:bg-gray-100 rounded-lg">
                  <LogOut className="mr-3" size={20} /> Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-10">
          <div className="flex justify-between items-center mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-800 hover:scale-105 transition">
                <Settings size={24} />
              </button>
              <div className="flex items-center space-x-2">
                <User className="text-gray-600" size={20} />
                <span className="font-medium">Admin</span>
              </div>
            </div>
          </div>

          {/* Dynamic Content */}
          <div className="bg-white shadow-lg rounded-lg p-6 transition-all hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800">Welcome to {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management</h2>
            <p className="text-gray-500 mt-2">Manage and monitor all {activeTab} from here.</p>
          </div>
        </div>
      </div>
    );
  };

  export default AdminPage;
