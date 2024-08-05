import React, { useState } from "react";
import axios from "axios";


function NetworkGateway() {

  const [data, setData] = useState({});
  const [showPage, setShowPage] = useState(false);
  const apiKey = 'NTUzODg5YzYtZWM5Yi00YmVjLThkMjAtZDg0ZWY1YTNkMTU0OjJlZDlmMjEwLWQwNDAtNDFlOS04ZWQ2LTI2OGE5OGNhZjYwYw==';
const headers = {
  "Content-Type": "application/vnd.ni-identity.v1+json",
  Authorization: `Basic ${btoa(apiKey)}`,
};
const url = 'https://api-gateway.sandbox.ngenius-payments.com/identity/auth/access-token';
  const FetchToken = () => {
    axios
      .post(url, {}, { headers: headers })
      .then((response) => {
        console.log("Success:", response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error:", error.response.status, error.response.data);
        } else {
          console.error("Error:", error.message);
        }
      });
    // setShowPage(true);
  };
  return (
    <div>
      <h1>Payment</h1>
      {!showPage && (
        <button onClick={FetchToken}>Pay using Network Payment</button>
      )}
      {showPage && (
        <iframe
          src={`https://paypage.sandbox.ngenius-payments.com/?code=${data}&slim=true`}
          height={500}
          width={500}
        />
      )}
    </div>
  );
}

export default NetworkGateway;
