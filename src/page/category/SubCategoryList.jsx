import React from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const SubCategoryList = (params) => {



  const handledelete =(id)=>{
    console.log("Delete ID:", id);
    // alert(id)
  }
 
  return (
    <>
      <div className="container">
        <div className="categoryListContainer">
          <div className="breadcrumbContainer">
            <div className="breadcrumb">
              <h2>Subcategory List</h2>
              <div className="breadRight">
                <span>
                  <Link to="/">Home</Link>~
                </span>
                <span>
                  <Link to="/">Category</Link>~
                </span>
                <span className=" text-secondary ">SubCategory List</span>
              </div>
            </div>
          </div>

          <div className="categoryList card shadow p-3 mt-4 mb-3">
            <div className="categoryData">
              <table>
                <thead>
                  <tr>
                    <th>image</th>
                    <th>category</th>
                    <th>Sub category</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="cg-image-wrapper">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/10786/10786217.png"
                          alt="fashion"
                        />
                      </div>
                    </td>
                    <td>Fashion</td>
                    <td>
                      <span className="badge rounded-pill bg-info mx-1 ">mens <IoMdClose role="button" tabindex="0" onClick={() => handledelete(params)} /></span>
                      <span className="badge rounded-pill bg-info mx-1 ">Womans <IoMdClose role="button" tabindex="0" onClick={() => handledelete(params)} /></span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="cg-image-wrapper">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/10786/10786217.png"
                          alt="fashion"
                        />
                      </div>
                    </td>
                    <td>Electronic</td>
                    <td>
                      <span className="badge rounded-pill bg-info mx-1 ">Laptop <IoMdClose role="button" tabindex="0" onClick={() => handledelete(params)} /></span>
                      <span className="badge rounded-pill bg-info mx-1 ">Accessory smart Watch <IoMdClose role="button" tabindex="0" onClick={() => handledelete(params)} /></span>
                    </td>
                  </tr>
                 
                </tbody>
              </table>
            </div>
          </div>

          <div className="footer">
            <p>&copy; copyright reserved ! 2025, developer Tert codding❤️</p>
        </div>
        </div>
      </div>
    </>
  );
};

export default SubCategoryList;
