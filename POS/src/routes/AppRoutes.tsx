import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "../pages/Auth/Welcome";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import OtpVerification from "../pages/Auth/OtpVerification";
import ForgotPassword from "../pages/Auth/ForgotPassword";

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/otp-verification" element={<OtpVerification />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
        </BrowserRouter>

    );
}
export default AppRoutes;