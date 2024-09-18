import {React, useEffect, useState, useRef} from 'react'
import './payment.css'
import { Link } from 'react-router-dom';

export function PaymentSuccessfull() {

    const homeLinkRef = useRef(null);
    const [payment, setPaymentId] = useState('')

    useEffect(() => {
        //if (homeLinkRef.current) {
          //homeLinkRef.current.addEventListener('click', function() {
            localStorage.clear();
          //});
        //}
      }, [homeLinkRef]);

    useEffect(() => { 
        // scroll to the top of the page on mount
        window.scrollTo(0, 0);
      }, []);

      /*useEffect(() => {
        const paymentIntent = JSON.parse(localStorage.getItem('PaymentIntent'))
        setPaymentId(paymentIntent.id)
      },[])*/

      // useEffect(() => {
      //    console.log(payment)   
      // },[payment])
    

  return (
    <div style={{height:'900px', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <section className="login-main-wrapper">
        <div className="main-container">
          <div className="login-process">
            <div className="login-main-container">
              <div className="thankyou-wrapper">
                <h1><img class="payment-failed-img" src={process.env.PUBLIC_URL + "/images/payment_successful.png"} alt="thanks" /></h1>
                <p>Your payment is success , we will get in touch with you soon...</p>
                <p>please check your mail box for payment receipt </p>
                <Link className="btn btn-primary btn-hover-dark" to="/" ref={homeLinkRef}>Go to Home</Link>
                <div className="clr" />
              </div>
              <div className="clr" />
            </div>
          </div>
          <div className="clr" />
        </div>
      </section>
    </div>
  )
}


