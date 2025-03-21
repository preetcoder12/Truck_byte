import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/DashBoard";
import Protect from "./components/Protect";
import DriverProfile from "./components/DriverProfile";
import DriverLogin from "./components/SigninDriver";
import EditDriverProfile from "./pages/EditDriverProfile";
import AddTruck from "./pages/AddTruck";
import BookTrucks from "./pages/BookTrucks";
import BookTruckProfile from "./components/BookTruckProfile";
import SelectRole from "./components/Select_ROle"
import AdminSignup from "./pages/AdminSignupPage";
import Admin_LoginPage from "./pages/Admin_LoginPage";
import ProtectAdmin from "./components/Protect_admin";
import AdminPage from "./pages/AdminPage";
import PaymentPage from "./pages/PaymentPage";
import BecomeDriver from "./pages/BecomeDriver";
import AdminSeeSelectedTruck from "./pages/AdminSeeSelectedTruck";
import EditTruckDetails from "./pages/EditTruckDetails";
import Admin_ToDriver_Profile from "./pages/Admin_ToDriver_Profile";
import Admin_edit_driverDetails from "./pages/Admin_edit_driver";
import Admin_Control_user from "./pages/Admin_Control_user";
import Admin_to_ALLuser from "./pages/Admin_to_ALLuser";
import Subscription from "./pages/Subscription";
import HelpSupport from "./components/Help_and_Support";
import LearnMore from "./pages/Learnmore";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/selectroles" element={<SelectRole />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Users and Drivers Routes */}
        <Route path="/" element={<Protect element={<HomePage />} />} />
        <Route path="/dashboard" element={<Protect element={<Dashboard />} />} />
        <Route path="/learnmore" element={<Protect element={<LearnMore />} />} />
        <Route path="/becomedriver" element={<Protect element={<BecomeDriver />} />} />
        <Route path="/driverprofile" element={<Protect element={<DriverProfile />} />} />
        <Route path="/driverlogin" element={<DriverLogin />} />
        <Route path="/editdriverprofile" element={<Protect element={<EditDriverProfile />} />} />
        <Route path="/addtruck" element={<Protect element={<AddTruck />} />} />
        <Route path="/booktrucks" element={<Protect element={<BookTrucks />} />} />
        <Route path="/booktrucksdetails/:truckId" element={<Protect element={<BookTruckProfile />} />} />
        <Route path="/payment" element={<Protect element={<PaymentPage />} />} />
        <Route path="/subscription" element={<Protect element={<Subscription />} />} />
        <Route path="/helpsupport" element={<Protect element={<HelpSupport />} />} />


        {/* Admin Routes */}
        <Route path="/adminsignup" element={<AdminSignup />} />
        <Route path="/adminlogin" element={<Admin_LoginPage />} />
        <Route path="/admin" element={<ProtectAdmin element={<AdminPage />} />} />
        <Route path="/adminselected_truck/:truckId" element={<ProtectAdmin element={<AdminSeeSelectedTruck />} />} />
        <Route path="/admin_editselected_truck/:truckId" element={<ProtectAdmin element={<EditTruckDetails />} />} />
        <Route path="/admin_todriverprofile/:id" element={<ProtectAdmin element={<Admin_ToDriver_Profile />} />} />
        <Route path="/admin_to_allusers" element={<ProtectAdmin element={<Admin_to_ALLuser />} />} />
        <Route path="/admin_editdriverprofile/:id" element={<ProtectAdmin element={<Admin_edit_driverDetails />} />} />
        <Route path="/usercontrols/:id" element={<ProtectAdmin element={<Admin_Control_user />} />} />

      </Routes>
    </Router>
  );
}

export default App;
