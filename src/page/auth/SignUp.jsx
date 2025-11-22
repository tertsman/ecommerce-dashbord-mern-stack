import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import logo from "../../assets/image/ecommerce.png";
import pattern from "../../assets/image/pattern.webp";
import { IoIosMail } from "react-icons/io";
import { IoIosLock } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import { BsShieldFillCheck } from "react-icons/bs";
import { Snackbar, Alert } from "@mui/material";
import { postData,APIpostData } from "../../util/api";


import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { firebaseApp } from "../../firebase";
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider()
const SignUp = () => {
  const navigate = useNavigate();
  const context = useContext(MyContext);
  const [inputIndex, setInputIndex] = useState(null);
  const [isShowPass, setIsShowPass] = useState(false);

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const clearForm = () => {
    setFormFields({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };
  const [message, setMessage] = useState({ open: false, type: "", text: "" });
  useEffect(() => {
    context.setIsHiddenSidebarAndHeader(true);
  }, []);
  const focusInput = (index) => {
    setInputIndex(index);
  };
  const onChangeInput = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };
  const handleClose = () => {
    setMessage({ ...message, open: false });
  };
  const SignUp = async (e) => {
    e.preventDefault();
    if (formFields.name == "") {
      setMessage({
        open: true,
        type: "error",
        text: "please field in name",
      });
      return false;
    }
    if (formFields.email == "") {
      setMessage({
        open: true,
        type: "error",
        text: "please field in email",
      });
      return false;
    }
    if (formFields.phone == "") {
      setMessage({
        open: true,
        type: "error",
        text: "please field in phone",
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
    if (formFields.confirmPassword == "") {
      setMessage({
        open: true,
        type: "error",
        text: "confirm password",
      });
      return false;
    }

    if (formFields.confirmPassword !== formFields.password) {
      setMessage({
        open: true,
        type: "error",
        text: "password not match",
      });
      return false;
    }

    const formData = new FormData();
    formData.append("name", formFields.name);
    formData.append("email", formFields.email);
    formData.append("phone", formFields.phone);
    formData.append("password", formFields.password);
    formData.append("isAdmin", true)
    formData.append("confirmPassword", formFields.confirmPassword);

    try {
      const res = await postData("/user/signup", formData);
      console.log(res);

      setMessage({
        open: true,
        type: "success",
        text: "Sing up success",
      });

      clearForm();
      navigate("/login");
    } catch (err) {
      setMessage({
        open: true,
        type: "error",
        text: err.response?.data?.msg || err.message,
      });
    }
  };

  // sing with google 
        const signInWithGoogle =  () => {
          signInWithPopup(auth,googleProvider)
          .then((result) =>{
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken; 
            const user = result.user;
            const fields = {
              name:user.providerData[0].displayName,
              email:user.providerData[0].email,
              password:null,
              phone:user.providerData[0].phoneNumber,
              isAdmin:false
            }
            APIpostData("user/authWithGoogle",fields).then((res)=>{
              setMessage({
              open: true,
              type: "success",
              text: res.msg || "user Authenticated!"
            });
            localStorage.setItem("token", res.token);  // <=== ផ្ទុក JWT token មកពី backend
            localStorage.setItem("user", JSON.stringify(res.user)); 
            // navigate("/");
            window.location.href = "/";
            })
   
          })
        }

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
      <img src={pattern} className="LoginPattern" alt="" />
      <section className=" signInSection signUp position-relative ">
        <div className="SignInBox signUpBox">
          <div className="logo text-center">
            <img src={logo} alt="" />
            <h5>Register a new account</h5>
          </div>

          <div className="wrapper  mt-3 shadow-sm p-4">
            <form onSubmit={SignUp}>
              <div
                className={`form-group mb-1 mt-0 position-relative ${
                  inputIndex === 0 && "focus"
                }`}
              >
                <span className="icon">
                  <FaUserCircle />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter you name"
                  onFocus={() => focusInput(0)}
                  onBlur={() => setInputIndex(null)}
                  name="name"
                  onChange={onChangeInput}
                />
              </div>
              <div
                className={`form-group mb-1 mt-0 position-relative ${
                  inputIndex === 1 && "focus"
                }`}
              >
                <span className="icon">
                  <IoIosMail />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter you email"
                  onFocus={() => focusInput(1)}
                  onBlur={() => setInputIndex(null)}
                  name="email"
                  onChange={onChangeInput}
                />
              </div>
              <div
                className={`form-group mb-1 mt-0 position-relative ${
                  inputIndex === 2 && "focus"
                }`}
              >
                <span className="icon">
                  <MdLocalPhone />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter you phone number"
                  onFocus={() => focusInput(2)}
                  onBlur={() => setInputIndex(null)}
                  name="phone"
                  onChange={onChangeInput}
                />
              </div>
              <div
                className={`form-group mb-1  mt-0 position-relative ${
                  inputIndex === 3 && "focus"
                }`}
              >
                <span className="icon">
                  <IoIosLock />
                </span>
                <input
                  type={`${isShowPass === true ? "text" : "password"}`}
                  className="form-control"
                  placeholder="Enter your password"
                  onFocus={() => focusInput(3)}
                  onBlur={() => setInputIndex(null)}
                  name="password"
                  onChange={onChangeInput}
                />
                <span
                  className="toggleShowPass"
                  onClick={() => setIsShowPass(!isShowPass)}
                >
                  {isShowPass === true ? <FaEyeSlash /> : <IoEyeSharp />}
                </span>
              </div>
              <div
                className={`form-group mb-1  mt-0 position-relative ${
                  inputIndex === 4 && "focus"
                }`}
              >
                <span className="icon">
                  <BsShieldFillCheck />
                </span>
                <input
                  type={`${isShowPass === true ? "text" : "password"}`}
                  className="form-control"
                  placeholder="confirm password"
                  onFocus={() => focusInput(4)}
                  onBlur={() => setInputIndex(null)}
                  name="confirmPassword"
                  onChange={onChangeInput}
                />
                <span
                  className="toggleShowPass"
                  onClick={() => setIsShowPass(!isShowPass)}
                >
                  {isShowPass === true ? <FaEyeSlash /> : <IoEyeSharp />}
                </span>
              </div>

              <div className="form-group agree">
                <input type="checkbox" id="agree" className="custom-checkbox" />
                <label htmlFor="agree" className="checkbox-label">
                  I agree to the all Terms & Condiotions
                </label>
                {/* <input type="checkbox" />
                <span>I agree to the all Terms & Condiotions</span> */}
              </div>
              <div className="form-group">
                <Button className="btn-big w-100" type="submit">
                  Sign Up
                </Button>
              </div>
              <div className="form-group">
                <div className=" mt-3 or d-flex mb-3 ">
                  <span className="line"></span>
                  <span className="txt">or</span>
                  <span className="line"></span>
                </div>

                <div className="signinWhitGoogle">
                  <Button variant="outlined" className="w-100" onClick={signInWithGoogle}>
                    <FaGoogle /> &nbsp; continue whit google
                  </Button>
                </div>
              </div>
            </form>
          </div>

          <div className="wrapper mb-3 mt-2 shadow p-4 border ">
            <div className="text-center">
              Already have an account?
              <Link to="/login" className="link color">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
