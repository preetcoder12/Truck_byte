import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BecomeDriver = () => {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState('');

    const [formData, setFormData] = useState({
        drivername: '',
        age: '',
        email: '',
        phone: '',
        gender: '',
        licenseNumber: '',
        licenseType: '',
        experience: '',
        address: {
            street: '',
            city: '',
            state: '',
            pincode: '',
        },
        emergencyContact: {
            name: '',
            phone: '',
            relation: '',
        },
        bankDetails: {
            accountNumber: '',
            ifscCode: '',
            bankName: '',
        },
        status: 'Active',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData({
                ...formData,
                [parent]: {
                    ...formData[parent],
                    [child]: value
                }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        // Email validation
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
            setError('Invalid email format.');
            return false;
        }

        // Age validation
        if (parseInt(formData.age) < 18) {
            setError('Age should be at least 18.');
            return false;
        }

        // Experience validation
        if (parseInt(formData.experience) <= 0) {
            setError('Experience should be greater than 0.');
            return false;
        }

        // Phone validation
        if (!/^\d{10}$/.test(formData.phone)) {
            setError('Phone number must be exactly 10 digits.');
            return false;
        }

        // License number validation
        if (!/^[A-Z]{2}\d{12}$/.test(formData.licenseNumber)) {
            setError('License number must be in format (Example: DL123456789123).');
            return false;
        }

        // Bank account validation
        if (!/^\d{9,18}$/.test(formData.bankDetails.accountNumber)) {
            setError('Account number must be between 9 to 18 digits.');
            return false;
        }

        // IFSC validation
        if (!/^[A-Z]{4}\d{7}$/.test(formData.bankDetails.ifscCode)) {
            setError('Invalid IFSC code format.');
            return false;
        }

        // Emergency contact phone validation
        if (!/^\d{10}$/.test(formData.emergencyContact.phone)) {
            setError('Emergency contact number must be 10 digits.');
            return false;
        }

        // Photo validation
        if (!photoFile) {
            setError('Driver photo is required.');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateForm()) return;

        try {
            setLoading(true);

            // Create FormData for file upload
            const data = new FormData();
            data.append('photo', photoFile);

            // Append all form fields to FormData
            Object.keys(formData).forEach(key => {
                if (typeof formData[key] === 'object' && formData[key] !== null) {
                    data.append(key, JSON.stringify(formData[key]));
                } else {
                    data.append(key, formData[key]);
                }
            });

            const response = await axios.post('http://localhost:8000/driver/filldetails', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setSuccess('Driver registration successful!');
            // Store token and navigate
            localStorage.setItem('driverToken', response.data.drivertoken);
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);

        } catch (err) {
            setError(err.response?.data?.error || 'Error submitting form. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
            <div className="container mx-auto py-8 px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Driver Registration</h1>
                    <button
                        onClick={toggleDarkMode}
                        className={`py-2 px-4 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
                    >
                        {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
                    </button>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className={`rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
                    {/* Personal Information Section */}
                    <div className="mb-8">
                        <h2 className={`text-xl font-semibold mb-4 pb-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            Personal Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="drivername"
                                    value={formData.drivername}
                                    onChange={handleChange}
                                    className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    min="18"
                                    className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    pattern="^\d{10}$"
                                    className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2">Experience (Years)</label>
                                <input
                                    type="number"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    min="1"
                                    className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block mb-2">Photo</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                        className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                        required
                                    />
                                    {photoPreview && (
                                        <div className="w-20 h-20 overflow-hidden rounded-full">
                                            <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* License Information Section */}
                    <div className="mb-8">
                        <h2 className={`text-xl font-semibold mb-4 pb-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            License Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2">License Number</label>
                                <input
                                    type="text"
                                    name="licenseNumber"
                                    value={formData.licenseNumber}
                                    onChange={handleChange}
                                    placeholder="e.g. DL123456789123"
                                    className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2">License Type</label>
                                <select
                                    name="licenseType"
                                    value={formData.licenseType}
                                    onChange={handleChange}
                                    className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                    required
                                >
                                    <option value="">Select License Type</option>
                                    <option value="Non-Commercial">Non-Commercial</option>
                                    <option value="Commercial">Commercial</option>
                                    <option value="Heavy Vehicle">Heavy Vehicle</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className="mb-8">
                        <h2 className={`text-xl font-semibold mb-4 pb-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            Address Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block mb-2">Street Address</label>
                                <input
                                    type="text"
                                    name="address.street"
                                    value={formData.address.street}
                                    onChange={handleChange}
                                    className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2">City</label>
                                <input
                                    type="text"
                                    name="address.city"
                                    value={formData.address.city}
                                    onChange={handleChange}
                                    className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2">State</label>
                                <input
                                    type="text"
                                    name="address.state"
                                    value={formData.address.state}
                                    onChange={handleChange}
                                    className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2">Pincode</label>
                                <input
                                    type="text"
                                    name="address.pincode"
                                    value={formData.address.pincode}
                                    onChange={handleChange}
                                    className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Emergency Contact Section */}
                    <div className="mb-8">
                        <h2 className={`text-xl font-semibold mb-4 pb-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            Emergency Contact
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block mb-2">Name</label>
                                <input
                                    type="text"
                                    name="emergencyContact.name"
                                    value={formData.emergencyContact.name}
                                    onChange={handleChange}
                                    className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2">Phone</label>
                                <input
                                    type="text"
                                    name="emergencyContact.phone"
                                    value={formData.emergencyContact.phone}
                                    onChange={handleChange}
                                    pattern="^\d{10}$"
                                    className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2">Relation</label>
                                <input
                                    type="text"
                                    name="emergencyContact.relation"
                                    value={formData.emergencyContact.relation}
                                    onChange={handleChange}
                                    className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bank Details Section */}
                    <div className="mb-8">
                        <h2 className={`text-xl font-semibold mb-4 pb-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            Bank Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block mb-2">Account Number</label>
                                <input
                                    type="text"
                                    name="bankDetails.accountNumber"
                                    value={formData.bankDetails.accountNumber}
                                    onChange={handleChange}
                                    pattern="^\d{9,18}$"
                                    className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2">IFSC Code</label>
                                <input
                                    type="text"
                                    name="bankDetails.ifscCode"
                                    value={formData.bankDetails.ifscCode}
                                    onChange={handleChange}
                                    pattern="^[A-Z]{4}\d{7}$"
                                    placeholder="e.g. SBIN0123456"
                                    className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2">Bank Name</label>
                                <input
                                    type="text"
                                    name="bankDetails.bankName"
                                    value={formData.bankDetails.bankName}
                                    onChange={handleChange}
                                    className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Status Section */}
                    <div className="mb-8">
                        <h2 className={`text-xl font-semibold mb-4 pb-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            Status
                        </h2>
                        <div>
                            <label className="block mb-2">Driver Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="On Leave">On Leave</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`py-2 px-6 rounded-lg font-semibold ${darkMode
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Submitting...' : 'Register as Driver'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BecomeDriver;