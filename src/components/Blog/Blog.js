import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DownloadApp from "../SubComponents/DownloadApp";
import {
  fetchBlogs,
  fetchBlogsCategories,
} from "../../context/actions/fetchBlogCard";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { showLinks } from "../../context/actions/showLinks";
import { metaTags } from "../../context/actions/metaTags";
import i18n from "../../i18n/i18n";

function Blog() {
  const [spinner, setSpinner] = useState(false);
  const [blogs, setBlog] = useState([]);
  const [links, setLinks] = useState("");

  const [blogsCategories, setBlogsCategories] = useState([]);

  useEffect(() => {
    // scroll to the top of the page on mount
    window.scrollTo(0, 0);

    // Call the updateMetaTags function with the dynamic values
    const meta_tags = metaTags(1, 7);
    meta_tags.then((res) => {
      if (window.updateMetaTags) {
        window.updateMetaTags(res.tag, res.description);
      }
    });
  }, []);

  useEffect(() => {
    const response = showLinks();
    response.then((result) => setLinks(result));
  }, []);

  useEffect(() => {
    setSpinner(true);
    const response = fetchBlogs();
    response
      .then((res) => {
        setSpinner(false);
        if (res.status >= 400) {
          alert("Server or Network Error");
          setSpinner(false);
        } else {
          setBlog(res);
          // console.log(res);
        }
      })
      .catch((error) => {
        setSpinner(false);
        alert("Server or Network Error");
      });

    fetchBlogsCategories()
      .then((res) => {
        if (res && Array.isArray(res)) {
          setBlogsCategories(res);
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const BlogsItem = ({ blog }) => {
    return (
      <div className="col-md-6">
        {/* Single Blog Start */}
        <div className="single-blog">
          <div className="blog-image">
            <Link to={`/blog-detail/${blog.slug || blog.id}`}>
              <img
                src={
                  process.env.REACT_APP_IMAGE_URL +
                  "uploads/blogs/" +
                  blog.blog_image
                }
                alt="Blogs"
                style={{ height: "15rem" }}
              />
            </Link>
          </div>
          <div className="blog-content">
            <div className="blog-author">
              <div className="author">
                <div className="author-thumb">
                  <Link to={`/blog-detail/${blog.slug || blog.id}`}>
                    <img
                      src={
                        process.env.REACT_APP_IMAGE_URL +
                        "uploads/blogs/" +
                        blog.author_image
                      }
                      alt="Blog Image"
                      style={{ height: "3rem" }}
                    />
                  </Link>
                </div>
                <div className="author-name">
                  <Link
                    to={`/blog-detail/${blog.slug || blog.id}`}
                    className="name"
                  >
                    {blog.author_name.slice(0, 15)}{" "}
                  </Link>
                </div>
              </div>
              <div>
                <Link to="#">
                  {" "}
                  <span
                    className="badge badge-success text-success p-2"
                    style={{ backgroundColor: "#e7f8ee" }}
                  >
                    {blog.category_name}
                  </span>
                </Link>
              </div>
            </div>
            <h4 className="title my-2">
              <Link to={`/blog-detail/${blog.slug || blog.id}`}>
                {blog.blog_name.slice(0, 57)}
              </Link>
            </h4>
            {/* <div className="mb-2">{blog.short_description.slice(0,100)}...</div> */}
            <div className="blog-meta">
              <span>
                {" "}
                <i className="icofont-calendar" /> {blog.blog_date}
              </span>
              {/* <span> <i className="icofont-heart" /> 2,568+ </span> */}
            </div>
            <Link
              to={`/blog-detail/${blog.slug || blog.id}`}
              className="btn btn-secondary btn-hover-primary"
            >
              Read More
            </Link>
          </div>
        </div>
        {/* Single Blog End */}
      </div>
    );
  };

  return (
    <div>
      {spinner && <LoadingSpinner />}
      <div className="section page-banner-noshapes">
        {/* <img
          className="shape-1 animation-round"
          src={process.env.PUBLIC_URL + "/images/shape/shape-8.png"}
        />
        <img
          className="shape-2"
          src={process.env.PUBLIC_URL + "/images/shape/shape-23.png"}
        /> */}
        {/* <div className="container">
         
          <div className="page-banner-content">
            <ul className="breadcrumb">
              <li>
                <Link to="#">Home</Link>
              </li>
              <li className="active">Blogs</li>
            </ul>
            <h2 className="title">
              Explore Our <span>Blogs</span>
            </h2>
          </div>
          
        </div>
         */}
        {/* <div className="shape-icon-box">
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
        </div> */}
        {/* Shape Icon Box End */}
        {/* <img
          className="shape-3"
          src={process.env.PUBLIC_URL + "/images/shape/shape-24.png"}
        />
        <img
          className="shape-author"
          src={process.env.PUBLIC_URL + "/images/author/author-11.jpg"}
        /> */}
      </div>

      <div className="section section-padding mt-n10">
        <div className="container">
          <div className="row gx-10">
            <div className="col-lg-8">
              {/* Blog Wrapper Start */}
              <div className="blog-wrapper">
                <div className="row">
                  {/**blogs component */}

                  {blogs && blogs.length > 0 ? (
                    blogs.map((blog, index) => {
                      return <BlogsItem blog={blog} key={blog.id} />;
                    })
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              {/* Blog Wrapper End */}
              {/* Page Pagination End */}
              {/* <div className="page-pagination">
                <ul className="pagination justify-content-center">
                  <li><Link to="#"><i className="icofont-rounded-left" /></Link></li>
                  <li><Link className="active" to="#">1</Link></li>
                  <li><Link to="#">2</Link></li>
                  <li><Link to="#">3</Link></li>
                  <li><Link to="#"><i className="icofont-rounded-right" /></Link></li>
                </ul>
              </div> */}
              {/* Page Pagination End */}
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
                <div className="sidebar-widget">
                  <h4 className="widget-title">{i18n.t('BlogsPostCategory')}</h4>
                  <div className="widget-category">
                    <ul className="category-list">
                      {/* <li><Link to="#">UI/UX Design <span>(16)</span></Link></li>
                      <li><Link to="#">Creative Writing <span>(03)</span></Link></li>
                      <li><Link to="#">Graphic Design <span>(08)</span></Link></li>
                      <li><Link to="#">Fine Arts <span>(18)</span></Link></li>
                      <li><Link to="#">Business Analytics <span>(02)</span></Link></li>
                      <li><Link to="#">Marketing <span>(14)</span></Link></li> */}
                      {blogsCategories &&
                        blogsCategories.length > 0 &&
                        blogsCategories.map((el, index) => (
                          <li key={index}>
                            <Link to="#">
                              {el?.category_name}{" "}
                              <span>({el?.category_count})</span>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
                {/* Sidebar Widget Category End */}
                {/* Sidebar Widget Post Start */}
                <div className="sidebar-widget">
                  <h4 className="widget-title">{i18n.t('BlogsRecentPosts')}</h4>
                  <div className="widget-post">
                    <ul className="post-items">
                      {blogs &&
                        blogs.length > 0 &&
                        blogs.slice(0, 5).map((el, i) => {
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
                                        el.blog_image
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
                     <li><Link to={links && links.facebook}><i className="flaticon-facebook" /></Link></li>
                     <li><Link to={links && links.instagram}><i className="flaticon-instagram" /></Link></li>
                     <li><Link to={links && links.linkedin}><i className="flaticon-linkedin" /></Link></li>
                      <li><Link to="#"><i className="flaticon-linkedin" /></Link></li>
                      <li><Link to="#"><i className="flaticon-twitter" /></Link></li>
                      <li><Link to="#"><i className="flaticon-skype" /></Link></li>
                    
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

export default Blog;
