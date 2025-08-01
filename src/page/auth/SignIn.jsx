import React, { useContext, useEffect, useState } from 'react'
import logo from "../../assets/image/ecommerce.png"
import pattern from "../../assets/image/pattern.webp"
import { IoIosMail } from "react-icons/io";
import { IoIosLock } from "react-icons/io";
import { MyContext } from '../../App'
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { Button } from '@mui/material';
import { Snackbar, Alert } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { postData } from '../../util/api';
const SignIn = () => {
   const context = useContext(MyContext)
   const [inputIndex,setInputIndex]= useState(null)
   const [isShowPass,setIsShowPass] = useState(false)
   const navigate = useNavigate();
     const [message, setMessage] = useState({ open: false, type: "", text: "" });
   
    useEffect(()=>{
        context.setIsHiddenSidebarAndHeader(true);
    },[])

      const [formFields, setFormFields] = useState({
        email: "",
        password: "",
        isAdmin: true,
      });

    const focusInput =(index)=>{
      setInputIndex(index)
    }

      const onChangeInput = (e) => {
        setFormFields(() => ({
          ...formFields,
          [e.target.name]: e.target.value,
        }));
      };
      const handleClose = () => {
        setMessage({ ...message, open: false });
      };

const SignIn = async (e) => {
    e.preventDefault();
   
    if (formFields.email == "") {
      setMessage({
        open: true,
        type: "error",
        text: "please field in email",
      });
      return false;
    }
   
    if (formFields.password == "") {
      setMessage({
        open: true,
        type: "error",
        text: "please field in password",
      });
      return false;
    }
 
    const formData = new FormData();
    
    formData.append("email", formFields.email);
  
    formData.append("password", formFields.password);
    

    try {
      const res = await postData("user/signin", formData);
      console.log(res);
    localStorage.setItem("token",res.token)
    const user={
      name:res.user?.name,
      email:res.user?.email,
      userId:res.user?._id
    }
    localStorage.setItem("user",JSON.stringify(user))

   
      setMessage({
        open: true,
        type: "success",
        text: "user Authenticated!"
      });

      // clearForm();
      navigate("/");
    } catch (err) {
      setMessage({
    open: true,
    type: "error",
    text: err.response?.data?.msg || err.message,
  });
    }
  };




  return (
    <>

    <Snackbar
            open={message.open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleClose}
              severity={message.type}
              sx={{ width: "100%" }}
            >
              {message.text}
            </Alert>
          </Snackbar>
    <img src={pattern} className='LoginPattern' alt="" />
    <section className=' signInSection  position-relative '>
        <div className='SignInBox'>
            <div className="logo text-center">
                <img src={logo} alt="" />
                <h5>Login to <span>E</span>shop</h5>
            </div>

            <div className="wrapper mt-3 shadow-sm p-4">
                <form onSubmit={SignIn}>
                  <div className={`form-group mb-1 mt-0 position-relative ${inputIndex ===0 && 'focus'}`}>
                    <span className='icon'><IoIosMail/></span>
                    <input type="text" className='form-control' placeholder='Enter you email'
                    onFocus={()=>focusInput(0)} onBlur={()=>setInputIndex(null)}
                    name="email"
                  onChange={onChangeInput}
                    />
                  </div>
                  <div className={`form-group mb-1  mt-0 position-relative ${inputIndex ===1 && 'focus'}`}>
                    <span className='icon'><IoIosLock/></span>
                    <input type={`${isShowPass ===true ? 'text':'password'}`} className='form-control' placeholder='Enter your password'
                    onFocus={()=>focusInput(1)} onBlur={()=>setInputIndex(null)}
                    name="password"
                  onChange={onChangeInput}
                    />
                    <span className='toggleShowPass' onClick={()=>setIsShowPass(!isShowPass)}>
                      {
                        isShowPass ===true ? <FaEyeSlash/>:<IoEyeSharp/>
                      }
                      
                      </span>
                  </div>
                  <div className="form-group">
                    <Button className='btn-big w-100' type='submit'>
                      Sign In
                    </Button>
                  </div>
                  <div className="form-group">
                    <Link to='/resetpassword' className='link'>
                      forgot password
                    </Link>

                    <div className=' mt-3 or d-flex mb-3 '>
                        <span className='line'></span>
                        <span className='txt'>or</span>
                        <span className='line'></span>
                    </div>


                    <div className="signinWhitGoogle">
                      <Button variant='outlined' className='w-100'>
                        <FaGoogle/> &nbsp;  continue whit google
                      </Button>
                    </div>
                  </div>
                </form>
            </div>

            <div className="wrapper mb-3 mt-2 shadow p-4 border ">
              <div className='text-center'>
                Don't have an account? 
                 <Link to="/signup" className='link color'>Register</Link>

              </div>
            </div>
        </div>
      
    </section>
    </>
  )
}

export default SignIn
