import  { useState } from "react";
import { useNavigate  } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

const NewPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [showpass, setshowpass] = useState(false);
    const handlepassvisiblity = () => {
        if (showpass) {
            setshowpass(false);
        }
        else {
            setshowpass(true);
        }
    }
    const checkPasswordStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 8) strength += 1;
        if (/[A-Z]/.test(pass)) strength += 1;
        if (/[0-9]/.test(pass)) strength += 1;
        if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
        setPasswordStrength(strength);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        checkPasswordStrength(newPassword);
    };
    const navigate = useNavigate();


    const handleReset = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }
        if (passwordStrength < 3) {
            toast.error("Please use a stronger password");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(`http://localhost:8000/user/newpass`, {
                password,
            });
            toast.success("Password reset successful!");
            setPassword("");
            setConfirmPassword("");

            setTimeout(() => {
                navigate("/login"); 
            }, 2000);
        } catch (err) {
            toast.error(err.response?.data?.message || "Invalid or expired link.");
        } finally {
            setLoading(false);
        }
    };

    const getStrengthColor = () => {
        switch (passwordStrength) {
            case 0: return "bg-gray-200";
            case 1: return "bg-red-500";
            case 2: return "bg-yellow-500";
            case 3: return "bg-blue-500";
            case 4: return "bg-green-500";
            default: return "bg-gray-200";
        }
    };

    const getStrengthLabel = () => {
        switch (passwordStrength) {
            case 0: return "";
            case 1: return "Weak";
            case 2: return "Fair";
            case 3: return "Good";
            case 4: return "Strong";
            default: return "";
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">Set New Password</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Create a secure password for your account
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleReset}>
                    <div className="space-y-4 ">
                        <div className="">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 ">
                                New Password
                            </label>
                            <div className="flex gap-2">
                                {showpass ? (<input
                                    id="password"
                                    name="password"
                                    type="text"
                                    autoComplete="new-password"
                                    required
                                    className="mt-1 block w-full rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={handlePasswordChange}

                                />) : (<input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="mt-1 block w-full rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />)}
                                {showpass ? (<button onClick={handlepassvisiblity}><FaEyeSlash className="size-[22px]" /></button>
                                ) : (<button onClick={handlepassvisiblity}><IoEyeSharp className="size-[22px]" /></button>
                                )}
                            </div>

                            {password && (
                                <div className="mt-2">
                                    <div className="flex items-center justify-between">
                                        <div className="h-2 flex-1 rounded-full bg-gray-200">
                                            <div
                                                className={`h-2 rounded-full transition-all ${getStrengthColor()}`}
                                                style={{ width: `${passwordStrength * 25}%` }}
                                            ></div>
                                        </div>
                                        <span className="ml-2 text-xs font-medium text-gray-500">{getStrengthLabel()}</span>
                                    </div>
                                    <ul className="mt-2 text-xs text-gray-500">
                                        <li className={password.length >= 8 ? "text-green-500" : ""}>• At least 8 characters</li>
                                        <li className={/[A-Z]/.test(password) ? "text-green-500" : ""}>• At least one uppercase letter</li>
                                        <li className={/[0-9]/.test(password) ? "text-green-500" : ""}>• At least one number</li>
                                        <li className={/[^A-Za-z0-9]/.test(password) ? "text-green-500" : ""}>• At least one special character</li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            {showpass ? (<input
                                id="confirm-password"
                                name="confirm-password"
                                type="text"
                                autoComplete="new-password"
                                required
                                className="mt-1 block w-full rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />) : (<input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="mt-1 block w-full rounded-md border-0 px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />)}

                            {password && confirmPassword && (
                                <p className={`mt-1 text-xs ${password === confirmPassword ? "text-green-500" : "text-red-500"}`}>
                                    {password === confirmPassword ? "Passwords match" : "Passwords don't match"}
                                </p>
                            )}
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
                                "Reset Password"
                            )}
                        </button>
                    </div>
                </form>

                {message && (
                    <div className={`mt-4 rounded-md p-4 ${status === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
                        <p className="text-center text-sm">{message}</p>
                        {status === "success" && (
                            <p className="mt-2 text-center text-sm">
                                <a href="#" className="font-medium text-green-700 hover:text-green-600">
                                    Go to login
                                </a>
                            </p>
                        )}
                    </div>
                )}
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

export default NewPassword;