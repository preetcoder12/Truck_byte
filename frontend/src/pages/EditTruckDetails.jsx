import { useEffect, useState } from "react";
import axios from "axios";
import { FaSave, FaArrowLeft, FaTruck, FaCalendarAlt, FaShieldAlt, FaWeightHanging, FaMoneyBillWave } from "react-icons/fa";
import { MdEmail, MdLocalShipping } from "react-icons/md";
import { BsBuilding } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { Truck } from "lucide-react";

const EditTruckDetails = () => {
    const [truck, setTruck] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const id = localStorage.getItem("selectedtruckid");

    useEffect(() => {
        if (!id) {
            window.location.href = `/admin_editselected_truck/${id}`;
            return;
        }

        const fetchTruckDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/trucks/specifictruck/${id}`);
                setTruck(response.data || {});
            } catch (error) {
                setError("Failed to load truck details");
                toast.error("Could not load truck data");
            } finally {
                setLoading(false);
            }
        };

        fetchTruckDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTruck((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNestedChange = (category, e) => {
        const { name, value } = e.target;
        setTruck((prev) => ({
            ...prev,
            [category]: {
                ...(prev[category] || {}),
                [name]: value
            }
        }));
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setTruck((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await axios.put(`http://localhost:8000/admin/updatetruck/${id}`, truck);
            toast.success("Truck details updated successfully");
            setTimeout(() => {
                window.location.href = `/adminselected_truck/${id}`;
            }, 800);
        } catch (error) {
            toast.error("Failed to update truck details");
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
                    <h2 className="text-xl font-semibold mb-2">Error Loading Truck Details</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <a
                        href="/truckdetails"
                        className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
                    >
                        Return to Truck Details
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-green-800 p-6 text-white">
                    <div className="flex gap-2"><h2 className="text-2xl font-bold">Edit Truck Details</h2><Truck className="size-8" /></div>
                    <p className="opacity-80">Update your truck information and specifications</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Information Section */}
                        <div className="md:col-span-2">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Basic Information</h3>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Truck Number</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <FaTruck />
                                </div>
                                <input
                                    type="text"
                                    name="truckNumber"
                                    value={truck.truckNumber || ""}
                                    onChange={handleChange}
                                    className="pl-10 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Model</label>
                            <input
                                type="text"
                                name="model"
                                value={truck.model || ""}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Manufacturer</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <BsBuilding />
                                </div>
                                <input
                                    type="text"
                                    name="manufacturer"
                                    value={truck.manufacturer || ""}
                                    onChange={handleChange}
                                    className="pl-10 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Truck Type</label>
                            <select
                                name="truckType"
                                value={truck.truckType || ""}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                            >
                                <option value="">Select Type</option>
                                <option value="Flatbed">Flatbed</option>
                                <option value="Refrigerated">Refrigerated</option>
                                <option value="Tanker">Tanker</option>
                                <option value="Box Truck">Box Truck</option>
                                <option value="Dump Truck">Dump Truck</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                name="status"
                                value={truck.status || ""}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                            >
                                <option value="Available">Available</option>
                                <option value="On Trip">On Trip</option>
                                <option value="Under Maintenance">Under Maintenance</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Owner Type</label>
                            <select
                                name="ownerType"
                                value={truck.ownerType || ""}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                            >
                                <option value="Individual">Individual</option>
                                <option value="Company">Company</option>
                            </select>
                        </div>

                        {/* Specifications Section */}
                        <div className="md:col-span-2 mt-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                                <MdLocalShipping className="inline mr-2" />
                                Specifications & Registration
                            </h3>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Capacity (tons)</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <FaWeightHanging />
                                </div>
                                <input
                                    type="number"
                                    name="capacity"
                                    value={truck.capacity || ""}
                                    onChange={handleChange}
                                    className="pl-10 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Price Per KM (₹)</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <FaMoneyBillWave />
                                </div>
                                <input
                                    type="number"
                                    name="pricePerKm"
                                    value={truck.pricePerKm || ""}
                                    onChange={handleChange}
                                    className="pl-10 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Registration Date</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <FaCalendarAlt />
                                </div>
                                <input
                                    type="date"
                                    name="registrationDate"
                                    value={truck.registrationDate ? new Date(truck.registrationDate).toISOString().split('T')[0] : ""}
                                    onChange={handleDateChange}
                                    className="pl-10 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Insurance Expiry Date</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <FaShieldAlt />
                                </div>
                                <input
                                    type="date"
                                    name="insuranceExpiry"
                                    value={truck.insuranceExpiry ? new Date(truck.insuranceExpiry).toISOString().split('T')[0] : ""}
                                    onChange={handleDateChange}
                                    className="pl-10 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                                />
                            </div>
                        </div>

                        {/* Contact Information Section */}
                        <div className="md:col-span-2 mt-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                                Contact Information
                            </h3>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Contact Name</label>
                            <input
                                type="text"
                                name="name"
                                value={truck.contactInfo?.name || ""}
                                onChange={(e) => handleNestedChange('contactInfo', e)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={truck.contactInfo?.phone || ""}
                                onChange={(e) => handleNestedChange('contactInfo', e)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <MdEmail />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={truck.contactInfo?.email || ""}
                                    onChange={(e) => handleNestedChange('contactInfo', e)}
                                    className="pl-10 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-between">
                        <a href="/truckdetails" className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg shadow transition duration-200">
                            <FaArrowLeft /> Back to Truck Details
                        </a>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
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

export default EditTruckDetails;