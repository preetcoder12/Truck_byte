import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSun } from "react-icons/fa6";
import { IoMoonOutline } from "react-icons/io5";

const Subscription = () => {
    const [selectedPlan, setSelectedPlan] = useState("basic");
    const [paymentMethod, setPaymentMethod] = useState("credit");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [step, setStep] = useState(1);
    const [userDetails, setUserDetails] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Plans data
    const plans = {
        basic: {
            name: "Starter Plan",
            monthlyPrice: "₹999/month",
            features: [
                "5 truck listings",
                "Basic tracking",
                "Email support"
            ]
        },
        professional: {
            name: "Pro plan",
            monthlyPrice: "₹2,999/month",
            features: [
                "20 truck listings",
                "Real-time GPS tracking",
                "Advanced analytics",
                "Driver ratings",
                "Chat support"
            ]
        }
    };
    const navigate = useNavigate();
    const handledashboard = () => {
        navigate("/dashboard");
    }

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Fetch user details
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                // Replace with your actual API endpoint
                const userId = localStorage.getItem("userId");
                if (userId) {
                    const response = await axios.get(`http://localhost:8000/users/${userId}`);
                    setUserDetails(response.data);
                    setEmail(response.data.email || "");
                    setCompanyName(response.data.companyName || "");
                }
            } catch (err) {
                console.error("❌ Error fetching user details:", err);
            }
        };
        fetchUserDetails();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call for subscription
        setTimeout(() => {
            setStep(3);
            setIsProcessing(false);
        }, 2000);
    };

    const handleBack = () => {
        if (step === 2) {
            setStep(1);
        } else {
            window.location.href = "/dashboard";
        }
    };

    const handleExpiryDate = (e) => {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length >= 2) {
            let month = value.slice(0, 2);
            if (parseInt(month) > 12) {
                month = "12";
            }
            value = month + (value.length > 2 ? "/" + value.slice(2, 6) : "");
        }

        if (value.length <= 7) {
            setExpiryDate(value);
        }
    };

    const handleCardNumber = (e) => {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length > 4) {
            value = value.match(/.{1,4}/g).join(" ");
        }

        if (value.length <= 19) {
            setCardNumber(value);
        }
    };

    return (
        <div className={`max-w-4xl mx-auto rounded-3xl shadow-xl overflow-hidden pt-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
            <div className={`p-4 md:p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-800 to-indigo-900'}`}>

                <h1 className="text-2xl md:text-3xl font-bold text-center">TruckByte Subscription Plans</h1>
                <p className={`text-center mt-2 ${isDarkMode ? 'text-gray-300' : 'text-blue-100'}`}>Choose the perfect plan for your truck management needs</p>
            </div>

            {/* Progress steps */}
            <div className={`flex justify-center p-4 border-b ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex gap-20">

                    <div className="flex items-center ">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>1</div>
                        <div className={`w-16 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>2</div>
                        <div className={`w-16 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>3</div>
                    </div>
                    <button  onClick={toggleDarkMode}>
                        {isDarkMode ? <FaSun className="w-[30px] h-[30px]" /> : <IoMoonOutline className="w-[30px] h-[30px]" />}
                    </button>

                </div>
            </div>

            <div className="p-6">
                {step === 1 && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Select Your Subscription Plan</h2>

                        {/* Plan selection */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            {Object.entries(plans).map(([planId, plan]) => (
                                <div
                                    key={planId}
                                    className={`border rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer ${selectedPlan === planId ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"} ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}
                                    onClick={() => setSelectedPlan(planId)}
                                >
                                    <div className="p-5">
                                        <h3 className="text-lg font-bold">{plan.name}</h3>
                                        <div className="mt-2">
                                            <span className="text-2xl font-bold">{plan.monthlyPrice}</span>
                                        </div>

                                        {planId === "professional" && (
                                            <div className="mt-2 bg-blue-50 text-blue-800 px-2 py-1 rounded text-xs font-medium inline-block">
                                                Most Popular
                                            </div>
                                        )}

                                        <ul className="mt-4 space-y-2">
                                            {plan.features.map((feature, index) => (
                                                <li key={index} className="flex items-start text-sm">
                                                    <span className="text-green-500 mr-2">✓</span>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className={`p-4 border-t ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                                        <button
                                            className={`w-full py-2 rounded-lg font-medium ${selectedPlan === planId ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                                            onClick={() => setSelectedPlan(planId)}
                                        >
                                            {selectedPlan === planId ? "Selected" : "Select Plan"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={handleBack}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                Back to Dashboard
                            </button>

                            <button
                                onClick={() => setStep(2)}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
                            >
                                Continue to Payment
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <h2 className="text-xl font-bold mb-4">Payment Information</h2>

                            <div className="mb-6">
                                <div className={`grid grid-cols-3 gap-2 p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                                    <button
                                        className={`p-3 rounded-md flex flex-col items-center ${paymentMethod === 'credit' ? 'bg-white shadow-md' : ''} ${isDarkMode ? 'bg-gray-700' : ''}`}
                                        onClick={() => setPaymentMethod('credit')}
                                    >
                                        <span className="text-blue-800 font-medium">Credit Card</span>
                                    </button>
                                    <button
                                        className={`p-3 rounded-md flex flex-col items-center ${paymentMethod === 'debit' ? 'bg-white shadow-md' : ''} ${isDarkMode ? 'bg-gray-700' : ''}`}
                                        onClick={() => setPaymentMethod('debit')}
                                    >
                                        <span className="text-blue-800 font-medium">Debit Card</span>
                                    </button>
                                    <button
                                        className={`p-3 rounded-md flex flex-col items-center ${paymentMethod === 'bank' ? 'bg-white shadow-md' : ''} ${isDarkMode ? 'bg-gray-700' : ''}`}
                                        onClick={() => setPaymentMethod('bank')}
                                    >
                                        <span className="text-blue-800 font-medium">Bank Transfer</span>
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-gray-700 mb-2" htmlFor="email">
                                            Email Address
                                        </label>
                                        <input
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            id="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-2" htmlFor="companyName">
                                            Company Name
                                        </label>
                                        <input
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            id="companyName"
                                            type="text"
                                            placeholder="Your Company Ltd."
                                            value={companyName}
                                            onChange={(e) => setCompanyName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
                                    <>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 mb-2" htmlFor="name">
                                                Cardholder Name
                                            </label>
                                            <input
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                id="name"
                                                type="text"
                                                placeholder="John Doe"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-gray-700 mb-2" htmlFor="cardNumber">
                                                Card Number
                                            </label>
                                            <div className="relative">
                                                <input
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    id="cardNumber"
                                                    type="text"
                                                    maxLength={19}
                                                    placeholder="1234 5678 9012 3456"
                                                    value={cardNumber}
                                                    onChange={handleCardNumber}
                                                    required
                                                />
                                                <div className="absolute right-3 top-3">
                                                    <div className="flex space-x-1">
                                                        <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                                        <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex space-x-4 mb-6">
                                            <div className="w-1/2">
                                                <label className="block text-gray-700 mb-2" htmlFor="expiryDate">
                                                    Expiry Date
                                                </label>
                                                <input
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    id="expiryDate"
                                                    type="text"
                                                    placeholder="MM/YYYY"
                                                    value={expiryDate}
                                                    maxLength={7}
                                                    onChange={handleExpiryDate}
                                                    required
                                                />
                                            </div>

                                            <div className="w-1/2">
                                                <label className="block text-gray-700 mb-2" htmlFor="cvv">
                                                    Security Code
                                                </label>
                                                <input
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    id="cvv"
                                                    type="text"
                                                    placeholder="123"
                                                    value={cvv}
                                                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                                                    maxLength={3}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {paymentMethod === 'bank' && (
                                    <div className="mb-6">
                                        <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-100'}`}>
                                            <p className={`font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>Bank Transfer Instructions:</p>
                                            <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>1. Transfer the exact amount to the account below</p>
                                            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>2. Use your company name as payment reference</p>
                                            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>3. Your subscription will be activated once payment is verified</p>

                                            <div className={`mt-4 p-4 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                                                <p className="text-sm"><span className="font-medium">Bank:</span> TruckByte Financial Services</p>
                                                <p className="text-sm"><span className="font-medium">Account Name:</span> TruckByte Subscriptions Ltd</p>
                                                <p className="text-sm"><span className="font-medium">Account Number:</span> 9876543210</p>
                                                <p className="text-sm"><span className="font-medium">Routing Number:</span> 123456789</p>
                                                <p className="text-sm"><span className="font-medium">Reference:</span> SUB-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-between items-center mb-6">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                                    >
                                        Back
                                    </button>

                                    <button
                                        type="submit"
                                        className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md flex items-center"
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? (
                                            <>Processing...</>
                                        ) : (
                                            <>Complete Subscription</>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="md:col-span-1">
                            <div className={`mt-4 p-4 border rounded-lg ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                <div className="flex justify-center mb-3">
                                    <img className="w-40" src="/paysecure.png" alt="Secure Payment" />
                                </div>
                                <p className={`text-xs text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Your payment information is secured with bank-level encryption. We never store your full card details.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-green-600 text-2xl">✓</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Subscription Activated!</h2>
                        <p className="text-gray-600 mb-6">Your TruckByte account has been successfully upgraded.</p>

                        <div className="max-w-md mx-auto bg-gray-50 p-4 rounded-lg text-left mb-6">
                            <h3 className="font-bold mb-3">Subscription Details</h3>
                            <p><span className="font-medium">Subscription ID:</span> SUB-{Math.floor(Math.random() * 100000).toString().padStart(5, '0')}</p>
                            <p><span className="font-medium">Plan:</span> {plans[selectedPlan].name}</p>
                        </div>

                        <div className="flex justify-center space-x-4">
                            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">
                                Download Invoice
                            </button>
                            <button onClick={handledashboard} className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg">
                                Go to Dashboard
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-gray-50 p-4 border-t">
                <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                        © 2025 TruckByte. All rights reserved.
                    </div>
                    <div className="flex space-x-4">
                        <span className="text-sm text-gray-500">Need help? Call 1-800-LORRY-NOW</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscription;