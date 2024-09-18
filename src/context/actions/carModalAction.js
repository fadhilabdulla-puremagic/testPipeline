import axios from 'axios';
import { GlobalContext } from '../../context/GlobalState';
import { useContext } from 'react';


export const sendDataToServer = async (token, userState,userDispatch,setIsOpen) => {
      axios.post( 'login/google', { 'id_token' : token })
      .then(res => {
        console.log(res);
        // console.log(res.data.user);
        const user = res.data.user
        setIsOpen(false)
        // userDispatch({type:'ADD_USER', payload:res.data.user})
    }).catch(error => console.log(error.response.data.message))
}

  
export const onSuccess =(res, setIsOpen) => {
    console.log('Login Success ! Current user ', res.profileObj) 
    setIsOpen(false)
}

export const onFailure = (res, setIsOpen) => {
    console.log('Login Failed ! res: ', res)
    setIsOpen(false)
}