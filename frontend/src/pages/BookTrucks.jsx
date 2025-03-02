import { useEffect, useState } from "react";
import axios from "axios";
import { Truck, AlertCircle, Loader, Filter, IndianRupee, Weight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BookTrucks = () => {
    const [trucks, setTrucks] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedTruck, setSelectedTruck] = useState(null);
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        truckType: "all",
        minCapacity: "",
        maxPrice: ""
    });

    const [showFilters, setShowFilters] = useState(false);

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

    const handleSelectTruck = (truckId) => {
        navigate(`/booktrucksdetails/${String(truckId)}`);
    };

    const handleSubmit = (truckId) => {
        if (selectedTruck) {
            navigate(`/booktrucksdetails/${String(truckId)}`);
        } else {
            alert("Please select a truck first.");
        }
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const applyFilters = () => {
        console.log("Applying filters:", filters);
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
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
                <p className="text-gray-600 font-medium">Loading available trucks...</p>
            </div>
        );
    }


    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-4 shadow-md">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center mb-4">
                        <Truck size={32} className="mr-3" />
                        <h1 className="text-3xl font-bold">Find Your Perfect Truck</h1>
                    </div>
                    <p className="text-blue-100 max-w-xl">Browse our fleet of reliable trucks and find the perfect match for your transportation needs.</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 -mt-6">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Available Trucks</h2>
                        <button
                            onClick={toggleFilters}
                            className="flex items-center bg-blue-50 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors"
                        >
                            <Filter size={18} className="mr-2" />
                            Filters
                        </button>
                    </div>

                    {showFilters && (
                        <div className="bg-gray-50 p-4 rounded-md mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Truck Type</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-md"
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Min Capacity (Tons)</label>
                                <input
                                    type="number"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={filters.minCapacity}
                                    onChange={(e) => setFilters({ ...filters, minCapacity: e.target.value })}
                                    placeholder="Enter minimum capacity"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Max Price (₹ per km)</label>
                                <input
                                    type="number"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={filters.maxPrice}
                                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                                    placeholder="Enter maximum price"
                                />
                            </div>
                            <div className="md:col-span-3">
                                <button
                                    onClick={applyFilters}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                            <div className="flex items-center">
                                <AlertCircle className="text-red-500 mr-2" />
                                <p className="text-red-700">{error}</p>
                            </div>
                        </div>
                    )}

                    {filteredTrucks.length === 0 && !error ? (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                            <Truck size={48} className="mx-auto text-gray-400 mb-3" />
                            <p className="text-xl text-gray-600">No trucks available at the moment</p>
                            <p className="text-gray-500 mt-2">Please check back later or contact support</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTrucks.map((truck) => (
                                <div
                                    key={truck._id}
                                    className={`bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${selectedTruck?._id === truck._id ? "ring-2 ring-blue-500 transform scale-[1.02]" : ""
                                        }`}
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
                                            <div className="flex items-center justify-center h-full bg-gray-100">
                                                <Truck size={64} className="text-gray-400" />
                                                <p className="text-gray-500 ml-2">No image available</p>
                                            </div>
                                        )}
                                        <span className={`absolute top-4 right-4 px-3 py-1.5 text-xs font-semibold rounded-full ${truck.status === "Available" ? "bg-green-100 text-green-800" :
                                            truck.status === "In Transit" ? "bg-yellow-100 text-yellow-800" :
                                                "bg-red-100 text-red-800"
                                            }`}>
                                            {truck.status}
                                        </span>
                                    </div>

                                    <div className="p-5">
                                        <div className="flex justify-between items-start mb-2">
                                            <h2 className="text-xl font-bold text-gray-800">{truck.truckNumber}</h2>
                                            <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm font-medium">
                                                {truck.manufacturer}
                                            </div>
                                        </div>

                                        <p className="text-gray-600 font-medium mb-3">{truck.model}</p>

                                        <div className="border-t border-b border-gray-100 py-3 mb-3">
                                            <div className="grid grid-cols-2 gap-y-3">
                                                <div className="flex items-center">
                                                    <Truck size={16} className="text-gray-400 mr-2" />
                                                    <p className="text-sm text-gray-600">{truck.truckType}</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <Weight size={16} className="text-gray-400 mr-2" />
                                                    <p className="text-sm text-gray-600">{truck.capacity} Tons</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <IndianRupee size={16} className="text-gray-400 mr-2" />
                                                    <p className="text-sm text-gray-600">₹{truck.pricePerKm}/km</p>
                                                </div>

                                            </div>
                                        </div>

                                        {truck.status === "Available" ? (
                                            <button
                                                onClick={handleSubmit}
                                                className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                                            >
                                                <Truck size={18} className="mr-2" />
                                                Book This Truck
                                            </button>
                                        ) : (
                                            <button className="w-full bg-gray-200 text-gray-500 py-2.5 rounded-md cursor-not-allowed flex items-center justify-center">
                                                <AlertCircle size={18} className="mr-2" />
                                                Currently Unavailable
                                            </button>
                                        )}
                                    </div>

                                    {truck.images && truck.images.length > 1 && (
                                        <div className="px-5 pb-4">
                                            <p className="text-xs text-gray-500 mb-2">More Images</p>
                                            <div className="flex space-x-2 overflow-x-auto pb-2">
                                                {truck.images.slice(1).map((img, index) => (
                                                    <img
                                                        key={index}
                                                        src={`http://localhost:8000${img}`}
                                                        alt={`Truck view ${index + 2}`}
                                                        className="w-16 h-12 object-cover rounded border border-gray-200 hover:border-blue-400 transition-colors"
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
            </div>
        </div>
    );
};

export default BookTrucks;