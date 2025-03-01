import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

const DriverLogin = () => {
    const [email, setEmail] = useState("");  // Fixed casing
    const [phone, setPhone] = useState("");  // Fixed casing
    const [loading, setLoading] = useState(false);

    const loginDriver = async () => {
        if (!email || !phone) {
            toast.error("Please enter both email and phone");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("http://localhost:8000/driver/signindriver", { email, phone });

            console.log("🔍 Login API Response:", response.data); // Debugging
            const { driverToken, driverId } = response.data;

            if (!driverToken || !driverId) {
                throw new Error("Invalid response from server. Missing driverToken or driverId.");
            }

            localStorage.setItem("driverToken", driverToken);
            localStorage.setItem("driverId", driverId);
            console.log("data: ",driverId)
            toast.success("Login Successful");
            window.location.href = "/dashboard"; // Redirect to dashboard
        } catch (error) {
            console.error("❌ Login failed:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Login Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-center">
                <h2 className="text-2xl font-bold text-blue-400 flex items-center justify-center gap-2">
                    <FaUser className="text-blue-400" /> Driver Login
                </h2>
                <p className="text-gray-400 mt-2">Enter your registered Email and Phone Number</p>

                <div className="mt-6 relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                        <FaEnvelope className="text-blue-400" />
                    </span>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mt-6 relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                        <FaPhone className="text-blue-400" />
                    </span>
                    <input
                        type="text"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    onClick={loginDriver}
                    className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md shadow-md transition-transform duration-300 active:scale-95"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="mt-4 text-gray-400 text-sm">
                    Need an account? <a href="/becomedriver" className="text-blue-400 hover:underline">Register</a>
                </p>
            </div>
        </div>
    );
};

export default DriverLogin;
