import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineCloudUpload } from "react-icons/md";
const AddSubCategory = () => {
  return (
    <>
      <div className="container">
        <div className="addSubCategoryContainer">
          <div className="breadcrumbContainer">
            <div className="breadcrumb">
              <h2>Subcategory List</h2>
              <div className="breadRight">
                <span>
                  <Link to="/">Home</Link> ~
                </span>
                <span>
                  <Link to="/">Category</Link> ~
                </span>
                <span className=" text-secondary ">SubCategory List</span>
              </div>
            </div>
          </div>
          <form action="" className="form">
            <div className="row">
                <div className="col-md-9 mt-3 mb-3 ">
                <div className="addSubcategory card shadow border-0 p-3 ">
                    <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select name="category" id="category">
                        <option value="none">none</option>
                        <option value="men">Mens</option>
                        <option value="fashion">Fashions</option>
                        <option value="electronic">Electronic</option>
                        <option value="bag">Bag</option>
                    </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="sub">sub category</label>
                        <input type="text" placeholder="type here..."/>
                    </div>
                    <button className="publish-button w-100"><MdOutlineCloudUpload/> PUBLISH AND VIEW</button>
                </div>
                </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddSubCategory;
