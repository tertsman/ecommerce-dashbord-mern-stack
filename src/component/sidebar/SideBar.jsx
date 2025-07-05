import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { BiSolidDashboard } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { FaProductHunt } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { BiSolidCategory } from "react-icons/bi";
import { MdMessage } from "react-icons/md";
import { MdNotificationAdd } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { Link } from "react-router";
import { MyContext } from '../../App';


const SideBar = () => {

    const [activeTab,setActiveTab] = useState(0);
    const [isToggleSubmenu,setIsToggleSubmenu] = useState(false)

    const isOpenSubmenu = (index)=>{
        setActiveTab(index)
        setIsToggleSubmenu(!isToggleSubmenu);
    }


  return (
    <>
        <div className="sidebar">
            <div className="sideHead">
                <h3>main page</h3>
            </div>
            <ul>
                <li>
                    <Link to="/">
                        <Button className={`w-100 ${activeTab ===0 ? 'active' : '' }`} onClick={()=>isOpenSubmenu(0)}>
                            <span className="icon"><BiSolidDashboard/></span>
                            Dashboard
                            <span className="arrow"><IoIosArrowForward/></span>
                        </Button>
                    </Link>
                </li>
                <li>
                    <Button className={`w-100 ${activeTab ===1 && isToggleSubmenu === true ? 'active' : '' }`} onClick={()=>isOpenSubmenu(1)}>
                        <span className="icon"><FaProductHunt/></span>
                        product
                        <span className="arrow"><IoIosArrowForward/></span>
                    </Button>
                    <div className={`submenuWrapper ${activeTab === 1 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                    <ul className="submenu">
                        <li><Link to="/productList">
                         Product List
                        </Link></li>
                        <li><Link to="/ProductView">
                         Product View
                        </Link></li>
                        <li><Link to="/uploadProduct">
                         Product Upload
                        </Link></li>
                    </ul>
                 </div>
                </li>
                <li>
                    <Button className={`w-100 ${activeTab ===2 ? 'active' : '' }`} onClick={()=>isOpenSubmenu(2)}>
                        <span className="icon"><BiSolidCategory/></span>
                        Categories
                        <span className="arrow"><IoIosArrowForward/></span>
                    </Button>
                    <div className={`submenuWrapper ${activeTab === 2 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                    <ul className="submenu">
                        <li><Link to="/categoryList">
                         Category List
                        </Link></li>
                        <li><Link to="/addCategory">
                         Add Category
                        </Link></li>
                        <li><Link to="/subCategoryList">
                         SubCategory
                        </Link></li>
                        <li><Link to="/addSubCategory">
                         Add SubCategory
                        </Link></li>
                    </ul>
                 </div>
                </li>
                <li>
                    <Button className={`w-100 ${activeTab ===3 ? 'active' : '' }`} onClick={()=>isOpenSubmenu(3)}>
                        <span className="icon"><IoMdCart/></span>
                        Orders
                        <span className="arrow"><IoIosArrowForward/></span>
                    </Button>
                </li>
                <li>
                    <Button className={`w-100 ${activeTab ===4 ? 'active' : '' }`} onClick={()=>isOpenSubmenu(4)}>
                        <span className="icon"><MdMessage/></span>
                        messages
                        <span className="arrow"><IoIosArrowForward/></span>
                    </Button>
                </li>
                <li>
                    <Button className={`w-100 ${activeTab ===5 ? 'active' : '' }`} onClick={()=>isOpenSubmenu(5)}>
                        <span className="icon"><MdNotificationAdd/></span>
                        notifications
                        <span className="arrow"><IoIosArrowForward/></span>
                    </Button>
                </li>
                <li>
                    
                    <Button className={`w-100 ${activeTab ===6 ? 'active' : '' }`} onClick={()=>isOpenSubmenu(6)}>
                        <span className="icon"><IoIosSettings/></span>
                        settings
                        <span className="arrow"><IoIosArrowForward/></span>
                    </Button>
                </li>
               
            </ul>
        </div>
    </>
  )
}

export default SideBar
