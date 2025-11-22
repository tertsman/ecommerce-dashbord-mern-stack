import React, { useContext, useEffect, useState } from 'react'
import logo from "../../assets/image/ecommerce.png"
import pattern from "../../assets/image/pattern.webp"
import { IoIosMail } from "react-icons/io";
import { MyContext } from '../../App'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
const ResetPassword = () => {
   const context = useContext(MyContext)
   const [inputIndex,setInputIndex]= useState(null)
    useEffect(()=>{
        context.setIsHiddenSidebarAndHeader(true);
    },[])

    const focusInput =(index)=>{
      setInputIndex(index)
    }
  return (
    <>
    <img src={pattern} className='LoginPattern' alt="" />
    <section className=' signInSection  position-relative '>
        <div className='SignInBox'>
            <div className="logo text-center">
                <img src={logo} alt="" />
                <h5>reset the password</h5>
            </div>

            <div className="wrapper mt-3 shadow-sm p-4">
                <form action="">
                  <div className={`form-group mb-1 mt-0 position-relative ${inputIndex ===0 && 'focus'}`}>
                    <span className='icon'><IoIosMail/></span>
                    <input type="text" className='form-control' placeholder='Enter you email'
                    onFocus={()=>focusInput(0)} onBlur={()=>setInputIndex(null)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <Button className='btn-big w-100'>
                      Get Link
                    </Button>
                  </div>
                 
                </form>
            </div>

            <div className="wrapper mb-3 mt-2 shadow p-4 border ">
              <div className='text-center'>
                remember the password?
                 <Link to="/login" className='link color'>Login</Link>

              </div>
            </div>
        </div>
      
    </section>
    </>
  )
}

export default ResetPassword
