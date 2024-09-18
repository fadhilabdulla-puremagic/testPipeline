import "./modal.css";
import { Link } from "react-router-dom";
import { React, useState,useEffect } from "react";
import { sendInstructorDetails } from "../../context/actions/sendInstructorDetails";
import { toast } from "react-toastify";
import { getCourseCategories } from "../../context/actions/showCategories";

export const InstructorModal = ({ handleShow }) => {
  const ErrorDisplay = ({ message }) => {
    return (
      <div className="error-display">
        <p>{message}</p>
      </div>
    );
  };

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    course: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (categories.length === 0) {
      const response = getCourseCategories();
      response.then((res) => {
        if (res.categories) {
          setCategories([...res.categories]);
        }
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value ?? e.target.innerText,
    });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    const phoneRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (
      formData.email == "" ||
      formData.fullname == "" ||
      formData.phone == "" ||
      formData.address == "" ||
      formData.course == ""
    ) {
      setLoading(true);
      setMessage("Please enter all details");
      setTimeout(() => {
        setLoading(false);
        setMessage("");
      }, 2000);
      return;
    } else if (!validateEmail(formData.email)) {
      setLoading(true);
      setMessage("Please enter a valid email");
      setTimeout(() => {
        setLoading(false);
        setMessage("");
      }, 2000);
      return;
    } else if (phoneRegex.test(formData.phone) === false) {
      setLoading(true);
      setMessage("Please enter a valid phone number.");
      setTimeout(() => {
        setLoading(false);
        setMessage("");
      }, 2000);
    } else {
      const res = sendInstructorDetails(formData);
      res.then((res) => console.log(res));
      handleShow();
      if (window?.dataLayer) {
        window.dataLayer.push({
          event: "instructorInfoForm",
          time: new Date(),
        });
      }
      toast.success(
        "Details saved successfully. We will be in touch with you shortly.!",
        { position: toast.POSITION.TOP_CENTER, autoClose: 3000 }
      );
    }
  };

  return (
    <div className="instructor-modal-overlay">
      <div className="instructor-modal">
        <div className="instructor-modal-content">
          <button
            className="instructor-modal-close-modal"
            onClick={() => handleShow()}>
            X
          </button>

          {loading && <ErrorDisplay message={message} />}

          <h2>Become a Upgrade skills Instructor</h2>
          <p>
            Uncover a welcoming online instructors' network and enjoy instant
            access to an array of valuable course creation tools and resources.
          </p>

          <form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <input
              name="fullname"
              required=""
              type="text"
              value={formData.fullname}
              placeholder="Full Name"
              onChange={handleChange}></input>
            <input
              name="email"
              required=""
              type="email"
              value={formData.email}
              placeholder="Email"
              onChange={handleChange}></input>
            {/* <input  name="address" required=""  type="text"  value={formData.address} placeholder='Address' onChange={handleChange}></input> */}
            <input
              name="phone"
              required=""
              type="tel"
              value={formData.phone}
              placeholder="Phone"
              onChange={handleChange}></input>
            {/* <input  name="course" required=""   type="text"  value={formData.course} placeholder='course' onChange={handleChange}></input> */}
            <select name="courseCategory">
              <option value={""}>Choose a category</option>
              {categories.map((el, i) => (
                <option value={el.title}>{el.title}</option>
              ))}
            </select>

            <input
              name="course"
              required=""
              type="text"
              value={formData.course}
              placeholder="Course Name"
              onChange={handleChange}></input>

            {/* <div className="checkbox-policy-container">
              <input type="checkbox" id="agree-checkbox"/>
              <p>I want to get the most out of my experience, by receiving emails with insider tips, motivation, special updates and promotions reserved for instructors. </p>
            </div> */}

            <button
              className="btn btn-primary btn-hover-dark"
              type="submit"
              id="send-instructor">
              Get Started
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
