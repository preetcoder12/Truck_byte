import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    FaUserCircle, FaMoon, FaSun, FaSave, FaBan,
    FaTrash, FaPhoneAlt, FaUserCog,
    FaShieldAlt,
} from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { IoArrowBackCircle } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

const Admin_Control_user = () => {


    const [user, setUser] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [toggled, setToggled] = useState(true);
    const [allusers, setAllUsers] = useState([]);
    const user_id = localStorage.getItem("selected_user_view");

    // Fetch all users
    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/user/usercontrols/${user_id}`);
                setAllUsers(response.data ? [response.data] : []);
            } catch (error) {
                setError("Error while fetching: " + error.message);
                console.error("Error while fetching:", error);
            }
        };
        if (user_id) fetchAllUsers();
    }, [user_id]);

    // Initialize dashboard state when allusers is updated
    const [activeDashboardItems, setActiveDashboardItems] = useState({
        dashboard: false,
        Account: false,
        settings: false,
        addTrucks: false,
        becomeDriver: false,
        bookTruck: false
    });

    useEffect(() => {
        if (allusers.length > 0 && allusers[0].dashboardVisibility) {
            setActiveDashboardItems(allusers[0].dashboardVisibility);
        }
    }, [allusers]);

    // Fetch user details
    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!user_id) {
                setError("No user selected");
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8000/user/usercontrols/${user_id}`);
                setUser(response.data);
                setFormData({
                    username: response.data.username || "",
                    email: response.data.email || "",
                    phone: response.data.phone || "",
                    role: response.data.role || "user",
                    status: response.data.status !== false,
                });
                setError("");
            } catch (error) {
                console.error("Error fetching user details:", error);
                setError("Failed to load user details");
            } finally {
                setLoading(false);
            }
        };
        if (user_id) fetchUserDetails();
    }, [user_id]);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        status: true,
    });

    // Handle Dark Mode
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setDarkMode(savedTheme === "dark");
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setDarkMode(prefersDark);
        }
    }, []);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem("theme", newMode ? "dark" : "light");
            return newMode;
        });
    };

    // Handle Input Change
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Handle Form Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaveLoading(true);

        try {
            if (!user_id) {
                setError("No user selected to update.");
                return;
            }

            await axios.put(`http://localhost:8000/user/update/${user_id}`, formData);
            setUser((prevUser) => (prevUser ? { ...prevUser, ...formData } : formData));
            setEditMode(false);
        } catch (error) {
            console.error("Error updating user:", error);
            setError("Failed to update user information");
        } finally {
            setSaveLoading(false);
        }
    };

    // Auto-clear error messages
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(""); // Clear the error after 3 seconds
            }, 3000);

            return () => clearTimeout(timer); // Cleanup function to prevent memory leaks
        }
    }, [error]);

    // Handle User Deletion
    const handleDeleteUser = async () => {
        if (!user_id) {
            setError("No user selected to delete.");
            return;
        }

        if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
            try {
                await axios.delete(`http://localhost:8000/admin/removeuser/${user_id}`);
                setUser(null); // Reset user state after deletion
            } catch (error) {
                console.error("Error deleting user:", error);
                setError("Failed to delete user");
            }
        }
    };

    // Cancel Edit Mode
    const handleCancel = () => {
        if (user) {
            setFormData({
                username: user.username || "",
                email: user.email || "",
                phone: user.phone || "",
                role: "user",
                status: user.status !== false,
            });
        }
        setEditMode(false);
    };

    // Go Back to User List
    const goBack = () => {
        window.location.href = "/admin_to_allusers";
    };

    // Toggle Dashboard Access
    const toggleDashboardAccess = async (item) => {
        if (allusers.length === 0) return;

        const updatedVisibility = {
            ...activeDashboardItems,
            [item]: !activeDashboardItems[item],
        };

        setActiveDashboardItems(updatedVisibility);

        // Update allusers state
        setAllUsers((prevUsers) =>
            prevUsers.map((user, index) =>
                index === 0 ? { ...user, dashboardVisibility: updatedVisibility } : user
            )
        );

        try {
            await axios.put(`http://localhost:8000/user/update/${allusers[0]._id}`, {
                dashboardVisibility: updatedVisibility,
            });
            console.log("Dashboard visibility updated successfully");
        } catch (error) {
            console.error("Error updating dashboard visibility:", error);
        }
    };


    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-300`}>
            {/* Top navbar */}
            <div className={`w-full ${darkMode ? 'bg-gray-800 shadow-md' : 'bg-white shadow-lg'} py-3 px-6 fixed top-0 z-10`}>
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={goBack}
                            className={`rounded-full p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
                        >
                            <IoArrowBackCircle className={`text-2xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        </button>
                        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            User Control Panel
                        </h1>
                    </div>

                    <button
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors`}
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 pt-20">
                {/* Error message */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`${darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'} p-4 rounded-lg mb-6 shadow-md`}
                        >
                            <p>{error}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Loading state */}
                {loading ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 shadow-xl`}
                    >
                        <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                        <p className={`text-center mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Loading user details...
                        </p>
                    </motion.div>
                ) : user ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left column - User profile */}
                        <div className={`lg:col-span-1 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl overflow-hidden`}>
                            <div className={`p-8 ${darkMode ? 'bg-gradient-to-r from-blue-900 to-purple-900' : 'bg-gradient-to-r from-blue-500 to-purple-500'} flex flex-col items-center relative`}>
                                <div className="absolute top-4 right-4">
                                    {!editMode ? (
                                        <button
                                            onClick={() => setEditMode(true)}
                                            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
                                        >
                                            <FaUserCog className="text-lg" />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleCancel}
                                            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
                                        >
                                            <FaBan className="text-lg" />
                                        </button>
                                    )}
                                </div>

                                <div className={`rounded-full p-4 bg-white bg-opacity-20 mb-4 shadow-lg`}>
                                    <FaUserCircle className="text-6xl text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    {user.username}
                                </h2>
                                <div className="flex items-center justify-center space-x-2 mb-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold bg-white bg-opacity-20 text-white`}>
                                        {user.role || 'User'}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${user.status !== false ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                                        {user.status !== false ? 'Active' : 'Inactive'}
                                    </span>
                                </div>

                            </div>

                            <div className="p-6">
                                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                    Contact Information
                                </h3>
                                <div className="space-y-4">
                                    <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-100'} mr-3`}>
                                            <IoMdMail className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} text-xl`} />
                                        </div>
                                        <span>{user.email}</span>
                                    </div>
                                    <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-green-100'} mr-3`}>
                                            <FaPhoneAlt className={`${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                                        </div>
                                        <span>{user.phone || "Not provided"}</span>
                                    </div>
                                </div>

                                {!editMode && (
                                    <div className="mt-8">
                                        <button
                                            onClick={handleDeleteUser}
                                            className={`w-full ${darkMode ? 'bg-red-900 hover:bg-red-800' : 'bg-red-500 hover:bg-red-600'} 
                                            text-white px-4 py-3 rounded-lg flex items-center justify-center transition-colors`}
                                        >
                                            <FaTrash className="mr-2" /> Delete User
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right column - User details/form */}
                        <div className={`lg:col-span-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl overflow-hidden`}>
                            {editMode ? (
                                <div className="p-8">
                                    <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                        Edit User Information
                                    </h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                    Username
                                                </label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleInputChange}
                                                    className={`w-full rounded-lg border ${darkMode
                                                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                                                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                                        } p-3 focus:ring-2 focus:ring-blue-500 transition-all`}
                                                />
                                            </div>
                                            <div>
                                                <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className={`w-full rounded-lg border ${darkMode
                                                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                                                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                                        } p-3 focus:ring-2 focus:ring-blue-500 transition-all`}
                                                />
                                            </div>
                                            <div>
                                                <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                    Phone
                                                </label>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className={`w-full rounded-lg border ${darkMode
                                                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                                                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                                        } p-3 focus:ring-2 focus:ring-blue-500 transition-all`}
                                                />
                                            </div>


                                            <div className="md:col-span-2">
                                                <label className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                    <div className="relative inline-block w-12 mr-3 align-middle">
                                                        <input
                                                            type="checkbox"
                                                            id="status"
                                                            name="status"
                                                            checked={formData.status}
                                                            onChange={handleInputChange}
                                                            className="absolute opacity-0 w-0 h-0"
                                                        />
                                                        <span className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-300 ease-in-out ${formData.status ? 'bg-green-500' : 'bg-gray-500'}`}>
                                                            <span className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-300 ease-in-out ${formData.status ? 'translate-x-6' : 'translate-x-0'}`}></span>
                                                        </span>
                                                    </div>
                                                    <span className="font-medium">Active Account</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <button
                                                type="submit"
                                                disabled={saveLoading}
                                                className={`w-full ${darkMode
                                                    ? 'bg-blue-600 hover:bg-blue-700'
                                                    : 'bg-blue-500 hover:bg-blue-600'
                                                    } text-white px-6 py-3 rounded-lg flex items-center justify-center transition-colors`}
                                            >
                                                {saveLoading ? (
                                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                                ) : (
                                                    <FaSave className="mr-2" />
                                                )}
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                <div className="p-8">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                            User Profile
                                        </h2>
                                        <button
                                            onClick={() => setEditMode(true)}
                                            className={`${darkMode
                                                ? 'bg-blue-600 hover:bg-blue-700'
                                                : 'bg-blue-500 hover:bg-blue-600'
                                                } text-white px-4 py-2 rounded-lg flex items-center transition-colors`}
                                        >
                                            <FaUserCog className="mr-2" /> Edit User
                                        </button>
                                    </div>

                                    <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
                                        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                            Access Control
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {["dashboard", "Account", "settings", "addTrucks", "becomeDriver", "bookTruck"].map((item) => (
                                                <div key={item} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} flex items-center justify-between`}>
                                                    <div className="flex items-center">
                                                        <FaShieldAlt className={`mr-3 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                                                        <span className={`capitalize font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item}</span>
                                                    </div>
                                                    <label className="relative inline-block w-12 align-middle">
                                                        <input
                                                            type="checkbox"
                                                            checked={!!activeDashboardItems[item]}  // Prevents undefined errors
                                                            onChange={() => toggleDashboardAccess(item)}
                                                            className="absolute opacity-0 w-0 h-0"
                                                        />
                                                        <span className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-300 ease-in-out ${activeDashboardItems[item] ? 'bg-green-500' : 'bg-gray-500'}`}>
                                                            <span className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-300 ease-in-out ${activeDashboardItems[item] ? 'translate-x-6' : 'translate-x-0'}`}></span>
                                                        </span>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>


                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-8 text-center shadow-xl`}
                    >
                        <div className="flex justify-center mb-6">
                            <div className={`p-4 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                <FaUserCircle className={`text-6xl ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                            </div>
                        </div>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-xl mb-6`}>User not found or has been deleted</p>
                        <button
                            onClick={goBack}
                            className={`${darkMode
                                ? 'bg-blue-600 hover:bg-blue-700'
                                : 'bg-blue-500 hover:bg-blue-600'
                                } text-white px-6 py-3 rounded-lg flex items-center justify-center mx-auto transition-colors`}
                        >
                            <IoArrowBackCircle className="mr-2 text-xl" /> Return to User List
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Admin_Control_user;