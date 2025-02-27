import React, { useState } from 'react';
import { Truck, BarChart3, Calendar, Users, AlertTriangle, Clock, MapPin, Settings, Search, User , CirclePlus } from 'lucide-react';

const Dashboard = () => {
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

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex">
                {/* Sidebar */}
                <div className="bg-blue-800 text-white w-64 min-h-screen p-4">
                    <div className="flex items-center mb-8">
                        <Truck className="w-8 h-8 mr-2" />
                        <a href="/">  <h1 className="text-xl font-bold">LoadMate</h1></a>
                    </div>

                    <nav>
                        <div className="mb-6">
                            <p className="text-gray-400 text-xs uppercase mb-2">Dashboard</p>
                            <a href="#" className="flex items-center p-2 bg-blue-700 rounded mb-1">
                                <BarChart3 className="w-5 h-5 mr-3" />
                                <span>Overview</span>
                            </a>
                            <a href="#" className="flex items-center p-2 hover:bg-blue-700 rounded mb-1">
                                <Truck className="w-5 h-5 mr-3" />
                                <span>Fleet Management</span>
                            </a>
                            <a href="#" className="flex items-center p-2 hover:bg-blue-700 rounded mb-1">
                                <Calendar className="w-5 h-5 mr-3" />
                                <span>Scheduling</span>
                            </a>
                            <a href="#" className="flex items-center p-2 hover:bg-blue-700 rounded mb-1">
                                <Users className="w-5 h-5 mr-3" />
                                <span>Drivers</span>
                            </a>
                            <a href="#" className="flex items-center p-2 hover:bg-blue-700 rounded mb-1">
                                <MapPin className="w-5 h-5 mr-3" />
                                <span>Route Planning</span>
                            </a>
                        </div>

                        <div>
                            <p className="text-gray-400 text-xs uppercase mb-2">System</p>
                            <a href="#" className="flex items-center p-2 hover:bg-blue-700 rounded mb-1">
                                <Settings className="w-5 h-5 mr-3" />
                                <span>Settings</span>
                            </a>
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs uppercase mb-2">Roles</p>
                            <a href="#" className="flex items-center p-2 hover:bg-blue-700 rounded mb-1">
                                <Truck className="w-5 h-5 mr-3" />
                                <span>Book Truck</span>
                            </a>
                            <a href="#" className="flex items-center p-2 hover:bg-blue-700 rounded mb-1">
                                <User className="w-5 h-5 mr-3" />
                                <span>Become Driver</span>
                            </a>
                            <a href="#" className="flex items-center p-2 hover:bg-blue-700 rounded mb-1">
                                <CirclePlus className="w-5 h-5 mr-3" />
                                <span>Add Truck</span>
                            </a>
                        </div>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6">
                    {/* Header */}
                    <header className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
                        <div className="flex space-x-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                            </div>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                Add Vehicle
                            </button>
                        </div>
                    </header>

                    {/* Fleet Status Cards */}
                    <div className="grid grid-cols-4 gap-6 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500">Active Vehicles</p>
                                    <h3 className="text-3xl font-bold text-blue-600">{fleetStats.activeVehicles}</h3>
                                </div>
                                <div className="p-2 bg-blue-100 rounded-md text-blue-600">
                                    <Truck className="w-6 h-6" />
                                </div>
                            </div>
                            <p className="text-sm text-green-600 mt-2">
                                {Math.round((fleetStats.activeVehicles / fleetStats.totalVehicles) * 100)}% of fleet
                            </p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500">In Maintenance</p>
                                    <h3 className="text-3xl font-bold text-yellow-500">{fleetStats.inMaintenance}</h3>
                                </div>
                                <div className="p-2 bg-yellow-100 rounded-md text-yellow-500">
                                    <Settings className="w-6 h-6" />
                                </div>
                            </div>
                            <p className="text-sm text-yellow-600 mt-2">
                                {Math.round((fleetStats.inMaintenance / fleetStats.totalVehicles) * 100)}% of fleet
                            </p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500">Idle Vehicles</p>
                                    <h3 className="text-3xl font-bold text-gray-500">{fleetStats.idle}</h3>
                                </div>
                                <div className="p-2 bg-gray-100 rounded-md text-gray-500">
                                    <Clock className="w-6 h-6" />
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                                {Math.round((fleetStats.idle / fleetStats.totalVehicles) * 100)}% of fleet
                            </p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500">Total Fleet</p>
                                    <h3 className="text-3xl font-bold">{fleetStats.totalVehicles}</h3>
                                </div>
                                <div className="p-2 bg-gray-100 rounded-md text-gray-600">
                                    <BarChart3 className="w-6 h-6" />
                                </div>
                            </div>
                            <p className="text-sm text-blue-600 mt-2">
                                View fleet details →
                            </p>
                        </div>
                    </div>

                    {/* Main Sections */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* Active Deliveries Map (Placeholder) */}
                        <div className="bg-white p-4 rounded-lg shadow">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-lg">Active Deliveries Map</h3>
                                <button className="text-blue-600 text-sm">View All</button>
                            </div>
                            <div className="bg-gray-200 h-64 rounded flex items-center justify-center">
                                <p className="text-gray-500">Interactive map would be displayed here</p>
                            </div>
                            <div className="mt-3 text-sm text-gray-500">
                                <p>42 vehicles on the road • 16 deliveries in progress</p>
                            </div>
                        </div>

                        {/* Recent Alerts */}
                        <div className="bg-white p-4 rounded-lg shadow">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-lg">Recent Alerts</h3>
                                <button className="text-blue-600 text-sm">View All</button>
                            </div>
                            <div>
                                {recentAlerts.map(alert => (
                                    <div key={alert.id} className="border-b last:border-0 py-3">
                                        <div className="flex justify-between">
                                            <div className="flex items-start">
                                                <div className="p-1.5 bg-red-100 rounded-md text-red-500 mr-3">
                                                    <AlertTriangle className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{alert.type}</p>
                                                    <p className="text-sm text-gray-600">{alert.truck} - {alert.message}</p>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-500">{alert.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Upcoming Deliveries */}
                        <div className="bg-white p-4 rounded-lg shadow">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-lg">Upcoming Deliveries</h3>
                                <button className="text-blue-600 text-sm">Schedule New</button>
                            </div>
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-sm text-gray-500 border-b">
                                        <th className="pb-2">Truck ID</th>
                                        <th className="pb-2">Destination</th>
                                        <th className="pb-2">Driver</th>
                                        <th className="pb-2">ETA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {upcomingDeliveries.map(delivery => (
                                        <tr key={delivery.id} className="border-b last:border-0">
                                            <td className="py-3 text-sm font-medium">{delivery.truck}</td>
                                            <td className="py-3 text-sm">{delivery.destination}</td>
                                            <td className="py-3 text-sm">{delivery.driver}</td>
                                            <td className="py-3 text-sm">{delivery.eta}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Weekly Stats */}
                        <div className="bg-white p-4 rounded-lg shadow">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-lg">Weekly Performance</h3>
                                <div className="text-sm">
                                    <select className="border rounded p-1 text-gray-600">
                                        <option>This Week</option>
                                        <option>Last Week</option>
                                        <option>Last Month</option>
                                    </select>
                                </div>
                            </div>
                            <div className="bg-gray-200 h-48 rounded flex items-center justify-center">
                                <p className="text-gray-500">Performance chart would be displayed here</p>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                <div className="text-center">
                                    <p className="text-gray-500 text-sm">Deliveries</p>
                                    <p className="font-bold text-lg">248</p>
                                    <p className="text-xs text-green-600">↑ 12%</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-gray-500 text-sm">Fuel Used</p>
                                    <p className="font-bold text-lg">2,540 gal</p>
                                    <p className="text-xs text-red-600">↑ 5%</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-gray-500 text-sm">Avg. Time</p>
                                    <p className="font-bold text-lg">4.2 hrs</p>
                                    <p className="text-xs text-green-600">↓ 8%</p>
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