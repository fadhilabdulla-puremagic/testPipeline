import {React, useEffect, useState, useContext} from 'react'
import './app.css';
import { addUserWithJwt } from '../../context/actions/userActions/userActions';
import { GlobalContext } from '../../context/GlobalState';
import { Spinner } from 'react-bootstrap';
import {updateProfile} from '../../context/actions/updateProfile'
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { toast } from 'react-toastify';

export function UpdateProfile() {
    
    const navigate = useNavigate();
    const [myJwtCookie, setMyJwtCookie] = useCookies(['jwt']);
    const {userState, userDispatch} = useContext(GlobalContext);
    const user = userState.user
    const [loading, setLoading] = useState(false);
    const [imageChanged, setImageChanged] = useState(false);
    const [originalImage, setOriginalImage] = useState(null);    

    useEffect(() => {
        // scroll to the top of the page on mount
        window.scrollTo(0, 0);
      }, []);
  
    
    useEffect(() => {
        if (!localStorage.getItem('jwtemail') || !myJwtCookie.jwt) {
            navigate('/');
          }
    },[myJwtCookie.jwt, navigate])  

    const [formData , setFormData] = useState({
         firstname:'',
         phone:'',
         country:'',
         address:'',
         lastname:'',
         picture:'',
         email:''
    });

    useEffect(() => {
        user && setOriginalImage(user.picture)
    },[user])

    const [imageData, setImageData] = useState({
        'picture':null
    });

    const handleChange = (e) => {
        setFormData({...formData , [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const response = await updateProfile(formData, myJwtCookie.jwt, imageData.picture)
        const token = response.jwtToken;

            if (localStorage.getItem('jwtemail')) {
            localStorage.setItem('jwtemail', JSON.stringify(token));
            } else {
                setMyJwtCookie('jwt', token);
            }

        addUserWithJwt(token, userDispatch);

        response && setLoading(false)
        toast.success('profile updated successfully', {position: toast.POSITION.TOP_CENTER,autoClose: 3000,})    
        setImageChanged(false)
    }   

    

    function handleButtonClick() {
        document.getElementById("image-input").click();
      }

      function handleClearImage() {
        URL.revokeObjectURL(formData.picture);
        setFormData((prevState) => ({
          ...prevState,
          picture: originalImage,
        }));
        setImageChanged(false)
      }

    
        const handleImageChange = (event) => {
            const file = event.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                setFormData((prevState) => ({ ...prevState, picture: reader.result }));
                setImageData((prevState) => ({...prevState, picture : file}));
                setImageChanged(true);
              };
              reader.readAsDataURL(file);
            }
        };
    

    useEffect(() => {
        if(user){
            setFormData({
                firstname:user.firstname || '',
                phone:user.phone || '',
                country:user.country || '',
                email:user.email || '',
                address:user.address || '',
                lastname:user.lastname || '',
                picture:user.picture || null
            })
        }
    }, [user])

    // useEffect(() => {
    //     console.log(formData)
    //     console.log(user)
    // },[formData])

    const imageSource = imageChanged 
    ? formData.picture 
    : (formData.picture.includes('https://lh3.googleusercontent.com') 
        || formData.picture.includes('https://cdn.pixabay.com') 
        || formData.picture.includes('.png || jpg') 
        ? formData.picture 
        : 'http://localhost:9000/uploads/user_profile/' + formData.picture);
        const defaultImage = 'images/empty-profile.png';
            
  return (

        <div className="section section-padding">
            {loading && <LoadingSpinner/>}
            <div className='container'>

            <div className="register-login-wrapper">
                <div className="row align-items-center">
                <div className="col-lg-6">
                    {/* Register & Login Images Start */}
                    <div className="register-login-images">
                    <div className="shape-1">
                        <img src="images/shape/shape-26.png" alt="Shape" />
                    </div>
             <div className="images">
                    
                <label htmlFor="image-input">
                    {formData.picture == null && (
                        <Spinner/>
                    )}
                    {user ? formData.picture !== null && (
                        //   <img src={imageChanged ? formData.picture : 'http://localhost:9000/uploads/user_profile/' + formData.picture} alt="Register Login" />
                        
                        <img
                            src={imageSource}
                            onError={(e) => {
                                e.target.onerror = null; // reset the error handler to prevent infinite loop
                                e.target.src = defaultImage; // set the default image
                            }}
                            alt="Profile"
                        />

                    ): <Spinner/>}
                </label>
            </div>
                <div>                 
                    <input
                        id="image-input"
                        type="file"
                        name="picture"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                    />
                        {formData.picture !== null && (
                            <button className="btn btn-secondary" onClick={handleClearImage}>
                                Clear Image
                            </button>
                        )}
                    <button className="btn btn-primary" onClick={handleButtonClick}>
                        {formData.picture === null ? "Choose Image" : "Change Image"}
                    </button>
                 </div> 
             </div>
                    {/* Register & Login Images End */}
                </div>
                <div className="col-lg-6">
                    {/* Register & Login Form Start */}
                    <div className="register-login-form">
                    <h3 className="title">Update <span>Profile</span></h3>
                    {loading && <LoadingSpinner/>}
                    <div className="form-wrapper">
                    
                    {user ? <form onSubmit={handleSubmit}>
                        
                        <div className="single-form col-xs-12 col-sm-12 col-md-12">
                            <input type="text" name='firstname' placeholder="first name" value={formData.firstname} onChange={handleChange}/>
                        </div>

                        
                        <div className="single-form col-xs-12 col-sm-12 col-md-12">
                            <input type="text" name='lastname' placeholder="last name" value={formData.lastname} onChange={handleChange}/>
                        </div>
                        
                        <div className="single-form col-xs-12 col-sm-12 col-md-12">
                            <input type="text" name='phone' placeholder="phone"  value={formData.phone} onChange={handleChange}/>
                        </div>

                        <div className="single-form col-xs-12 col-sm-12 col-md-12">
                            <input type="text" name='country' placeholder="country"  value={formData.country} onChange={handleChange}/>
                        </div>

                        <div className="single-form col-xs-12 col-sm-12 col-md-12">
                            <input type="text" name='address' placeholder="address"  value={formData.address} onChange={handleChange}/>
                        </div>
                        
                        <div className="single-form">
                            <button className="btn btn-primary btn-hover-dark w-100 update-button" >Update Account</button>
                        </div>
                        
                        </form>: <Spinner/>}
                        
                    </div>
                    </div>
                    {/* Register & Login Form End */}
                </div>
                </div>
            </div>
        
            
            </div>    
        
        </div>       
    
  )
}
