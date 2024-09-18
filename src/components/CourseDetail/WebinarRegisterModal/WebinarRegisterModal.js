import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import { apiRegisterWebniar } from "../../../context/actions/registerWebinar/registerWebinar";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function B2BModalAddCustomer({ show, toggleShow, webinarId, course }) {
  
  const [apiRes, setApiRes] = useState(null);
  // const [showPopUp, setshowPopUp] = useState(false);

  const clospopup = () => {
    setApiRes(null);
    toggleShow();
  };
  // const openpopup = () => {
  //   toggleShow();
  // };

  useEffect(() => {}, [show, webinarId]);

  return (
    <>
      {show && (
        <div
          className="modal"
          style={{
            animationDuration: "0s",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            animationName: "unset",
          }}
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header justify-content-between">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  {course.details.course_type ?? 'Webinar'} Registration
                </h5>
                <button
                  onClick={() => clospopup()}
                  type="button"
                  data-modal-hide="medium-modal"
                  class="btn btn-link mt-0"
                  style={{ position: "absolute", right: 0, width: "unset" }}
                >
                  X<span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="modal-body">
                {apiRes && (
                  <>
                    <p
                      class={`p-2 rounded text-white ${
                        apiRes?.success === true ? "bg-success" : "bg-danger"
                      } `}
                    >
                      {apiRes?.message}
                    </p>
                  </>
                )}
                <div
                  className={`${
                    apiRes && apiRes.success === true ? "invisible" : ""
                  }`}
                >
                  <Formik
                    initialValues={{
                      email: "",
                      firstName: "",
                      lastName: "",
                      phoneNumber: "",
                      webinarId: webinarId,
                    }}
                    validationSchema={Yup.object().shape({
                      email: Yup.string()
                        .email("Must be a valid email")
                        .trim()
                        .matches(emailRegExp, "Must be a valid email address.")
                        .max(255)
                        .required("Email is required"),
                      firstName: Yup.string()
                        .trim()
                        .max(255)
                        .required("First name is requird")
                        .matches(
                          /^[aA-zZ\s]+$/,
                          "Only alphabets are allowed for this field "
                        ),
                      lastName: Yup.string()
                        .trim()
                        .max(255)
                        .required("Last name is requird")
                        .matches(
                          /^[aA-zZ\s]+$/,
                          "Only alphabets are allowed for this field "
                        ),
                      phoneNumber: Yup.string()
                        .trim()
                        .matches(phoneRegExp, "Must be a valid phone number.")
                        .required("Phone number is requird"),
                    })}
                    onSubmit={async (
                      values,
                      { setErrors, setStatus, setSubmitting, resetForm }
                    ) => {
                      try {
                        setStatus({ success: false });
                        setSubmitting(true);
                        //   setSuccessMessage(null);

                        const res = await apiRegisterWebniar(values);
                        if (res && res?.success === true) {
                          setApiRes(res);
                          resetForm();
                        } else if (res && res?.success === false) {
                          setApiRes(res);
                        }
                      } catch (err) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                      }
                    }}
                  >
                    {({
                      errors,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      isSubmitting,
                      touched,
                      values,
                    }) => (
                      <form
                        noValidate
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 gap-6"
                      >
                        <div class="form-group">
                          <label>First Name</label>
                          <input
                            type="text"
                            style={{ marginLeft: "0px" }}
                            value={values.firstName}
                            name="firstName"
                            onChange={handleChange}
                            class={`form-control ${
                              Boolean(touched.firstName && errors.firstName)
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="First Name"
                          />
                          <small className="text-danger ml-4">
                            {touched.firstName ? errors.firstName : <></>}
                          </small>
                        </div>
                        <div class="form-group mt-1">
                          <label>Last Name</label>
                          <input
                            type="text"
                            style={{ marginLeft: "0px" }}
                            value={values.lastName}
                            placeholder="Last Name"
                            name="lastName"
                            onChange={handleChange}
                            class={`form-control ${
                              Boolean(touched.lastName && errors.lastName)
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          <small className="text-danger ml-4">
                            {touched.lastName ? errors.lastName : <></>}
                          </small>
                        </div>

                        <div class="form-group mt-1">
                          <label>Email</label>
                          <input
                            type="email"
                            style={{ marginLeft: "0px" }}
                            placeholder="Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            class={`form-control ${
                              Boolean(touched.email && errors.email)
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          <small className="text-danger ml-4">
                            {touched.email ? errors.email : <></>}
                          </small>
                        </div>

                        <div class="form-group mt-2">
                          <label>Contact Number</label>
                          <input
                            type="text"
                            style={{ marginLeft: "0px" }}
                            value={values.phoneNumber}
                            placeholder="Contact number"
                            name="phoneNumber"
                            onChange={handleChange}
                            class={`form-control ${
                              Boolean(touched.phoneNumber && errors.phoneNumber)
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          <small className="text-danger ml-4">
                            {touched.phoneNumber ? errors.phoneNumber : <></>}
                          </small>
                        </div>
                        <div class="d-flex justify-content-center mt-1">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Processing..." : "Register"}
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default B2BModalAddCustomer;
