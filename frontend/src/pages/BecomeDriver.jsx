import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

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

    const [step, setStep] = useState(1);
    const totalSteps = 6;

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

    const nextStep = () => {
        setStep(prev => Math.min(prev + 1, totalSteps));
    };

    const prevStep = () => {
        setStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form data:", formData);
        try {
            const response = await axios.post("http://localhost:8000/driver/filldetails",
                formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("filling dirver details response:", response.data);
            toast.success("Driver registration successful! Welcome aboard!");
            setTimeout(() => {
                window.location.href = "/";
            }, 400);
        } catch (error) {
            console.error("filling dirver details error:", error.response ? error.response.data : error.message);
            toast.error("filling dirver details failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center py-12 px-4"
            style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), 
                             url("https://source.unsplash.com/random/1920x1080/?road,driving") no-repeat center center/cover`
            }}>

            <div className="w-full max-w-4xl backdrop-blur-md bg-gray-800 shadow-2xl rounded-3xl overflow-hidden relative">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
                <div className="absolute top-2 right-8 h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 -z-10 blur-xl opacity-70"></div>
                <div className="absolute bottom-12 left-8 h-32 w-32 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 -z-10 blur-xl opacity-40"></div>

                <div className="p-8 md:p-12">
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                            <span className="bg-clip-text text-white">
                                Become a Driver
                            </span>
                        </h1>
                        <p className="text-gray-200 text-lg">Join our elite team and start earning today</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8 max-w-2xl mx-auto">
                        <div className="flex justify-between mb-2">
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                                <div
                                    key={num}
                                    className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${step >= num
                                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                                        : 'bg-gray-200 text-gray-700'
                                        }`}
                                >
                                    {num}
                                </div>
                            ))}
                        </div>
                        <div className="overflow-hidden h-2 rounded-full bg-gray-200">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 ease-out"
                                style={{ width: `${(step / totalSteps) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Step 1: Personal Information */}
                        {step === 1 && (
                            <div className="bg-white/20 p-8 rounded-2xl backdrop-blur-sm">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <span className="bg-blue-600 text-white h-8 w-8 rounded-full inline-flex items-center justify-center mr-3">1</span>
                                    Personal Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-200 mb-2 ml-1">Full Name</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="drivername"
                                                value={formData.drivername}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-4 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                placeholder="Enter your full name"
                                            />
                                            <div className="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-200 mb-2 ml-1" >Age</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                name="age"
                                                value={formData.age}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-4 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                placeholder="Your age"
                                            />
                                            <div className="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-200 mb-2 ml-1">Email</label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-4 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                placeholder="your.email@example.com"
                                            />
                                            <div className="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-200 mb-2 ml-1">Phone Number</label>
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-4 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                placeholder="+91 9876543210"
                                            />
                                            <div className="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-200 mb-2 ml-1">Gender</label>
                                        <div className="relative">
                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-4 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all appearance-none"
                                            >
                                                <option value="" className="text-gray-800">Select Gender</option>
                                                <option value="Male" className="text-gray-800">Male</option>
                                                <option value="Female" className="text-gray-800">Female</option>
                                                <option value="Other" className="text-gray-800">Other</option>

                                            </select>
                                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                </svg>
                                            </div>
                                            <div className="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-200 mb-2 ml-1">Profile Photo URL</label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                name="photo"
                                                onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })} // Store file object
                                                required
                                                className="w-full p-4 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                            />
                                            <div className="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: License Information */}
                        {step === 2 && (
                            <div className="bg-white/20 p-8 rounded-2xl backdrop-blur-sm">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <span className="bg-blue-600 text-white h-8 w-8 rounded-full inline-flex items-center justify-center mr-3">2</span>
                                    License Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-200 mb-2 ml-1">License Number</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="licenseNumber"
                                                value={formData.licenseNumber}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-4 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                placeholder="DL123456789"
                                            />
                                            <div className="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-200 mb-2 ml-1">License Type</label>
                                        <div className="relative">
                                            <select
                                                name="licenseType"
                                                value={formData.licenseType}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-4 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all appearance-none"
                                            >
                                                <option value="" className="text-gray-800">Select License Type</option>
                                                <option value="Commercial" className="text-gray-800">Commercial</option>
                                                <option value="Non-Commercial" className="text-gray-800">Non-Commercial</option>
                                                <option value="Heavy Vehicle" className="text-gray-800">Heavy Vehicle</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                </svg>
                                            </div>
                                            <div className="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                                        </div>
                                    </div>
                                    <div className="group md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-200 mb-2 ml-1">Years of Experience</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                name="experience"
                                                value={formData.experience}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-4 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                placeholder="Number of years"
                                            />
                                            <div className="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Address Information */}
                        {step === 3 && (
                            <div className="bg-white/20 p-8 rounded-2xl backdrop-blur-sm">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <span className="bg-blue-600 text-white h-8 w-8 rounded-full inline-flex items-center justify-center mr-3">3</span>
                                    Address Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="group md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-200 mb-2 ml-1">Street Address</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="address.street"
                                                value={formData.address.street}
                                                onChange={handleChange}
                                                className="w-full p-4 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                placeholder="123 Main Street"
                                            />
                                            <div className="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-200 mb-2 ml-1">City</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="address.city"
                                                value={formData.address.city}
                                                onChange={handleChange}
                                                className="w-full p-4 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                placeholder="Your City"
                                            />
                                            <div className="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-200 mb-2 ml-1">State</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="address.state"
                                                value={formData.address.state}
                                                onChange={handleChange}
                                                className="w-full p-4 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                placeholder="Your State"
                                            />
                                            <div className="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-200 mb-2 ml-1">Pincode</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="address.pincode"
                                                value={formData.address.pincode}
                                                onChange={handleChange}
                                                className="w-full p-4 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                placeholder="123456"
                                            />
                                            <div className="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Status */}
                        {step === 4 && (
                            <div className="bg-white/20 p-8 rounded-2xl backdrop-blur-sm">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <span className="bg-blue-600 text-white h-8 w-8 rounded-full inline-flex items-center justify-center mr-3">4</span>
                                    Application Status
                                </h2>
                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-200 mb-2 ml-1">Current Status</label>
                                    <div className="relative">
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                            required
                                            className="w-full p-4 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all appearance-none"
                                        >
                                            <option value="" className="text-gray-800">Select Status</option>
                                            <option value="Active" className="text-gray-800">Active</option>
                                            <option value="Inactive" className="text-gray-800">Inactive</option>
                                            <option value="On Leave" className="text-gray-800">On Leave</option>

                                        </select>
                                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </div>
                                        <div className="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                                    </div>
                                </div>

                                <div className="mt-12 bg-gray-800 p-6 rounded-xl">
                                    <h3 className="text-lg font-semibold text-white mb-4">Terms & Conditions</h3>
                                    <div className="flex items-start mb-6">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            className="mr-3 mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            required
                                        />
                                        <label htmlFor="terms" className="text-sm text-gray-200">
                                            I agree to the terms and conditions, if the world was ending i wanna be next to youuuu...  ❤️
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}
                        {step === 5 && (
                            <div className="bg-white/20 p-8 rounded-2xl backdrop-blur-sm">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <span className="bg-blue-600 text-white h-8 w-8 rounded-full inline-flex items-center justify-center mr-3">5</span>
                                    Bank Details
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="group md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-200 mb-2 ml-1">Account Number</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="bankDetails.accountNumber"
                                                value={formData.bankDetails.accountNumber}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-4 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                placeholder="Enter your account number"
                                            />
                                            <div className="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-medium text-gray-200 mb-2 ml-1">IFSC Code</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="bankDetails.ifscCode"
                                                    value={formData.bankDetails.ifscCode}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full p-4 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                    placeholder="Enter IFSC code"
                                                />
                                                <div className="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-medium text-gray-200 mb-2 ml-1">Bank name</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="bankDetails.bankName"
                                                    value={formData.bankDetails.bankName}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full p-4 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                    placeholder="Enter Bank name"
                                                />
                                                <div className="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        )}
                        {/* emergency contacts */}
                        {step === 6 && (
                            <div className="bg-white/20 p-8 rounded-2xl backdrop-blur-sm">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <span className="bg-blue-600 text-white h-8 w-8 rounded-full inline-flex items-center justify-center mr-3">6</span>
                                    Emergency Contact Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="group md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-200 mb-2 ml-1">Full Name</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="emergencyContact.name"
                                                value={formData.emergencyContact.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-4 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                placeholder="Enter emergency contact's full name"
                                            />
                                            <div className="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-medium text-gray-200 mb-2 ml-1">Phone Number</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    name="emergencyContact.phone"
                                                    value={formData.emergencyContact.phone}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full p-4 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                    placeholder="Enter emergency contact's phone number"
                                                />
                                                <div className="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-medium text-gray-200 mb-2 ml-1">Relation to Driver</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="emergencyContact.relation"
                                                    value={formData.emergencyContact.relation}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full p-4 bg-gray-800 border border-gray-300/30 text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/20 transition-all"
                                                    placeholder="e.g., Brother, Sister, Friend"
                                                />
                                                <div className="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        )}

                        {/* Navigation Buttons */}
                        < div className="flex justify-between pt-4">
                            {step > 1 ? (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all"
                                >
                                    Previous
                                </button>
                            ) : (
                                <div></div>
                            )}

                            {step < totalSteps ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all"
                                >
                                    Continue
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-blue-500/30 transition-all"
                                >
                                    Submit Application
                                </button>
                            )}
                        </div>
                    </form>
                </div >
            </div >
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
        </div >
    );
};

export default BecomeDriver;