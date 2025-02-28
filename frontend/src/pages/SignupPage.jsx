import { useState } from "react";
import axios from "axios";
import { EyeIcon, EyeOffIcon, Truck } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

const SignupPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
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
            const response = await axios.post("http://localhost:8000/user/signup", formData, {
                headers: { "Content-Type": "application/json" },
            });
            console.log("Signup response:", response.data);
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
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
            {/* Left Side Branding */}
            <div className="bg-slate-900 hidden lg:flex lg:w-1/2 h-screen flex-col items-center justify-center text-white p-10 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
                <div className="mb-8">
                    <div className="bg-blue-500 p-3 rounded-xl inline-block mb-4">
                        <Truck className="w-12 h-12" />
                    </div>
                    <h1 className="text-4xl font-bold mb-2">LoadMate</h1>
                    <p className="text-slate-300 text-lg">Fleet Management System</p>
                </div>

                <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl max-w-md">
                    <h2 className="text-xl font-medium mb-4 text-blue-300">Streamline Your Fleet Operations</h2>
                    <p className="text-slate-300 mb-4">
                        Manage your entire fleet in one place with real-time tracking,
                        maintenance scheduling, and performance analytics.
                    </p>
                    <div className="flex space-x-2 mt-6">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-blue-400 opacity-70 rounded-full"></div>
                        <div className="w-3 h-3 bg-blue-400 opacity-40 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Signup Form */}
            <div className="bg-white lg:w-1/2 w-full max-w-md p-8 lg:p-12 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Create an Account</h2>
                <p className="text-gray-600 mb-8 text-center">Sign up to get started with LoadMate</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        pattern="[0-9]{10}"
                        title="Phone number should be 10 digits"
                        required
                        className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <div className="relative">
                        <input
                            type={viewPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            minLength="4"
                            required
                            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setViewPassword(!viewPassword)}
                            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition"
                        >
                            {viewPassword ? <EyeOffIcon size={22} /> : <EyeIcon size={22} />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full p-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all flex items-center justify-center ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-600">
                        Already have an account? <a href="/login" className="text-blue-600 font-medium hover:text-blue-800">Login</a>
                    </p>
                </div>
            </div>
            <Toaster position="top-right" reverseOrder={false} />
        </div>
    );
};

export default SignupPage;
