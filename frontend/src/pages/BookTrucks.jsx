import { useEffect, useState } from "react";
import axios from "axios";
import { Truck, AlertCircle, Filter, IndianRupee, Weight, StepBack, Moon, Sun } from "lucide-react";
import Loader from "../components/Loader"
import { useNavigate } from "react-router-dom";

const BookTrucks = () => {
    const [trucks, setTrucks] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedTruck, setSelectedTruck] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        truckType: "all",
        minCapacity: "",
        maxPrice: ""
    });

    const [showFilters, setShowFilters] = useState(false);

    // Initialize dark mode from localStorage
    useEffect(() => {
        const savedDarkMode = localStorage.getItem("darkMode") === "true";
        setDarkMode(savedDarkMode);
        if (savedDarkMode) {
            document.documentElement.classList.add("dark");
        }
    }, []);

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem("darkMode", newMode.toString());

            if (newMode) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }

            return newMode;
        });
    };

    useEffect(() => {
        const fetchAllTrucks = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:8000/trucks/alltrucks");
                setTrucks(response.data);
            } catch (error) {
                console.error("Error fetching trucks:", error);
                setError("Failed to load available trucks");
            } finally {
                setLoading(false);
            }
        };
        fetchAllTrucks();
    }, []);

    const handleSelectTruck = (truck) => {
        setSelectedTruck(truck._id);
    };

    const handleSubmit = (truckId) => {
        if (!truckId) {
            console.log("Please select a truck first."); // Debugging
            return;
        }
        localStorage.setItem("selectedtruckid", truckId);
        console.log("Navigating to:", `/booktrucksdetails/${truckId}`); // Debugging
        navigate(`/booktrucksdetails/${truckId}`);
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

    if (loading) {
        return (
            <div className={`flex flex-col items-center justify-center h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <Loader />
            </div>
        );
    }

    return (
        <div className={`min-h-screen pb-12 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
            <div className={`${darkMode ? 'bg-gradient-to-r from-blue-900 to-indigo-900' : 'bg-gradient-to-r from-blue-600 to-blue-800'} text-white py-8 px-4 shadow-md`}>
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <img className='size-[5rem]' src="/logo.png" alt="logo" />
                            <h1 className="text-3xl font-bold">Find Your Perfect Truck</h1>
                        </div>
                        <button
                            onClick={toggleDarkMode}
                            className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-300' : 'bg-blue-500 text-white'}`}
                            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>
                    <p className={`${darkMode ? 'text-blue-200' : 'text-blue-100'} max-w-xl`}>Browse our fleet of reliable trucks and find the perfect match for your transportation needs.</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 -mt-6">
                <div className={`rounded-lg shadow-lg p-6 mb-8 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
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

                    {error && (
                        <div className={`border-l-4 border-red-500 p-4 mb-6 ${darkMode ? 'bg-red-900/30' : 'bg-red-50'}`}>
                            <div className="flex items-center">
                                <AlertCircle className="text-red-500 mr-2" />
                                <p className={darkMode ? 'text-red-300' : 'text-red-700'}>{error}</p>
                            </div>
                        </div>
                    )}

                    {filteredTrucks.length === 0 && !error ? (
                        <div className={`text-center py-12 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <Truck size={48} className={`mx-auto mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>No trucks available at the moment</p>
                            <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Please check back later or contact support</p>
                        </div>
                    ) : (
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
                    )}
                </div>
                <a
                    href="/dashboard"
                    className={`font-semibold py-2 px-2 w-20 rounded-md flex items-center justify-center ${darkMode ? 'bg-red-900 hover:bg-red-800 text-white' : 'bg-red-800 hover:bg-red-700 text-white'
                        }`}
                >
                    <StepBack /> Back
                </a>
            </div>
        </div>
    );
};

export default BookTrucks;