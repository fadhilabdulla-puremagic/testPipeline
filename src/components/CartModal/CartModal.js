import "./modal.css";
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import FacebookLogin from 'react-facebook-login';
import {toast } from 'react-toastify';
import { Link } from 'react-router-dom'


export const Modal = ({handleButtonClick, setMyJwtCookie, setSpinner, handleCloseModal, handleFormSubmit, isOpen, email, setEmail, handleChange, setIsOpen}) => {

  const [cookies, setCookie, removeCookie] = useCookies(['user']);   
 

const responseFacebook = (response) => {
  console.log(response);
}


const sendDataToServer = async (token,setIsOpen) => {
  axios.post("login/google", { 'id_token' : token })
  .then(res => {
    const jwttoken = res.data.jwt_token
    setMyJwtCookie('jwt',jwttoken)
    setIsOpen(false)
    
  }).catch(error => {
    const message = error.response.data.message 
    console.log(error)
    toast.success(message, {position: toast.POSITION.TOP_CENTER,autoClose: 3000,})    
    setIsOpen(false)
    setSpinner(false)
    
  })
}

const BackDrop = () => {
    return <div className="backdrop">

    </div>
}


  return (
    <div>
    
      {isOpen && <BackDrop/>}
      {isOpen && (
        <div className="modal bd-example-modal-sm">
          <div class="modal-dialog modal-sm" role="document">
          <div className="modal-content">
          <button className="close-modal" onClick={handleCloseModal}>
              X
            </button>

                <p>Please register or login </p>
                

                {/*<form onSubmit={handleFormSubmit}>
                  <input type="email" name="email"  value={email} placeholder="Email" required onChange={handleChange}/>
                  <button className="submit_btn"  id="email" >
                    Submit
                  </button>
                </form>
      <hr/>*/}
              <div class="d-flex flex-column text-center">
                <Link className="btn btn-info btn-block btn-round login-btn" to="/login">Sign In</Link>
              </div>
              <br/>
              <div class="text-center text-muted delimiter">or use a social network</div>
              <br/>
              <GoogleLogin
                className="google-button"
                onSuccess={credentialResponse => {
                 sendDataToServer(credentialResponse.credential, setIsOpen)
                 setIsOpen(false)                  
                }}
                onError={() => {
                  console.log('Login Failed');
                  setIsOpen(false)
                }}
              />
              <hr/>


{/*<div class="d-flex flex-column text-center">
                <form>
                <div class="form-group">
                  <input type="email" id="email1"placeholder="Your email address..."/>
                </div>
                <div class="form-group">
                  <input type="password" id="password1" placeholder="Your password..."/>
                </div>
                <button type="button" class="btn btn-info btn-block btn-round login-btn">Login</button>
              </form>
              </div>*/}

              {/*<FacebookLogin
                      appId="118417044358430"
                      autoLoad={false}
                      fields="name,email,picture"
                      callback={responseFacebook} 
              />*/}

            
            <div className="account_create">
            Not a member yet? 
              <Link to={'/'}> Sign Up</Link>
            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};


