import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserCircle, FaMoon, FaSun, FaArrowLeft, FaSave, FaBan, FaUnlock, FaLock, FaTrash } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { FaPhoneAlt } from 'react-icons/fa';

const Admin_Control_user = () => {
    const [user, setUser] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        role: "",
        status: true
    });
    const [saveLoading, setSaveLoading] = useState(false);

    // Handle dark mode
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    // Initialize theme from localStorage or system preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setDarkMode(savedTheme === 'dark');
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setDarkMode(prefersDark);
        }
    }, []);

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    // Fetch user details
    useEffect(() => {
        const fetchUserDetails = async () => {
            setLoading(true);
            try {
                const userId = localStorage.getItem('selected_user_view');
                if (!userId) {
                    throw new Error("No user selected");
                }

                const response = await axios.get(`http://localhost:8000/user/usercontrols/${userId}`);

                setUser(response.data);
                setFormData({
                    username: response.data.username || "",
                    email: response.data.email || "",
                    phone: response.data.phone || "",
                    role: response.data.role || "user",
                    status: response.data.status !== false
                });
                setError("");
            } catch (error) {
                console.error("Error fetching user details:", error);
                setError("Failed to load user details");
            } finally {
                setLoading(false);
            }
        };
        fetchUserDetails();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaveLoading(true);
        try {
            const userId = localStorage.getItem('selected_user_view');
            await axios.put(`http://localhost:8000/user/${userId}`, formData);
            setUser({ ...user, ...formData });
            setEditMode(false);
            // Show success message (you could add a toast notification here)
        } catch (error) {
            console.error("Error updating user:", error);
            setError("Failed to update user information");
        } finally {
            setSaveLoading(false);
        }
    };

    const handleDeleteUser = async () => {
        if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
            try {
                const userId = localStorage.getItem('selected_user_view');
                await axios.delete(`http://localhost:8000/user/${userId}`);
                // Redirect back to user list
                window.location.href = "/admin_to_allusers";
            } catch (error) {
                console.error("Error deleting user:", error);
                setError("Failed to delete user");
            }
        }
    };

    const handleCancel = () => {
        // Reset form data to original user data
        if (user) {
            setFormData({
                username: user.username || "",
                email: user.email || "",
                phone: user.phone || "",
                role: user.role || "user",
                status: user.status !== false
            });
        }
        setEditMode(false);
    };

    const goBack = () => {
        window.location.href = "/admin_to_allusers";
    };
    const handle_back = () => {

        window.location.href = "/admin_to_allusers";
    }

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="flex items-center mb-4 md:mb-0">
                        <button
                            onClick={goBack}
                            className={`mr-4 p-2 rounded-full ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            aria-label="Go back"
                        >
                            <FaArrowLeft />
                        </button>
                        <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            User Control Panel
                        </h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleDarkMode}
                            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'}`}
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
                        </button>
                        <button onClick={handle_back}>back</button>
                    </div>
                </div>

                {/* Error message */}
                {error && (
                    <div className={`${darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'} p-4 rounded-lg mb-6`}>
                        <p>{error}</p>
                    </div>
                )}

                {/* Loading state */}
                {loading ? (
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-8 shadow-lg`}>
                        <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                        <p className={`text-center mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Loading user details...
                        </p>
                    </div>
                ) : user ? (
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
                        {/* User profile header */}
                        <div className={`p-8 ${darkMode ? 'bg-gray-700' : 'bg-blue-50'} flex flex-col md:flex-row items-center`}>
                            <div className={`rounded-full p-6 ${darkMode ? 'bg-gray-600' : 'bg-white'} mb-4 md:mb-0 md:mr-8`}>
                                <FaUserCircle className={`text-6xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                            </div>
                            <div className="text-center md:text-left">
                                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                    {user.username}
                                </h2>
                                <div className="flex items-center justify-center md:justify-start mt-2">
                                    <span className={`px-3 py-1 rounded-full text-sm ${user.status !== false
                                        ? darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                                        : darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
                                        }`}>
                                        {user.status !== false ? 'Active' : 'Inactive'}
                                    </span>
                                    <span className={`ml-2 px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                                        }`}>
                                        {user.role || 'User'}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4 md:mt-0 md:ml-auto">
                                {!editMode ? (
                                    <button
                                        onClick={() => setEditMode(true)}
                                        className={`${darkMode
                                            ? 'bg-blue-600 hover:bg-blue-700'
                                            : 'bg-blue-500 hover:bg-blue-600'
                                            } text-white px-4 py-2 rounded-lg`}
                                    >
                                        Edit User
                                    </button>
                                ) : (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={handleCancel}
                                            className={`${darkMode
                                                ? 'bg-gray-600 hover:bg-gray-700'
                                                : 'bg-gray-300 hover:bg-gray-400'
                                                } text-white px-4 py-2 rounded-lg flex items-center`}
                                        >
                                            <FaBan className="mr-2" /> Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* User details/form */}
                        <div className="p-8">
                            {editMode ? (
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
                                                    ? 'bg-gray-700 border-gray-600 text-white'
                                                    : 'bg-white border-gray-300 text-gray-900'
                                                    } p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
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
                                                    ? 'bg-gray-700 border-gray-600 text-white'
                                                    : 'bg-white border-gray-300 text-gray-900'
                                                    } p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
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
                                                    ? 'bg-gray-700 border-gray-600 text-white'
                                                    : 'bg-white border-gray-300 text-gray-900'
                                                    } p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                            />
                                        </div>
                                        <div>
                                            <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                Role
                                            </label>
                                            <select
                                                name="role"
                                                value={formData.role}
                                                onChange={handleInputChange}
                                                className={`w-full rounded-lg border ${darkMode
                                                    ? 'bg-gray-700 border-gray-600 text-white'
                                                    : 'bg-white border-gray-300 text-gray-900'
                                                    } p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                            >
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                                <option value="moderator">Moderator</option>
                                            </select>
                                        </div>
                                        <div className="md:col-span-2">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="status"
                                                    name="status"
                                                    checked={formData.status}
                                                    onChange={handleInputChange}
                                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                                <label htmlFor="status" className={`ml-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                    Active Account
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex flex-col md:flex-row justify-between">
                                        <button
                                            type="submit"
                                            disabled={saveLoading}
                                            className={`${darkMode
                                                ? 'bg-blue-600 hover:bg-blue-700'
                                                : 'bg-blue-500 hover:bg-blue-600'
                                                } text-white px-6 py-3 rounded-lg flex items-center justify-center mb-4 md:mb-0`}
                                        >
                                            {saveLoading ? (
                                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                            ) : (
                                                <FaSave className="mr-2" />
                                            )}
                                            Save Changes
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleDeleteUser}
                                            className={`${darkMode
                                                ? 'bg-red-600 hover:bg-red-700'
                                                : 'bg-red-500 hover:bg-red-600'
                                                } text-white px-6 py-3 rounded-lg flex items-center justify-center`}
                                        >
                                            <FaTrash className="mr-2" /> Delete User
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                        <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                            Contact Information
                                        </h3>
                                        <div className="space-y-4">
                                            <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                <IoMdMail className="mr-3 text-blue-500 text-xl" />
                                                <span>{user.email}</span>
                                            </div>
                                            <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                <FaPhoneAlt className="mr-3 text-blue-500" />
                                                <span>{user.phone}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                        <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                            Account Settings
                                        </h3>
                                        <div className="space-y-4">
                                            <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                <span className="font-medium mr-2">Role:</span>
                                                <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                                                    }`}>
                                                    {user.role || 'User'}
                                                </span>
                                            </div>
                                            <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                <span className="font-medium mr-2">Status:</span>
                                                <span className={`flex items-center px-3 py-1 rounded-full text-sm ${user.status !== false
                                                    ? darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                                                    : darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {user.status !== false ? (
                                                        <><FaUnlock className="mr-1" /> Active</>
                                                    ) : (
                                                        <><FaLock className="mr-1" /> Inactive</>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* You can add more sections here for activity logs, permissions, etc. */}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-8 text-center shadow-lg`}>
                        <div className="flex justify-center mb-4">
                            <FaUserCircle className={`text-6xl ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                        </div>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-lg`}>User not found</p>
                        <button
                            onClick={goBack}
                            className={`mt-4 ${darkMode
                                ? 'bg-blue-600 hover:bg-blue-700'
                                : 'bg-blue-500 hover:bg-blue-600'
                                } text-white px-4 py-2 rounded-lg`}
                        >
                            Return to User List
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin_Control_user;