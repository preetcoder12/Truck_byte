import { useState } from "react";
import axios from "axios";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

const SignupPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
    });
    const [viewPassword, setViewPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        try {
            const response = await axios.post("http://localhost:8000/user/signup",
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                });
            console.log("Signup response:", response.data);
            toast.success("Signup successful!");

        } catch (error) {
            console.error("Signup error:", error.response ? error.response.data : error.message);
            toast.error("Signup failed. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-4 font-Montserrat  ">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:scale-105">
                <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">SignUp</h1>
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
                        className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold hover:opacity-90 transition-all"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Already have an account? <a href="/login" className="text-blue-500 font-semibold hover:underline">Login</a>
                </p>
            </div>
            <Toaster position="top-right" reverseOrder={false} />
        </div>
    );
};

export default SignupPage;
