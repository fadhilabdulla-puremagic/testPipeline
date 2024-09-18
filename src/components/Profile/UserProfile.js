import React, { useState, useEffect } from "react";
import "./UserProfile.css"; // import your CSS file here
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
export const UserProfile = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [cookies, setCookie] = useCookies(["user"]);

  // console.log(props)

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (event.target.closest(".user-profile") === null) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      style={{ marginRight: "20px", cursor: "default", fontWeight: "bolder" }}
    >
      {props.user?.firstname?.substr(0, 20)}
    </div>
    // <div className="user-profile" onClick={toggleDropdown}>
    //   <div className="user-profile-name"> {props.user.firstname} </div>
    //   {showDropdown && (
    //     <div className="user-profile-dropdown">
    //       <div className="user-profile-image">
    //       <Link to="/profile">
    //       <img
    //           src={
    //             props.user.picture.includes('https://lh3.googleusercontent.com')
    //             || props.user.picture.includes('https://cdn.pixabay.com')
    //             // || props.user.picture.includes('.png' || 'jpg' || 'jpeg')
    //             ? props.user.picture
    //             : 'uploads/user_profile/' + props.user.picture
    //           }
    //           onError={(e) => {
    //             e.target.onerror = null; // reset the error handler to prevent infinite loop
    //             e.target.src = 'images/empty-profile.png'; // set the default image
    //           }}
    //           alt="Profile"
    //         />
    //    </Link>
    //       </div>
    //       <div className="user-profile-options">
    //         <ul style={{display:'flex', flexDirection:'column', justifyContent:'flex-start', alignItems:'flex-start'}}>
    //           <Link to="/profile"><li>My Profile</li></Link>
    //           <li>Settings</li>
    //           <li>Logout</li>
    //         </ul>
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
};
