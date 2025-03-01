import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

const AddTruck = () => {
    const [formData, setFormData] = useState({
        truckNumber: '',
        model: '',
        manufacturer: '',
        registrationDate: '',
        insuranceExpiry: '',
        capacity: '',
        truckType: '',
        status: 'Available',
        ownerType: 'Company'
    });

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
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
            !formData.capacity || !formData.truckType || images.length === 0) {
            setError('All fields are required!');
            setLoading(false);
            return;
        }

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
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
                ownerType: 'Company'
            });
            setImages([]);
            setTimeout(() => {
                window.location.href = "/dashboard"
            }, 500);

        } catch (err) {
            console.error("🚨 Error adding truck:", err.response?.data || err.message);
            toast.error(err.response?.data?.error || "Failed to add truck");
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow-2xl my-10">
            <div className="flex items-center mb-8">
                <div className="w-1 h-8 bg-blue-600 mr-4"></div>
                <h1 className="text-3xl font-bold text-gray-800">Add New Truck</h1>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md text-red-700 flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p>{error}</p>
                </div>
            )}

            {success && (
                <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-md text-green-700 flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <p>{success}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Truck Number */}
                        <div>
                            <label htmlFor="truckNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                Truck Number <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
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
                                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                    placeholder="e.g., TR-12345"
                                />
                            </div>
                        </div>

                        {/* Model */}
                        <div>
                            <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                                Model <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="model"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                placeholder="e.g., FH16"
                            />
                        </div>

                        {/* Manufacturer */}
                        <div>
                            <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700 mb-1">
                                Manufacturer <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="manufacturer"
                                name="manufacturer"
                                value={formData.manufacturer}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                placeholder="e.g., Volvo"
                            />
                        </div>

                        {/* Capacity */}
                        <div>
                            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                                Capacity (tons) <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
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
                                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                    placeholder="e.g., 20"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Classification & Status</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Truck Type */}
                        <div>
                            <label htmlFor="truckType" className="block text-sm font-medium text-gray-700 mb-1">
                                Truck Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="truckType"
                                name="truckType"
                                value={formData.truckType}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition duration-150"
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
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                Status <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition duration-150"
                            >
                                <option value="Available">Available</option>
                                <option value="On Trip">On Trip</option>
                                <option value="Under Maintenance">Under Maintenance</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        {/* Owner Type */}
                        <div>
                            <label htmlFor="ownerType" className="block text-sm font-medium text-gray-700 mb-1">
                                Owner Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="ownerType"
                                name="ownerType"
                                value={formData.ownerType}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition duration-150"
                            >
                                <option value="Individual">Individual</option>
                                <option value="Company">Company</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Documentation & Dates</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Registration Date */}
                        <div>
                            <label htmlFor="registrationDate" className="block text-sm font-medium text-gray-700 mb-1">
                                Registration Date <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="date"
                                    id="registrationDate"
                                    name="registrationDate"
                                    value={formData.registrationDate}
                                    onChange={handleChange}
                                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                />
                            </div>
                        </div>

                        {/* Insurance Expiry */}
                        <div>
                            <label htmlFor="insuranceExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                                Insurance Expiry <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="date"
                                    id="insuranceExpiry"
                                    name="insuranceExpiry"
                                    value={formData.insuranceExpiry}
                                    onChange={handleChange}
                                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Truck Images */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Truck Images</h2>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-blue-50 transition duration-300">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-10 h-10 mb-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                </svg>
                                <p className="mb-2 text-sm text-blue-600 font-semibold">
                                    Click to upload or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
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
                            <p className="text-sm font-medium text-gray-700 mb-3">Selected Images:</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {images.map((file, index) => (
                                    <div key={index} className="relative group">
                                        <div className="bg-gray-100 p-3 rounded-lg border border-gray-200 flex items-center">
                                            <svg className="w-6 h-6 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                            <span className="text-sm truncate">{file.name}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
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
                        className="inline-flex justify-center items-center py-3 px-6 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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