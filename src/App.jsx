import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, BrowserRouter, Route } from "react-router";
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

const MyContext = createContext();
function App() {

  const [isToggleSideBar,setIsToggleSideBar] = useState(false)

  const values = {
   isToggleSideBar,
   setIsToggleSideBar
  }


  return (
    <>
      <BrowserRouter>
      <MyContext.Provider value={values}>
        <Header />
        <div className="main d-flex">
          <div className={`sidebarWrapper ${isToggleSideBar ===true ? 'toggle' : ''}`}>
            <SideBar/>
          </div>
          <div className={`content ${isToggleSideBar ===true ? 'toggle' : ''}`}>
            <Routes>
              <Route path="/" exact={true} element={<Dashboard />} />
              <Route path="/productList" exact={true} element={ <ProductList/> }/>
              <Route path="/uploadProduct" exact={true} element={ <UploadProduct/> }/>
              <Route path="/EditProduct/:id" exact={true} element={ <UploadProduct/> }/>
              <Route path="/ProductView/:id" exact={true} element={ <ProductView/> }/>
              <Route path="/categoryList" exact={true} element={ <CategoryList/> }/>
              <Route path="/addCategory" exact={true} element={ <AddCategory/> }/>
              <Route path="/editCategory/:id" exact={true} element={ <AddCategory/> }/>
              <Route path="/subCategoryList" exact={true} element={ <SubCategoryList/> }/>
              <Route path="/addSubCategory" exact={true} element={ <AddSubCategory/> }/>
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

