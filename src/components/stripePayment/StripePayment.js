import React from "react";
import { Link } from "react-router-dom";
import DownloadApp from "../SubComponents/DownloadApp";
import { PaymentForm } from "./PaymentForm";
import { Elements, LoadingIndicator } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Spinner from "react-bootstrap/Spinner";
import { ErrorDisplay } from "../ErrorDisplay/ErrorDisplay";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

export function StripePayment() {
  // useEffect(() => {
  //   // scroll to the top of the page on mount
  //   window.scrollTo(0, 0);
  // }, []);

  const navigate = useNavigate();

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [myJwtCookie, setMyJwtCookie] = useCookies(["jwt"]);
  const [myCourses, setMyCourses] = useState([]);
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showDivision, setShowDivision] = useState(false);
  const [showUserFormDivision, setShowUserFormDivision] = useState(true);

  const [checkoutFormData, setFormData] = useState({
    name: "",
    phone: "",
  });

  /*useEffect(() => {
    // scroll to the top of the page on mount
    window.scrollTo(0, 0);
  }, []);*/

  useEffect(() => {
    if (!myJwtCookie.jwt) {
      // Redirect the user to the login page
      navigate("/");
    }
  }, [myJwtCookie.jwt, navigate]);

  const handleChange = (e) => {
    setFormData({ ...checkoutFormData, [e.target.name]: e.target.value });
    //console.log(checkoutFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (checkoutFormData.name == "" || checkoutFormData.phone == "") {
      setLoading(true);
      setMessage("Please enter all details");
      setTimeout(() => {
        setLoading(false);
        setMessage("");
      }, 2000);
      return;
    } else {
      setShowSpinner(true);

      const response = await axios.post(
         "customer/update-details",
        {
          name: checkoutFormData.name,
          phone: checkoutFormData.phone,
          customer_id: myJwtCookie.user.id,
        }
      );

      if (response.data.status === "success") {
        //setMyJwtCookie({firstname:'AJMAL KHAN PK'});
        //console.log(myJwtCookie.user);
        //payment-form
        setShowDivision(true);
        setShowUserFormDivision(false);
        setShowSpinner(false);
      }
    }
  };

  useEffect(() => {
    let firstname = myJwtCookie.user.firstname
      ? myJwtCookie.user.firstname
      : "";
    let lastname = myJwtCookie.user.lastname ? myJwtCookie.user.lastname : "";
    setFormData({
      name: firstname + " " + lastname,
      phone: myJwtCookie.user.phone ? myJwtCookie.user.phone : "",
    });
  }, []);

  useEffect(() => {
    const courses = JSON.parse(localStorage.getItem("cart"));
    setMyCourses(courses);

    let sum = 0;
    courses.forEach((course) => {
      sum += course.price;
    });
    // console.log(sum + (sum * 0.05))
    setAmount(sum + sum * 0.05);
  }, []);

  const appearance = {
    theme: "flat",
  };

  async function getClientSecret() {
    const promocode = localStorage.getItem("promoCode") ?? null;
    if (amount) {
      // console.log(amount)
      const postData ={
        amount: amount.toString(),
        courses: myCourses,
        customer_id: myJwtCookie.user.id,
        code: promocode,
      };
      //check for required fields
      let requiredFields = null;
      try{
        requiredFields = JSON.parse(localStorage.getItem('requiredFields'));
      }catch{
        console.log('error while parsing requiredFields from localstorage.');
      }

      if(requiredFields){
        postData.requiredFields = requiredFields;
      }
      try {
        const response = await axios.post(
           "checkout",
          postData
        );
        //console.log(response.data)
        if (response.data.client_secret) {
          setTotalPrice(response.data.total_price);
          setClientSecret(response.data.client_secret.clientSecret);
          axios
            .get( "config")
            .then((response) => {
              //console.log(response.data.publishableKey);
              setStripePromise(loadStripe(response.data.publishableKey));
              setIsLoading(false);
            });
        }
      } catch (error) {
        // console.log(error);
        setIsLoading(false);
      }
    }
  }

  //console.log(clientSecret.clientSecret);

  // useEffect(() => {
  //   axios.get("/images/config")
  //       .then(response => {
  //         setStripePromise(loadStripe(response.data.publishableKey));
  //       });
  // }, []);

  useEffect(() => {
    getClientSecret();
  }, [amount]);

  return (
    <div>
      {/*} <div className="section page-banner">
        <img className="shape-1 animation-round" src={process.env.PUBLIC_URL+"/images/shape/shape-8.png" }/>
        <img className="shape-2" src={process.env.PUBLIC_URL+"/images/shape/shape-23.png" }/>
        <div className="container">
          
          <div className="page-banner-content">
            <ul className="breadcrumb">
              <li><Link to="#">Home</Link></li>
              <li className="active">Payment </li>
            </ul>
            <h2 className="title">Checkout <span>Page</span></h2>
          </div>
          
        </div>
        
        <div className="shape-icon-box">
          <img className="icon-shape-1 animation-left" src={process.env.PUBLIC_URL+"/images/shape/shape-5.png" }/>
          <div className="box-content">
            <div className="box-wrapper">
              <i className="flaticon-badge" />
            </div>
          </div>
          <img className="icon-shape-2" src={process.env.PUBLIC_URL+"/images/shape/shape-6.png" }/>
        </div>
        
        <img className="shape-3" src={process.env.PUBLIC_URL+"/images/shape/shape-24.png" }/>
        <img className="shape-author" src={process.env.PUBLIC_URL+"/images/author/author-11.jpg" }/>
         </div>*/}

      <div className="section section-padding">
        <div className="container">
          <div className="register-login-wrapper">
            <div className="row align-items-center">
              <div className="col-lg-6">
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
                    Checkout <span>Page</span>
                  </h3>
                  <br />

                  <div class="container">
                    <div class="stepwizard">
                      <div class="stepwizard-row setup-panel">
                        <div class="stepwizard-step">
                          <a
                            href="#step-1"
                            type="button"
                            className={
                              showUserFormDivision
                                ? `btn btn-primary btn-circle`
                                : `btn btn-default btn-circle`
                            }
                          >
                            1
                          </a>
                          <p>Basic Information</p>
                        </div>
                        <div class="stepwizard-step">
                          <a
                            href="#payment-form"
                            type="button"
                            className={
                              showDivision
                                ? `btn btn-primary btn-circle`
                                : `btn btn-default btn-circle`
                            }
                          >
                            2
                          </a>
                          <p>Card Details</p>
                        </div>
                      </div>
                    </div>
                    <div role="form">
                      <div class="row setup-content" id="step-1">
                        {showSpinner && <LoadingSpinner />}
                        {showUserFormDivision && (
                          <div class="col-xs-12">
                            <div class="col-md-12">
                              <br />

                              <form
                                id="user_update_form"
                                onSubmit={handleSubmit}
                              >
                                <div className="single-form col-xs-12 col-sm-12 col-md-6">
                                  <label>Name</label>
                                  <input
                                    type="text"
                                    value={checkoutFormData.name}
                                    onChange={handleChange}
                                    name="name"
                                    placeholder="Enter Your Name"
                                    required
                                  />
                                </div>
                                <div className="single-form col-xs-12 col-sm-12 col-md-12">
                                  <label>Phone Number</label>
                                  <input
                                    type="text"
                                    value={checkoutFormData.phone}
                                    onChange={handleChange}
                                    name="phone"
                                    placeholder="Enter your contact number"
                                    required
                                  />
                                </div>
                                <br />
                                <button
                                  class="btn btn-primary nextBtn btn-lg pull-right"
                                  type="submit"
                                >
                                  Continue
                                </button>
                              </form>
                            </div>
                          </div>
                        )}
                      </div>
                      {showDivision && (
                        <div class="row setup-content" id="payment-form">
                          <div class="col-xs-12">
                            <div class="col-md-12">
                              <br />
                              <h4>Total Amount : {totalPrice} AED</h4>
                              <div>
                                {isLoading ? (
                                  <Spinner
                                    animation="border"
                                    variant="primary"
                                  />
                                ) : (
                                  <Elements
                                    stripe={stripePromise}
                                    options={{ clientSecret, appearance }}
                                  >
                                    <PaymentForm />
                                  </Elements>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Register & Login Form End */}
              </div>
            </div>
          </div>
          {/* Register & Login Wrapper End */}
        </div>
      </div>

      {/* <DownloadApp /> */}
    </div>
  );
}
