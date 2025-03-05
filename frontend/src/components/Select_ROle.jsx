import React from 'react';
import { useNavigate } from "react-router-dom";
import { Users, ShieldCheck } from 'lucide-react';

const SelectRole = () => {
    const navigate = useNavigate();

    const handleClickUserDriver = () => {
        localStorage.setItem("userRole", "100");
        localStorage.removeItem("adminRole");
        navigate("/signup");
    };

    const handleClickAdmin = () => {
        localStorage.setItem("adminRole", "200");
        localStorage.removeItem("userRole");
        navigate("/adminsignup");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-red-500 flex items-center justify-center p-4 font-sans">
            <div className="bg-white shadow-2xl rounded-3xl overflow-hidden w-full max-w-4xl grid grid-cols-2 transform transition-all duration-300 hover:scale-[1.02]">
                {/* User/Driver Section */}
                <div className="p-12 flex flex-col items-center justify-center text-center bg-white">
                    <div className="bg-blue-100 p-6 rounded-full mb-6 shadow-md">
                        <Users className="w-16 h-16 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">User/Driver</h2>
                    <p className="text-gray-600 mb-6 text-center">
                        Register as a user to book shipments or as a driver to offer transportation services.
                    </p>
                    <button 
                        onClick={handleClickUserDriver}
                        className="px-8 py-3 bg-blue-600 text-white rounded-xl 
                        font-semibold hover:bg-blue-700 transition-all 
                        flex items-center justify-center space-x-2 
                        shadow-md hover:shadow-lg group"
                    >
                        <span>Select User/Driver</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>

                {/* Admin Section */}
                <div className="p-12 flex flex-col items-center justify-center text-center bg-gradient-to-br from-indigo-50 to-indigo-100">
                    <div className="bg-indigo-100 p-6 rounded-full mb-6 shadow-md">
                        <ShieldCheck className="w-16 h-16 text-indigo-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Admin</h2>
                    <p className="text-gray-600 mb-6 text-center">
                        Access administrative controls to manage trucks, drivers, and user operations.
                    </p>
                    <button 
                        onClick={handleClickAdmin}
                        className="px-8 py-3 bg-indigo-600 text-white rounded-xl 
                        font-semibold hover:bg-indigo-700 transition-all 
                        flex items-center justify-center space-x-2 
                        shadow-md hover:shadow-lg group"
                    >
                        <span>Select Admin</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelectRole;