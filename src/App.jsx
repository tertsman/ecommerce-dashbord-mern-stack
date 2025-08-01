import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, BrowserRouter, Route} from "react-router";
import Dashboard from "./page/dashboard/Dashboard";
import Header from "./component/header/Header";
import SideBar from "./component/sidebar/SideBar";
import ProductList from "./page/product/productList";
import UploadProduct from "./page/upload-product/UploadProduct";
import { createContext, useState } from "react";
import ProductView from "./page/product/ProductView";
import CategoryList from "./page/category/CategoryList";
import AddCategory from "./page/category/AddCategory";
import SubCategoryList from "./page/category/SubCategoryList";
import AddSubCategory from "./page/category/AddSubCategory";
import SignIn from "./page/auth/SignIn";
import SignUp from "./page/auth/SignUp";
import ResetPassword from "./page/auth/ResetPassword";
import { useEffect } from "react";
import OrdersPage from "./page/Order/OrdersPage";
import HomeBanner from "./page/HomeBanner/HomeBanner";
import HomeBannerList from "./page/HomeBanner/HomeBannerList";
import SlideBanner from "./page/slideBanner/SlideBanner";
import SlideBannerList from "./page/slideBanner/SlideBannerList";
import BannerButtom from "./page/BannerButtom/BannerButtom";
import BannerButtomList from "./page/BannerButtom/bannerButtonList";

const MyContext = createContext();
function App() {
// const navigate = useNavigate()
  const [isToggleSideBar,setIsToggleSideBar] = useState(false)
 const [isLogin,setIsLogin] = useState(false)
const [user,setUser]= useState({
  name:"",
  email:"",
  userId:""
})
 const [isHiddenSidebarAndHeader,setIsHiddenSidebarAndHeader] = useState(false)
  const values = {
   isToggleSideBar,
   setIsToggleSideBar,
   isLogin,setIsLogin,
   isHiddenSidebarAndHeader,setIsHiddenSidebarAndHeader,
   user,setUser
  }

  useEffect(()=>{
   const token = localStorage.getItem("token");

   if(token !== null && token !==""){
    setIsLogin(true)

    const userData = JSON.parse(localStorage.getItem('user'))
    setUser(userData)
    console.log(userData)
   }else{
    setIsLogin(false)
   }

  
  },[isLogin])


  return (
    <>
      <BrowserRouter>
      <MyContext.Provider value={values}>
        {
          isHiddenSidebarAndHeader!==true &&
        <Header />
        }
        <div className="main d-flex">
          {
            isHiddenSidebarAndHeader !==true &&
          <div className={`sidebarWrapper ${isToggleSideBar ===true ? 'toggle' : ''}`}>
            <SideBar/>
          </div>
          }
          <div className={`content ${isHiddenSidebarAndHeader ===true && 'full'} ${isToggleSideBar ===true ? 'toggle' : ''}`}>
            <Routes>
              <Route path="/" exact={true} element={<Dashboard />} />
              <Route path="/productList" exact={true} element={ <ProductList/> }/>
              <Route path="/uploadProduct" exact={true} element={ <UploadProduct/> }/>
              <Route path="/login" exact={true} element={ <SignIn/> }/>
              <Route path="/signup" exact={true} element={ <SignUp/> }/>
              <Route path="/resetpassword" exact={true} element={ <ResetPassword/> }/>
              <Route path="/EditProduct/:id" exact={true} element={ <UploadProduct/> }/>
              <Route path="/ProductView/:id" exact={true} element={ <ProductView/> }/>
              <Route path="/categoryList" exact={true} element={ <CategoryList/> }/>
              <Route path="/addCategory" exact={true} element={ <AddCategory/> }/>
              <Route path="/editCategory/:id" exact={true} element={ <AddCategory/> }/>
              <Route path="/subCategoryList" exact={true} element={ <SubCategoryList/> }/>
              <Route path="/addSubCategory" exact={true} element={ <AddSubCategory/> }/>
              <Route path="/order" exact={true} element={ <OrdersPage/> }/>
              <Route path="/homeBanner" exact={true} element={ <HomeBanner/> }/>
              <Route path="/homeBannerList" exact={true} element={ <HomeBannerList/> }/>
              <Route path="/homeBanner/:id" exact={true} element={ <HomeBanner/> }/>
              <Route path="/slideBanner" exact={true} element={ <SlideBanner/> }/>
              <Route path="/slideBannerList" exact={true} element={ <SlideBannerList/> }/>
              <Route path="/slideBanner/:id" exact={true} element={ <SlideBanner/> }/>
              <Route path="/bannerBottom" exact={true} element={ <BannerButtom/> }/>
              <Route path="/bannerButtomList" exact={true} element={ <BannerButtomList/> }/>
              <Route path="/bannerBottom/:id" exact={true} element={ <BannerButtom/> }/>
            </Routes>
          </div>
        </div>
        </MyContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;

export {MyContext}

