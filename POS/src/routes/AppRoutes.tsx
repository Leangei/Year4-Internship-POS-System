import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from '../pages/Auth/Welcome'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import OtpVerification from '../pages/Auth/OtpVerification'
import ForgotPassword from '../pages/Auth/ForgotPassword'
import ResetPassword from '../pages/Auth/ResetPassword'
import DashboardLayout from '../components/layout/DashboardLayout.tsx'
import SuperAdminLayout from '../components/layout/SuperAdminLayout.tsx'
import DashboardHome from '../ShopOwner/Hompage/DashboardHome.tsx'
import CustomerPage from '../ShopOwner/Customer/CustomerPage.tsx'
import OrderPage from '../ShopOwner/Order/OrderPage.tsx'
import ProductPage from '../ShopOwner/Product/ProductPage.tsx'
import InboxPage from '../ShopOwner/Inbox/InboxPage.tsx'
import SettingsPage from '../ShopOwner/Setting/SettingsPage.tsx'
import PlanPage from '../ShopOwner/Plan/PlanPage.tsx'
import SuperAdminDashboardPage from '../SuperAdmin/Dashboard/DashboardPage.tsx'
import SuperAdminApprovalPage from '../SuperAdmin/Approval/ApprovalPage.tsx'
import SuperAdminPaymentPage from '../SuperAdmin/Payment/PaymentPage.tsx'
import SuperAdminShopPage from '../SuperAdmin/Shop/ShopPage.tsx'
import SuperAdminPlanPage from '../SuperAdmin/Plan/PlanPage.tsx'
import SuperAdminSettingPage from '../SuperAdmin/Setting/SettingPage.tsx'

function AppRoutes() {
  return (
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

        <Route path="/superadmin" element={<SuperAdminLayout />}>
          <Route index element={<SuperAdminDashboardPage />} />
          <Route path="approval" element={<SuperAdminApprovalPage />} />
          <Route path="payment" element={<SuperAdminPaymentPage />} />
          <Route path="shop" element={<SuperAdminShopPage />} />
          <Route path="plan" element={<SuperAdminPlanPage />} />
          <Route path="setting" element={<SuperAdminSettingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default AppRoutes;
