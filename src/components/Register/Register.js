import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DownloadApp from "../SubComponents/DownloadApp";
import axios from "axios";
import { toast } from "react-toastify";
import { ErrorDisplay } from "../ErrorDisplay/ErrorDisplay";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { GoogleLogin } from "@react-oauth/google";
import { metaTags } from "../../context/actions/metaTags";
import i18n from "../../i18n/i18n";

function Register() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [myJwtCookie, setMyJwtCookie] = useCookies(["jwt"]);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const sendDataToServer = async (token, setIsOpen) => {
    axios
      .post( "login/google", { id_token: token })
      .then((res) => {
        const jwttoken = res.data.jwt_token;
        setMyJwtCookie("jwt", jwttoken);
        setIsOpen(false);
        navigate("/");
      })
      .catch((error) => {
        const message = error.response.data.message;
        console.log(error);
        toast.success(message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        setIsOpen(false);
        setShowSpinner(false);
      });
  };

  useEffect(() => {
    if (myJwtCookie.jwt) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    // scroll to the top of the page on mount
    window.scrollTo(0, 0);

    // Call the updateMetaTags function with the dynamic values
    const meta_tags = metaTags(1, 12);
    meta_tags.then((res) => {
      if (window.updateMetaTags) {
        window.updateMetaTags(res.tag, res.description);
      }
    });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    phone: "",
    industry_type: "",
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.name == "" ||
      formData.email == "" ||
      formData.password == "" ||
      formData.confirm == "" ||
      formData.phone == "" ||
      formData.industry_type == ""

    ) {
      setLoading(true);
      setMessage("Please enter all details.");
      document.getElementsByClassName("title")[1].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

      setTimeout(() => {
        setLoading(false);
        setMessage("");
      }, 5000);
      return;
    } else if (!validateEmail(formData.email)) {
      setLoading(true);
      setMessage("Email is not valid.");
      document.getElementsByClassName("title")[1].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

      setTimeout(() => {
        setLoading(false);
        setMessage("");
      }, 5000);
      return;
    } else if (formData.phone.length < 8) {
      setLoading(true);
      setMessage("Please enter valid phone number.");
      document.getElementsByClassName("title")[1].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

      setTimeout(() => {
        setLoading(false);
        setMessage("");
      }, 5000);
      return;
    } else if (formData.password.length < 8) {
      setLoading(true);
      setMessage("Password length must be greater than 7.");
      document.getElementsByClassName("title")[1].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

      setTimeout(() => {
        setLoading(false);
        setMessage("");
      }, 5000);
      return;
    } else if (formData.password !== formData.confirm) {
      setLoading(true);
      setMessage("Passwords do not match.");
      document.getElementsByClassName("title")[1].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
      setTimeout(() => {
        setLoading(false);
        setMessage("");
      }, 5000);
      return;
    } else {
      try {
        setShowSpinner(true);

        const response = await axios.post(
           "signup/user",
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            industry_type: formData.industry_type
          }
        );

        if (response.data.status === "user exists") {
          setShowSpinner(false);
          // setFormData({ name: "", email: "", password: "", confirm: "" });
          toast.error("User exists already !", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
          return;
        }
        if (response.data.status === "success") {
          setFormData({
            name: "",
            email: "",
            password: "",
            confirm: "",
            phone: "",
          });
          setShowSpinner(false);
          toast.success("Please check your email to verify", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
          navigate("/login");
          return;
        }
      } catch (error) {
        console.log(error);
      }
      //  console.log(formData)
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {showSpinner && <LoadingSpinner />}
      <div className="section page-banner">
        <img
          className="shape-1 animation-round"
          src={process.env.PUBLIC_URL + "/images/shape/shape-8.png"}
        />
        <img
          className="shape-2"
          src={process.env.PUBLIC_URL + "/images/shape/shape-23.png"}
        />
        <div className="container">
          {/* Page Banner Start */}
          <div className="page-banner-content">
            <ul className="breadcrumb">
              <li>
                <Link to="#">Home</Link>
              </li>
              <li className="active">Register</li>
            </ul>
            <h2 className="title">
              {i18n.t('RegisterPageRegistration')} <span>{i18n.t('RegisterPageRegisterForm')}</span>
            </h2>
          </div>
          {/* Page Banner End */}
        </div>
        {/* Shape Icon Box Start */}
        <div className="shape-icon-box">
          <img
            className="icon-shape-1 animation-left"
            src={process.env.PUBLIC_URL + "/images/shape/shape-5.png"}
          />
          <div className="box-content">
            <div className="box-wrapper">
              <i className="flaticon-badge" />
            </div>
          </div>
          <img
            className="icon-shape-2"
            src={process.env.PUBLIC_URL + "/images/shape/shape-6.png"}
          />
        </div>
        {/* Shape Icon Box End */}
        <img
          className="shape-3"
          src={process.env.PUBLIC_URL + "/images/shape/shape-24.png"}
        />
        <img
          className="shape-author"
          src={process.env.PUBLIC_URL + "/images/author/author-11.jpg"}
        />
      </div>

      <div className="section section-padding" style={{ marginTop: "-12px" }}>
        <div className="container">
          {/* Register & Login Wrapper Start */}
          <div className="register-login-wrapper">
            <div className="row align-items-center">
              <div className="col-lg-6">
                {/* Register & Login Images Start */}
                <div className="register-login-images">
                  <div className="shape-1">
                    <img
                      src={
                        process.env.PUBLIC_URL + "/images/shape/shape-26.png"
                      }
                    />
                  </div>
                  <div className="images">
                    <img
                      src={
                        process.env.PUBLIC_URL + "/images/register-login.png"
                      }
                    />
                  </div>
                </div>
                {/* Register & Login Images End */}
              </div>
              <div className="col-lg-6">
                {/* Register & Login Form Start */}
                <div className="register-login-form">
                  <h3 className="title">
                    {i18n.t('RegisterPageRegister')} <span>{i18n.t('RegisterPageNow')}</span>
                  </h3>
                  <div class="Google-login-div mt-3" style={{display:'block'}}>
                      <GoogleLogin
                        className="google-button"
                        onSuccess={(credentialResponse) => {
                          sendDataToServer(
                            credentialResponse.credential,
                            setIsOpen
                          );
                          setIsOpen(false);
                        }}
                        onError={() => {
                          console.log("Login Failed");
                          setIsOpen(false);
                        }}
                      />
                    </div>
                    <p className="text-center">
                      <span className="forgot-password">{i18n.t('RegisterPageOr')}</span>
                    </p>
                  <div className="form-wrapper" style={{textAlign:"left"}}>
                  
                   
                    {loading && <ErrorDisplay message={message} id="error-message"/>}

                    <form onSubmit={handleSubmit}>
                      {/* Single Form Start */}
                      <div className="single-form col-xs-12 col-sm-12 col-md-12 mt-1">
                      <label className="mb-0 ml-1">{i18n.t('RegisterPageName')}</label>
                        <input
                          type="text"
                          placeholder={i18n.t('RegisterPageName')}
                          name="name"
                          value={formData.name}
                          pattern="[A-Za-z ]+"
                          onChange={handleChange}
                        />
                      </div>
                      {/* Single Form End */}
                      {/* Single Form Start */}
                      <div className="single-form col-xs-12 col-sm-12 col-md-12 mt-2">
                      <label className="mb-0 ml-1">{i18n.t('RegisterPageEmail')}</label>
                        <input
                          type="email"
                          placeholder={i18n.t('RegisterPageEmail')}
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="single-form col-xs-12 col-sm-12 col-md-12 mt-2">
                      <label className="mb-0 ml-1">{i18n.t('RegisterPagePhone')}</label>
                        <input
                          type="text"
                          placeholder={i18n.t('RegisterPagePhone')}
                          name="phone"
                          value={formData.phone}
                          pattern="[0-9]+"
                          onChange={handleChange}
                        />
                      </div>
                      {/* Single Form End */}
                      {/* Single Form Start */}
                      <div className="single-form col-xs-12 col-sm-12 col-md-12 mt-2">
                      <label className="mb-0 ml-1">{i18n.t('RegisterPagePassword')}</label>
                        <input
                          type="password"
                          placeholder={i18n.t('RegisterPagePassword')}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </div>
                      {/* Single Form End */}
                      {/* Single Form Start */}
                      <div className="single-form col-xs-12 col-sm-12 col-md-12 mt-2">
                      <label className="mb-0 ml-1">{i18n.t('RegisterPageConfirmPassword')}</label>
                        <input
                          type="password"
                          placeholder={i18n.t('RegisterPageConfirmPassword')}
                          name="confirm"
                          value={formData.confirm}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="single-form col-xs-12 col-sm-12 col-md-12 mt-2">
                        <label className="mb-0 ml-1">{i18n.t('RegisterPageIndustryType')}</label>
                        <input
                            type="text"
                            placeholder={i18n.t('RegisterPageBusiness')}
                            name="industry_type"
                            value={formData.industry_type}
                            onChange={handleChange}
                          />
                        </div>
                      <div
                        style={{
                         marginBottom:'10px'
                        }}
                        className="register-policy"
                      >
                        <label style={{ lineHeight: "normal", marginTop: "10px", fontSize:'small', display:'flex',alignItems:'end' }}>
                        <input type="checkbox" style={{ width: "1.2rem", marginRight:'10px' }}  />
                         {i18n.t('RegisterPageSendOffers')}
                        </label>
                      </div>

                      <div
                        className="single-form"
                        style={{ marginTop: "-8px" }}
                      >
                        <button className="btn btn-primary btn-hover-dark w-100">
                          {i18n.t('RegisterPageCreateAccount')}
                        </button>
                      </div>

                      <div
                        style={{
                          bordertop: "1px solid #00000",
                          margin: "1.6rem 0",
                        }}
                      />
                    </form>
                    
                    
                      <p
                        style={{
                          textAlign: "center",
                          marginTop: "15px",
                          fontSize: "0.9rem",
                        }}
                      >
                        {i18n.t('RegisterPageTandCOur')}{" "}
                        <span style={{ fontWeight: "bold" }}>
                        <Link to="/terms-and-conditions">{i18n.t('RegisterPageTandCAccept')}</Link><Link to="/privacy-policy">{i18n.t('RegisterPageTandCAcceptPolicy')}</Link>.
                        </span>
                      </p>
                    
                  </div>
                </div>
                {/* Register & Login Form End */}
              </div>
            </div>
          </div>
          {/* Register & Login Wrapper End */}
        </div>
      </div>
    </div>
  );
}

export default Register;
