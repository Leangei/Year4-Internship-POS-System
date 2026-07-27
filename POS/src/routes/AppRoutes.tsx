import { BrowserRouter, Routes, Route } from "react-router-dom"
import Welcome from "../pages/Auth/Welcome"
import Login from "../pages/Auth/Login"
import Register from "../pages/Auth/Register"
import OtpVerification from "../pages/Auth/OtpVerification"
import ForgotPassword from "../pages/Auth/ForgotPassword"
import ResetPassword from "../pages/Auth/ResetPassword"
import DashboardLayout from "../components/layout/DashboardLayout"
import DashboardHome from "../pages/Hompage/DashboardHome"
import CustomerPage from "../pages/Customer/CustomerPage"
import OrderPage from "../pages/Order/OrderPage"
import ProductPage from "../pages/Product/ProductPage"
import InboxPage from "../pages/Inbox/InboxPage"
import SettingsPage from "../pages/Setting/SettingsPage"
import PlanPage from "../pages/Plan/PlanPage"

function AppRoutes() {
    return(
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/shopOwner" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="orders" element={<OrderPage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="customers" element={<CustomerPage />} />
          <Route path="inbox" element={<InboxPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="plan" element={<PlanPage />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}
export default AppRoutes;