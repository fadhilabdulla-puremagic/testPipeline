import {React, useEffect, useState, useRef} from 'react'
import './payments.css'
import { Link, useParams } from 'react-router-dom';
import { error } from 'jquery';

export function PaymentFailed() {

    const homeLinkRef = useRef(null);
    const [payment, setPaymentId] = useState('')
    const { error } = useParams();
    useEffect(() => {
        //if (homeLinkRef.current) {
          //homeLinkRef.current.addEventListener('click', function() {
            //localStorage.clear();
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
                <h1><img class="payment-failed-img" src={process.env.PUBLIC_URL + "/images/payment_failed.png"} alt="Payment failed" /></h1>
                <p>Your payment is failed!!!</p>
                <p>{error && error}</p>
                <p>Please contact our customer support info@upgrade-skills.com</p>
                <p><span className='forgot-password'>OR</span></p>
                <Link className="btn btn-primary btn-hover-dark" to="/cart" ref={homeLinkRef}>Try Again</Link>
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


