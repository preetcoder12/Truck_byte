import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookTruckProfile = () => {
    const [truckDetails, setTruckDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const params = useParams();
    console.log("🚀 useParams() Output:", params);

    const truckId = params.truckId;
    const extractedId = truckId && typeof truckId === "object" ? truckId._id || truckId.id || String(truckId) : truckId;
    console.log("✅ Final Extracted Truck ID:", extractedId);

    useEffect(() => {
        console.log("🛠 Debugging Truck ID:", extractedId);

        if (!extractedId || extractedId === "[object Object]") {
            console.error("❌ Invalid truckId:", extractedId);
            setError("Invalid Truck ID.");
            setLoading(false);
            return;
        }

        const fetchTruckDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/trucks/specifictruck/${extractedId}`);
                setTruckDetails(response.data);
            } catch (err) {
                console.error("❌ Error fetching truck details:", err);
                setError("Failed to fetch truck details");
            } finally {
                setLoading(false);
            }
        };

        fetchTruckDetails();
    }, [extractedId]);

    if (loading) return <p>Loading truck details...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Truck Details</h2>
            <p><strong>Truck Number:</strong> {truckDetails?.truckNumber}</p>
            <p><strong>Model:</strong> {truckDetails?.model}</p>
            <p><strong>Manufacturer:</strong> {truckDetails?.manufacturer}</p>
            <p><strong>Capacity:</strong> {truckDetails?.capacity} tons</p>
            <p><strong>Price per Km:</strong> ₹{truckDetails?.pricePerKm}</p>
            <p><strong>Owner Name:</strong> {truckDetails?.contactInfo?.name}</p>
            <p><strong>Phone:</strong> {truckDetails?.contactInfo?.phone}</p>
            <p><strong>Email:</strong> {truckDetails?.contactInfo?.email}</p>
        </div>
    );
};

export default BookTruckProfile;
