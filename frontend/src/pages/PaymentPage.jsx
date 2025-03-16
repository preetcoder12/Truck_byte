import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaRupeeSign } from "react-icons/fa";
import { RingLoader } from "react-spinners";

const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState("credit");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [truckdetails, setTruckDetails] = useState(null);
    const [loading, setLoading] = useState(true);


    const validatedetails = () => {
        if (cardNumber === "" || expiryDate === "" || cvv === "" || name === "" || email === "") {
            toast.error("Please fill all the details");
            return false;
        }
        if (cardNumber.length < 19) {
            toast.error("Please enter a valid card number");
            return false;
        }
        if (expiryDate.length < 7) {
            toast.error("Please enter a valid expiry date");
            return false;
        }
        if (cvv.length < 3) {
            toast.error("Please enter a valid CVV");
            return false;
        }
        if (name === "") {
            toast.error("Please enter your name");
            return false;
        }
        if (email === "") {
            toast.error("Please enter your email");
            return false;
        }
        return true;

    }


    const selectedTruckId = localStorage.getItem("selectedtruckid");
    console.log("Selected Truck ID:", selectedTruckId);
    const paymentprice = localStorage.getItem("price");

    useEffect(() => {
        const fetchTruckDetails = async () => {
            setLoading(true); // ✅ Set loading state to true before request
            try {
                const response = await axios.get(`http://localhost:8000/trucks/specifictruck/${selectedTruckId}`);
                setTruckDetails(response.data);
            } catch (err) {
                console.error("❌ Error fetching truck details:", err);
            } finally {
                setLoading(false); // ✅ Ensure loading state is reset
            }
        };

        if (selectedTruckId) { // ✅ Prevent unnecessary API calls if no ID
            fetchTruckDetails();
        }
    }, [selectedTruckId]);


    const backto_dash = () => {
        window.location.href = "/dashboard";
    }

    const handleback = () => {
        window.location.href = "/booktrucks"
    }
    const [bookingDetails, setBookingDetails] = useState({
        truckType: '',
        distance: '250',
        pickup: '2025-03-15T10:00',
        estimatedCost: '$750.00'
    });
    const [step, setStep] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (!validatedetails()) {
            setLoading(false);
            return;
        }
        setTimeout(() => {
            setStep(3);
            setLoading(false);
        }, 2000);
    };

    const handleExpirydate = (e) => {
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
    const HandleCardNumber = (e) => {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length > 4) {
            value = value.match(/.{1,4}/g).join(" ");
        }

        if (value.length <= 19) {
            setCardNumber(value);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900">
                <RingLoader color="#FACC15" size={80} />
            </div>
        );
    }

    const renderSummary = () => (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-bold text-lg mb-3 text-blue-800">Booking Summary</h3>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span className="text-gray-600">Truck Type:</span>
                    <span className="font-medium">
                        {truckdetails?.truckType}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Distance:</span>
                    <span className="font-medium">{bookingDetails.distance} miles</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Pickup Date:</span>
                    <span className="font-medium">{new Date(bookingDetails.pickup).toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 my-2 pt-2 flex justify-between">
                    <span className="font-bold">Total Amount:</span>
                    <span className="font-bold text-blue-800">
                        <div className="flex justify-center items-center">
                            <FaRupeeSign />
                            {paymentprice}
                        </div>
                    </span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-xl overflow-hidden pt-4 ">
            <div className="bg-gradient-to-r from-blue-800 to-indigo-900 p-4 md:p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-white text-center">Secure Truck Booking Payment</h1>
                <p className="text-blue-100 text-center mt-2">Fast, reliable, and secure payments for your logistics needs</p>
            </div>

            {/* Progress steps */}
            <div className="flex justify-center p-4 bg-gray-50 border-b">
                <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>1</div>
                    <div className={`w-16 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>2</div>
                    <div className={`w-16 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>3</div>
                </div>
            </div>

            <div className="p-6">
                {step === 1 && (
                    <div>
                        <div className="flex mb-6 space-x-4">
                            <div className="w-1/2">
                                <img src="/man_paying.jpg" alt="Truck illustration" className="rounded-lg w-full object-cover shadow-md" />
                                <button onClick={handleback}
                                    className="bg-red-500 w-28 h-12 mt-4 border-2 rounded-2xl 
               text-black font-bold hover:bg-red-400 transition-all duration-300"
                                >
                                    Back
                                </button>

                            </div>
                            <div className="w-1/2">
                                {renderSummary()}
                                <button
                                    onClick={() => setStep(2)}
                                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
                                >
                                    Proceed to Payment
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">Payment Information</h2>

                            <div className="mb-6">
                                <div className="grid grid-cols-3 gap-2 bg-gray-50 p-2 rounded-lg">
                                    <button
                                        className={`p-3 rounded-md flex flex-col items-center ${paymentMethod === 'credit' ? 'bg-white shadow-md' : ''}`}
                                        onClick={() => setPaymentMethod('credit')}
                                    >
                                        <span className="text-blue-800 font-medium">Credit Card</span>
                                    </button>
                                    <button
                                        className={`p-3 rounded-md flex flex-col items-center ${paymentMethod === 'debit' ? 'bg-white shadow-md' : ''}`}
                                        onClick={() => setPaymentMethod('debit')}
                                    >
                                        <span className="text-blue-800 font-medium">Debit Card</span>
                                    </button>
                                    <button
                                        className={`p-3 rounded-md flex flex-col items-center ${paymentMethod === 'bank' ? 'bg-white shadow-md' : ''}`}
                                        onClick={() => setPaymentMethod('bank')}
                                    >
                                        <span className="text-blue-800 font-medium">Bank Transfer</span>
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
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
                                                    onChange={HandleCardNumber}
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
                                                    type="text  "
                                                    placeholder="MM/YYYY"
                                                    value={expiryDate}
                                                    maxLength={7}
                                                    onChange={handleExpirydate}
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
                                                    onChange={(e) =>
                                                        setCvv(e.target.value.replace(/\D/g, ""))
                                                    }
                                                    maxLength={3}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {paymentMethod === 'bank' && (
                                    <div className="mb-6">
                                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                            <p className="font-medium text-blue-800">Bank Transfer Instructions:</p>
                                            <p className="text-sm mt-2">1. Transfer the exact amount to the account below</p>
                                            <p className="text-sm">2. Use your booking reference as payment reference</p>
                                            <p className="text-sm">3. Your booking will be confirmed once payment is verified</p>

                                            <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                                                <p className="text-sm"><span className="font-medium">Bank:</span> Global Logistics Bank</p>
                                                <p className="text-sm"><span className="font-medium">Account Name:</span> Truck Booking Services Ltd</p>
                                                <p className="text-sm"><span className="font-medium">Account Number:</span> 1234567890</p>
                                                <p className="text-sm"><span className="font-medium">Routing Number:</span> 987654321</p>
                                                <p className="text-sm"><span className="font-medium">Reference:</span> TRK-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-between items-center mb-6">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                                    >
                                        Back
                                    </button>

                                    <button
                                        type="submit"
                                        className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md flex items-center"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>Processing...</>
                                        ) : (
                                            <>Complete Payment</>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="md:col-span-1">
                            {renderSummary()}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-bold text-lg mb-3 text-blue-800">Why Choose Us</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span>Insurance-backed logistics</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span>Real-time tracking</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span>Flexible scheduling</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span>24/7 customer support</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="mt-4 p-4 border border-gray-200 rounded-lg">
                                <div className="flex justify-center mb-3">
                                    <img className='w-[10rem]' src="/paysecure.png  " alt="Secure Payment" />
                                </div>
                                <p className="text-xs text-center text-gray-500">
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
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
                        <p className="text-gray-600 mb-6">Your truck booking has been confirmed.</p>

                        <div className="max-w-md mx-auto bg-gray-50 p-4 rounded-lg text-left mb-6">
                            <h3 className="font-bold mb-3">Booking Details</h3>
                            <p><span className="font-medium">Booking ID:</span> TRK-{Math.floor(Math.random() * 100000).toString().padStart(5, '0')}</p>
                            <p><span className="font-medium">Pickup Date:</span> {new Date(bookingDetails.pickup).toLocaleString()}</p>
                            <p><span className="font-medium "  >Amount Paid:</span>
                                <div className="flex gap-1">
                                    <FaRupeeSign className="mt-1"/>{paymentprice}
                                </div>
                            </p>
                        </div>

                        <div className="flex justify-center space-x-4">
                            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">
                                Download Receipt
                            </button>
                            <button onClick={backto_dash} className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg">
                                Back to dashboard
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-gray-50 p-4 border-t">
                <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                        © 2025 Truck Booking Services Ltd.
                    </div>
                    <div className="flex space-x-4">
                        <span className="text-sm text-gray-500">Need help? Call 1-800-TRUCK-NOW</span>
                    </div>
                </div>
            </div>
            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        background: '#ff4d4d', // Bright red for visibility
                        color: '#fff', // White text for contrast
                        border: '1px solid #cc0000', // Darker red border for depth
                        boxShadow: '0 4px 10px rgba(255, 77, 77, 0.5)', // Subtle glow effect
                    },
                }}
            />


        </div>
    );
};

export default PaymentPage;