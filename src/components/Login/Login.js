import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DownloadApp from "../SubComponents/DownloadApp";
import "./login.css";
import { ErrorDisplay } from "../ErrorDisplay/ErrorDisplay";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { GoogleLogin } from "@react-oauth/google";
import { metaTags } from "../../context/actions/metaTags";
import i18n from "../../i18n/i18n";

function Login() {
  const navigate = useNavigate();
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [myJwtCookie, setMyJwtCookie] = useCookies(["jwt"]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
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
      console.log(myJwtCookie.jwt);
      navigate("/");
    }
  }, []);

  useEffect(() => {
    // scroll to the top of the page on mount
    window.scrollTo(0, 0);

    // Call the updateMetaTags function with the dynamic values
    const meta_tags = metaTags(1, 11);
    meta_tags.then((res) => {
      if (window.updateMetaTags) {
        window.updateMetaTags(res.tag, res.description);
      }
    });
  }, []);

  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email == "" || formData.password == "") {
      setLoading(true);
      setMessage("Please enter all details");
      setTimeout(() => {
        setLoading(false);
        setMessage("");
      }, 2000);
      return;
    } else if (!validateEmail(formData.email)) {
      setLoading(true);
      setMessage("Please enter a valid email");
      setTimeout(() => {
        setLoading(false);
        setMessage("");
      }, 2000);
      return;
    } else {
      try {
        setShowSpinner(true);
        const response = await axios.post(
           "login/user",
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }
        );
        // console.log(response.data)
        if (response.data.status) {
          setShowSpinner(false);
          setFormData({ name: "", email: "", password: "" });
          toast.error(response.data.status, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
          return;
        } else if (response.data.jwt_token) {
          setFormData({ name: "", email: "", password: "" });
          setMyJwtCookie("jwt", response.data.jwt_token, { expires });
          setShowSpinner(false);
          toast.success("Logged In Successfully.", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
          navigate("/");
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }
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
              <li className="active">Login</li>
            </ul>
            <h2 className="title">
              {i18n.t('LoginPageLogin')} <span>{i18n.t('LoginPageForm')}</span>
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
                    {i18n.t('LoginPageLogin')} <span>{i18n.t('LoginPageNow')}</span>
                  </h3>
                  <div className="form-wrapper">
                    {loading && <ErrorDisplay message={message} />}

                    <form onSubmit={handleSubmit} class="login-form">
                      {/* Single Form Start */}
                      <div className="single-form col-xs-12 col-sm-12 col-md-12">
                        <input
                          type="email"
                          name="email"
                          placeholder={i18n.t('LoginPageUsername')}
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      {/* Single Form End */}
                      {/* Single Form Start */}
                      <div className="single-form col-xs-12 col-sm-12 col-md-12">
                        <input
                          type="password"
                          name="password"
                          placeholder={i18n.t('LoginPagePassword')}
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </div>
                      {/* Single Form End */}
                      {/* Single Form Start */}
                      <div
                        className="single-form"
                        style={{
                          width: "100%",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <button className="btn btn-primary btn-hover-dark w-100">
                          {i18n.t('LoginPageLogin')}
                        </button>
                      </div>

                      {/* Single Form End */}
                    </form>
                    <p>
                      <span
                        className="forgot-password"
                        style={{ cursor: "default" }}
                      >
                        {i18n.t('LoginPageOr')}
                      </span>
                    </p>
                    <div class="Google-login-div">
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

                    <p>
                      <Link to={"/forgot-password"}>
                        <span className="forgot-password">
                          {i18n.t('LoginPageForgotPass')}?{" "}
                        </span>
                      </Link>
                    </p>
                    <p className="register-with-us">
                      {i18n.t('LoginPageDontHaveAcc')}?{" "}
                      <Link to="/register">
                        <span>{i18n.t('LoginPageSignup')} </span>
                      </Link>
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

export default Login;
