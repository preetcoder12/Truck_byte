import { useEffect, useState } from "react";
import { Mail, Phone, Truck, User, ArrowLeft, Moon, Sun, AlertTriangle } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const HelpSupport = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    // Get user from localStorage
    let storedUser;
    try {
        storedUser = JSON.parse(localStorage.getItem("user")) || {};
    } catch (err) {
        storedUser = {};
    }

    const id = storedUser?.id;

    // Check for system dark mode preference on initial load
    useEffect(() => {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(isDarkMode);

        // Check if user has a saved preference
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode !== null) {
            setDarkMode(savedMode === 'true');
        }
    }, []);

    // Apply dark mode class to body
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    // Fetch user data
    useEffect(() => {
        if (!id) {
            window.location.href = "/dashboard";
            return;
        }

        const fetchUserDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8000/user/usercontrols/${id}`);
                setUserDetails(response.data);
                setFormData((prev) => ({
                    ...prev,
                    name: response.data?.username || "",
                    email: response.data?.email || "",
                }));
            } catch (error) {
                console.error("Error fetching user details:", error);
                setError("Failed to load user profile");
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.email) {
            alert("Please enter a valid email address.");
            return;
        }

        if (formData.message && userDetails) {
            const subject = encodeURIComponent(
                `Help & Support Request from ${formData.name} (User ID: ${id})`
            );
            const body = encodeURIComponent(
                `Hello Support Team,\n\n${formData.message}\n\nUser Details:\nName: ${formData.name}\nContact: ${userDetails.phone}\nEmail: ${formData.email}`
            );

            window.location.href = `mailto:Preetgusain84@gmail.com?subject=${subject}&body=${body}`;
            toast.success("Redirecting to Mail... 😊");
            setFormData({ name: userDetails.username, email: userDetails.email, message: "" });
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleBack = () => {
        window.location.href = "/dashboard";
    };

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen p-6 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
            {/* Header */}
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center">
                        <button
                            onClick={handleBack}
                            className={`mr-4 flex items-center gap-2 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-200'} transition-colors`}
                        >
                            <ArrowLeft size={16} />
                            <span>Back</span>
                        </button>
                        <h1 className={`text-3xl font-bold ${darkMode ? ' text-blue-400' : ' text-gray-900'}`}>Help & Support</h1>
                    </div>
                    <button
                        onClick={toggleDarkMode}
                        className={`p-3 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-200'} transition-colors`}
                        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {error && (
                    <div className={`p-4 mb-6 rounded-lg flex items-center gap-3 ${darkMode ? 'bg-red-900/50 text-red-200' : 'bg-red-100 text-red-700'}`}>
                        <AlertTriangle />
                        <span>{error}</span>
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        {/* Contact Info */}
                        <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className={`text-xl font-semibold mb-4 ${darkMode ? ' text-blue-400' : 'text-gray-900'}`}>Contact Us</h2>
                            <div className="flex items-center mb-3">
                                <Mail className="mr-3 text-blue-500" />
                                <span>Email: Preetgusain84@gmail.com</span>
                            </div>
                            <div className="flex items-center">
                                <Phone className="mr-3 text-green-500" />
                                <span>Phone: +91 1234567890</span>
                            </div>
                        </div>

                        {/* FAQs */}
                        <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className={`text-xl font-semibold mb-4 ${darkMode ? ' text-blue-400' : 'text-gray-900'}`}>Frequently Asked Questions</h2>
                            <div className="space-y-3">
                                <details className="group">
                                    <summary className={`flex items-center cursor-pointer py-2 px-3 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
                                        <Truck className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} size={18} />
                                        <span className="font-medium">How do I add a new truck?</span>
                                    </summary>
                                    <p className={`mt-2 px-5 py-3 rounded ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                                        Go to the "Trucks" section and click "Add Truck." Fill in the details and save.
                                    </p>
                                </details>
                                <details className="group">
                                    <summary className={`flex items-center cursor-pointer py-2 px-3 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
                                        <User className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} size={18} />
                                        <span className="font-medium">How can I assign a driver?</span>
                                    </summary>
                                    <p className={`mt-2 px-5 py-3 rounded ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                                        In the "Drivers" tab, select a driver and assign them to a truck.
                                    </p>
                                </details>
                                <details className="group">
                                    <summary className={`flex items-center cursor-pointer py-2 px-3 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
                                        <AlertTriangle className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} size={18} />
                                        <span className="font-medium">What should I do if a truck breaks down?</span>
                                    </summary>
                                    <p className={`mt-2 px-5 py-3 rounded ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                                        Go to "Maintenance" and report an issue. Our team will assist you.
                                    </p>
                                </details>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <h2 className={`text-xl font-semibold mb-4 ${darkMode ? ' text-blue-400' : 'text-gray-900'}`}>Submit a Request</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Your Email"
                                    className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Describe your issue..."
                                    className={`w-full p-3 rounded-lg border h-32 resize-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                            >
                                Submit Request
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    success: {
                        style: {
                            background: '#4CAF50',  // Green for success
                            color: '#fff',         // White text for contrast
                        },
                        iconTheme: {
                            primary: '#fff',       // White icon
                            secondary: '#4CAF50',  // Matches background
                        },
                    },
                }}
            />
        </div>
    );
};

export default HelpSupport;