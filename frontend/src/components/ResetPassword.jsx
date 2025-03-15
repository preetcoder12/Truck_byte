import React, { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const handleReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const res = await axios.post("http://localhost:8000/user/resetpass", { email });
            setMessage(res.data.message);
            setStatus("success");
        } catch (err) {
            setMessage(err.response?.data?.message || "Something went wrong.");
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">Reset Your Password</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Enter your email and we'll send you a link to reset your password
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleReset}>
                    <div className="rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300"
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <svg className="mr-2 h-4 w-4 animate-spin text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                "Send Reset Link"
                            )}
                        </button>
                    </div>
                </form>

                {message && (
                    <div className={`mt-4 rounded-md p-4 ${status === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
                        <p className="text-center text-sm">{message}</p>
                    </div>
                )}

                <div className="mt-6">
                    <p className="text-center text-sm text-gray-600">
                        Remember your password?{" "}
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
