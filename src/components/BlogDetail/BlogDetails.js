import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fecthBlogById } from "../../context/actions/fecthBlogById";
import { fetchBlogs } from "../../context/actions/fetchBlogCard";

import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { showLinks } from "../../context/actions/showLinks";
const sanitizeHtml = require("sanitize-html");

function BlogDetails() {
  const [spinner, setSpinner] = useState(false);
  const [blogs, setBlog] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);

  const [links, setLinks] = useState("");
  const params = useParams();

  useEffect(() => {
    const response = showLinks();
    response.then((result) => setLinks(result));
  }, []);

  const SectionItem = ({ section }) => {
    return (
      <>
        <h3>{section.title}</h3>
        <div
          className="react-html"
          dangerouslySetInnerHTML={{ __html: section.description }}
        />
        {section.image && (
          <img
            src={
              process.env.REACT_APP_IMAGE_URL + "uploads/blogs/" + section.image
            }
            alt="Blog Details"
          />
        )}
      </>
    );
  };

  useEffect(() => {
    setSpinner(true);
    const response = fecthBlogById(params.id)
      .then((res) => {
        setSpinner(false);
        if (res.status >= 400) {
          alert("Server or Network Error");
          setSpinner(false);
        } else {
          setBlog(res);

          //update meta tags
          if (window.updateMetaTags) {
            window.updateMetaTags(res.meta_title, res.meta_description);
          }
        }
      })
      .catch((error) => {
        setSpinner(false);
        alert("Server or Network Error");
      });

    const responseRecent = fetchBlogs();
    responseRecent
      .then((res) => {
        if (res && Array.isArray(res)) {
          setRecentBlogs(res.slice(0, 5));
        }
      })
      .catch((error) => {});
  }, [params]);

  return (
    <div>
      {spinner && <LoadingSpinner />}
      <div className="section page-banner">
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
            {/* <ul className="breadcrumb">
              <li><Link to="#">Home</Link></li>
              <li className="active">Blog</li>
            </ul> */}
            <h2 className="title">
              Publish your <span>Passions</span> your way
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
        {blogs && (
          <img
            className="shape-author"
            src={
              process.env.REACT_APP_IMAGE_URL +
              "/uploads/blogs/" +
              blogs.author_image
            }
            
          />
        )}
      </div>

      <div className="section section-padding mt-n10">
        <div className="container">
          <div className="row gx-10">
            <div className="col-lg-8">
              {/* Blog Details Wrapper Start */}
              <div className="blog-details-wrapper">
                <div className="blog-details-admin-meta">
                  <div className="author">
                    <div className="author-thumb">
                      {blogs && (
                        <div>
                          <img
                            src={
                              process.env.REACT_APP_IMAGE_URL +
                              "/uploads/blogs/" +
                              blogs.author_image
                            }
                            style={{ height: "5rem", width: "5rem" }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="author-name">
                      {blogs && <div className="name">{blogs.author_name}</div>}
                    </div>
                  </div>
                  <div className="blog-meta">
                    {blogs && (
                      <span>
                        {" "}
                        <i className="icofont-calendar" /> {blogs.blog_date}
                      </span>
                    )}
                    {/* <span> <i className="icofont-heart" /> 2,568+ </span> */}
                    {blogs && (
                      <div>
                        {" "}
                        <span
                          className="badge badge-success text-success p-2 font-weight-bold"
                          style={{ backgroundColor: "#e7f8ee" }}
                        >
                          {blogs.category_name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {blogs && <h1 className="title">{blogs.blog_name}</h1>}
                <div className="blog-details-description">
                  {blogs && <p>{blogs.short_description}</p>}
                  <img
                    src={
                      process.env.REACT_APP_IMAGE_URL +
                      "uploads/blogs/" +
                      blogs.blog_image
                    }
                    alt="Blog Details"
                  />
                  {/* <h3>Intrinsic Cognitive Load</h3>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularsed in the 1960 with release containing Lorem Ipsum passages desktop publishing software.</p>
                  <h3>A very nice example of Hick’s Law that applies to user experience design are lists:</h3>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularsed in the 1960 with release containing Lorem Ipsum passages desktop publishing software.</p>
                  <h3>Law of Proximity</h3>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularsed in the 1960 with release containing Lorem Ipsum passages desktop publishing software.</p>
                  <blockquote className="blockquote">
                    <span className="quote">“</span>
                    <p>Lorem Ipsum is simply dummy text of the printing and types industry's standard dummy text ever since the 1500s when scrambled it to make a type specimen book.</p>
                  </blockquote>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularsed in the 1960 with release containing Lorem Ipsum passages desktop publishing software.</p> */}

                  {blogs &&
                    blogs.sections &&
                    blogs.sections.map((section, index) => {
                      return <SectionItem section={section} key={index} />;
                    })}
                </div>
                {/* <div className="blog-details-label">
                  <h4 className="label">Tags:</h4>
                  <ul className="tag-list">
                    <li><Link to="#">Design</Link></li>
                    <li><Link to="#">Education</Link></li>
                    <li><Link to="#">Education</Link></li>
                    <li><Link to="#">Design</Link></li>
                  </ul>
                </div>
                <div className="blog-details-label">
                  <h4 className="label">Share:</h4>
                  <ul className="social">
                    <li><Link to={links && links.facebook}><i className="flaticon-facebook" /></Link></li>
                    <li><Link to={links && links.linkedin}><i className="flaticon-linkedin" /></Link></li>
                    <li><Link to="#"><i className="flaticon-twitter" /></Link></li>
                    <li><Link to="#"><i className="flaticon-skype" /></Link></li>
                    <li><Link to={links && links.instagram}><i className="flaticon-instagram" /></Link></li>
                  </ul>
                </div> */}
              </div>
              {/* Blog Details Wrapper End */}
              {/* Blog Details Comment End */}
              {/* <div className="blog-details-comment">
                <div className="comment-wrapper">
                  <h3 className="title">Comments (03)</h3>
                  <ul className="comment-items">
                    <li>
                     
                      <div className="single-comment">
                        <div className="comment-author">
                          <div className="author-thumb">
                            <img src={process.env.PUBLIC_URL +"/images/author/author-01.jpg"} />
                          </div>
                          <div className="author-content">
                            <h4 className="name">Sara Alexander</h4>
                            <div className="meta">
                              <span className="designation">Product Designer, USA</span>
                              <span className="time">35 minutes ago</span>
                            </div>
                          </div>
                        </div>
                        <p>Lorem Ipsum has been the industry's standard dummy text since the 1500 when unknown printer took a galley type and scrambled to make type specimen’s book has survived not five centuries but also the leap into electronic type and book.</p>
                        <Link to="#" className="reply"> <i className="icofont-reply" /> Reply</Link>
                      </div>
                     
                      <ul className="comment-reply">
                        <li>
                          
                          <div className="single-comment">
                            <div className="comment-author">
                              <div className="author-thumb">
                                <img src={process.env.PUBLIC_URL +"/images/author/author-03.jpg"  }/>
                              </div>
                              <div className="author-content">
                                <h4 className="name">Robert Morgan</h4>
                                <div className="meta">
                                  <span className="designation">Product Designer, USA</span>
                                  <span className="time">35 minutes ago</span>
                                </div>
                              </div>
                            </div>
                            <p>Lorem Ipsum has been the industry's standard dumm text since the 1500 when printer took a galley type and scrambled to make type specimen book survived centuries but also the electronic type and book.</p>
                            <Link to="#" className="reply"> <i className="icofont-reply" /> Reply</Link>
                          </div>
                         
                        </li>
                      </ul>
                    </li>
                    <li>
                      
                      <div className="single-comment">
                        <div className="comment-author">
                          <div className="author-thumb">
                            <img src={process.env.PUBLIC_URL +"/images/author/author-07.jpg"  }/>
                          </div>
                          <div className="author-content">
                            <h4 className="name">Rochelle Hunt</h4>
                            <div className="meta">
                              <span className="designation">Product Designer, USA</span>
                              <span className="time">35 minutes ago</span>
                            </div>
                          </div>
                        </div>
                        <p>Lorem Ipsum has been the industry's standard dummy text since the 1500 when unknown printer took a galley type and scrambled to make type specimen’s book has survived not five centuries but also the leap into electronic type and book.</p>
                        <Link to="#" className="reply"> <i className="icofont-reply" /> Reply</Link>
                      </div>
                      
                    </li>
                  </ul>
                </div>
                <div className="comment-form">
                  <h3 className="title">Leave a comment</h3>
                  
                  <div className="form-wrapper">
                    <form action="#">
                      <div className="row">
                        <div className="col-md-6">
                         
                          <div className="single-form">
                            <input type="text" placeholder="Name" />
                          </div>
                         
                        </div>
                        <div className="col-md-6">
                      
                          <div className="single-form">
                            <input type="email" placeholder="Email" />
                          </div>
                         
                        </div>
                        <div className="col-md-12">
                          
                          <div className="single-form">
                            <textarea placeholder="Massage" defaultValue={""} />
                          </div>
                         
                        </div>
                        <div className="col-md-12">
                          
                          <div className="single-form text-center">
                            <button className="btn btn-primary btn-hover-dark">Submit Now</button>
                          </div>
                         
                        </div>
                      </div>
                    </form>
                  </div>
                 
                </div>
              </div> */}
            </div>
            <div className="col-lg-4">
              {/* Blog Sidebar Start */}
              <div className="sidebar">
                {/* Sidebar Widget Search Start */}
                {/* <div className="sidebar-widget widget-search">
                  <form action="#">
                    <input type="text" placeholder="Search here" />
                    <button><i className="icofont-search-1" /></button>
                  </form>
                </div> */}
                {/* Sidebar Widget Search End */}
                {/* Sidebar Widget Category Start */}
                {/* <div className="sidebar-widget">
                  <h4 className="widget-title">Post Category</h4>
                  <div className="widget-category">
                    <ul className="category-list">
                      <li><Link to="#">UI/UX Design <span>(16)</span></Link></li>
                      <li><Link to="#">Creative Writing <span>(03)</span></Link></li>
                      <li><Link to="#">Graphic Design <span>(08)</span></Link></li>
                      <li><Link to="#">Fine Arts <span>(18)</span></Link></li>
                      <li><Link to="#">Business Analytics <span>(02)</span></Link></li>
                      <li><Link to="#">Marketing <span>(14)</span></Link></li>
                    </ul>
                  </div>
                </div> */}
                {/* Sidebar Widget Category End */}
                {/* Sidebar Widget Post Start */}
                <div className="sidebar-widget">
                  <h4 className="widget-title">Recent Post</h4>
                  <div className="widget-post">
                    <ul className="post-items">
                      {recentBlogs &&
                        recentBlogs.length > 0 &&
                        recentBlogs.map((el, i) => {
                          return (
                            <li key={i}>
                              {/* Sidebar Widget Post Start */}
                              <div className="single-post">
                                <div className="post-thumb">
                                  <Link to={`/blog-detail/${el.slug || el.id}`}>
                                    <img
                                      src={
                                        process.env.REACT_APP_IMAGE_URL +
                                        "uploads/blogs/" +
                                        el?.blog_image
                                      }
                                    />
                                  </Link>
                                </div>
                                <div className="post-content">
                                  <h5 className="title">
                                    <Link
                                      to={`/blog-detail/${el.slug || el.id}`}
                                    >
                                      {el.blog_name}
                                    </Link>
                                  </h5>
                                  <span className="date">
                                    <i className="icofont-calendar" />{" "}
                                    {el.blog_date}
                                  </span>
                                </div>
                              </div>
                              {/* Sidebar Widget Post End */}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
                {/* Sidebar Widget Post End */}
                {/* Sidebar Widget Tags Start */}
                {/* <div className="sidebar-widget">
                  <h4 className="widget-title">Popular Tags</h4>
                  <div className="widget-tags">
                    <ul className="tags-list">
                      <li><Link to="#">Design</Link></li>
                      <li><Link to="#">Education</Link></li>
                      <li><Link to="#">Education</Link></li>
                      <li><Link to="#">Design</Link></li>
                      <li><Link to="#">Design</Link></li>
                      <li><Link to="#">Education</Link></li>
                      <li><Link to="#">Education</Link></li>
                      <li><Link to="#">Design</Link></li>
                    </ul>
                  </div>
                </div> */}
                {/* Sidebar Widget Tags End */}
                {/* Sidebar Widget Share Start */}
                {/* <div className="sidebar-widget">
                  <h4 className="widget-title">Share Course:</h4>
                  <ul className="social">
                    <li><Link to="#"><i className="flaticon-facebook" /></Link></li>
                    <li><Link to="#"><i className="flaticon-linkedin" /></Link></li>
                    <li><Link to="#"><i className="flaticon-twitter" /></Link></li>
                    <li><Link to="#"><i className="flaticon-skype" /></Link></li>
                    <li><Link to="#"><i className="flaticon-instagram" /></Link></li>
                  </ul>
                </div> */}
                {/* Sidebar Widget Share End */}
              </div>
              {/* Blog Sidebar End */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
