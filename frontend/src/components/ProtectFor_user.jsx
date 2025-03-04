import { Navigate } from 'react-router-dom';

const ProtectLogin = ({ element }) => {
    const role_user = localStorage.getItem("role_User");
    return role_user ? element : <Navigate to="/login" />
}

export default ProtectLogin
