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
import BookTrucks from "./pages/BookTrucks";
import BookTruckProfile from "./components/BookTruckProfile";
import RazorPay_page from "./pages/RazorPay_page";
import LearnMore from "./pages/Learnmore";
import Select_ROle from "./components/Select_ROle";
import AdminSignup from "./pages/AdminSignupPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/selectroles" element={<Select_ROle />} />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Protected routes Reloated to User*/}
        <Route path="/" element={<Protect element={<HomePage />} />} />
        <Route path="/learnmore" element={<Protect element={<LearnMore />} />} />
        <Route path="/dashboard" element={<Protect element={<Dashboard />} />} />
        <Route path="/becomedriver" element={<Protect element={<BecomeDriver />} />} />
        <Route path="/driverprofile" element={<Protect element={<DriverProfile />} />} />
        <Route path="/driverlogin" element={<Protect element={<DriverLogin />} />} />
        <Route path="/editdriverprofile" element={<Protect element={<EditDriverProfile />} />} />
        <Route path="/addtruck" element={<Protect element={<AddTruck />} />} />
        <Route path="/booktrucks" element={<Protect element={<BookTrucks />} />} />
        <Route path="/booktrucksdetails/:truckId" element={<Protect element={<BookTruckProfile />} />} />
        <Route path="/pay" element={<Protect element={<RazorPay_page />} />} />

        {/* Admin routes */}
        <Route  path="/adminsignup" element={<AdminSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
