import React from 'react'

export function SuccessLogin(props) {

    const verificationToken = props.match.params.verificationToken;
  return (    
    <div>
      <h1>{verificationToken}</h1>
    </div>
  )
}


