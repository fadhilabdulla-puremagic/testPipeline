import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Courses from "./components/Courses/Courses";
import CourseDetail from "./components/CourseDetail/CourseDetail";
import About from "./components/About/About";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Contact from "./components/Contact/Contact";
import Blog from "./components/Blog/Blog";
import BlogDetails from "./components/BlogDetail/BlogDetails";
import { GlobalProvider } from "./context/GlobalState";
import { CartPage } from "./components/CartPage/CartPage";
import { BillingDetails } from "./components/BillingDetails/BillingDetails";
import { StripePayment } from "./components/stripePayment/StripePayment";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Instructor } from "./components/Instructor/Instructor";
import { InstructorRegister } from "./components/InstructorRegister/InstructorRegister";
import { NotFound } from "./components/404Page/NotFound";
import { PaymentSuccessfull } from "./components/PaymentSuccessfull/PaymentSuccessfull";
import { PaymentFailed } from "./components/PaymentFailed/PaymentFailed";
import { SuccessLogin } from "./components/SuccessLogin/SuccessLogin";
import { UpdateProfile } from "./components/UpdateProfile/UpdateProfile";
import { ForgotPassword } from "./components/ForgotPassword/ForgotPassword";
import { PrivacyPolicy } from "./components/PrivacyPolicy/PrivacyPolicy";
import { TermsAndConditions } from "./components/TermsAndConditions/TermsAndConditions";
import { NavLink } from "react-router-dom";
import { SendForgotPassword } from "./components/ForgotPassword/SendForgotPassword";
import { EmailUser } from "./components/EmailUser/EmailUser";
import { DraggableSlider } from "./components/DraggableSlider/DraggableSlider";
import { AboutUs } from "./components/AboutUs/AboutUs";
import Search from "./components/Search/Search";
import SpecialOffers from "./components/SpecialOffers/SpecialOffers";
import { AnimatedTab } from "./components/AnimatedTab/AnimatedTab";
import CategoricalCourses from "./components/CategoricalCourses/CategoricalCourses";
import SiteMarquee from "./components/SiteMarquee/SiteMarquee";
import UpcomingEvents from "./components/UpcomingEvents/UpcomingEvents";
import WebniarLive from "./components/WebniarLive/WebniarLive";
import WorkshopLive from "./components/WorkshopLive/WorkshopLive";
import i18n from "./i18n/i18n";
import { useEffect } from "react";

function App() {
  return (
    <div id="div-lang-dir" dir={i18n.language==='ur'?'rtl':'ltr'} className="app-container">
    <GlobalProvider>
      <SiteMarquee />
      <Router>
        <Header />
        <ToastContainer />
        <Routes basename="/">
          <Route path="/" element={<Home />} exact />
          <Route path="/courses" element={<Courses />} exact />
          <Route path="/draggable" element={<DraggableSlider />} exact />
          <Route path="/products" element={<Products />} exact />
          <Route path="/course/:id" element={<CourseDetail />} exact />
          <Route path="/about" element={<About />} exact />
          <Route path="/profile" element={<UpdateProfile />} exact />
          <Route path="/instructor" element={<Instructor />} exact />
          <Route path="/register" element={<Register />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/customer-login" element={<Login />} exact />
          <Route path="/cart" element={<CartPage />} exact />
          <Route path="/billing-details" element={<BillingDetails />} exact />
          <Route path="/blog" element={<Blog />} exact />
          <Route path="/stripe-payment" element={<StripePayment />} exact />
          <Route path="/contact" element={<Contact />} exact />
          <Route path="/reset-password/:value" element={<ForgotPassword />} />
          <Route path="/blog-detail/:id" element={<BlogDetails />} exact />
          <Route path="/category/:id" element={<CategoricalCourses />} exact />
          <Route path="/email/user/:value" element={<EmailUser />} exact />
          <Route path="/email/user/:value" element={<EmailUser />} exact />
          <Route path="/search" element={<Search />} exact />
          <Route path="/special-offers" element={<SpecialOffers />} exact />
          <Route path="/upcoming-events" element={<UpcomingEvents />} exact />
          <Route path="/webinar/:id" element={<WebniarLive />} exact />
          <Route path="/workshop/:id" element={<WorkshopLive />} exact />
          <Route path="/instructor/register" element={<InstructorRegister />} exact />
          <Route
            path="/forgot-password"
            element={<SendForgotPassword />}
            exact
          />
          {/* <Route path="/success/login/:verificationToken" element={<SuccessLogin/>} exact /> */}
          <Route
            path="/payment-successful"
            element={<PaymentSuccessfull />}
            exact
          />
          <Route path="/payment-failed" element={<PaymentFailed />} exact />
          <Route
            path="/payment-failed/:error"
            element={<PaymentFailed />}
            exact
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} exact />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
            exact
          />
          <Route path="/about/us" element={<AboutUs />} exact />
          <Route path="/animated/tab" element={<AnimatedTab />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </GlobalProvider>
    </div>
  );
}

function Products() {
  return <h2>Products</h2>;
}

export default App;
