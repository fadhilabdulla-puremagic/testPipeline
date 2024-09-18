import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./app.css";
import { ErrorDisplay } from "../ErrorDisplay/ErrorDisplay";
import { useParams } from "react-router-dom";
import { checkPasswordEmail } from "../../context/actions/checkPasswordEmail";
import { useNavigate } from "react-router-dom";
import { setPassword } from "../../context/actions/setPassword";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { Helmet } from "react-helmet";

export function ForgotPassword() {
  const navigate = useNavigate();
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { value } = useParams();
  const parts = value.split("=");
  const encodedToken = parts[1];
  const [id, setID] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    if (value) {
      const response = checkPasswordEmail(encodedToken);
      response.then((res) => {
        console.log(res);
        if (
          res.response &&
          res.response.status === 500 &&
          res.code === "ERR_BAD_RESPONSE"
        ) {
          navigate("/");
          console.log(res);
        } else if (res.data && res.data.id) {
          setID(res.data.id);
          console.log(res.data.id);
        }
      });
    }
  }, [value]);

  const onPwdChange = (e) => {
    setNewPwd(e.target.value);
  };

  const onConifrmChange = (e) => {
    setConfirmPwd(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPwd == "" || confirmPwd == "") {
      setLoading(true);
      setMessage("Please fill details");
    } else if (newPwd !== confirmPwd) {
      setLoading(true);
      setMessage("Password Do not Match");
    } else {
      setShowSpinner(true);
      const response = setPassword(id, newPwd);
      response.then((res) => {
        setShowSpinner(false);
        toast.success("Password Updated Successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        navigate("/");
      });
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="main-container">
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      {showSpinner && <LoadingSpinner />}
      <div className="forget-section">
        <form className="form" onSubmit={handleSubmit}>
          <div className="single-form col-xs-12 col-sm-12 col-md-12">
            {loading && <ErrorDisplay message={message} />}
          </div>

          <h2>Enter Password</h2>
          <div className="single-form col-xs-12 col-sm-12 col-md-12">
            <input
              type="password"
              name="password"
              placeholder="New password"
              onChange={onPwdChange}
            />
          </div>

          <div className="single-form col-xs-12 col-sm-12 col-md-12">
            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm password"
              onChange={onConifrmChange}
            />
          </div>

          <div className="single-form col-xs-12 col-sm-12 col-md-12">
            <button className="btn btn-primary btn-hover-dark ">
              Confirm <i className="flaticon-right" onChange={setConfirmPwd} />
            </button>
          </div>

          <div
            className="single-form col-xs-12 col-sm-12 col-md-12 "
            id="login-link">
            or{" "}
            <Link to="/login">
              <span>Login</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
