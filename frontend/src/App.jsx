import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/DashBoard";
import BecomeDriver from "./pages/BecomeDriver";
import Protect from "./components/protect";
import DriverProfile from "./components/DriverProfile";
import DriverLogin from "./components/SigninDriver";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/*protected routes :)  */}
        <Route path="/" element={<Protect element={<HomePage />} />} />
        <Route path="/dashboard" element={<Protect element={<Dashboard />} />} />
        <Route path="/becomedriver" element={<Protect element={<BecomeDriver />} />} />
        <Route path="/driverprofile" element={<Protect element={<DriverProfile />} />} />
        <Route path="/driverlogin" element={<Protect element={<DriverLogin />} />} />

      </Routes>
    </Router>
  );
}


export default App
