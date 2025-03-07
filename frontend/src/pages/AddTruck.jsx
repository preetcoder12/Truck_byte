import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AddTruck = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [formData, setFormData] = useState({
        truckNumber: '',
        model: '',
        manufacturer: '',
        registrationDate: '',
        insuranceExpiry: '',
        capacity: '',
        truckType: '',
        status: 'Available',
        ownerType: 'Company',
        pricePerKm: '',
        contactInfo: {
            name: '',
            phone: '',
            email: ''
        }
    });

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Check for user's preference on initial load
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === 'true') {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('darkMode', (!darkMode).toString());
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes("contactInfo.")) {
            const field = name.split(".")[1];
            setFormData({
                ...formData,
                contactInfo: {
                    ...formData.contactInfo,
                    [field]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files) {
            setImages([...images, ...Array.from(e.target.files)]);
        }
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (!formData.truckNumber || !formData.model || !formData.manufacturer ||
            !formData.registrationDate || !formData.insuranceExpiry ||
            !formData.capacity || !formData.truckType || images.length === 0 ||
            !formData.pricePerKm || !formData.contactInfo.name || !formData.contactInfo.phone || !formData.contactInfo.email) {
            setError('All fields are required!');
            setLoading(false);
            return;
        }

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === "contactInfo") {
                Object.keys(formData.contactInfo).forEach(field => {
                    formDataToSend.append(`contactInfo[${field}]`, formData.contactInfo[field]);
                });
            } else {
                formDataToSend.append(key, formData[key]);
            }
        });
        images.forEach(image => {
            formDataToSend.append('images', image);
        });

        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:8000/trucks/addtruck",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            console.log(response.data);
            toast.success('Truck added successfully!');
            setLoading(false);
            setFormData({
                truckNumber: '',
                model: '',
                manufacturer: '',
                registrationDate: '',
                insuranceExpiry: '',
                capacity: '',
                truckType: '',
                status: 'Available',
                ownerType: 'Company',
                pricePerKm: '',
                contactInfo: { name: '', phone: '', email: '' }
            });
            setImages([]);
            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 500);

        } catch (err) {
            console.error("🚨 Error adding truck:", err.response?.data || err.message);
            toast.error(err.response?.data?.error || "Failed to add truck");
            setLoading(false);
        }
    };


    return (
        <div className="max-w-5xl mx-auto p-6 bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl shadow-xl my-10">
            <div className="flex items-center mb-8">
                <div className="w-1 h-12 bg-blue-500 mr-4"></div>
                <h1 className="text-4xl font-bold text-gray-100">Add New Truck</h1>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-900 border-l-4 border-red-500 rounded-md text-red-200 flex items-start animate-fadeIn">
                    <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p>{error}</p>
                </div>
            )}

            {success && (
                <div className="mb-6 p-4 bg-green-900 border-l-4 border-green-500 rounded-md text-green-200 flex items-start animate-fadeIn">
                    <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <p>{success}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information Section */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center mb-4 text-blue-400">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h2 className="text-xl font-semibold text-gray-100">Basic Information</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Truck Number */}
                        <div className="group">
                            <label htmlFor="truckNumber" className="block text-sm font-medium text-gray-300 mb-1">
                                Truck Number <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-500 group-hover:text-blue-400 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H11a1 1 0 001-1v-1h2v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="truckNumber"
                                    name="truckNumber"
                                    value={formData.truckNumber}
                                    onChange={handleChange}
                                    className="w-full pl-10 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 hover:border-blue-600 text-gray-100"
                                    placeholder="e.g., TR-12345"
                                />
                            </div>
                        </div>

                        {/* Model */}
                        <div>
                            <label htmlFor="model" className="block text-sm font-medium text-gray-300 mb-1">
                                Model <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                id="model"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 hover:border-blue-600 text-gray-100"
                                placeholder="e.g., FH16"
                            />
                        </div>

                        {/* Manufacturer */}
                        <div>
                            <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-300 mb-1">
                                Manufacturer <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                id="manufacturer"
                                name="manufacturer"
                                value={formData.manufacturer}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 hover:border-blue-600 text-gray-100"
                                placeholder="e.g., Volvo"
                            />
                        </div>

                        {/* Capacity */}
                        <div className="group">
                            <label htmlFor="capacity" className="block text-sm font-medium text-gray-300 mb-1">
                                Capacity (tons) <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-500 group-hover:text-blue-400 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="number"
                                    id="capacity"
                                    name="capacity"
                                    value={formData.capacity}
                                    onChange={handleChange}
                                    className="w-full pl-10 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 hover:border-blue-600 text-gray-100"
                                    placeholder="e.g., 20"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Classification & Status Section */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center mb-4 text-blue-400">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                        </svg>
                        <h2 className="text-xl font-semibold text-gray-100">Classification & Status</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Truck Type */}
                        <div>
                            <label htmlFor="truckType" className="block text-sm font-medium text-gray-300 mb-1">
                                Truck Type <span className="text-red-400">*</span>
                            </label>
                            <select
                                id="truckType"
                                name="truckType"
                                value={formData.truckType}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 hover:border-blue-600 text-gray-100"
                            >
                                <option value="">Select Truck Type</option>
                                <option value="Flatbed">Flatbed</option>
                                <option value="Refrigerated">Refrigerated</option>
                                <option value="Tanker">Tanker</option>
                                <option value="Box Truck">Box Truck</option>
                                <option value="Dump Truck">Dump Truck</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">
                                Status <span className="text-red-400">*</span>
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 hover:border-blue-600 text-gray-100"
                            >
                                <option value="Available">Available</option>
                                <option value="On Trip">On Trip</option>
                                <option value="Under Maintenance">Under Maintenance</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        {/* Owner Type */}
                        <div>
                            <label htmlFor="ownerType" className="block text-sm font-medium text-gray-300 mb-1">
                                Owner Type <span className="text-red-400">*</span>
                            </label>
                            <select
                                id="ownerType"
                                name="ownerType"
                                value={formData.ownerType}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 hover:border-blue-600 text-gray-100"
                            >
                                <option value="Individual">Individual</option>
                                <option value="Company">Company</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Documentation & Dates Section */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center mb-4 text-blue-400">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <h2 className="text-xl font-semibold text-gray-100">Documentation & Dates</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Registration Date */}
                        <div className="group">
                            <label htmlFor="registrationDate" className="block text-sm font-medium text-gray-300 mb-1">
                                Registration Date <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-500 group-hover:text-blue-400 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="date"
                                    id="registrationDate"
                                    name="registrationDate"
                                    value={formData.registrationDate}
                                    onChange={handleChange}
                                    className="w-full pl-10 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 hover:border-blue-600 text-gray-100"
                                />
                            </div>
                        </div>

                        {/* Insurance Expiry */}
                        <div className="group">
                            <label htmlFor="insuranceExpiry" className="block text-sm font-medium text-gray-300 mb-1">
                                Insurance Expiry <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-500 group-hover:text-blue-400 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="date"
                                    id="insuranceExpiry"
                                    name="insuranceExpiry"
                                    value={formData.insuranceExpiry}
                                    onChange={handleChange}
                                    className="w-full pl-10 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 hover:border-blue-600 text-gray-100"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing & Contact Information */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center mb-4 text-blue-400">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h2 className="text-xl font-semibold text-gray-100">Pricing & Contact Information</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Price Per KM */}
                        <div className="group">
                            <label htmlFor="pricePerKm" className="block text-sm font-medium text-gray-300 mb-1">
                                Price Per KM <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-500 group-hover:text-blue-400 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <input
                                    type="number"
                                    id="pricePerKm"
                                    name="pricePerKm"
                                    value={formData.pricePerKm}
                                    onChange={handleChange}
                                    className="w-full pl-10 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 hover:border-blue-600 text-gray-100"
                                    placeholder="e.g., 2.50"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                            {/* Owner Name */}
                            <div>
                                <label htmlFor="contactInfo.name" className="block text-sm font-medium text-gray-300 mb-1">
                                    Owner Name <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="contactInfo.name"
                                    name="contactInfo.name"
                                    value={formData.contactInfo.name}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 hover:border-blue-600 text-gray-100"
                                    placeholder="Full Name"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        {/* Owner Phone */}
                        <div className="group">
                            <label htmlFor="contactInfo.phone" className="block text-sm font-medium text-gray-300 mb-1">
                                Owner Phone <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-500 group-hover:text-blue-400 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="contactInfo.phone"
                                    name="contactInfo.phone"
                                    value={formData.contactInfo.phone}
                                    onChange={handleChange}
                                    className="w-full pl-10 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 hover:border-blue-600 text-gray-100"
                                    placeholder="Phone Number"
                                />
                            </div>
                        </div>

                        {/* Owner Email */}
                        <div className="group">
                            <label htmlFor="contactInfo.email" className="block text-sm font-medium text-gray-300 mb-1">
                                Owner Email <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-500 group-hover:text-blue-400 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    id="contactInfo.email"
                                    name="contactInfo.email"
                                    value={formData.contactInfo.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 hover:border-blue-600 text-gray-100"
                                    placeholder="Email Address"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Truck Images */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center mb-4 text-blue-400">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <h2 className="text-xl font-semibold text-gray-200">Truck Images</h2>
                    </div>

                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-blue-700 border-dashed rounded-lg cursor-pointer bg-gray-900 hover:bg-gray-800 transition duration-300">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-12 h-12 mb-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                </svg>
                                <p className="mb-2 text-sm text-blue-400 font-semibold">
                                    Click to upload or drag and drop
                                </p>
                                <p className="text-xs text-gray-400 mb-1">PNG, JPG or JPEG (MAX. 5MB)</p>
                                <p className="text-xs text-blue-400">Upload multiple truck images</p>
                            </div>
                            <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                multiple
                                accept=".jpg,.jpeg,.png"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>

                    {/* Display selected images */}
                    {images.length > 0 && (
                        <div className="mt-6">
                            <p className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                                <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                Selected Images ({images.length})
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {images.map((file, index) => (
                                    <div key={index} className="relative group">
                                        <div className="bg-gray-700 p-3 rounded-lg border border-gray-600 flex items-center group-hover:border-blue-500 transition-colors duration-200">
                                            <svg className="w-6 h-6 text-blue-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                            <span className="text-sm text-gray-200 truncate">{file.name}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
                    <a
                        href="/dashboard"
                        className="inline-flex justify-center items-center py-3 px-6 rounded-lg text-blue-400 bg-gray-800 hover:bg-gray-700 transition duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
                        </svg>
                        Back to Dashboard
                    </a>
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex justify-center items-center py-3 px-6 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                Add Truck
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTruck;