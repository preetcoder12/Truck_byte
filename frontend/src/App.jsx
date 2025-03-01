import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/DashBoard";
import BecomeDriver from "./pages/BecomeDriver";
import Protect from "./components/protect";
import DriverProfile from "./components/DriverProfile";
import DriverLogin from "./components/SigninDriver";
import EditDriverProfile from "./pages/EditDriverProfile";
import AddTruck from "./pages/AddTruck";
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
        <Route path="/editdriverprofile" element={<Protect element={<EditDriverProfile />} />} />
        <Route path="/addtruck" element={<Protect element={<AddTruck />} />} />

      </Routes>
    </Router>
  );
}


export default App
