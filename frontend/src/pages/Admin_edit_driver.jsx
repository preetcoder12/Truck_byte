import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
    User,
    Save,
    ArrowLeft,
    Phone,
    Mail,
    CreditCard,
    MapPin,
    PhoneCall,
    Building,
    Check,
    Loader2,
    AlertCircle
} from "lucide-react";

const Admin_edit_driverDetails = () => {
    const [driver, setDriver] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [activeSection, setActiveSection] = useState("personal");

    const id = localStorage.getItem("driverid");

    useEffect(() => {
        if (!id) {
            window.location.href = "/admin";
            setLoading(false);
            return;
        }

        const fetchDriverDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/driver/details/${id}`);
                setDriver(response.data || {});
            } catch (error) {
                setError("Failed to load driver profile");
                toast.error("Could not load driver profile data");
                console.log(error);
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
                window.location.href = "/admin";
            }, 800);
        } catch (error) {
            toast.error("Failed to update profile");
        } finally {
            setSubmitting(false);
        }
    };

    // Navigation sections
    const sections = [
        { id: "personal", name: "Personal Info", icon: <User size={18} /> },
        { id: "address", name: "Address", icon: <MapPin size={18} /> },
        { id: "emergency", name: "Emergency Contact", icon: <PhoneCall size={18} /> },
        { id: "bank", name: "Bank Details", icon: <Building size={18} /> }
    ];

    // Skeleton loader component
    const SkeletonLoader = () => (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden p-6">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-blue-200 rounded-lg w-1/3"></div>
                    <div className="h-40 bg-blue-100 rounded-lg"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="h-12 bg-gray-200 rounded-lg"></div>
                        <div className="h-12 bg-gray-200 rounded-lg"></div>
                        <div className="h-12 bg-gray-200 rounded-lg"></div>
                        <div className="h-12 bg-gray-200 rounded-lg"></div>
                    </div>
                    <div className="flex justify-end">
                        <div className="h-10 bg-blue-200 rounded-lg w-36"></div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Error display component
    const ErrorDisplay = () => (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
                <div className="inline-flex p-4 mb-4 bg-red-100 rounded-full">
                    <AlertCircle size={40} className="text-red-500" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Error Loading Profile</h2>
                <p className="text-gray-600 mb-6">{error}</p>
                <a
                    href="/admin"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition duration-200 shadow-md hover:shadow-lg"
                >
                    Return to Dashboard
                </a>
            </div>
        </div>
    );

    if (loading) return <SkeletonLoader />;
    if (error) return <ErrorDisplay />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header with profile info */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 bg-white p-6 rounded-2xl shadow-md">
                    <div className="flex items-center">
                        <div className="bg-blue-600 p-4 rounded-xl shadow-md">
                            <User size={36} className="text-white" />
                        </div>
                        <div className="ml-4">
                            <h1 className="text-2xl font-bold text-gray-800">
                                {driver.drivername || "Driver Profile"}
                            </h1>
                            <p className="text-gray-500 flex items-center gap-2">
                                <Mail size={14} /> {driver.email || "Not provided"}
                            </p>
                        </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center gap-3">
                        <div className={`px-4 py-2 rounded-lg text-sm font-medium ${driver.status === "Active" ? "bg-green-100 text-green-800" :
                            driver.status === "Inactive" ? "bg-red-100 text-red-800" :
                                "bg-yellow-100 text-yellow-800"
                            }`}>
                            {driver.status || "Status Unknown"}
                        </div>
                        <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg text-sm font-medium">
                            ID: {id?.substring(0, 8) || "Unknown"}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Side navigation */}
                    <div className="w-full md:w-64 bg-white rounded-2xl shadow-md p-6 self-start">
                        <h2 className="font-bold text-lg mb-4 text-gray-800">Profile Sections</h2>
                        <div className="space-y-2">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeSection === section.id
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "text-gray-600 hover:bg-blue-50"
                                        }`}
                                >
                                    {section.icon}
                                    <span>{section.name}</span>
                                    {activeSection === section.id && <Check size={16} className="ml-auto" />}
                                </button>
                            ))}
                        </div>

                        <div className="mt-8 space-y-4">
                            <a
                                href="/admin"
                                className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all"
                            >
                                <ArrowLeft size={18} /> Back to Dashboard
                            </a>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="flex-1">
                        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    {sections.find(s => s.id === activeSection)?.icon}
                                    {sections.find(s => s.id === activeSection)?.name}
                                </h2>
                                <p className="text-blue-100 text-sm mt-1">
                                    {activeSection === "personal" && "Update driver's personal information"}
                                    {activeSection === "address" && "Update driver's address details"}
                                    {activeSection === "emergency" && "Update emergency contact information"}
                                    {activeSection === "bank" && "Update bank account details"}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8">
                                {/* Personal Information */}
                                <div className={activeSection === "personal" ? "block" : "hidden"}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Driver Name</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-500">
                                                    <User size={18} />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="drivername"
                                                    value={driver.drivername || ""}
                                                    onChange={handleChange}
                                                    className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                    placeholder="Enter full name"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Email</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-500">
                                                    <Mail size={18} />
                                                </div>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={driver.email || ""}
                                                    onChange={handleChange}
                                                    className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                    placeholder="Enter email address"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-500">
                                                    <Phone size={18} />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    value={driver.phone || ""}
                                                    onChange={handleChange}
                                                    className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                    placeholder="Enter phone number"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">License Number</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-500">
                                                    <CreditCard size={18} />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="licenseNumber"
                                                    value={driver.licenseNumber || ""}
                                                    onChange={handleChange}
                                                    className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                    placeholder="Enter license number"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">License Type</label>
                                            <select
                                                name="licenseType"
                                                value={driver.licenseType || ""}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            >
                                                <option value="">Select license type</option>
                                                <option value="Commercial">Commercial</option>
                                                <option value="Non-Commercial">Non-Commercial</option>
                                                <option value="Heavy Vehicle">Heavy Vehicle</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Status</label>
                                            <select
                                                name="status"
                                                value={driver.status || ""}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            >
                                                <option value="">Select status</option>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                                <option value="On Leave">On Leave</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Address Information */}
                                <div className={activeSection === "address" ? "block" : "hidden"}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Street</label>
                                            <input
                                                type="text"
                                                name="street"
                                                value={driver.address?.street || ""}
                                                onChange={(e) => handleNestedChange('address', e)}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                placeholder="Enter street address"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={driver.address?.city || ""}
                                                onChange={(e) => handleNestedChange('address', e)}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                placeholder="Enter city"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">State</label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={driver.address?.state || ""}
                                                onChange={(e) => handleNestedChange('address', e)}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                placeholder="Enter state"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Pincode</label>
                                            <input
                                                type="text"
                                                name="pincode"
                                                value={driver.address?.pincode || ""}
                                                onChange={(e) => handleNestedChange('address', e)}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                placeholder="Enter pincode"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Emergency Contact */}
                                <div className={activeSection === "emergency" ? "block" : "hidden"}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Contact Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={driver.emergencyContact?.name || ""}
                                                onChange={(e) => handleNestedChange('emergencyContact', e)}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                placeholder="Enter emergency contact name"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={driver.emergencyContact?.phone || ""}
                                                onChange={(e) => handleNestedChange('emergencyContact', e)}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                placeholder="Enter emergency contact phone"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Relation</label>
                                            <input
                                                type="text"
                                                name="relation"
                                                value={driver.emergencyContact?.relation || ""}
                                                onChange={(e) => handleNestedChange('emergencyContact', e)}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                placeholder="Enter relationship"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Bank Details */}
                                <div className={activeSection === "bank" ? "block" : "hidden"}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                                            <input
                                                type="text"
                                                name="bankName"
                                                value={driver.bankDetails?.bankName || ""}
                                                onChange={(e) => handleNestedChange('bankDetails', e)}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                placeholder="Enter bank name"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">IFSC Code</label>
                                            <input
                                                type="text"
                                                name="ifscCode"
                                                value={driver.bankDetails?.ifscCode || ""}
                                                onChange={(e) => handleNestedChange('bankDetails', e)}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                placeholder="Enter IFSC code"
                                            />
                                        </div>


                                    </div>
                                </div>

                                {/* Submit button - visible on all sections */}
                                <div className="mt-8">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md hover:shadow-lg transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed font-medium"
                                    >
                                        {submitting ? (
                                            <>
                                                <Loader2 size={20} className="animate-spin" />
                                                Saving Changes...
                                            </>
                                        ) : (
                                            <>
                                                <Save size={20} />
                                                Save All Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin_edit_driverDetails;