import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Axios from './utils/axiosInterceptor';
import './i18n/i18n';


Axios.initialise();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <GoogleOAuthProvider clientId="38786836620-9mamu7ce3n5olnj0c8askapg1eg7vfdu.apps.googleusercontent.com">
                <App />
        </GoogleOAuthProvider>

);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

//local code
//<GoogleOAuthProvider clientId="352781236955-rggsorcpgfqfs09rae69m2drc1q441mj.apps.googleusercontent.com">
// <App />
//</GoogleOAuthProvider>  

//live code
//<GoogleOAuthProvider clientId="38786836620-9mamu7ce3n5olnj0c8askapg1eg7vfdu.apps.googleusercontent.com">
//        <App />
//</GoogleOAuthProvider> 
reportWebVitals();
