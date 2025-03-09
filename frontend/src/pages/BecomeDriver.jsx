import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { User, Truck, ShieldCheck, Home, CreditCard, Phone } from "lucide-react";

const BecomeDriver = () => {
    const [formData, setFormData] = useState({
        drivername: "",
        age: "",
        email: "",
        phone: "",
        photo: "",
        gender: "",
        licenseNumber: "",
        licenseType: "",
        experience: "",
        address: {
            street: "",
            city: "",
            state: "",
            pincode: "",
        },
        emergencyContact: {
            name: "",
            phone: "",
            relation: "",
        },
        bankDetails: {
            accountNumber: "",
            ifscCode: "",
            bankName: "",
        },
        status: "",
    });

    const validateDetails = async () => {
        try {
            if (!formData.drivername.trim()) {
                toast.error("Please fill in your name");
                return false;
            }
            if (!formData.age || formData.age < 18) {
                toast.error("Age should be at least 18");
                return false;
            }
            if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
                toast.error("Please enter a valid email address");
                return false;
            }
            if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
                toast.error("Please enter a valid 10-digit phone number");
                return false;
            }
            if (!formData.photo) {
                toast.error("Please upload a photo");
                return false;
            }
            if (!formData.gender) {
                toast.error("Please select your gender");
                return false;
            }
            if (!formData.licenseNumber.trim()) {
                toast.error("Please enter your license number");
                return false;
            }
            if (!formData.licenseType) {
                toast.error("Please select a license type");
                return false;
            }
            if (!formData.experience || formData.experience < 1) {
                toast.error("Experience should be at least 1 year");
                return false;
            }
            if (!formData.address.street.trim()) {
                toast.error("Please enter your street address");
                return false;
            }
            if (!formData.address.city.trim()) {
                toast.error("Please enter your city");
                return false;
            }
            if (!formData.address.state.trim()) {
                toast.error("Please enter your state");
                return false;
            }
            if (!formData.address.pincode || !/^\d{6}$/.test(formData.address.pincode)) {
                toast.error("Please enter a valid 6-digit pincode");
                return false;
            }
            if (!formData.emergencyContact.name.trim()) {
                toast.error("Please enter an emergency contact name");
                return false;
            }
            if (!formData.emergencyContact.phone || !/^\d{10}$/.test(formData.emergencyContact.phone)) {
                toast.error("Please enter a valid emergency contact number");
                return false;
            }
            if (!formData.emergencyContact.relation.trim()) {
                toast.error("Please specify your relationship with the emergency contact");
                return false;
            }
            if (!formData.bankDetails.accountNumber) {
                toast.error("Please enter your bank account number");
                return false;
            }
            if (!formData.bankDetails.ifscCode.trim()) {
                toast.error("Please enter your bank IFSC code");
                return false;
            }
            if (!formData.bankDetails.bankName.trim()) {
                toast.error("Please enter your bank name");
                return false;
            }
            if (!formData.status) {
                toast.error("Please select a status");
                return false;
            }

            return true;
        } catch (error) {
            console.error("Error occurred while validating form:", error);
            toast.error("Error occurred while validating details");
            return false;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('.')) {
            const [section, field] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form data:", formData);

        const isValid = await validateDetails();
        if (!isValid) {
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/driver/filldetails",
                formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const { drivertoken, driverId } = response.data;

            localStorage.setItem("driverToken", drivertoken);
            localStorage.setItem("driverId", driverId);

            console.log("Driver registration response:", response.data);
            toast.success("Driver registration successful! Welcome aboard!");

            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 400);
        } catch (error) {
            console.error("Filling driver details error:", error.response ? error.response.data : error.message);
            toast.error(error.response?.data?.error || "An error occurred");
        }
    };

    return (
        <>
            <div className="bg-gray-600 flex justify-center">
                <a href="/dashboard"> <span className="ml-3 text-4xl font-bold text-white">LorryWale</span></a>
            </div>
            <div className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center py-12 px-4"
                style={{
                    background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), 
                             url("https://source.unsplash.com/random/1920x1080/?road,driving") no-repeat center center/cover`
                }}>

                <div className="w-full max-w-6xl backdrop-blur-md bg-gray-800 shadow-2xl rounded-3xl overflow-hidden relative">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
                    <div className="absolute top-2 right-8 h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 -z-10 blur-xl opacity-70"></div>
                    <div className="absolute bottom-12 left-8 h-32 w-32 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 -z-10 blur-xl opacity-40"></div>

                    <div className="p-8 md:p-12">
                        <div className="mb-8 text-center">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                                <span className="bg-clip-text text-white">
                                    <div className="flex justify-center gap-2">Become a Driver <User className="size-10" /></div>
                                </span>
                            </h1>
                            <p className="text-gray-200 text-lg mb-6">Join our elite team and start earning today</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                                {/* Personal Information */}
                                <div className="bg-white/20 p-6 rounded-2xl backdrop-blur-sm md:col-span-3">
                                    <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                                        <User className="mr-2 text-blue-400" size={20} />
                                        Personal Information
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="group">
                                            <label className="block text-sm font-medium text-gray-200 mb-1 ml-1">Full Name</label>
                                            <input
                                                type="text"
                                                name="drivername"
                                                value={formData.drivername}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-3 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                placeholder="Enter your full name"
                                            />
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-medium text-gray-200 mb-1 ml-1">Age</label>
                                            <input
                                                type="number"
                                                name="age"
                                                value={formData.age}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-3 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                placeholder="Your age"
                                            />
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-medium text-gray-200 mb-1 ml-1">Gender</label>
                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-3 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all appearance-none"
                                            >
                                                <option value="" className="text-gray-800">Select Gender</option>
                                                <option value="Male" className="text-gray-800">Male</option>
                                                <option value="Female" className="text-gray-800">Female</option>
                                                <option value="Other" className="text-gray-800">Other</option>
                                            </select>
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-medium text-gray-200 mb-1 ml-1">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-3 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-medium text-gray-200 mb-1 ml-1">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-3 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                placeholder="9876543210"
                                            />
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-medium text-gray-200 mb-1 ml-1">Profile Photo</label>
                                            <input
                                                type="file"
                                                name="photo"
                                                onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
                                                required
                                                className="w-full p-3 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* License Information */}
                                <div className="bg-white/20 p-6 rounded-2xl backdrop-blur-sm md:col-span-3 lg:col-span-1">
                                    <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                                        <ShieldCheck className="mr-2 text-blue-400" size={20} />
                                        License Information
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="group">
                                            <label className="block text-sm font-medium text-gray-200 mb-1 ml-1">License Number</label>
                                            <input
                                                type="text"
                                                name="licenseNumber"
                                                value={formData.licenseNumber}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-3 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                placeholder="DL123456789"
                                            />
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-medium text-gray-200 mb-1 ml-1">License Type</label>
                                            <select
                                                name="licenseType"
                                                value={formData.licenseType}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-3 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all appearance-none"
                                            >
                                                <option value="" className="text-gray-800">Select License Type</option>
                                                <option value="Commercial" className="text-gray-800">Commercial</option>
                                                <option value="Non-Commercial" className="text-gray-800">Non-Commercial</option>
                                                <option value="Heavy Vehicle" className="text-gray-800">Heavy Vehicle</option>
                                            </select>
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-medium text-gray-200 mb-1 ml-1">Years of Experience</label>
                                            <input
                                                type="number"
                                                name="experience"
                                                value={formData.experience}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-3 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                placeholder="Number of years"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Address Information */}
                                <div className="bg-white/20 p-6 rounded-2xl backdrop-blur-sm md:col-span-3 lg:col-span-1">
                                    <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                                        <Home className="mr-2 text-blue-400" size={20} />
                                        Address Information
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="group">
                                            <label className="block text-sm font-medium text-gray-200 mb-1 ml-1">Street Address</label>
                                            <input
                                                type="text"
                                                name="address.street"
                                                value={formData.address.street}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-3 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                placeholder="123 Main Street"
                                            />
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-medium text-gray-200 mb-1 ml-1">City & State</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    name="address.city"
                                                    value={formData.address.city}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full p-3 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                    placeholder="City"
                                                />
                                                <input
                                                    type="text"
                                                    name="address.state"
                                                    value={formData.address.state}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full p-3 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                    placeholder="State"
                                                />
                                            </div>
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-medium text-gray-200 mb-1 ml-1">Pincode</label>
                                            <input
                                                type="text"
                                                name="address.pincode"
                                                value={formData.address.pincode}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-3 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                placeholder="123456"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Bank Details & Emergency Contact */}
                                <div className="bg-white/20 p-6 rounded-2xl backdrop-blur-sm md:col-span-3 lg:col-span-1">
                                    <div className="space-y-6">
                                        {/* Bank Details */}
                                        <div>
                                            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                                                <CreditCard className="mr-2 text-blue-400" size={20} />
                                                Bank Details
                                            </h2>
                                            <div className="space-y-4">
                                                <div className="group">
                                                    <label className="block text-sm font-medium text-gray-200 mb-1 ml-1">Account Number</label>
                                                    <input
                                                        type="text"
                                                        name="bankDetails.accountNumber"
                                                        value={formData.bankDetails.accountNumber}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full p-3 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                        placeholder="Enter account number"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="group">
                                                        <label className="block text-sm font-medium text-gray-200 mb-1 ml-1">IFSC Code</label>
                                                        <input
                                                            type="text"
                                                            name="bankDetails.ifscCode"
                                                            value={formData.bankDetails.ifscCode}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full p-3 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                            placeholder="IFSC Code"
                                                        />
                                                    </div>
                                                    <div className="group">
                                                        <label className="block text-sm font-medium text-gray-200 mb-1 ml-1">Bank Name</label>
                                                        <input
                                                            type="text"
                                                            name="bankDetails.bankName"
                                                            value={formData.bankDetails.bankName}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full p-3 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                            placeholder="Bank Name"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Emergency Contact */}
                                        <div>
                                            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                                                <Phone className="mr-2 text-blue-400" size={20} />
                                                Emergency Contact
                                            </h2>
                                            <div className="space-y-4">
                                                <div className="group">
                                                    <label className="block text-sm font-medium text-gray-200 mb-1 ml-1">Contact Name</label>
                                                    <input
                                                        type="text"
                                                        name="emergencyContact.name"
                                                        value={formData.emergencyContact.name}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full p-3 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                        placeholder="Emergency contact name"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="group">
                                                        <label className="block text-sm font-medium text-gray-200 mb-1 ml-1">Phone</label>
                                                        <input
                                                            type="text"
                                                            name="emergencyContact.phone"
                                                            value={formData.emergencyContact.phone}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full p-3 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                            placeholder="Phone number"
                                                        />
                                                    </div>
                                                    <div className="group">
                                                        <label className="block text-sm font-medium text-gray-200 mb-1 ml-1">Relation</label>
                                                        <input
                                                            type="text"
                                                            name="emergencyContact.relation"
                                                            value={formData.emergencyContact.relation}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full p-3 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                            placeholder="Relation"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Selection and Terms */}
                                <div className="bg-white/20 p-6 rounded-2xl backdrop-blur-sm md:col-span-3">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                                                <Truck className="mr-2 text-blue-400" size={20} />
                                                Driver Status
                                            </h2>
                                            <div className="group">
                                                <label className="block text-sm font-medium text-gray-200 mb-1 ml-1">Current Status</label>
                                                <select
                                                    name="status"
                                                    value={formData.status}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full p-3 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all appearance-none"
                                                >
                                                    <option value="" className="text-gray-800">Select Status</option>
                                                    <option value="Active" className="text-gray-800">Active</option>
                                                    <option value="Inactive" className="text-gray-800">Inactive</option>
                                                    <option value="On Leave" className="text-gray-800">On Leave</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="bg-gray-800 p-6 rounded-xl self-end">
                                            <h3 className="text-lg font-semibold text-white mb-4">Terms & Conditions</h3>
                                            <div className="flex items-start mb-1">
                                                <input
                                                    type="checkbox"
                                                    id="terms"
                                                    className="mr-3 mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                    required
                                                />
                                                <label htmlFor="terms" className="text-sm text-gray-200">
                                                    I agree to the terms and conditions, if the world was ending i wanna be next to youuuu... ❤️
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex gap-[3rem] justify-center pt-4">
                                <a
                                    href="/dashboard"
                                    type="submit"
                                    className="px-10 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-semibold hover:from-red-700 hover:to-red-700 shadow-lg hover:shadow-red-500/30 transition-all text-lg"
                                >
                                    Back
                                </a>
                                <button
                                    type="submit"
                                    className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-blue-500/30 transition-all text-lg"
                                >
                                    Submit Application
                                </button>

                            </div>
                            <div className="text-center">
                                <p className="mt-4 text-white text-sm">
                                    Already have an account? <a href="/driverlogin" className="text-blue-400 hover:underline">Login</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{
                        style: {
                            background: '#333',
                            color: '#fff',
                            borderRadius: '10px',
                            padding: '16px'
                        },
                        success: {
                            duration: 5000,
                            iconTheme: {
                                primary: '#4ade80',
                                secondary: '#fff'
                            }
                        },
                        error: {
                            duration: 5000,
                            iconTheme: {
                                primary: '#ef4444',
                                secondary: '#fff'
                            }
                        }
                    }}
                />
            </div>
        </>
    );
};

export default BecomeDriver;