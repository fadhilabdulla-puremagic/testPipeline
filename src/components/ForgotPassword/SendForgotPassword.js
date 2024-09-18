import {React,useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import './app.css'
import { ErrorDisplay } from '../ErrorDisplay/ErrorDisplay';
import {resetEmail} from '../../context/actions/resetEmail';
import { Helmet } from 'react-helmet';
 
export function SendForgotPassword() {

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)

            
        useEffect(() => {
            // scroll to the top of the page on mount
            window.scrollTo(0, 0);
        }, []);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
      }
    
    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(email == ''){
            setLoading(true)
            setMessage("Please Enter email")
        }else if (!validateEmail(email)){   
            setLoading(true)
            setMessage("Invalid Email")
        }else{
            const response = resetEmail(email)
            setEmailSent(true)
            response.then(res => {
                console.log(res)
                
            })
        }   

        setTimeout(() => {
            setLoading(false)
        },2000)

    }

  return (
    <div className='main-container'>
        <Helmet>
            <title>Forgot Password</title>
        </Helmet>
  <div className='forget-section'>
   {!emailSent ? <form className='form' onSubmit={handleSubmit}>
    <div className="single-form col-xs-12 col-sm-12 col-md-12">
        {loading && <ErrorDisplay message={message}/>}
    </div>
        <h2>Enter Email</h2>
            <div className="single-form col-xs-12 col-sm-12 col-md-12">
                <input type="text" name="email"  placeholder="Email" onChange={onEmailChange}/>
            </div>
                
            <div className="single-form col-xs-12 col-sm-12 col-md-12">
                <button className="btn btn-primary btn-hover-dark ">Reset Password <i className="flaticon-right"/></button>
            </div>

            
            <div className="single-form col-xs-12 col-sm-12 col-md-12 " id='login-link'>
                or <Link to="/login"><span>Login</span></Link>
            </div>

    </form> : 
        <>
        <div className='email-sent'>
            <i className="fa fa-check fa-icon-check" aria-hidden="true"></i>
            <p>
                An email has been dispatched to initiate the password reset process. Please ensure to monitor your spam and trash folders in case the email doesn't appear in your inbox.
            </p>
        </div>
        
        <div className="single-form col-xs-12 col-sm-12 col-md-12" style={{textAlign:'center'}}>
                <Link to={'/'}>
                <button className="btn btn-primary btn-hover-dark ">Back to Home<i className="flaticon-right"/></button>
                </Link>
        </div>
        </>
        
    
    }
        </div>
    </div>
  )
}


