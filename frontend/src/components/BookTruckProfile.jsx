import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BookTruckProfile = () => {
    const [truckDetails, setTruckDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [days, setDays] = useState(null);
    const [price, setprice] = useState("");
    const [bookOn, setbookOn] = useState(false);

    const params = useParams();
    const truckId = params.truckId;
    const extractedId = truckId && typeof truckId === "object" ? truckId._id || truckId.id || String(truckId) : truckId;

    const navigate = useNavigate();

    const calculateDays = () => {
        if (fromDate && toDate) {
            const start = new Date(fromDate);
            const end = new Date(toDate);

            const diffTime = end - start;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert ms to days
            if (diffDays >= 0) {
                setDays(diffDays);
                setbookOn(true);
            } else {
                setDays(null);
                setbookOn(false);
                toast.error("End date must be after start date!");
            }
        }
    };
    useEffect(() => {
        if (truckDetails && days > 0) {
            const totalPrice = days * 24 * truckDetails.pricePerKm;
            setprice(totalPrice);
            localStorage.setItem("price", totalPrice);
        }
    }, [days, truckDetails]);

    useEffect(() => {
        if (!extractedId || extractedId === "[object Object]") {
            setError("Invalid Truck ID.");
            setLoading(false);
            return;
        }

        const fetchTruckDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/trucks/specifictruck/${extractedId}`);
                setTruckDetails(response.data);
            } catch (err) {
                console.error("❌ Error fetching truck details:", err);
                setError("Failed to fetch truck details");
            } finally {
                setLoading(false);
            }
        };

        fetchTruckDetails();
    }, [extractedId]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md my-4">
            <p className="font-bold">Error</p>
            <p>{error}</p>
        </div>
    );

    const handlePay = () => {
        navigate("/payment");
    }

    return (
        <>
            <div className="bg-gray-900">

                <div className="max-w-4xl mx-auto p-4 bg-gray-800 rounded-[2rem]">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {/* Header with truck number and status */}
                        <div className="bg-gray-800 text-white p-6">
                            <div className="flex justify-between items-center">
                                <h1 className="text-2xl font-bold">{truckDetails?.truckNumber}</h1>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${truckDetails?.status === 'Available' ? 'bg-green-500' : 'bg-red-500'
                                    }`}>
                                    {truckDetails?.status}
                                </span>
                            </div>
                            <p className="mt-1 text-blue-100">{truckDetails?.manufacturer} {truckDetails?.model}</p>
                        </div>

                        {/* Truck images */}
                        {truckDetails?.images && truckDetails.images.length > 0 ? (
                            <div className="p-4 bg-gray-50">
                                <div className="grid grid-cols-4 gap-2">
                                    {truckDetails.images.map((img, index) => (
                                        <div key={index} className="h-24 bg-gray-200 rounded-md overflow-hidden">
                                            <img
                                                src={`http://localhost:8000${img}`}
                                                alt={`Truck view ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null}


                        {/* Details section */}
                        <div className="p-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Left column - Truck specifications */}
                                <div>
                                    <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Truck Specifications</h2>

                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Type</span>
                                            <span className="font-medium">{truckDetails?.truckType}</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Capacity</span>
                                            <span className="font-medium">{truckDetails?.capacity} tons</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Price per Km</span>
                                            <span className="font-medium text-green-600">₹{truckDetails?.pricePerKm}</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Registration Date</span>
                                            <span className="font-medium">{formatDate(truckDetails?.registrationDate)}</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Insurance Expiry</span>
                                            <span className="font-medium">{formatDate(truckDetails?.insuranceExpiry)}</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Owner Type</span>
                                            <span className="font-medium">{truckDetails?.ownerType}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right column - Contact information */}
                                <div>
                                    <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Contact Information</h2>

                                    {truckDetails?.contactInfo ? (
                                        <div className="space-y-3">
                                            <div className="flex items-center">
                                                <span className="w-8 h-8 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mr-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </span>
                                                <div>
                                                    <p className="text-sm text-gray-500">Owner Name</p>
                                                    <p className="font-medium">{truckDetails.contactInfo.name}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center">
                                                <span className="w-8 h-8 bg-green-100 text-green-500 rounded-full flex items-center justify-center mr-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                </span>
                                                <div>
                                                    <p className="text-sm text-gray-500">Phone</p>
                                                    <p className="font-medium">{truckDetails.contactInfo.phone}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center">
                                                <span className="w-8 h-8 bg-purple-100 text-purple-500 rounded-full flex items-center justify-center mr-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </span>
                                                <div>
                                                    <p className="text-sm text-gray-500">Email</p>
                                                    <p className="font-medium">{truckDetails.contactInfo.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500">No contact information available</p>
                                    )}
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Estimate Transport Duration</h2>

                                {/* Total Days */}
                                <div className="mb-4 flex gap-[12rem]">
                                    <div>
                                        <label className="block text-lg font-medium text-gray-700">Total Days</label>
                                        <h1 className="text-xl font-bold text-blue-600">{days !== null ? `${days} Days` : ""}</h1>
                                    </div>
                                    <div>
                                        <label className="block text-lg font-medium text-gray-700">Price</label>
                                        <h1 className="text-xl font-bold text-blue-600">
                                            {price !== truckDetails.pricePerKm ? `₹${days * 24 * truckDetails.pricePerKm}` : ""}
                                        </h1>
                                    </div>
                                </div>

                                {/* Date Inputs */}
                                <div className="grid grid-cols-2 gap-4">
                                    {/* From Date */}
                                    <div>
                                        <label className="block text-lg font-medium text-gray-700">From</label>
                                        <input
                                            type="date"
                                            value={fromDate}
                                            onChange={(e) => setFromDate(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* To Date */}
                                    <div>
                                        <label className="block text-lg font-medium text-gray-700">To</label>
                                        <input
                                            type="date"
                                            value={toDate}
                                            onChange={(e) => setToDate(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Calculate Button */}
                                <button
                                    onClick={calculateDays}
                                    className="mt-4 w-full bg-gray-800 text-white py-2.5 rounded-md hover:bg-gray-700 transition-colors"
                                >
                                    Calculate Duration
                                </button>
                            </div>

                            {/* Action buttons */}
                            <div className="mt-8 flex gap-4">
                                <a href="/booktrucks" className="bg-red-800 hover:bg-red-700 text-white font-semibold py-2 px-2 w-20 align-center justify-center  rounded-md flex">
                                    Back
                                </a>
                                {bookOn ? (
                                    <button onClick={handlePay}  className="bg-green-800 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md flex-1">
                                        Book This Truck
                                    </button>
                                ) : (
                                    <button onClick={handlePay} disabled className="bg-gray-400 text-white font-semibold py-2 px-6 rounded-md flex-1">
                                        Book This Truck
                                    </button>
                                )}
                                <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 px-6 rounded-md">
                                    Contact Owner
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default BookTruckProfile;