import React, { useEffect , useContext} from 'react'
import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useCookies } from 'react-cookie';
import { useStripe, useElements } from "@stripe/react-stripe-js";
import './payment.css'
import { paymentDetailAction,addToCartItem } from '../../context/actions/userActions/userActions';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import 'react-toastify/dist/ReactToastify.css';
import { sendPaymentSuccess } from '../../context/actions/sendPaymentSuccess';
import { GlobalContext } from '../../context/GlobalState';
import Skeleton from 'react-loading-skeleton';


export function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [course_ids , setCourse_ids] = useState([]);
  const [message, setMessage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [user, setUser] = useState(null)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const {singleCartState, singlecartDispatch} = useContext(GlobalContext);

  
  useEffect(() => {
    // scroll to the top of the page on mount
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const courses = JSON.parse(localStorage.getItem("cart"))
    setCourses(courses)
  },[0])

  useEffect(() => {
    console.log(user)
    setUser(cookies.user)
  },[user])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true)

    setIsProcessing(true);

    // const { error, paymentIntent } = await stripe.confirmPayment({ PaymentElement, confirmParams: { return_url: process.env.REACT_APP_API_URL, user_email: '123@gmail.com', amount:900 }, redirect: 'if_required'});

    const { error, paymentIntent } = await stripe.confirmPayment({ 
      payment_method: {
        card: elements.getElement(PaymentElement),
      },
      elements,
      confirmParams: {
      //payment_method_types: ['card'],   
      return_url: 'https://admin.upgrade-skills.com/api/stripe/responds/', 
      //user_email: 'pm2140047@gmail.com', 
       //amount:760.2 
      }, 
      //redirect: 'if_required'
    }).then(function(result) {
      // Handle result.error or result.paymentIntent
      console.log(result.error);
      navigate('/payment-failed/'+result.error.message);

    });

    //console.log('hi');
    //console.log(paymentIntent);
    
    localStorage.setItem("PaymentIntent", JSON.stringify(paymentIntent));
    // const promises = courses.map(course =>  paymentDetailAction(course, user, paymentIntent));
    // // const updatepromises = courses.map(course =>  updateCartItem(course, user, paymentIntent));
    // const coursePromise = courses.map(course => addToCartItem(course, user, paymentIntent));

    // Promise.all([...promises, ...coursePromise])
    // .then(responses => {
        
    //   if(responses){
    //     setTimeout(() => {
    //       setLoading(false)
    //       sendPaymentSuccess(paymentIntent.amount, courses, paymentIntent.id, "success", user)
    //       singlecartDispatch({type:'CLEAR_CART'})
    //       navigate('/payment-successful')
    //     },1000)
    //   }
    
    // })
    // .catch(error => {
    //     console.error(error);
    // }); 


    // if (error.type === "card_error" || error.type === "validation_error") {
    //   setMessage(error.message);
    // } else {
    //   setMessage("An unexpected error occured.");
    // }

    setIsProcessing(false);
  };



  return (
    <>
    {loading && <LoadingSpinner/>}
     <form id="payment-form" onSubmit={handleSubmit}>
     <PaymentElement id="payment-element"  container={{className: "stripe-card-container"}}  placeholder={<Skeleton height={50} />}/>
       <button disabled={isProcessing || !stripe || !elements } id="submit" className="payment-button">
        <span id="button-text">
        {isProcessing ? "Processing ... " : "Pay now"}
      </span>
      </button> 
      {message && <div id="payment-message">{message}</div>}
    </form>
    </>
  )
}

