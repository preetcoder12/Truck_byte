import { useEffect, useState } from 'react';
import { Truck, BarChart3, Calendar, Users, AlertTriangle, Clock, MapPin, Settings, Search, User, CirclePlus, Bell, ChevronRight, Filter } from 'lucide-react';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [profileRoute, setProfileRoute] = useState("/");
    const [driver, setDriver] = useState(null);
    const token = localStorage.getItem("driverToken");

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

    const [upcomingDeliveries, setUpcomingDeliveries] = useState([
        { id: 1, truck: 'TRK-1024', destination: 'Chicago, IL', driver: 'John Smith', eta: '2h 15m' },
        { id: 2, truck: 'TRK-0513', destination: 'Atlanta, GA', driver: 'Sarah Johnson', eta: '4h 30m' },
        { id: 3, truck: 'TRK-0872', destination: 'Dallas, TX', driver: 'Mike Chen', eta: '5h 45m' }
    ]);


    useEffect(() => {
        const storedId = localStorage.getItem("driverId");  // Fetch from localStorage
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
                setDriver(response.data);  // Ensure correct data is set
                setProfileRoute("/driverprofile");
            } catch (error) {
                console.error("Error fetching driver's details:", error);
                setDriver(null);
                setProfileRoute("/driverlogin");
            }
        };

        fetchDriverDetails();
    }, []); // 🔥 Empty dependency array to run only once




    const formattedDate = driver?.createdAt
        ? new Date(driver.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : "N/A"; // Default value if createdAt is missing


    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <div className="flex">
                {/* Sidebar - Modern Dark Theme */}
                <div className="bg-slate-900 text-white w-72 min-h-screen p-6">
                    <div className="flex items-center mb-10">
                        <div className="bg-blue-500 p-2 rounded-lg mr-3">
                            <Truck className="w-6 h-6" />
                        </div>
                        <a href='/'><h1 className="text-xl font-bold tracking-tight">LorryWale</h1></a>
                    </div>

                    <nav>
                        <div className="mb-8">
                            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-4">Dashboard</p>
                            <a href="#" className="flex items-center p-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl mb-2 shadow-md">
                                <BarChart3 className="w-5 h-5 mr-3" />
                                <span className="font-medium">Overview</span>
                            </a>
                            <a href="#" className="flex items-center p-3 hover:bg-slate-800 rounded-xl mb-2 text-slate-300 hover:text-white transition-all">
                                <Truck className="w-5 h-5 mr-3" />
                                <span>Fleet Management</span>
                            </a>
                            <a href="#" className="flex items-center p-3 hover:bg-slate-800 rounded-xl mb-2 text-slate-300 hover:text-white transition-all">
                                <Calendar className="w-5 h-5 mr-3" />
                                <span>Scheduling</span>
                            </a>
                            <a href="#" className="flex items-center p-3 hover:bg-slate-800 rounded-xl mb-2 text-slate-300 hover:text-white transition-all">
                                <Users className="w-5 h-5 mr-3" />
                                <span>Drivers</span>
                            </a>
                            <a href="#" className="flex items-center p-3 hover:bg-slate-800 rounded-xl mb-2 text-slate-300 hover:text-white transition-all">
                                <MapPin className="w-5 h-5 mr-3" />
                                <span>Route Planning</span>
                            </a>
                        </div>

                        <div className="mb-8">
                            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-4">Actions</p>
                            <a href="#" className="flex items-center p-3 hover:bg-slate-800 rounded-xl mb-2 text-slate-300 hover:text-white transition-all">
                                <Truck className="w-5 h-5 mr-3" />
                                <span>Book Truck</span>
                            </a>
                            <a href="/becomedriver" className="flex items-center p-3 hover:bg-slate-800 rounded-xl mb-2 text-slate-300 hover:text-white transition-all">
                                <User className="w-5 h-5 mr-3" />
                                <span>Become Driver</span>
                            </a>
                            <a href="#" className="flex items-center p-3 hover:bg-slate-800 rounded-xl mb-2 text-slate-300 hover:text-white transition-all">
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
                                {/* Profile Picture Placeholder */}
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

                                {/* Driver Details */}
                                <div>
                                    <p className="font-medium text-white">{driver?.drivername || "Login as Driver"}</p>
                                    <p className="text-xs text-slate-400">Joined: {formattedDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content - Light Modern Theme */}
                <div className="flex-1">
                    {/* Header */}
                    <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
                        <div className="flex items-center">
                            <h2 className="text-xl font-semibold text-gray-800">Fleet Dashboard</h2>
                            <div className="ml-6 flex space-x-1">
                                <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full font-medium">Today</button>
                                <button className="px-3 py-1 text-sm text-gray-600 rounded-full hover:bg-gray-100">Week</button>
                                <button className="px-3 py-1 text-sm text-gray-600 rounded-full hover:bg-gray-100">Month</button>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                                />
                                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                            </div>
                            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 relative">
                                <Bell className="w-5 h-5 text-gray-600" />
                                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                        </div>
                    </header>

                    {/* Dashboard Content */}
                    <div className="p-8">
                        {/* Fleet Status Cards - Modern styling */}
                        <div className="grid grid-cols-4 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium">Active Vehicles</p>
                                        <h3 className="text-3xl font-bold text-gray-800 mt-2">{fleetStats.activeVehicles}</h3>
                                        <div className="flex items-center mt-2">
                                            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                                                {Math.round((fleetStats.activeVehicles / fleetStats.totalVehicles) * 100)}% of fleet
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-blue-500 bg-opacity-10 rounded-xl text-blue-500">
                                        <Truck className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5 mt-4">
                                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${Math.round((fleetStats.activeVehicles / fleetStats.totalVehicles) * 100)}%` }}></div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium">In Maintenance</p>
                                        <h3 className="text-3xl font-bold text-gray-800 mt-2">{fleetStats.inMaintenance}</h3>
                                        <div className="flex items-center mt-2">
                                            <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full font-medium">
                                                {Math.round((fleetStats.inMaintenance / fleetStats.totalVehicles) * 100)}% of fleet
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-yellow-500 bg-opacity-10 rounded-xl text-yellow-500">
                                        <Settings className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5 mt-4">
                                    <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: `${Math.round((fleetStats.inMaintenance / fleetStats.totalVehicles) * 100)}%` }}></div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium">Idle Vehicles</p>
                                        <h3 className="text-3xl font-bold text-gray-800 mt-2">{fleetStats.idle}</h3>
                                        <div className="flex items-center mt-2">
                                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full font-medium">
                                                {Math.round((fleetStats.idle / fleetStats.totalVehicles) * 100)}% of fleet
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-gray-500 bg-opacity-10 rounded-xl text-gray-500">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5 mt-4">
                                    <div className="bg-gray-500 h-1.5 rounded-full" style={{ width: `${Math.round((fleetStats.idle / fleetStats.totalVehicles) * 100)}%` }}></div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium">Total Fleet</p>
                                        <h3 className="text-3xl font-bold text-gray-800 mt-2">{fleetStats.totalVehicles}</h3>
                                        <div className="flex items-center mt-2">
                                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                                                View details
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-indigo-500 bg-opacity-10 rounded-xl text-indigo-500">
                                        <BarChart3 className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5 mt-4">
                                    <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: "100%" }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Action Buttons */}
                        <div className="flex mb-8 space-x-4">
                            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                                <CirclePlus className="w-4 h-4 mr-2" />
                                <span>Add Vehicle</span>
                            </button>
                            <button className="flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm border border-gray-200">
                                <Filter className="w-4 h-4 mr-2" />
                                <span>Filter View</span>
                            </button>
                            <button className="flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm border border-gray-200">
                                <Truck className="w-4 h-4 mr-2" />
                                <span>Schedule Delivery</span>
                            </button>
                        </div>

                        {/* Main Sections - Updated Styling */}
                        <div className="grid grid-cols-2 gap-8">
                            {/* Active Deliveries Map */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-semibold text-lg text-gray-800">Active Deliveries Map</h3>
                                    <button className="text-blue-600 text-sm font-medium flex items-center hover:text-blue-800">
                                        View All <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>
                                <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center overflow-hidden">
                                    <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-lg p-6 text-center w-4/5">
                                        <MapPin className="w-10 h-10 text-blue-400 mx-auto mb-2" />
                                        <p className="text-gray-500">Interactive map would be displayed here</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                                        <span>42 vehicles on the road</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                        <span>16 deliveries in progress</span>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Alerts - Modern Cards */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-semibold text-lg text-gray-800">Recent Alerts</h3>
                                    <button className="text-blue-600 text-sm font-medium flex items-center hover:text-blue-800">
                                        View All <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {recentAlerts.map(alert => (
                                        <div key={alert.id} className="bg-white p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between">
                                                <div className="flex items-start">
                                                    <div className="p-2 bg-red-100 rounded-lg text-red-500 mr-3">
                                                        <AlertTriangle className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-800">{alert.type}</p>
                                                        <p className="text-sm text-gray-600">{alert.truck} - {alert.message}</p>
                                                    </div>
                                                </div>
                                                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">{alert.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Upcoming Deliveries - Modern Table */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-semibold text-lg text-gray-800">Upcoming Deliveries</h3>
                                    <button className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                                        Schedule New
                                    </button>
                                </div>
                                <div className="overflow-hidden rounded-lg border border-gray-200">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Truck ID</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ETA</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {upcomingDeliveries.map(delivery => (
                                                <tr key={delivery.id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{delivery.truck}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-600">{delivery.destination}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-600">{delivery.driver}</td>
                                                    <td className="px-4 py-3">
                                                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                                            {delivery.eta}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Weekly Stats - Modern Cards */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-semibold text-lg text-gray-800">Weekly Performance</h3>
                                    <div className="text-sm">
                                        <select className="border rounded-lg p-2 text-gray-600 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                            <option>This Week</option>
                                            <option>Last Week</option>
                                            <option>Last Month</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="bg-gray-50 h-48 rounded-lg flex items-center justify-center border border-gray-200">
                                    <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-lg p-6 text-center w-4/5">
                                        <BarChart3 className="w-10 h-10 text-blue-400 mx-auto mb-2" />
                                        <p className="text-gray-500">Performance chart would be displayed here</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 mt-6">
                                    <div className="bg-white p-4 rounded-lg border border-gray-100 text-center">
                                        <p className="text-gray-500 text-sm font-medium">Deliveries</p>
                                        <p className="font-bold text-2xl mt-1 text-gray-800">248</p>
                                        <p className="text-xs font-medium mt-1 text-green-600 bg-green-50 rounded-full py-1 inline-block px-2">↑ 12%</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg border border-gray-100 text-center">
                                        <p className="text-gray-500 text-sm font-medium">Fuel Used</p>
                                        <p className="font-bold text-2xl mt-1 text-gray-800">2,540 gal</p>
                                        <p className="text-xs font-medium mt-1 text-red-600 bg-red-50 rounded-full py-1 inline-block px-2">↑ 5%</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg border border-gray-100 text-center">
                                        <p className="text-gray-500 text-sm font-medium">Avg. Time</p>
                                        <p className="font-bold text-2xl mt-1 text-gray-800">4.2 hrs</p>
                                        <p className="text-xs font-medium mt-1 text-green-600 bg-green-50 rounded-full py-1 inline-block px-2">↓ 8%</p>
                                    </div>
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