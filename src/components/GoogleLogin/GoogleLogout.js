import {GoogleLogout} from 'react-google-login'

const clientId = '38786836620-9mamu7ce3n5olnj0c8askapg1eg7vfdu.apps.googleusercontent.com'
//const clientId = '315614196949-86d248sql88ne04e0oe0dulfcbkj6ffj.apps.googleusercontent.com'

import React from 'react'

import React from 'react'

export function GoogleLogout() {


    const onSuccess =(res) => {
        console.log('Login Success ! Current user ', res.profileObj)
    }

    const onFailure = (res) => {
        console.log('Login Failed ! res: ', res)
    }

  return (
    <div>
        <GoogleLogout
            clientId={clientId}
            buttonText='Logout'    
            onLogoutSuccess={onSuccess}
            
        />

    </div>
  )
}



