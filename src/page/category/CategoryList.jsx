import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

 import { CiEdit } from "react-icons/ci";
 import { HiTrash } from "react-icons/hi2";
import {  deleteData, getData } from '../../util/api';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
const CategoryList = () => {
  const [isLoading,setIsLoading] =useState(false)
  const [categoryList ,setCategoryList] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [message, setMessage] = useState({ open: false, type: "", text: "" });
  const [deleteId, setDeleteId] = useState(null);
useEffect(() => {
    // Example: Fetch all categories
    getData("/category")
      .then((res) => setCategoryList(res))
      .catch((err) => console.error(err));
  }, []);

 const navigate = useNavigate();

  const handleEdit = (item) => {
    navigate(`/editCategory/${item._id}`);
  };

 


  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenConfirm(true);
  };
  const handleClose = () => {
    setMessage({ ...message, open: false });
  };
  // Confirm delete
  const handleConfirmDelete = async () => {
    try {
      setIsLoading(true)
      const res = await deleteData(`/category/${deleteId}`);
      setCategoryList((prev) => prev.filter((cat) => cat._id !== deleteId));
       setMessage({
        open: true,
        type: "success",
        text: res.message || "deleted successfully",
      });
      setIsLoading(false)
    } catch (error) {
      setMessage({
        open: true,
        type: "error",
        text: error.message || "update successfully",
      });
      setIsLoading(false)
    } finally {
      setOpenConfirm(false);
      setDeleteId(null);
    }
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setOpenConfirm(false);
    setDeleteId(null);
  };
  const add = () =>{
    navigate('/addCategory')
  }
  return (
    <>
      <div className="container">
        <div className="categoryListContainer">
          <div className="breadcrumbContainer">
            <div className="breadcrumb">
              <h2>Category List</h2>
              <div className="breadRight">
                <span>
                  <Link to="/">Home</Link>~
                </span>
                <span>
                  <Link to="/">Category</Link>~
                </span>

                <span className=" text-secondary card shadow p-2 btn-add" onClick={add}>Add Category</span>
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
                    <th>color</th>
                    <th>actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryList.map((item, index) => (
    <tr key={item._id || index}>
      <td>
        <div className="cg-image-wrapper">
          <img
            src={item.images && item.images.length > 0 ? item.images[0] : "https://cdn-icons-png.flaticon.com/512/10786/10786217.png"}
            alt={item.name}
            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
          />
        </div>
      </td>
      <td>{item.name}</td>
      <td>{item.color}</td>
      <td>
        <div className="Actions">
         
          <div className="editbtn" onClick={() => handleEdit(item)}>
            <CiEdit />
          </div>
          <div className="deletebtn" onClick={() => handleDelete(item._id)}>
            <HiTrash />
          </div>
        </div>
      </td>
    </tr>
  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="footer">
            <p>&copy; copyright reserved ! 2025, developer Tert codding❤️</p>
        </div>
        </div>
      </div>
      <Dialog open={openConfirm} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this category?</DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button color="error" onClick={handleConfirmDelete}>{isLoading === true ? <CircularProgress color="inherit" className="loading" />: 'Delete'}</Button>
        </DialogActions>
      </Dialog>

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
    </>
  );
};

export default CategoryList;
