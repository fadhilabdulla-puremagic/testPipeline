import {GoogleLogin} from 'react-google-login'

const clientId = '38786836620-9mamu7ce3n5olnj0c8askapg1eg7vfdu.apps.googleusercontent.com'
//const clientId = '315614196949-86d248sql88ne04e0oe0dulfcbkj6ffj.apps.googleusercontent.com'

import React from 'react'

export function GoogleLogin() {


    const onSuccess =(res) => {
        console.log('Login Success ! Current user ', res.profileObj)
    }

    const onFailure = (res) => {
        console.log('Login Failed ! res: ', res)
    }




  return (
    <div id="signInButton">
        <GoogleLogin
            clientId={clientId}
            buttonText='Login'    
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
    </div>
  )
}
