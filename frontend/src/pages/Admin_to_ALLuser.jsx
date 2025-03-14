import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPhoneAlt, FaUserCircle, FaMoon, FaSun, FaSearch, FaUserCog } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircle } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

const Admin_to_ALLuser = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [error, setError] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

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

    const handle_back = () => {
        window.location.href = "/admin";
    }


    // Fetch all users
    useEffect(() => {
        const fetchAllUsers = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:8000/user/allusers");
                setUsers(response.data);
                setFilteredUsers(response.data);
                setError("");
            } catch (error) {
                console.error("Error fetching users:", error);
                setError("Failed to load users");
            } finally {
                setLoading(false);
            }
        };
        fetchAllUsers();
    }, []);

    // Filter users based on search term
    useEffect(() => {
        if (searchTerm) {
            const filtered = users.filter(user => {
                const username = user.username ? user.username.toLowerCase() : "";
                const email = user.email ? user.email.toLowerCase() : "";
                const phone = user.phone ? user.phone : "";

                return (
                    username.includes(searchTerm.toLowerCase()) ||
                    email.includes(searchTerm.toLowerCase()) ||
                    phone.includes(searchTerm)
                );
            });

            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users);
        }
    }, [searchTerm, users]);


    const handleuser = (extractedid) => {
        localStorage.setItem('selected_user_view', extractedid)
        // navigate(`/usercontrols/${extractedid}`);
    }

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4 md:mb-0`}>
                        User Management Dashboard
                    </h1>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleDarkMode}
                            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'}`}
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
                        </button>
                        <button onClick={handle_back} className={` font-bold text-xl ${darkMode ? ' text-red-400' : ' text-gray-700'}`}>
                            <div className='flex gap-1 '>
                                <IoArrowBackCircle className='size-[30px]' /> Back
                            </div>
                        </button>

                    </div>
                </div>

                {/* Search and filters */}
                <div className="mb-8">
                    <div className={`flex flex-col md:flex-row gap-4 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
                        <div className="relative flex-grow">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaSearch className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`pl-10 pr-4 py-2 w-full rounded-md border ${darkMode
                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                            />
                        </div>

                    </div>
                </div>

                {/* Error/loading states */}
                {error && (
                    <div className={`${darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'} p-4 rounded-lg mb-6`}>
                        <p>{error}</p>
                    </div>
                )}

                {loading ? (
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-8 shadow-lg`}>
                        <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                        <p className={`text-center mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Loading users...
                        </p>
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-8 text-center shadow-lg`}>
                        <div className="flex justify-center mb-4">
                            <FaUserCircle className={`text-6xl ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                        </div>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-lg`}>No users found</p>
                        {searchTerm && (
                            <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Try adjusting your search criteria
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredUsers.map((person) => (
                            <div
                                key={person._id}
                                className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                                    } border rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1`}
                            >
                                <div className={`p-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} flex justify-center`}>
                                    <div className={`rounded-full p-4 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                                        <FaUserCircle className={`text-4xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className={`text-xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                                        {person.username}
                                    </h3>

                                    <div className="space-y-3">
                                        <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>

                                            {person.phone ? (
                                                <span className="flex items-center">
                                                    <FaPhoneAlt className="mr-3 text-blue-500" />
                                                    {person.phone}
                                                </span>
                                            ) : (
                                                <span className="flex items-center">
                                                    <FcGoogle className={`${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                                                    {person.googleId}
                                                </span>
                                            )}




                                        </div>

                                        <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            <IoMdMail className="mr-3 text-blue-500" />
                                            <span className="truncate">{person.email}</span>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <a href={`/usercontrols/${person._id}`}>
                                            <button
                                                onClick={() => (handleuser(person._id))}
                                                className={`w-full flex items-center justify-center ${darkMode
                                                    ? 'bg-blue-600 hover:bg-blue-700'
                                                    : 'bg-blue-500 hover:bg-blue-600'
                                                    } text-white px-4 py-3 rounded-lg transition-colors duration-200 font-medium`}>
                                                <FaUserCog className="mr-2" />
                                                User Access
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div >
    );
};

export default Admin_to_ALLuser;