import { useState } from "react";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { EyeIcon, EyeOffIcon, Truck, User, MapPin, Phone, Mail, Lock, ArrowRight } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";



// Access environment variables with fallback values
const GOOGLE_CLIENT_ID = "313900260470-o5o46ki1ebao2qo12rn8ed22asg1v997.apps.googleusercontent.com";
const API_BASE_URL = "http://localhost:8000";

const handleGoogleSuccess = async (credentialResponse) => {
    try {
        const decoded = jwtDecode(credentialResponse.credential);
        const userData = {
            email: decoded.email,
            username: decoded.name,
            googleId: decoded.sub,
        };

        const response = await axios.post(`${API_BASE_URL}/user/google-auth`, userData);

        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);

        toast.success("Google authentication successful!");
        window.location.href = "/";
    } catch (error) {
        toast.error("Google authentication failed!");
        console.error("Google Auth Error:", error.response ? error.response.data : error.message);
    }
};
const SignupPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
    });
    const [viewPassword, setViewPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePhone = (phone) => {
        const regex = /^[0-9]{10}$/;
        return regex.test(phone);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(formData.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }
        if (!validatePhone(formData.phone)) {
            toast.error("Please enter a valid 10-digit phone number.");
            return;
        }
        if (!validatePassword(formData.password)) {
            toast.error("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }
        setIsLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/user/signup`, formData, {
                headers: { "Content-Type": "application/json" },
            });

            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("token", response.data.token);
            toast.success("Signup successful!");
            setTimeout(() => {
                window.location.href = "/login";
            }, 400);
        } catch (error) {
            console.error("Signup error:", error.response ? error.response.data : error.message);
            toast.error("Signup failed. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-red-500 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
                {/* Left Side - Branding & Information */}
                <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-12 flex flex-col justify-center text-white">
                    <div className="mb-8">
                        <div className="bg-blue-500 p-4 rounded-xl inline-block mb-4 shadow-lg">
                            <Truck className="w-12 h-12" />
                        </div>
                        <h1 className="text-4xl font-bold mb-2">TruckByte</h1>
                        <p className="text-blue-200 text-lg">Connecting Transportation Solutions</p>
                    </div>

                    <div className="space-y-6 bg-slate-800 bg-opacity-50 p-6 rounded-xl">
                        <div className="flex items-start space-x-4">
                            <MapPin className="w-8 h-8 text-blue-400 mt-1" />
                            <div>
                                <h3 className="font-semibold text-xl mb-2">Smart Routing</h3>
                                <p className="text-gray-300">Optimize your trips with intelligent route planning</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <Truck className="w-8 h-8 text-blue-400 mt-1" />
                            <div>
                                <h3 className="font-semibold text-xl mb-2">Fleet Management</h3>
                                <p className="text-gray-300">Complete visibility and control of your transportation</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-12 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                        Create Your Account
                    </h2>
                    <p className="text-gray-600 mb-8 text-center">
                        Your best mate for heavy loads
                    </p>

                    {/* User Type Selection */}
                    <div className="flex justify-center mb-8 space-x-4">
                        <div
                            className={`px-6 py-2 rounded-full transition-all flex items-center space-x-2 
                                `}
                        >
                            <User size={20} />
                            <span>User / Driver</span>
                        </div>

                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                pattern="[0-9]{10}"
                                title="Phone number should be 10 digits"
                                required
                                className="w-full pl-12 p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type={viewPassword ? "text" : "password"}
                                name="password"
                                placeholder="Create Password"
                                value={formData.password}
                                onChange={handleChange}
                                minLength="4"
                                required
                                className="w-full pl-12 pr-12 p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setViewPassword(!viewPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600"
                                aria-label={viewPassword ? "Hide password" : "Show password"}
                            >
                                {viewPassword ? <EyeOffIcon size={22} /> : <EyeIcon size={22} />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 bg-blue-600 text-white rounded-xl 
                            font-semibold hover:bg-blue-700 transition-all 
                            flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Account...
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    Create Account
                                    <ArrowRight className="ml-2" size={20} />
                                </div>
                            )}
                        </button>

                        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                            <div className="flex justify-center mt-4">
                                <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    onError={() => {
                                        toast.error("Google Login Failed");
                                        console.error("Google Login Error");
                                    }}
                                    disabled={isGoogleLoading}
                                />
                            </div>
                        </GoogleOAuthProvider>
                    </form>

                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            Already have an account?
                            <a
                                href="/login"
                                className="ml-2 text-blue-600 font-medium hover:underline"
                            >
                                Log In
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
                reverseOrder={false}
                toastOptions={{
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                }}
            />
        </div>
    );
};

export default SignupPage;