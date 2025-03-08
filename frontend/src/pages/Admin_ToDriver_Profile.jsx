import { useEffect, useState } from "react";
import axios from "axios";
import { FaTruck, FaPhone, FaEnvelope, FaMapMarkerAlt, FaIdCard, FaUser } from "react-icons/fa";
import { RingLoader } from "react-spinners";
import { FaGears } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Admin_ToDriver_Profile = () => {
    const [driver, setDriver] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const id = localStorage.getItem("driverid");
    const navigate = useNavigate();

    useEffect(() => {

        if (!id) {
            window.location.href = "/admin"
            setLoading(false);
            return;
        }

        const fetchDriverDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8000/driver/details/${id}`);
                setDriver(response.data);
            } catch (error) {
                console.error("Error fetching driver's details", error);
                setError("Failed to load driver profile");
            } finally {
                setLoading(false);
            }
        };

        fetchDriverDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900">
                <RingLoader color="#FACC15" size={80} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center mt-4 max-w-lg mx-auto">
                <p>{error}</p>
            </div>
        );
    }

    if (!driver) return null;

    const formattedDate = new Date(driver.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div>
            <div className="min-h-screen bg-gray-300 text-white py-8">
                <div className="max-w-5xl mx-auto bg-gray-800 shadow-lg rounded-xl overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gray-900 p-6 flex items-center border-b border-gray-700">
                        <div className="h-28 w-28 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border-4 border-blue-500 shadow-md">
                            {driver.photo ? (
                                <img
                                    src={`http://localhost:8000/uploads/${driver.photo}`}
                                    alt={driver.drivername}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <FaUser className="text-gray-400 text-5xl" />
                            )}
                        </div>
                        <div className="ml-6">
                            <h1 className="text-3xl font-bold flex items-center gap-2 text-blue-400">
                                <FaTruck className="text-blue-400" />
                                {driver.drivername || "Unknown Driver"}
                            </h1>
                            <p className="text-gray-400">Driver ID: {id}</p>
                            <p className="text-gray-300 mt-1">Joined: {formattedDate}</p>
                            {driver.status === "Active" ? (
                                <p className="text-green-500 mt-1 font-bold text-[1.4rem] poppins">{driver.status}</p>
                            ) : driver.status === "Inactive" ? (
                                <p className="text-red-500 mt-1 font-bold text-[1.4rem] poppins">{driver.status}</p>
                            ) : (
                                <p className="text-orange-500 mt-1 font-bold text-[1.4rem] poppins">{driver.status}</p>
                            )}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Personal Details */}
                        <div className="bg-gray-900 p-5 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300">
                            <h2 className="text-lg font-semibold border-b border-gray-600 pb-2 mb-3 flex items-center gap-2 text-blue-400">
                                <FaIdCard /> Personal Information
                            </h2>
                            <p><strong>Age:</strong> {driver.age || "N/A"} years</p>
                            <p><strong>Gender:</strong> {driver.gender || "N/A"}</p>
                            <p><strong>Experience:</strong> {driver.experience || "N/A"} years</p>
                        </div>

                        {/* Contact Details */}
                        <div className="bg-gray-900 p-5 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300">
                            <h2 className="text-lg font-semibold border-b border-gray-600 pb-2 mb-3 flex items-center gap-2 text-blue-400">
                                <FaPhone /> Contact Details
                            </h2>
                            <p><FaEnvelope className="inline mr-2 text-blue-400" /> {driver.email || "N/A"}</p>
                            <p><FaPhone className="inline mr-2 text-blue-400" /> {driver.phone || "N/A"}</p>
                        </div>

                        {/* Address */}
                        <div className="bg-gray-900 p-5 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300">
                            <h2 className="text-lg font-semibold border-b border-gray-600 pb-2 mb-3 flex items-center gap-2 text-blue-400">
                                <FaMapMarkerAlt /> Address
                            </h2>
                            <p>{driver.address?.street || "N/A"}</p>
                            <p>{driver.address?.city || "N/A"}, {driver.address?.state || "N/A"} - {driver.address?.pincode || "N/A"}</p>
                        </div>

                        {/* License Details */}
                        <div className="bg-gray-900 p-5 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300">
                            <h2 className="text-lg font-semibold border-b border-gray-600 pb-2 mb-3 flex items-center gap-2 text-blue-400">
                                <FaIdCard /> License Information
                            </h2>
                            <p><strong>License No:</strong> {driver.licenseNumber || "N/A"}</p>
                            <p><strong>Type:</strong> {driver.licenseType || "N/A"}</p>
                        </div>

                        {/* Emergency Contact */}
                        <div className="bg-gray-900 p-5 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300">
                            <h2 className="text-lg font-semibold border-b border-gray-600 pb-2 mb-3 flex items-center gap-2 text-blue-400">
                                <FaPhone /> Emergency Contact
                            </h2>
                            <p><strong>Name:</strong> {driver.emergencyContact?.name || "N/A"}</p>
                            <p><strong>Relation:</strong> {driver.emergencyContact?.relation || "N/A"}</p>
                            <p><strong>Phone:</strong> {driver.emergencyContact?.phone || "N/A"}</p>
                        </div>
                    </div>

                    {/* admin Button */}
                    <div className="p-6 flex justify-center ">
                        <a href="/admin">
                            <div className="flex  gap-4">
                                <button className="bg-blue-500 text-black font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 hover:scale-105 transition-transform duration-300">
                                    Go to Admin
                                </button>
                                <a href={`/admin_editdriverprofile/${driver._id}`} className="bg-green-500 flex gap-2 text-black font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-600 hover:scale-105 transition-transform duration-300">
                                    <FaGears className="size-6" />Edit
                                </a>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin_ToDriver_Profile
