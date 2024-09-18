import { React, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./app.css";
import { ErrorDisplay } from "../ErrorDisplay/ErrorDisplay";
import { useParams } from "react-router-dom";
import { checkEmailPassword } from "../../context/actions/checkEmailPassword";
import { useNavigate } from "react-router-dom";
import { setPassword } from "../../context/actions/setPassword";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { useCookies } from "react-cookie";
import { GlobalContext } from "../../context/GlobalState";
import {
  addUserWithJwt,
  removeUserWithJwt,
} from "../../context/actions/userActions/userActions";

export function EmailUser() {
  const [myJwtCookie, setMyJwtCookie] = useCookies(["jwt"]);
  const { userState, userDispatch, singleCartState, singlecartDispatch } =
    useContext(GlobalContext);
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
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

  useEffect(() => {
    if (value) {
      setShowSpinner(true);
      localStorage.setItem("jwtemail", JSON.stringify(encodedToken));
      const response = checkEmailPassword(encodedToken);
      response.then((res) => {
        //   console.log(res);
        if (
          res.response &&
          res.response.status === 500 &&
          res.code === "ERR_BAD_RESPONSE"
        ) {
          localStorage.setItem("jwtemail", JSON.stringify([]));
          removeUserWithJwt(userDispatch);
          setTimeout(() => {
            setShowSpinner(false);
            navigate("/");
          }, 1000);
          console.log(res);
        } else if (res.data && res.data.id) {
          setShowSpinner(false);
          setID(res.data.id);
          // console.log(res.data.id);
        }
      });
    }
  }, [value]);

  // useEffect(() => {
  //     if(value){
  //         localStorage.setItem('jwtemail', JSON.stringify(encodedToken));
  //     }
  // },[value])

  // useEffect(() => {
  //     const token = JSON.parse(localStorage.getItem('jwtemail'))
  //     if(token){
  //         const res = checkEmailPassword(token)
  //         res.then(res =>{
  //             setID(res.data.id)
  //         })
  //     }
  // },[localStorage.getItem('jwtemail')])

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
      setMessage("please fill details");
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
            id="login-link"
          >
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
