import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/DashBoard";
import BecomeDriver from "./pages/BecomeDriver";
import Protect from "./components/protect";
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

      </Routes>
    </Router>
  );
}


export default App
