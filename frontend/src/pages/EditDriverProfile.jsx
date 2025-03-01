import { useEffect, useState } from "react";
import axios from "axios";
import { FaSave, FaArrowLeft, FaUser, FaPhone, FaIdCard, FaMapMarkerAlt, FaPhoneVolume, FaUniversity } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { toast } from "react-hot-toast";
import { User } from "lucide-react";

const EditDriverProfile = () => {
    const [driver, setDriver] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const id = localStorage.getItem("driverId");

    useEffect(() => {
        if (!id) {
            window.location.href = "/becomedriver";
            return;
        }

        const fetchDriverDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/driver/details/${id}`);
                setDriver(response.data || {});
            } catch (error) {
                setError("Failed to load driver profile");
                toast.error("Could not load your profile data");
            } finally {
                setLoading(false);
            }
        };

        fetchDriverDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDriver((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNestedChange = (category, e) => {
        const { name, value } = e.target;
        setDriver((prev) => ({
            ...prev,
            [category]: {
                ...(prev[category] || {}),
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await axios.put(`http://localhost:8000/driver/update/${id}`, driver);
            toast.success("Profile updated successfully");
            setTimeout(() => {
                window.location.href = "/driverprofile";
            }, 800);
        } catch (error) {
            toast.error("Failed to update profile");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="animate-pulse p-6 bg-white rounded-lg shadow-md">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-40 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <div className="text-red-500 text-4xl mb-4">⚠️</div>
                    <h2 className="text-xl font-semibold mb-2">Error Loading Profile</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <a
                        href="/driverprofile"
                        className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
                    >
                        Return to Profile
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
                    <div className="flex gap-2"><h2 className="text-2xl font-bold">Edit Driver Profile </h2><User className="size-8" /></div>
                    <p className="opacity-80">Update your personal and professional details</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Personal Information Section */}
                        <div className="md:col-span-2">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Personal Information</h3>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Driver Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <FaUser />
                                </div>
                                <input
                                    type="text"
                                    name="drivername"
                                    value={driver.drivername}
                                    onChange={handleChange}
                                    className="pl-10 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <MdEmail />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={driver.email}
                                    onChange={handleChange}
                                    className="pl-10 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <FaPhone />
                                </div>
                                <input
                                    type="text"
                                    name="phone"
                                    value={driver.phone}
                                    onChange={handleChange}
                                    className="pl-10 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">License Number</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <FaIdCard />
                                </div>
                                <input
                                    type="text"
                                    name="licenseNumber"
                                    value={driver.licenseNumber}
                                    onChange={handleChange}
                                    className="pl-10 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">License Type</label>
                            <select
                                name="licenseType"
                                value={driver.licenseType}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            >
                                <option value="Commercial">Commercial</option>
                                <option value="Private">Private</option>
                                <option value="Motorcycle">Motorcycle</option>
                                <option value="Heavy Vehicle">Heavy Vehicle</option>
                            </select>
                        </div>

                        {/* Address Section */}
                        <div className="md:col-span-2 mt-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                                <FaMapMarkerAlt className="inline mr-2" />
                                Address Details
                            </h3>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Street</label>
                            <input
                                type="text"
                                name="street"
                                value={driver.address.street}
                                onChange={(e) => handleNestedChange('address', e)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">City</label>
                            <input
                                type="text"
                                name="city"
                                value={driver.address.city}
                                onChange={(e) => handleNestedChange('address', e)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">State</label>
                            <input
                                type="text"
                                name="state"
                                value={driver.address.state}
                                onChange={(e) => handleNestedChange('address', e)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Pincode</label>
                            <input
                                type="text"
                                name="pincode"
                                value={driver.address.pincode}
                                onChange={(e) => handleNestedChange('address', e)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                        </div>

                        {/* Emergency Contact Section */}
                        <div className="md:col-span-2 mt-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                                <FaPhoneVolume className="inline mr-2" />
                                Emergency Contact
                            </h3>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Contact Name</label>
                            <input
                                type="text"
                                name="name"
                                value={driver.emergencyContact.name}
                                onChange={(e) => handleNestedChange('emergencyContact', e)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={driver.emergencyContact.phone}
                                onChange={(e) => handleNestedChange('emergencyContact', e)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Relation</label>
                            <input
                                type="text"
                                name="relation"
                                value={driver.emergencyContact.relation}
                                onChange={(e) => handleNestedChange('emergencyContact', e)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                        </div>

                        {/* Bank Details Section */}
                        <div className="md:col-span-2 mt-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                                <FaUniversity className="inline mr-2" />
                                Bank Details
                            </h3>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                            <input
                                type="text"
                                name="bankName"
                                value={driver.bankDetails.bankName}
                                onChange={(e) => handleNestedChange('bankDetails', e)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">IFSC Code</label>
                            <input
                                type="text"
                                name="ifscCode"
                                value={driver.bankDetails.ifscCode}
                                onChange={(e) => handleNestedChange('bankDetails', e)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                        </div>
                        <form onSubmit={handleSubmit} className="p-4 space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-Black">Status</label>
                                <select
                                    name="status"
                                    value={driver?.status || ""}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-4 bg-white border border-white text-black rounded-xl shadow-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500 focus:bg-white/20 transition-all appearance-none"
                                >
                                    <option value="" className="text-gray-800">Select Status</option>
                                    <option value="Active" className="text-gray-800">Active</option>
                                    <option value="Inactive" className="text-gray-800">Inactive</option>
                                    <option value="On Leave" className="text-gray-800">On Leave</option>
                                </select>
                            </div>
                        </form>
                    </div>

                    <div className="mt-8 flex justify-between">
                        <a href="/driverprofile" className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg shadow transition duration-200">
                            <FaArrowLeft /> Back to Profile
                        </a>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {submitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <FaSave /> Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditDriverProfile;