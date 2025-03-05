import { Navigate } from "react-router-dom";

const ProtectAdmin = ({ element }) => {
    const role_user = localStorage.getItem("adminRole");
    return role_user === "200" ? element : <Navigate to="/selectroles" replace />;
};

export default ProtectAdmin;
