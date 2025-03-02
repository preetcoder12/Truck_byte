import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RazorPayPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const amount = location.state?.price || 1000; // Default amount if not provided

  useEffect(() => {
    const loadRazorpay = async () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    };

    loadRazorpay();
  }, []);

  const handlePayment = async () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay API key
      amount: amount * 100, // Razorpay accepts amount in paisa (INR 1 = 100 paisa)
      currency: "INR",
      name: "LoadMate Truck Management",
      description: "Truck Booking Payment",
      image: "/logo.png", // Replace with your logo URL
      handler: (response) => {
        console.log("Payment Success:", response);
        alert("Payment Successful!");

        // Redirect to a success page
        navigate("/payment-success", { state: { transactionId: response.razorpay_payment_id } });
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Complete Your Payment</h2>
        <p className="text-lg text-gray-600 mb-4">Total Amount: ₹{amount}</p>

        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition-colors"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default RazorPayPage;
    