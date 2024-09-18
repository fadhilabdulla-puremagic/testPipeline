import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DownloadApp from "../SubComponents/DownloadApp";
import { showLinks } from "../../context/actions/showLinks";
import { sendContact } from "../../context/actions/sendContact";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import { metaTags } from "../../context/actions/metaTags";
import i18n from "../../i18n/i18n";

function Contact() {
  const [links, setLinks] = useState("");
  const [loading, setLoading] = useState(false);
  const [messagee, setMessagee] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    // scroll to the top of the page on mount
    window.scrollTo(0, 0);

    // Call the updateMetaTags function with the dynamic values
    const meta_tags = metaTags(1, 6);
    meta_tags.then((res) => {
      if (window.updateMetaTags) {
        window.updateMetaTags(res.tag, res.description);
      }
    });
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const ErrorDisplay = ({ message }) => {
    return (
      <div className="error-display">
        <p>{message}</p>
      </div>
    );
  };

  useEffect(() => {
    const response = showLinks();
    response.then((result) => setLinks(result));
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [query, setQuery] = useState("");

  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      email == "" ||
      name == "" ||
      subject == "" ||
      query == "" ||
      phone == ""
    ) {
      setLoading(true);
      setMessage("Please enter all details");
      setTimeout(() => {
        setLoading(false);
        setMessage("");
      }, 2000);
      return;
    } else if (!validateEmail(email)) {
      setLoading(true);
      setMessage("Please enter a valid email");
      setTimeout(() => {
        setLoading(false);
        setMessage("");
      }, 2000);
      return;
    } else {
      setShowSpinner(true);
      const contact = {
        name: name,
        email: email,
        subject: subject,
        message: query,
        contact_no: phone,
      };
      const response = sendContact(contact);
      response.then((res) => {
        console.log(res);
        if (res.success === true) {
          toast.success("Thank you for contacting us !", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          setEmail("");
          setMessage("");
          setSubject("");
          setName("");
          setPhone("");
          setQuery("");
          setShowSpinner(false);
        } else {
          toast.error(
            "An error occoured while sending details. Please try calling us!",
            { position: toast.POSITION.TOP_CENTER, autoClose: 2000 }
          );
          setEmail("");
          setMessage("");
          setSubject("");
          setName("");
          setPhone("");
          setQuery("");
          setShowSpinner(false);
        }
      });
    }
  };

  return (
    <>
      {showSpinner && <LoadingSpinner />}
      <div className="section page-banner" style={{ height: "28rem" }} dir="ltr">
        <img
          className="shape-1 animation-round"
          src={process.env.PUBLIC_URL + "/images/shape/shape-8.png"}
        />
        <img
          className="shape-2"
          src={process.env.PUBLIC_URL + "/images/shape/shape-23.png"}
        />
        <div className="container">
          {/* Page Banner Start */}
          <div className="page-banner-content">
            <ul className="breadcrumb">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li className="active">Contact Us</li>
            </ul>
            <h2 className="title">
              {i18n.t('ContactUsHeading1')} <span>{i18n.t('ContactUsHeading2')}</span>
            </h2>
          </div>
          {/* Page Banner End */}
        </div>
        {/* Shape Icon Box Start */}
        <div className="shape-icon-box">
          <img
            className="icon-shape-1 animation-left"
            src={process.env.PUBLIC_URL + "/images/shape/shape-5.png"}
          />
          <div className="box-content">
            <div className="box-wrapper">
              <i className="flaticon-badge" />
            </div>
          </div>
          <img
            className="icon-shape-2"
            src={process.env.PUBLIC_URL + "/images/shape/shape-6.png"}
          />
        </div>
        {/* Shape Icon Box End */}
        <img
          className="shape-3"
          src={process.env.PUBLIC_URL + "/images/shape/shape-24.png"}
        />
        <img
          className="shape-author"
          src={process.env.PUBLIC_URL + "/images/author/author-11.jpg"}
        />
      </div>
      <div className="section section-padding" style={{ marginTop: "-10px" }}>
        <div className="container">
          {/* Contact Wrapper Start */}
          <div className="contact-wrapper">
            <div className="row align-items-center">
              <div className="col-lg-6 ">
                {/* Contact Info Start */}
                <div className="contact-info">
                  <img
                    className="shape animation-round"
                    src={process.env.PUBLIC_URL + "/images/shape/shape-12.png"}
                  />
                  {/* Single Contact Info Start */}
                  <div className="single-contact-info">
                    <div className="info-icon">
                      <i className="flaticon-phone-call" />
                    </div>
                    <div className="info-content">
                      <h6 className="title">{i18n.t('ContactFormPhone')}</h6>
                      <p>
                        <Link to={`tel:${links.mobile}`} dir="ltr">
                          {links && links.mobile}
                        </Link>
                      </p>
                    </div>
                  </div>
                  {/* Single Contact Info End */}
                  {/* Single Contact Info Start */}
                  <div className="single-contact-info">
                    <div className="info-icon">
                      <i className="flaticon-email" />
                    </div>
                    <div className="info-content">
                      <h6 className="title">{i18n.t('ContactFormEmail')}</h6>
                      <p>
                        <Link to={`mailto:${links.email}`} dir="ltr">
                          {links && links.email}
                        </Link>
                      </p>
                    </div>
                  </div>
                  {/* Single Contact Info End */}
                  {/* Single Contact Info Start */}
                  <div className="single-contact-info">
                    <div className="info-icon">
                      <i className="flaticon-pin" />
                    </div>
                    <div className="info-content">
                      <h6 className="title">{i18n.t('FooterLocation')}</h6>
                      <Link to={`https://maps.google.com?q=${links.address}`} target="_blank" dir="ltr">
                          {links && links.address}
                      </Link>
                      
                    </div>
                  </div>
                  {/* Single Contact Info End */}
                </div>
                {/* Contact Info End */}
              </div>
              <div className="col-lg-6">
                {/* Contact Form Start */}
                <div className="contact-form">
                  <h3 className="title">
                    {i18n.t('ContactGetInTouch')} <span>{i18n.t('ContactWithUs')}</span>
                  </h3>
                  <div className="form-wrapper">
                    <form onSubmit={handleSubmit} method="POST">
                      <div className="single-form col-xs-12 col-sm-12 col-md-12">
                        {loading && <ErrorDisplay message={message} />}
                      </div>
                      {/* Single Form Start */}
                      <div className="single-form col-xs-12 col-sm-12 col-md-12">
                        <input
                          type="text"
                          name="name"
                          value={name}
                          placeholder={i18n.t('ConctactFormName')}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      {/* Single Form End */}
                      {/* Single Form Start */}
                      <div className="single-form col-xs-12 col-sm-12 col-md-12">
                        <input
                          type="text"
                          name="email"
                          value={email}
                          placeholder={i18n.t('ContactFormEmail')}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      {/* Single Form End */}
                      {/* Single Form Start */}
                      <div className="single-form col-xs-12 col-sm-12 col-md-12">
                        <input
                          type="text"
                          name="phone"
                          pattern="[0-9]+"
                          value={phone}
                          placeholder={i18n.t('ContactFormPhone')}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>

                      <div className="single-form col-xs-12 col-sm-12 col-md-12">
                        <input
                          type="text"
                          name="subject"
                          value={subject}
                          placeholder={i18n.t('ContactFormSubject')}
                          onChange={(e) => setSubject(e.target.value)}
                        />
                      </div>
                      {/* Single Form End */}
                      {/* Single Form Start */}
                      <div className="single-form col-xs-12 col-sm-12 col-md-12">
                        {/* <input type="textarea" name="message" value={message} placeholder="Message" onChange={(e) => setMessage(e.target.value)} /> */}
                        <textarea
                          type="textarea"
                          name="message"
                          value={query}
                          placeholder={i18n.t('ContactFormMessage')}
                          onChange={(e) => setQuery(e.target.value)}
                        />
                      </div>
                      {/* Single Form End */}
                      <p className="form-message" />
                      {/* Single Form Start */}
                      <div className="single-form col-xs-12 col-sm-12 col-md-12">
                        <button className="btn btn-primary btn-hover-dark w-100 p-0">
                        {i18n.t('ContactFormSendMessage')} <i className="flaticon-right" />
                        </button>
                      </div>
                      {/* Single Form End */}
                    </form>
                  </div>
                </div>
                {/* Contact Form End */}
              </div>
            </div>
          </div>
          {/* Contact Wrapper End */}
        </div>
      </div>

      {/*<div className="section " style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.5459104659285!2d55.358310914963575!3d25.28585648385499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5c61925f56a7%3A0x7d8677d3d322c4ce!2sPure%20Magic%20Exhibition%20And%20Conference%20Organizing!5e0!3m2!1sen!2sae!4v1679638223677!5m2!1sen!2sae" width={900} height={550} style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
  </div>*/}
    </>
  );
}

export default Contact;
