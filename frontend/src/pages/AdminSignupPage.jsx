import React, { useState } from "react";
import axios from "axios";
import { EyeIcon, EyeOffIcon, UserPlus, Lock, Mail, Key } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

const AdminSignup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        secretCode: "",
        password: "",
    });
    const [viewPassword, setViewPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post("http://localhost:8000/admin/signup", formData, {
                headers: { "Content-Type": "application/json" },
            });

            localStorage.setItem("admin", JSON.stringify(response.data.user))
            localStorage.setItem("token", response.data.token)
            toast.success("Signup successful!");
            setTimeout(() => {
                window.location.href = "/adminlogin";
            }, 800);
        } catch (error) {
            console.error("Signup error:", error.response ? error.response.data : error.message);
            toast.error("Signup failed. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen  bg-gradient-to-br from-blue-500 to-red-500 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl overflow-hidden transform transition-all duration-300 hover:scale-105">
                <div className="p-8 space-y-6">
                    <div className="flex items-center justify-center space-x-4 mb-6">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl shadow-md">
                            <UserPlus className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            TruckByte Admin
                        </h1>
                    </div>

                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
                        <p className="text-gray-500">Sign up to access admin dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <UserPlus className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <Mail className="w-5 h-5" />
                            </div>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <Key className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                id="secretCode"
                                name="secretCode"
                                placeholder="Secret Admin Code"
                                value={formData.secretCode}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                type={viewPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                minLength="4"
                                required
                                className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setViewPassword(!viewPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                            >
                                {viewPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl 
                            font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all 
                            flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed 
                            shadow-md hover:shadow-lg"
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Account...
                                </div>
                            ) : 'Create Account'}
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <p className="text-gray-600">
                            Already have an account? 
                            <a 
                                href="/adminlogin" 
                                className="ml-2 text-blue-600 font-medium hover:text-blue-800 
                                transition-colors duration-300"
                            >
                                Sign In
                            </a>
                        </p>
                        <p className="text-gray-600">
                            Select roles again
                            <a
                                href="/selectroles"
                                className="ml-2 text-blue-600 font-medium hover:underline"
                            >
                                Roles
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                        borderRadius: '10px',
                    },
                    success: {
                        icon: '✅',
                    },
                    error: {
                        icon: '❌',
                    },
                }}
            />
        </div>
    );
};

export default AdminSignup;