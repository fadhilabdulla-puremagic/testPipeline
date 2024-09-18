import React, { useState } from 'react'
import { useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useNavigate } from "react-router-dom";
import { type } from '@testing-library/user-event/dist/type';


export function BillingDetails() {

  const navigate = useNavigate()
  const [courseType , setCourseType] = useState('')

  useEffect(() => {
    const type = JSON.parse(localStorage.getItem("paymentType"));
    setCourseType(type)
  },[])

  if(courseType === 'stripe'){
    navigate("/stripe-payment")
  }

  
  return (
    <div>
        <h1>billing details</h1>
    </div>
  )
}


