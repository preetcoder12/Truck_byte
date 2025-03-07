import { useEffect, useState } from 'react';
import { Truck, BarChart3, Calendar, Users, AlertTriangle, Clock, MapPin, Settings, Search, User, CirclePlus, Bell, ChevronRight, Filter, Moon, Sun } from 'lucide-react';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [profileRoute, setProfileRoute] = useState("/");
    const [driver, setDriver] = useState(null);
    const token = localStorage.getItem("driverToken");
    const [darkMode, setDarkMode] = useState(false);

    const [fleetStats, setFleetStats] = useState({
        activeVehicles: 42,
        inMaintenance: 7,
        idle: 5,
        totalVehicles: 54
    });

    const [recentAlerts, setRecentAlerts] = useState([
        { id: 1, type: 'Maintenance Due', truck: 'TRK-1024', message: 'Oil change required', time: '2 hours ago' },
        { id: 2, type: 'Route Delay', truck: 'TRK-0872', message: 'Traffic congestion on I-95', time: '3 hours ago' },
        { id: 3, type: 'Fuel Alert', truck: 'TRK-0513', message: 'Low fuel level', time: '5 hours ago' }
    ]);

    // Toggle dark mode and save preference to localStorage
    const toggleDarkMode = () => {
        const newDarkModeState = !darkMode;
        setDarkMode(newDarkModeState);
        localStorage.setItem('darkMode', newDarkModeState);
    };

    useEffect(() => {
        // Load dark mode preference from localStorage
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedDarkMode);

        // Apply dark mode class to document body
        if (savedDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    useEffect(() => {
        const storedId = localStorage.getItem("driverId");
        if (!storedId) {
            console.log("No driver ID found, redirecting to login...");
            setDriver(null);
            setProfileRoute("/driverlogin");
            return;
        }

        const fetchDriverDetails = async () => {
            try {
                if (!token) {
                    console.error("No token found, redirecting to login...");
                    setDriver(null);
                    setProfileRoute("/driverlogin");
                    return;
                }

                const response = await axios.get(`http://localhost:8000/driver/details/${storedId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                console.log("Driver details:", response.data);
                setDriver(response.data);
                setProfileRoute("/driverprofile");
            } catch (error) {
                console.error("Error fetching driver's details:", error);
                setDriver(null);
                setProfileRoute("/driverlogin");
            }
        };

        fetchDriverDetails();
    }, []);

    const formattedDate = driver?.createdAt
        ? new Date(driver.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : "N/A";

    return (
        <div className={`min-h-screen font-sans ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
            <div className="flex">
                {/* Sidebar - Adapts to dark mode */}
                <div className={`${darkMode ? 'bg-gray-950' : 'bg-slate-900'} text-white w-72 min-h-screen p-6`}>
                    <div className="flex items-center mb-10">
                        <img className='size-[5rem]' src="/logo.png" alt="logo" />
                        <a href='/'><h1 className="text-xl font-bold tracking-tight">LorryWale</h1></a>
                    </div>

                    <nav>
                        <div className="mb-8">
                            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-4">Dashboard</p>
                            <a href="/dashboard" className="flex items-center p-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl mb-2 shadow-md">
                                <BarChart3 className="w-5 h-5 mr-3" />
                                <span className="font-medium">Overview</span>
                            </a>
                            <a href="#" className="flex items-center p-3 hover:bg-slate-800 rounded-xl mb-2 text-slate-300 hover:text-white transition-all">
                                <Truck className="w-5 h-5 mr-3" />
                                <span>Fleet Management</span>
                            </a>

                            <a href="#" className="flex items-center p-3 hover:bg-slate-800 rounded-xl mb-2 text-slate-300 hover:text-white transition-all">
                                <Users className="w-5 h-5 mr-3" />
                                <span>Drivers</span>
                            </a>
                        </div>

                        <div className="mb-8">
                            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-4">Actions</p>
                            <a href="/booktrucks" className="flex items-center p-3 hover:bg-slate-800 rounded-xl mb-2 text-slate-300 hover:text-white transition-all">
                                <Truck className="w-5 h-5 mr-3" />
                                <span>Book Truck</span>
                            </a>
                            <a href="/becomedriver" className="flex items-center p-3 hover:bg-slate-800 rounded-xl mb-2 text-slate-300 hover:text-white transition-all">
                                <User className="w-5 h-5 mr-3" />
                                <span>Become Driver</span>
                            </a>
                            <a href="/addtruck" className="flex items-center p-3 hover:bg-slate-800 rounded-xl mb-2 text-slate-300 hover:text-white transition-all">
                                <CirclePlus className="w-5 h-5 mr-3" />
                                <span>Add Truck</span>
                            </a>
                        </div>

                        <div>
                            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-4">System</p>
                            <a href="#" className="flex items-center p-3 hover:bg-slate-800 rounded-xl mb-2 text-slate-300 hover:text-white transition-all">
                                <Settings className="w-5 h-5 mr-3" />
                                <span>Settings</span>
                            </a>
                        </div>
                    </nav>

                    <div className="mt-auto pt-10">
                        <div
                            className="bg-slate-800 p-4 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition duration-300 cursor-pointer"
                            onClick={() => navigate(profileRoute)}
                        >
                            <div className="flex items-center gap-4">
                                <div>
                                    {driver?.photo ? (
                                        <img
                                            src={`http://localhost:8000/uploads/${driver.photo}`}
                                            alt={driver?.drivername || "Driver"}
                                            className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold"
                                        />
                                    ) : (
                                        <FaUser className="text-gray-400 text-2xl" />
                                    )}
                                </div>

                                <div>
                                    <p className="font-medium text-white">{driver?.drivername || "Login as Driver"}</p>
                                    <p className="text-xs text-slate-400">Joined: {formattedDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content - Adapts to dark mode */}
                <div className="flex-1">
                    {/* Header */}
                    <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-8 py-4 flex justify-between items-center sticky top-0 z-10`}>
                        <div className="flex items-center">
                            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Fleet Dashboard</h2>
                            <div className="ml-6 flex space-x-1">
                                <button className={`px-3 py-1 text-sm ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-50 text-blue-600'} rounded-full font-medium`}>Today</button>
                                <button className={`px-3 py-1 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'} rounded-full`}>Week</button>
                                <button className={`px-3 py-1 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'} rounded-full`}>Month</button>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className={`px-4 py-2 pl-10 ${darkMode
                                        ? 'bg-gray-700 border-gray-600 focus:ring-blue-400 focus:border-blue-400 text-white'
                                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                        } border rounded-lg focus:outline-none focus:ring-2 w-64`}
                                />
                                <Search className={`absolute left-3 top-2.5 w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                            </div>
                            <button
                                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} relative`}
                            >
                                <Bell className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            {/* Dark Mode Toggle Button */}
                            <button
                                onClick={toggleDarkMode}
                                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                                aria-label="Toggle dark mode"
                            >
                                {darkMode ? (
                                    <Sun className="w-5 h-5 text-yellow-300" />
                                ) : (
                                    <Moon className="w-5 h-5 text-gray-600" />
                                )}
                            </button>
                        </div>
                    </header>

                    {/* Dashboard Content */}
                    <div className="p-8">
                        {/* Fleet Status Cards - Adapts to dark mode */}
                        <div className="grid grid-cols-4 gap-6 mb-8">
                            <div className={`${darkMode ? 'bg-gray-800 border-gray-700 hover:shadow-blue-900/10' : 'bg-white border-gray-100 hover:shadow-md'} p-6 rounded-xl shadow-sm border transition-shadow`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm font-medium`}>Active Vehicles</p>
                                        <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mt-2`}>{fleetStats.activeVehicles}</h3>
                                        <div className="flex items-center mt-2">
                                            <span className={`text-xs px-2 py-1 ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'} rounded-full font-medium`}>
                                                {Math.round((fleetStats.activeVehicles / fleetStats.totalVehicles) * 100)}% of fleet
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`p-3 ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-500 bg-opacity-10 text-blue-500'} rounded-xl`}>
                                        <Truck className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full h-1.5 mt-4`}>
                                    <div className={`${darkMode ? 'bg-blue-400' : 'bg-blue-500'} h-1.5 rounded-full`} style={{ width: `${Math.round((fleetStats.activeVehicles / fleetStats.totalVehicles) * 100)}%` }}></div>
                                </div>
                            </div>

                            <div className={`${darkMode ? 'bg-gray-800 border-gray-700 hover:shadow-yellow-900/10' : 'bg-white border-gray-100 hover:shadow-md'} p-6 rounded-xl shadow-sm border transition-shadow`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm font-medium`}>In Maintenance</p>
                                        <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mt-2`}>{fleetStats.inMaintenance}</h3>
                                        <div className="flex items-center mt-2">
                                            <span className={`text-xs px-2 py-1 ${darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'} rounded-full font-medium`}>
                                                {Math.round((fleetStats.inMaintenance / fleetStats.totalVehicles) * 100)}% of fleet
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`p-3 ${darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-500 bg-opacity-10 text-yellow-500'} rounded-xl`}>
                                        <Settings className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full h-1.5 mt-4`}>
                                    <div className={`${darkMode ? 'bg-yellow-400' : 'bg-yellow-500'} h-1.5 rounded-full`} style={{ width: `${Math.round((fleetStats.inMaintenance / fleetStats.totalVehicles) * 100)}%` }}></div>
                                </div>
                            </div>

                            <div className={`${darkMode ? 'bg-gray-800 border-gray-700 hover:shadow-gray-900/10' : 'bg-white border-gray-100 hover:shadow-md'} p-6 rounded-xl shadow-sm border transition-shadow`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm font-medium`}>Idle Vehicles</p>
                                        <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mt-2`}>{fleetStats.idle}</h3>
                                        <div className="flex items-center mt-2">
                                            <span className={`text-xs px-2 py-1 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'} rounded-full font-medium`}>
                                                {Math.round((fleetStats.idle / fleetStats.totalVehicles) * 100)}% of fleet
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`p-3 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-500 bg-opacity-10 text-gray-500'} rounded-xl`}>
                                        <Clock className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full h-1.5 mt-4`}>
                                    <div className={`${darkMode ? 'bg-gray-400' : 'bg-gray-500'} h-1.5 rounded-full`} style={{ width: `${Math.round((fleetStats.idle / fleetStats.totalVehicles) * 100)}%` }}></div>
                                </div>
                            </div>

                            <div className={`${darkMode ? 'bg-gray-800 border-gray-700 hover:shadow-indigo-900/10' : 'bg-white border-gray-100 hover:shadow-md'} p-6 rounded-xl shadow-sm border transition-shadow`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm font-medium`}>Total Fleet</p>
                                        <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mt-2`}>{fleetStats.totalVehicles}</h3>
                                        <div className="flex items-center mt-2">
                                            <span className={`text-xs px-2 py-1 ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'} rounded-full font-medium`}>
                                                View details
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`p-3 ${darkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-500 bg-opacity-10 text-indigo-500'} rounded-xl`}>
                                        <BarChart3 className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full h-1.5 mt-4`}>
                                    <div className={`${darkMode ? 'bg-indigo-400' : 'bg-indigo-500'} h-1.5 rounded-full`} style={{ width: "100%" }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Action Buttons */}
                        <div className="flex mb-8 space-x-4">
                            <a href='/addtruck' className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                                <CirclePlus className="w-4 h-4 mr-2" />
                                <span>Add Vehicle</span>
                            </a>
                            <button className={`flex items-center px-4 py-2 ${darkMode ? 'bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'} rounded-lg transition-colors shadow-sm border`}>
                                <Filter className="w-4 h-4 mr-2" />
                                <span>Filter View</span>
                            </button>
                        </div>

                        {/* Main Sections - Updated Styling for Dark Mode */}
                        <div className="grid grid-cols-2 gap-8">
                            {/* Active Deliveries Map */}
                            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} p-6 rounded-xl shadow-sm border`}>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>Active Deliveries Map</h3>
                                    <button className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} text-sm font-medium flex items-center`}>
                                        View All <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>
                                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} h-64 rounded-lg flex items-center justify-center overflow-hidden`}>
                                    <div className={`${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-blue-50 border-blue-200'} border-2 border-dashed rounded-lg p-6 text-center w-4/5`}>
                                        <MapPin className={`w-10 h-10 ${darkMode ? 'text-blue-400' : 'text-blue-400'} mx-auto mb-2`} />
                                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Interactive map would be displayed here</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <div className={`flex items-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                                        <span>42 vehicles on the road</span>
                                    </div>
                                    <div className={`flex items-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                        <span>16 deliveries in progress</span>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Alerts - Dark Mode Support */}
                            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} p-6 rounded-xl shadow-sm border`}>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>Recent Alerts</h3>
                                    <button className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} text-sm font-medium flex items-center`}>
                                        View All <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {recentAlerts.map(alert => (
                                        <div key={alert.id} className={`${darkMode ? 'bg-gray-700 border-gray-600 hover:shadow-md' : 'bg-white border-gray-100 hover:shadow-md'} p-4 rounded-lg border transition-shadow`}>
                                            <div className="flex justify-between">
                                                <div className="flex items-start">
                                                    <div className={`p-2 ${darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-500'} rounded-lg mr-3`}>
                                                        <AlertTriangle className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{alert.type}</p>
                                                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{alert.truck} - {alert.message}</p>
                                                    </div>
                                                </div>
                                                <span className={`text-xs ${darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-600'} px-2 py-1 rounded-full`}>{alert.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;