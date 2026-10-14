import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import Home from "./Pages/Home/Home";
import Header from './Components/Header/Header';
import Footer from  './Components/Footer/Footer';
import RequireAuth from "./Components/RequireAuth";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import ResetPassword from "./Pages/Auth/ResetPassword";
import ModelDetails from "./Pages/CompanionsPage/ModelDetails";
import MembershipPlans from "./Components/MembershipPlans";
import PrivacyPolicy from "./Pages/Legal/PrivacyPolicy";
import TermsOfService from "./Pages/Legal/TermsOfService";
import CompanionsPage from "./Pages/CompanionsPage/CompanionsPage";
import LivemodelPage from "./Pages/LivemodelPage/LivemodelPage";
import StripchatModelDetails from "./Pages/LivemodelPage/StripchatModelDetails";
import LiveChat from "./Pages/LivemodelPage/LiveChat";
import MyAccount from "./Pages/Account/MyAccount";
import EditProfile from "./Pages/Account/EditProfile";


/* =======  APP ======= */

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
     <ScrollToTop />
     <Header />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login"  element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route
          path="/companions/:id"
          element={
            <RequireAuth>
              <ModelDetails />
            </RequireAuth>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route  path="/reset-password" element={<ResetPassword />}/>
        <Route path="/membership" element={<MembershipPlans />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element ={<TermsOfService />} /> 
        <Route path="/companions" element={<CompanionsPage />} />
        <Route path="/live-models/" element={<LivemodelPage />} />
        <Route
          path="/live-model/:modelId"
          element={
            <RequireAuth>
              <StripchatModelDetails />
            </RequireAuth>
          }
        />
        <Route
          path="/live-chat/:modelId"
          element={
            <RequireAuth>
              <LiveChat />
            </RequireAuth>
          }
        />
        <Route
          path="/my-account"
          element={
            <RequireAuth>
              <MyAccount />
            </RequireAuth>
          }
        />
        <Route
          path="/my-account/edit"
          element={
            <RequireAuth>
              <EditProfile />
            </RequireAuth>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}


export default App;