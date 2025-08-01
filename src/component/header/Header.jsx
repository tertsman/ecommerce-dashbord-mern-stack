import React, { useContext} from "react";
import logo from "../../assets/image/ecommerce.png";
import Button from "@mui/material/Button";
import { MdOutlineMenuOpen } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import SearchBox from "../searchbox/SearchBox";
import { CiLight } from "react-icons/ci";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { BsFillShieldLockFill } from "react-icons/bs";
import { FiUserPlus } from "react-icons/fi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { MyContext } from "../../App";


const Header = () => {
 
 const navigate = useNavigate()
  const context = useContext(MyContext)

  const  logout = ()=>{
    localStorage.clear();
    navigate('/login')
  }

 
  return (
    <div>
      <header className="d-flex align-items-center">
        <div className="container-fluid w-100">
          <div className="row d-flex align-items-center">
            <div className=" col-sm-2 part1 ">
              <Link to={"/"} className=" d-flex align-items-center logo ">
                <img src={logo} />
                <h5><span>E</span>shop</h5>
              </Link>
            </div>
            <div className=" col-sm-3 part2 d-flex align-items-center ">
              <button className="rounded-circle mr-3" onClick={()=> context.setIsToggleSideBar(!context.isToggleSideBar)}>
               
                {
                  context.isToggleSideBar ===false ?  <MdOutlineMenuOpen /> : <IoMdMenu/>
                }
              </button>
              <SearchBox />
            </div>
            <div className=" col-sm-7 part3 d-flex align-items-center justify-content-end ">
              <button className="rounded-circle mr-3">
                <CiLight />
              </button>
              <button className="rounded-circle mr-3">
                <MdOutlineShoppingCart />
              </button>
              <button className="rounded-circle mr-3">
                <MdOutlineMarkEmailRead />
              </button>
              <div className="notifications">
                <button className="rounded-circle notifications mr-3">
                  <MdOutlineNotificationsNone className="not_avg" />
                </button>
                <div className="droupdown-noti">
                  <div className="noti-head d-flex align-items-center ">
                    <h3>Notifications(34)</h3>
                    <IoMdSettings className="" />
                  </div>
                  <ul className="dropItem">
                    <li className="d-flex align-items-center ">
                      <div className="noti-main d-lg-flex ">
                        <div className="noti_avtar">
                          <div className="noti-pf">
                            <img
                              src="https://th.bing.com/th/id/OIF.VKuX05buHNsZrkEe8LGulw?rs=1&pid=ImgDetMain"
                              alt=""
                            />
                          </div>
                          <div className="noti-reaction">
                            <IoMdHeart />
                          </div>
                        </div>
                        <div className="noti-info">
                          <p>
                            <b>Labanno</b> Leave her comment to{" "}
                            <b>Dressni Breathable Female Dress</b>
                          </p>
                          <p className="time-not">few seconds ago!</p>
                        </div>
                        <div className="noti-action"></div>
                      </div>
                    </li>
                    <li className="d-flex align-items-center ">
                      <div className="noti-main d-lg-flex ">
                        <div className="noti_avtar">
                          <div className="noti-pf">
                            <img
                              src="https://th.bing.com/th/id/OIF.VKuX05buHNsZrkEe8LGulw?rs=1&pid=ImgDetMain"
                              alt=""
                            />
                          </div>
                          <div className="noti-reaction">
                            <IoMdHeart />
                          </div>
                        </div>
                        <div className="noti-info">
                          <p>
                            <b>Labanno</b> Leave her comment to{" "}
                            <b>Dressni Breathable Female Dress</b>
                          </p>
                          <p className="time-not">few seconds ago!</p>
                        </div>
                        <div className="noti-action">
                          
                        </div>
                      </div>
                    </li>
                    <li className="d-flex align-items-center ">
                      <div className="noti-main d-lg-flex ">
                        <div className="noti_avtar">
                          <div className="noti-pf">
                            <img
                              src="https://th.bing.com/th/id/OIF.VKuX05buHNsZrkEe8LGulw?rs=1&pid=ImgDetMain"
                              alt=""
                            />
                          </div>
                          <div className="noti-reaction">
                            <IoMdHeart />
                          </div>
                        </div>
                        <div className="noti-info">
                          <p>
                            <b>Labanno</b> Leave her comment to{" "}
                            <b>Dressni Breathable Female Dress</b>
                          </p>
                          <p className="time-not">few seconds ago!</p>
                        </div>
                        <div className="noti-action"></div>
                      </div>
                    </li>
                    <li className="d-flex align-items-center ">
                      <div className="noti-main d-lg-flex ">
                        <div className="noti_avtar">
                          <div className="noti-pf">
                            <img
                              src="https://th.bing.com/th/id/OIF.VKuX05buHNsZrkEe8LGulw?rs=1&pid=ImgDetMain"
                              alt=""
                            />
                          </div>
                          <div className="noti-reaction">
                            <IoMdHeart />
                          </div>
                        </div>
                        <div className="noti-info">
                          <p>
                            <b>Labanno</b> Leave her comment to{" "}
                            <b>Dressni Breathable Female Dress</b>
                          </p>
                          <p className="time-not">few seconds ago!</p>
                        </div>
                        <div className="noti-action"></div>
                      </div>
                    </li>
                  </ul>
                  <div className="not-foo">
                    <div className="not-btn">view all notifications</div>
                  </div>
                </div>
              </div>

              {
                context.isLogin !== true ?<Link to="/login"> <Button className="btn-signin">Sing In</Button></Link> :<div>
                <div className="myAcc position-relative">
                  <div className="userImg">
                    <span className="rounded-circle text-uppercase fw-bold fs-5  ">
                      {context.user?.name.charAt(0)}
                      {/* <img
                        src="https://th.bing.com/th/id/OIF.VKuX05buHNsZrkEe8LGulw?rs=1&pid=ImgDetMain"
                        alt=""
                      /> */}
                    </span>
                  </div>
                  <div className="userInfo">
                    <h3>{context.user?.name}</h3>
                    <p>{context.user?.email}</p>
                  </div>
                  <div className="droupdownpf">
                    <ul className="dropItem">
                      <li className="d-flex align-items-center ">
                        <span className="dropIcon">
                          <FiUserPlus />
                        </span>
                        <span className="dropTitle">My Account</span>
                      </li>
                      <li className="d-flex align-items-center ">
                        <span className="dropIcon">
                          <BsFillShieldLockFill />
                        </span>
                        <span className="dropTitle">Reset Password</span>
                      </li>
                      <li className="d-flex align-items-center ">
                        <span className="dropIcon">
                          <RiLogoutCircleRLine />
                        </span>
                        <span className="dropTitle" onClick={logout}>Logout</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              }
                
              
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
