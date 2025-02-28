import { Navigate } from "react-router-dom";

const Protect = ({ element }) => {
    const user = localStorage.getItem("user");
    return user ? element : <Navigate to="/login" replace />
}

export default Protect;