import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

 import { CiEdit } from "react-icons/ci";
 import { HiTrash } from "react-icons/hi2";
import {  deleteData, getData } from '../../util/api';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
const BannerButtomList = () => {
  const [isLoading,setIsLoading] =useState(false)
  const [slideBannerList ,setSlideBannerList] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [message, setMessage] = useState({ open: false, type: "", text: "" });
  const [deleteId, setDeleteId] = useState(null);
useEffect(() => {
    // Example: Fetch all categories
    getData("/bannerButtom")
      .then((res) => setSlideBannerList(res))
      .catch((err) => console.error(err));
  }, []);

 const navigate = useNavigate();

  const handleEdit = (item) => {
    navigate(`/bannerButtom/${item._id}`);
    // alert(item._id)
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
      const res = await deleteData(`/bannerButtom/${deleteId}`);
      setSlideBannerList((prev) => prev.filter((cat) => cat._id !== deleteId));
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
        text: error.message || "delete false please try again",
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
    navigate('/bannerBottom')
  }
  return (
    <>
      <div className="container">
        <div className="categoryListContainer">
          <div className="breadcrumbContainer">
            <div className="breadcrumb">
              <h2>Banner Bottom List</h2>
              <div className="breadRight">
                <span>
                  <Link to="/">Home</Link>~
                </span>
                <span>
                  <Link to="/" style={{color:"black"}}>Banner Bottom</Link>~
                </span>

                <span className=" text-secondary card shadow p-2 btn-add" onClick={add}>Upload</span>
              </div>
            </div>
          </div>

          <div className="categoryList card shadow p-3 mt-4 mb-3">
            <div className="categoryData">
              <table>
                <thead>
                  <tr>
                    <th width='30%'>image</th>
                    
                    <th>actions</th>
                  </tr>
                </thead>
                <tbody>
                  {slideBannerList.map((item, index) => (
    <tr key={item._id || index}>
      <td width='30%'>
        <div className="banner-slideImage">
          <img
            src={item.image}
            alt={item.name}
          />
        </div>
      </td>
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

export default BannerButtomList;
