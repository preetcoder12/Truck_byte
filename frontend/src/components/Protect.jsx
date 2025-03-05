import { Navigate } from "react-router-dom";

const Protect = ({ element }) => {
    const role_user = localStorage.getItem("userRole");
    return role_user === "100" ? element : <Navigate to="/login" replace />;
};

export default Protect;
