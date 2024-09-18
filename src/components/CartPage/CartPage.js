import React from "react";
import "./cart.css";
import { GlobalContext } from "../../context/GlobalState";
import { useContext, useEffect, useState } from "react";
import { Modal } from "../CartModal/CartModal";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { addUserWithJwt } from "../../context/actions/userActions/userActions";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { signupEmail } from "../../context/actions/signupEmail";
import { Spinner } from "react-bootstrap";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { applyPromoCode } from "../../context/actions/promoCodes";

import { apiCheckRequiredFields } from "../../context/actions/checkRequiredFields";
import { RequiredFieldsModal } from "../RequiredFieldsModal/RequiredFieldsModal";

import i18n from "../../i18n/i18n";
export const CartPage = () => {
  useEffect(() => {
    // scroll to the top of the page on mount
    window.scrollTo(0, 0);
  }, []);

  //navigating hook
  const navigate = useNavigate();

  //using cookie hooks
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [myJwtCookie, setMyJwtCookie] = useCookies(["jwt"]);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);

  const [promoNetAmount, setPromoNetAmount] = useState(null);

  //const [user, setUser] = useState(cookies.user);

  //getting from global state
  const { singleCartState, singlecartDispatch, userState, userDispatch } =
    useContext(GlobalContext);

  const user = userState.user;

  //getting courses from state
  const courses = singleCartState.cart;

  //use state fro total price
  const [totalprice, setTotalPrice] = useState(0);

    const [discountPercent, setDiscountPercent] = useState(0);
  //set state for email
  const [emailtxt, setEmail] = useState("");

  const [showSpinner, setSpinner] = useState(false);

  useEffect(() => {
    if (myJwtCookie.jwt) {
      addUserWithJwt(myJwtCookie.jwt, userDispatch);
    }
  }, [myJwtCookie]);

  useEffect(() => {
    setCookie("user", user);
    setSpinner(false);
    setPromoNetAmount(null);
    if (document.getElementById("input-promocode")) {
      document.getElementById("input-promocode").value = "";
    }
    localStorage.removeItem("promoCode");
    // console.log(cookies)
  }, [user, singleCartState.cart]);

  function handleChange(event) {
    setEmail(event.target.value);
  }

  const removeCourse = (id) => {
    singlecartDispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  useEffect(() => {
    // console.log(courses)
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [requiredFields, setRequiredFields] = useState([]);
  const [referralCodes, setReferralCodes] = useState([]);
  // [{ name: 'child_first_name', label: 'First Name', type: 'text' },{ name: 'child_last_name', label: 'Last Name', type: 'text' },{ name: 'child_age', label: 'Age', type: 'number' },{ name: 'address', label: 'Address', type: 'text' },]

  const handleButtonClick = async (number) => {
    setSpinner(true);
    try {
      user === null ? setIsOpen(true) : setIsOpen(false);
      if(user &&  courses.length && requiredFields!==null){
        console.log(courses);
        const courseIds = courses?.map(el=> { return{id:el.id, enrolments: el?.enrolment_quantity}});
        const res = await apiCheckRequiredFields({courses:courseIds});
        if(res?.status === 'success'){
          if(res?.data?.required_fields.length){
            setRequiredFields(res?.data?.required_fields)
            setReferralCodes(res?.data?.referral_codes)
            return;
          }else{
            localStorage.removeItem('requiredFields');
          }
        }else{
          toast.error("Error while checking out.", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
          return;
        }
      }
      user != undefined && courses.length !== 0 && navigate("/stripe-payment");
      courses.length === 0 &&
        toast.error("your cart is empty !", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      user != undefined &&
        localStorage.setItem("paymentType", JSON.stringify("stripe"));
      
    } catch (error) {
      
    }finally{
      setSpinner(false);
    }
   
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSpinner(false);
    //console.log(isOpen)
  };

  const _handleApplyPromocode = async () => {
    const promoCode =
      document.getElementById("input-promocode").value.trim() ?? "";

    if (promoCode.length === 0) {
      alert("Please add valid promocode.");
      return;
    }

    const arr_courses = [];

    for (let index = 0; index < courses.length; index++) {
      const element = courses[index];
      arr_courses.push(element.id);
    }

    setShowLoadingSpinner(true);
    const res = await applyPromoCode({
      code: promoCode,
      course_ids: arr_courses,
    });

    setShowLoadingSpinner(false);
    if (!res) {
      alert(
        "We were not able to validate the promo code. Please try again later."
      );
      return;
    }

    if (res?.success === true) {
      localStorage.setItem("promoCode", promoCode);
      setPromoNetAmount(res?.net_total);
    } else {
      alert(
        res?.message ??
          "We were not able to validate the promo code. Please try again later"
      );
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowLoadingSpinner(true);
    const response = signupEmail(emailtxt);
    response.then((res) => {
      if (res.status == "false") {
        setSpinner(false);
        setShowLoadingSpinner(false);
        toast.warning("user already exists !", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        return;
      }
      toast.success(
        "The link has been sent, please follow the link to proceed ",
        { position: toast.POSITION.TOP_CENTER, autoClose: 3000 }
      );
      setSpinner(false);
      setShowLoadingSpinner(false);
    });
    setIsOpen(false);
  };

  const handleGooglePay = () => {
    navigate("/google-pay");
  };

  const handleApplePay = () => {
    navigate("/apple-pay");
  };

  const handleShowRequiredFieldsModal = ()=>{
    setRequiredFields([]);
  }

  const handleSavedRequiredFieldsModal = ()=>{
    setRequiredFields(null);
  }

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cart");
    if (storedCartItems) {
      singlecartDispatch({
        type: "LOAD_CART_ITEMS",
        payload: JSON.parse(storedCartItems),
      });
    }
  }, [singlecartDispatch]);

  useEffect(() => {
    // console.log(singleCartState)
  }, [singleCartState]);

  useEffect(() => {
    setTotalPrice(0);
    var total = 0;
    var discountPercent = 0;

    for (var i = 0; i < courses.length; i++) {
      
      if(courses[i]?.enrolment_quantity > 1){
        total += courses[i].price * courses[i].enrolment_quantity;

        if(courses[i]?.discount_percentage){
          discountPercent = courses[i]?.discount_percentage;
        }
      }else{
        total += courses[i].price;
      }

     
    }
    
    setTotalPrice(total);
    setDiscountPercent(discountPercent);
  }, [courses]);

  const netPrice = totalprice - (totalprice * discountPercent/100);
  const hidePromoCode = courses.some(obj => [83].includes(obj.id)); //for courses [83] hide promo code add. Not a good approach but :/
  return (
    <>
      {showLoadingSpinner && <LoadingSpinner />}
      {
        <Modal
          setMyJwtCookie={setMyJwtCookie}
          isOpen={isOpen}
          setSpinner={setSpinner}
          setIsOpen={setIsOpen}
          setEmail={setEmail}
          handleButtonClick={handleButtonClick}
          handleCloseModal={handleCloseModal}
          handleFormSubmit={handleFormSubmit}
          handleChange={handleChange}
        />
      }
      {(requiredFields && requiredFields.length) ? <RequiredFieldsModal requiredFields={requiredFields}
        actionDone={handleSavedRequiredFieldsModal} 
        referralCodes = {referralCodes}
        handleShow={handleShowRequiredFieldsModal}/>:<></>} 
      <div className="cart-page">
        <div className="inner-container">
          {courses.length > 0 ? (
            <div className="left-section">
              {courses.map(({ id, course_image, course_name, price, enrolment_quantity }) => (
                <div key={id} className="course-item">
                  <img
                    className="course-image"
                    src={
                      process.env.REACT_APP_IMAGE_URL +
                      `/uploads/course_items/${course_image}`
                    }
                    alt={course_name}
                  />
                  <div className="course-name">
                    {course_name} - {price} AED
                    <div className={!enrolment_quantity ? 'd-none':'mt-2'}>{enrolment_quantity} Enrolments</div>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => removeCourse(id)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
                padding: "30px",
              }}
            >
              <h1>{i18n.t('CartPageCartEmpty')}</h1>
              <Link
                to="/"
                className="btn btn-primary btn-hover-dark p-0 p-md-2"
                style={{ marginTop: "10px" }}
              >
                {i18n.t('CartPageAddtoCart')}
              </Link>
            </div>
          )}

          {courses.length > 0 ? (
            <div className="right-section">
              <div className="summary">{i18n.t('CartPageCartSummary')}</div>
              <hr style={{ marginTop: "-5px" }} />
              <div className="mt-1 charges">
                <span>{i18n.t('CartPagePrice')} :</span> <span>AED {totalprice.toFixed(2)}</span>{" "}
              </div>
              <div className={`${discountPercent === 0 ? 'd-none':''} mt-1 charges`}>
                <span>{i18n.t('CartPageDiscount')} :</span>{" "}
                <span> - AED {(totalprice - netPrice).toFixed(2)}</span>{" "}
              </div>

              <div className={`mt-1 charges`}>
                <span>{i18n.t('CartPageTransactionCharge')} :</span>{" "}
                <span> AED {((5 / 100) * netPrice).toFixed(2)}</span>{" "}
              </div>
              <div className="mt-1 charges">
                <span>{i18n.t('CartPageTotalPrice')} :</span>{" "}
                <span>AED {(netPrice + netPrice * 0.05).toFixed(2)}</span>
              </div>
              <div className={`mt-4 ${hidePromoCode ? 'd-none':''}`}>
                <span className="ml-2">{i18n.t('CartPagePromoCode')}</span>
                <div className="d-flex justify-content-center">
                  <div className="w-100 ">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={i18n.t('CartPagePromoCode')}
                      aria-label="Promo code"
                      id="input-promocode"
                      aria-describedby="button-addon1"
                    />
                    <button
                      className="btn btn-primary"
                      type="button"
                      data-mdb-ripple-color="dark"
                      style={{ lineHeight: "2", float: "right" }}
                      onClick={_handleApplyPromocode}
                      disabled={showLoadingSpinner}
                    >
                      {i18n.t('CartPageApply')}
                    </button>
                  </div>
                </div>
              </div>

              {promoNetAmount ? (
                <>
                  <div className="mt-1 charges">
                    <span>Discount :</span>{" "}
                    <span>AED {(totalprice - promoNetAmount).toFixed(2)}</span>
                  </div>
                  <div className="mt-1 charges">
                    <span>Net Amount :</span>{" "}
                    <span>AED {promoNetAmount.toFixed(2)}</span>
                  </div>
                </>
              ) : (
                <></>
              )}
              <br />
              {/*courses.length > 0 ?  <ul className="course-details" style={{marginTop: '-3px'}}>
              {courses.map(({id, course_name, price}) => (
                <li key={id}>
                <div>{course_name}</div>
                <div>{price}</div>
              </li>
              ))}
              </ul> : 'Cart is empty'*/}
              {/*<p style={{fontWeight:'bold'}}>Give Code :</p>
            <input type="text"  id="usr" placeholder='Enter coupon code ....' style={{marginTop:'-8px'}}/>*/}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <button
                  id="CheckoutNow"
                  className="btn btn-primary btn-hover-dark p-0"
                  disabled={showSpinner}
                  style={{ width: "100%" }}
                  onClick={() => handleButtonClick()}
                >
                  {showSpinner ? <Spinner /> : "Checkout"}
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
