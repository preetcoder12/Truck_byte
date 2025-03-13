import { useEffect, useState } from 'react';
import {
    Truck, BarChart3, Calendar, Users, AlertTriangle, Clock, MapPin, Settings, Search,
    User, CirclePlus, Bell, ChevronRight, Filter, Moon, Sun, Activity, Sliders, PieChart,
    TrendingUp, Map, Menu, X, LogOut, HelpCircle, Home
} from 'lucide-react';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [profileRoute, setProfileRoute] = useState("/");
    const [driver, setDriver] = useState(null);
    const token = localStorage.getItem("driverToken");
    const [darkMode, setDarkMode] = useState(false);
    const [totaltrucks, settotaltrucks] = useState(null);
    const [Idle, setIdle] = useState(null);
    const [UnderMaintenance, setUnderMaintenance] = useState(null);
    const [Ontrip, setOntrip] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
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

    const [activeDashboardItems, setActiveDashboardItems] = useState({
        dashboard: false,
        Account: false,
        settings: false,
        addTrucks: false,
        becomeDriver: false,
        bookTruck: false
    });

    useEffect(() => {
        if (allusers.length > 0 && allusers[0].dashboardVisibility) {
            setActiveDashboardItems(allusers[0].dashboardVisibility);
        }
    }, [allusers]);



    const [fleetStats, setFleetStats] = useState({
        OnRoad: 0,
        inMaintenance: 0,
        idle: 0,
        totalVehicles: 0
    });

    const [loading, setLoading] = useState(true);

    const [recentAlerts, setRecentAlerts] = useState([
        { id: 1, type: 'Maintenance Due', truck: 'TRK-1024', message: 'Oil change required', time: '2 hours ago', status: 'urgent' },
        { id: 2, type: 'Route Delay', truck: 'TRK-0872', message: 'Traffic congestion on I-95', time: '3 hours ago', status: 'warning' },
        { id: 3, type: 'Fuel Alert', truck: 'TRK-0513', message: 'Low fuel level', time: '5 hours ago', status: 'info' },
        { id: 4, type: 'System Update', truck: 'TRK-0721', message: 'Tracking system updated', time: '6 hours ago', status: 'success' }
    ]);

    const [activeVehicles, setActiveVehicles] = useState([
        { id: 1, vehicle: 'TRK-1024', driver: 'Alex Johnson', route: 'Chicago → Detroit', progress: 65, eta: '2h 15m' },
        { id: 2, vehicle: 'TRK-0872', driver: 'Maria Garcia', route: 'Boston → New York', progress: 82, eta: '45m' },
        { id: 3, vehicle: 'TRK-0513', driver: 'David Kim', route: 'Dallas → Houston', progress: 38, eta: '3h 20m' }
    ]);

    const total_trucks_count = async () => {
        try {
            const response = await axios.get("http://localhost:8000/trucks/total_trucks");
            settotaltrucks(response.data.TotalTrucks);
        } catch (error) {
            console.error("Error fetching total trucks number:", error);
        }
    };

    const total_Idle_trucks_count = async () => {
        try {
            const response = await axios.get("http://localhost:8000/trucks/Idle_trucks");
            setIdle(response.data.Idle_Trucks);
        } catch (error) {
            console.error("Error fetching total trucks number:", error);
        }
    };

    const total_UnderMaintenance_trucks_count = async () => {
        try {
            const response = await axios.get("http://localhost:8000/trucks/undermaintenance_trucks");
            setUnderMaintenance(response.data.undermaintainance_Trucks);
        } catch (error) {
            console.error("Error fetching total trucks number:", error);
        }
    };

    const total_Ontrip_trucks_count = async () => {
        try {
            const response = await axios.get("http://localhost:8000/trucks/on_trip__trucks");
            setOntrip(response.data.Ontrip_Trucks);
        } catch (error) {
            console.error("Error fetching total trucks number:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([
                total_trucks_count(),
                total_Idle_trucks_count(),
                total_UnderMaintenance_trucks_count(),
                total_Ontrip_trucks_count()
            ]);
            setLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (totaltrucks != null) {
            setFleetStats({
                totalVehicles: totaltrucks,
                idle: Idle,
                inMaintenance: UnderMaintenance,
                OnRoad: Ontrip
            });
        }
    }, [totaltrucks, Idle, UnderMaintenance, Ontrip]);

    // Toggle dark mode and save preference to localStorage
    const toggleDarkMode = () => {
        const newDarkModeState = !darkMode;
        setDarkMode(newDarkModeState);
        localStorage.setItem('darkMode', newDarkModeState);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
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

        // Handle sidebar on window resize for responsiveness
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const storedId = localStorage.getItem("driverId");
        if (!storedId) {
            setDriver(null);
            setProfileRoute("/driverlogin");
            return;
        }

        const fetchDriverDetails = async () => {
            try {
                if (!token) {
                    setDriver(null);
                    setProfileRoute("/driverlogin");
                    return;
                }

                const response = await axios.get(`http://localhost:8000/driver/details/${storedId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

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
        <div className={`min-h-screen font-sans ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
            {activeDashboardItems.dashboard ? (<div className="flex h-screen overflow-hidden">
                {/* Mobile Sidebar Toggle */}
                <button
                    onClick={toggleSidebar}
                    className={`lg:hidden fixed left-4 top-4 z-50 p-2 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg transition-all duration-200`}
                >
                    {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                {/* Overlay for mobile when sidebar is open */}
                {sidebarOpen && (
                    <div
                        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                        onClick={toggleSidebar}
                    ></div>
                )}

                {/* Sidebar - Redesigned with animation */}
                <div
                    className={`${darkMode ? 'bg-gray-950 text-white' : 'bg-slate-900 text-white'} fixed inset-y-0 left-0 z-40 w-72 transition-transform duration-300 ease-in-out transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative`}
                >
                    <div className="flex flex-col h-full p-6">
                        <div className="flex items-center border-b border-gray-800 p-0">
                            <a href="/" className="flex items-center">
                                <img className="w-[12rem] h-[8rem]" src="/logo.png" alt="logo" />
                            </a>
                        </div>

                        <nav className="mt-6 flex-1 overflow-y-auto">
                            <div className="mb-8">
                                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-3">Actions</p>
                                {activeDashboardItems.bookTruck ? (<a href="/booktrucks" className="flex items-center p-3 mb-2 rounded-xl transition-all duration-200 text-slate-300 hover:bg-slate-800 hover:text-white group">
                                    <Truck className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                                    <span>Book Truck</span>
                                </a>) : (<div></div>)}
                                {activeDashboardItems.becomeDriver ? (<a href="/becomedriver" className="flex items-center p-3 mb-2 rounded-xl transition-all duration-200 text-slate-300 hover:bg-slate-800 hover:text-white group">
                                    <User className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                                    <span>Become Driver</span>
                                </a>) : (<div></div>)}

                                {activeDashboardItems.addTrucks ? (<a href="/addtruck" className="flex items-center p-3 mb-2 rounded-xl transition-all duration-200 text-slate-300 hover:bg-slate-800 hover:text-white group">
                                    <CirclePlus className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                                    <span>Add Truck</span>
                                </a>) : (<div></div>)}

                            </div>
                            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-3">System</p>
                            {activeDashboardItems.settings ? (
                                <div>
                                    <a href="#" className="flex items-center p-3 mb-2 rounded-xl transition-all duration-200 text-slate-300 hover:bg-slate-800 hover:text-white group">
                                        <Settings className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                                        <span>Settings</span>
                                    </a>

                                </div>) : (<div></div>)}
                            <a href="#" className="flex items-center p-3 mb-2 rounded-xl transition-all duration-200 text-slate-300 hover:bg-slate-800 hover:text-white group">
                                <HelpCircle className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                                <span>Help & Support</span>
                            </a>
                        </nav>

                        <div className="pt-6 border-t border-slate-800">
                            <div
                                className={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-slate-800 hover:bg-slate-700'} p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer group`}
                                onClick={() => navigate(profileRoute)}
                            >
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                                        {driver?.photo ? (
                                            <img
                                                src={`http://localhost:8000/uploads/${driver.photo}`}
                                                alt={driver?.drivername || "Driver"}
                                                className="h-10 w-10 object-cover"
                                            />
                                        ) : (
                                            <FaUser className="text-white text-lg" />
                                        )}
                                    </div>

                                    <div className="ml-3 flex-1">
                                        <p className="font-medium text-white">{driver?.drivername || "Login as Driver"}</p>
                                        <p className="text-xs text-slate-400">{driver ? `Joined: ${formattedDate}` : "Click to login"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? 'lg:ml-0' : 'ml-0'}`}>
                    {/* Header */}
                    <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 md:px-8 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm`}>
                        <div className="flex items-center">
                            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} ml-12 lg:ml-0`}>Fleet Dashboard</h2>
                            <div className="ml-6 hidden md:flex items-center">
                                <div className="flex items-center px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                                    <span className="h-2 w-2 bg-white rounded-full animate-pulse mr-2"></span>
                                    <h2 className="text-sm font-medium text-white">Live Updates</h2>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 md:space-x-4">
                            <div className="relative hidden md:block">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className={`px-4 py-2 pl-10 ${darkMode
                                        ? 'bg-gray-700 border-gray-600 focus:ring-indigo-400 focus:border-indigo-400 text-white'
                                        : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                                        } border rounded-lg focus:outline-none focus:ring-2 w-64 transition-all`}
                                />
                                <Search className={`absolute left-3 top-2.5 w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                            </div>
                            <button
                                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} relative transition-colors duration-200`}
                            >
                                <Bell className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            {/* Dark Mode Toggle Button */}
                            <button
                                onClick={toggleDarkMode}
                                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors duration-200`}
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
                    <div className="flex-1 overflow-y-auto p-4 md:p-8">
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                            <button className={`${darkMode ? 'bg-gray-800 hover:bg-gray-750 border-none' : 'bg-white hover:bg-gray-50 border border-gray-100'} p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm font-medium`}>On Road</p>
                                        {loading ? (
                                            <div className="h-8 w-16 animate-pulse bg-gray-300 rounded mt-2"></div>
                                        ) : (
                                            <h3 className={`text-3xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{fleetStats.OnRoad}</h3>
                                        )}
                                        <div className="flex items-center mt-2">
                                            <span className={`text-xs px-2 py-1 ${darkMode ? 'bg-blue-900/50 text-blue-200' : 'bg-blue-100 text-blue-800'} rounded-full font-medium`}>
                                                {loading ? '...' : `${Math.round((fleetStats.OnRoad / fleetStats.totalVehicles) * 100) || 0}% of fleet`}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`p-3 ${darkMode ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white' : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'} rounded-xl shadow-sm`}>
                                        <Truck className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full h-1.5 mt-4 overflow-hidden`}>
                                    <div
                                        className={`${darkMode ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-gradient-to-r from-blue-500 to-indigo-600'} h-1.5 rounded-full transition-all duration-500`}
                                        style={{ width: loading ? '0%' : `${Math.round((fleetStats.OnRoad / fleetStats.totalVehicles) * 100) || 0}%` }}
                                    >

                                    </div>
                                </div>
                            </button>

                            <button className={`${darkMode ? 'bg-gray-800 hover:bg-gray-750 border-none' : 'bg-white hover:bg-gray-50 border border-gray-100'} p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm font-medium`}>In Maintenance</p>
                                        {loading ? (
                                            <div className="h-8 w-16 animate-pulse bg-gray-300 rounded mt-2"></div>
                                        ) : (
                                            <h3 className={`text-3xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{fleetStats.inMaintenance}</h3>
                                        )}
                                        <div className="flex items-center mt-2">
                                            <span className={`text-xs px-2 py-1 ${darkMode ? 'bg-amber-900/50 text-amber-200' : 'bg-amber-100 text-amber-800'} rounded-full font-medium`}>
                                                {loading ? '...' : `${Math.round((fleetStats.inMaintenance / fleetStats.totalVehicles) * 100) || 0}% of fleet`}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`p-3 ${darkMode ? 'bg-gradient-to-br from-amber-500 to-amber-700 text-white' : 'bg-gradient-to-br from-amber-400 to-amber-600 text-white'} rounded-xl shadow-sm`}>
                                        <Settings className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full h-1.5 mt-4 overflow-hidden`}>
                                    <div
                                        className={`${darkMode ? 'bg-gradient-to-r from-amber-500 to-amber-600' : 'bg-gradient-to-r from-amber-400 to-amber-600'} h-1.5 rounded-full transition-all duration-500`}
                                        style={{ width: loading ? '0%' : `${Math.round((fleetStats.inMaintenance / fleetStats.totalVehicles) * 100) || 0}%` }}
                                    ></div>
                                </div>
                            </button>

                            <button className={`${darkMode ? 'bg-gray-800 hover:bg-gray-750 border-none' : 'bg-white hover:bg-gray-50 border border-gray-100'} p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm font-medium`}>Idle Vehicles</p>
                                        {loading ? (
                                            <div className="h-8 w-16 animate-pulse bg-gray-300 rounded mt-2"></div>
                                        ) : (
                                            <h3 className={`text-3xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{fleetStats.idle}</h3>
                                        )}
                                        <div className="flex items-center mt-2">
                                            <span className={`text-xs px-2 py-1 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800'} rounded-full font-medium`}>
                                                {loading ? '...' : `${Math.round((fleetStats.idle / fleetStats.totalVehicles) * 100) || 0}% of fleet`}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`p-3 ${darkMode ? 'bg-gradient-to-br from-gray-600 to-gray-700 text-white' : 'bg-gradient-to-br from-gray-500 to-gray-700 text-white'} rounded-xl shadow-sm`}>
                                        <Clock className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full h-1.5 mt-4 overflow-hidden`}>
                                    <div
                                        className={`${darkMode ? 'bg-gradient-to-r from-gray-500 to-gray-600' : 'bg-gradient-to-r from-gray-500 to-gray-600'} h-1.5 rounded-full transition-all duration-500`}
                                        style={{ width: loading ? '0%' : `${Math.round((fleetStats.idle / fleetStats.totalVehicles) * 100) || 0}%` }}
                                    ></div>
                                </div>
                            </button>

                            <button className={`${darkMode ? 'bg-gray-800 hover:bg-gray-750 border-none' : 'bg-white hover:bg-gray-50 border border-gray-100'} p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm font-medium`}>Total Fleet</p>
                                        {loading ? (
                                            <div className="h-8 w-16 animate-pulse bg-gray-300 rounded mt-2"></div>
                                        ) : (
                                            <h3 className={`text-3xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{fleetStats.totalVehicles}</h3>
                                        )}
                                        <div className="flex items-center mt-2">
                                            <span className={`text-xs px-2 py-1 ${darkMode ? 'bg-green-900/50 text-green-200' : 'bg-green-100 text-green-800'} rounded-full font-medium`}>
                                                100% Total
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
                            </button>
                        </div>

                        {/* Quick Action Buttons */}
                        <div className="flex mb-8 space-x-4">
                            {activeDashboardItems.addTrucks ? (<a href='/addtruck' className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                                <CirclePlus className="w-4 h-4 mr-2" />
                                <span>Add Vehicle</span>
                            </a>) : (<div></div>)}

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
                                        <span> {Ontrip} vehicles on the road</span>
                                    </div>
                                    <div className={`flex items-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                        <span>{Ontrip} deliveries in progress</span>
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
                                                <div className="flex items-center">
                                                    <div className={`p-2 ${darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-500'} rounded-lg mr-3`}>
                                                        <AlertTriangle className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{alert.type}</p>
                                                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{alert.truck} - {alert.message}</p>
                                                    </div>
                                                </div>
                                                <span className={`text-xs flex items-center justify-center  ${darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-600'} px-2 py-1 rounded-full`}>{alert.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>) : (<div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
                {/* Blurred background elements */}
                <div className="absolute inset-0 overflow-hidden opacity-20">
                    <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-600 rounded-full filter blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-700 rounded-full filter blur-3xl"></div>
                </div>

                {/* Card content */}
                <div className="relative z-10 max-w-md w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl shadow-2xl border border-white border-opacity-20 p-8 mx-4">
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-red-500 bg-opacity-20 p-4 rounded-full mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m4-3H9m2-3h2M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5c0-1.1.9-2 2-2z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Dashboard Not Available</h2>
                        <p className="text-gray-300 mb-6">You don't have access to this dashboard. Please contact your administrator for access rights.</p>

                        <div className="w-full bg-white bg-opacity-5 rounded-lg p-4 mb-6 border border-white border-opacity-10">
                            <p className="text-gray-400 text-sm">If you believe this is an error, please verify your account permissions or check with your system administrator.</p>
                        </div>

                        <div className="flex space-x-4">
                            <a href="/" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md">
                                Go Home
                            </a>
                            <a href="/help" className="px-6 py-2 bg-transparent border border-gray-400 hover:border-white text-gray-300 hover:text-white rounded-lg transition-colors">
                                Get Help
                            </a>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    );
};

export default Dashboard;