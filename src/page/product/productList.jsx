
import { Link, useNavigate } from 'react-router-dom'
import { RiShoppingBag4Fill } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import { IoShieldCheckmark } from "react-icons/io5";
import { useEffect, useState } from 'react';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { FaEye } from "react-icons/fa";
 import { CiEdit } from "react-icons/ci";
 import { HiTrash } from "react-icons/hi2";
import { deleteData, getData } from '../../util/api';
import { Snackbar, Alert } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Stack, Chip } from '@mui/material';
import { Rating } from "@mui/material";

const ProductList = () => {

      const [byRow, setByRow] = useState("");
      const [shortCategory, setShortCategory] = useState("");
      const [byBrand, setByBrand] = useState("");
      const navigate = useNavigate();
    
      const handleRow = (event) => {
        setByRow(event.target.value);
      };
      const handlebyBrand = (event) => {
        setByBrand(event.target.value);
      };
      const handleByCategory = (event) => {
        setShortCategory(event.target.value);
      };
const [rows, setRows] = useState([]);
const [openConfirm, setOpenConfirm] = useState(false);
const [isLoading, setIsLoading] = useState(false);
 const [deleteId, setDeleteId] = useState(null);
 const [message, setMessage] = useState({ open: false, type: "", text: "" });
const columns = [
  {
    field: "file",
    headerName: "Image",
    width: 100,
    renderCell: (params) => <Avatar src={params.value} alt="Product" />,
  },
  { field: "product", headerName: "Product Name", width: 200 },
  { field: "category", headerName: "Category", width: 150 },
  { field: "brand", headerName: "Brand", width: 130 },
  { field: "oldPrice", headerName: "Old Price ($)", width: 100 },
  { field: "price", headerName: "Price ($)", width: 100 },
  { field: "stock", headerName: "Stock", width: 100 },
  { field: "rating", headerName: "Rating", width: 100,
  renderCell:(params)=> <Rating name="read-only" value={Number(params.value)} readOnly size="small" />
  
   },
{
  field: 'colors',
  headerName: 'Colors',
  width: 200,
  renderCell: (params) => {
    const data = params.row?.colors || [];
    return (
      <Stack direction="row" spacing={0.5} flexWrap="wrap" className='mt-3'>
        {data.length > 0 ? (
          data.map((color, idx) => (
            <Chip
              key={idx}
              label={color}
              size="small"
              color="primary"
              variant="outlined"
            />
          ))
        ) : (
          <Chip label="No Data" size="small" color="default" />
        )}
      </Stack>
    );
  },
},
{
  field: 'weights',
  headerName: 'Weights',
  width: 200,
  renderCell: (params) => {
    const data = params.row?.weights || [];
    return (
      <Stack direction="row" spacing={0.5} flexWrap="wrap" className='mt-3'>
        {data.length > 0 ? (
          data.map((weight, idx) => (
            <Chip
              key={idx}
              label={weight}
              size="small"
              color="secondary"
              variant="outlined"
            />
          ))
        ) : (
          <Chip label="No Data" size="small" color="default" />
        )}
      </Stack>
    );
  },
},
{
  field: 'sizes',
  headerName: 'Sizes',
  width: 200,
  renderCell: (params) => {
    const data = params.row?.sizes || [];
    return (
      <Stack direction="row" spacing={0.5} flexWrap="wrap" className='mt-3'>
        {data.length > 0 ? (
          data.map((size, idx) => (
            <Chip
              key={idx}
              label={size}
              size="small"
              color="success"
              variant="outlined"
            />
          ))
        ) : (
          <Chip label="No Data" size="small" color="default" />
        )}
      </Stack>
    );
  },
},


  {
    field: "actions",
    headerName: "Actions",
    width: 130,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Box className="Actions">
        <IconButton className='Viewbtn' onClick={() => handleView(params.row)}>
          <FaEye />
        </IconButton>
        <IconButton className='editbtn' onClick={() => handleEdit(params.row)}>
          <CiEdit />
        </IconButton>
        <IconButton className='deletebtn' onClick={() => handleDelete(params.row.id)}>
          <HiTrash />
        </IconButton>
      </Box>
    ),
  },
];

  const handleConfirmDelete = async () => {
      try {
        setIsLoading(true)
        const res = await deleteData(`/product/${deleteId}`);
        setRows((prev) => prev.filter((row) => row.id !== deleteId));
      
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
  // const rows = [
  //   {
  //     id: 1,
  //     file: "https://via.placeholder.com/50",
  //     product: "iPhone 14",
  //     category: "Smartphone",
  //     brand: "Apple",
  //     price: 999,
  //     stock: 25,
  //     rating: 4.8,
  //     order: 120,
  //     sales: 120000,
  //   },
  //   {
  //     id: 2,
  //     file: "https://via.placeholder.com/50",
  //     product: "Galaxy S22",
  //     category: "Smartphone",
  //     brand: "Samsung",
  //     price: 899,
  //     stock: 30,
  //     rating: 4.6,
  //     order: 80,
  //     sales: 72000,
  //   },
  //   {
  //     id: 3,
  //     file: "https://via.placeholder.com/50",
  //     product: "Galaxy S22",
  //     category: "Smartphone",
  //     brand: "Samsung",
  //     price: 899,
  //     stock: 30,
  //     rating: 4.6,
  //     order: 80,
  //     sales: 72000,
  //   },
  //   {
  //     id: 4,
  //     file: "https://via.placeholder.com/50",
  //     product: "Galaxy S22",
  //     category: "Smartphone",
  //     brand: "Samsung",
  //     price: 899,
  //     stock: 30,
  //     rating: 4.6,
  //     order: 80,
  //     sales: 72000,
  //   },
  //   {
  //     id: 5,
  //     file: "https://via.placeholder.com/50",
  //     product: "Galaxy S22",
  //     category: "Smartphone",
  //     brand: "Samsung",
  //     price: 899,
  //     stock: 30,
  //     rating: 4.6,
  //     order: 80,
  //     sales: 72000,
  //   },
  //   {
  //     id: 6,
  //     file: "https://via.placeholder.com/50",
  //     product: "Galaxy S22",
  //     category: "Smartphone",
  //     brand: "Samsung",
  //     price: 899,
  //     stock: 30,
  //     rating: 4.6,
  //     order: 80,
  //     sales: 72000,
  //   },
  //   {
  //     id: 7,
  //     file: "https://via.placeholder.com/50",
  //     product: "Galaxy S22",
  //     category: "Smartphone",
  //     brand: "Samsung",
  //     price: 899,
  //     stock: 30,
  //     rating: 4.6,
  //     order: 80,
  //     sales: 72000,
  //   },
  //   {
  //     id: 8,
  //     file: "https://via.placeholder.com/50",
  //     product: "Galaxy S22",
  //     category: "Smartphone",
  //     brand: "Samsung",
  //     price: 899,
  //     stock: 30,
  //     rating: 4.6,
  //     order: 80,
  //     sales: 72000,
  //   },
  // ];
  useEffect(()=>{
    getProduct();
    
  },[])

 
  const getProduct = async() =>{
     try {
      const res = await getData("/product"); // 🔁 API path
     

      if (Array.isArray(res)) {
        const formatted = res.map((item) => ({
          id: item._id,
          file: item.images?.[0], // ✅ Use first image
          product: item.name,
          category: item.category?.name || "N/A",
          brand: item.brand,
          oldPrice:item.oldPrice,
          price: item.price,
          stock: item.countInStock,
          rating: item.rating,
         colors: Array.isArray(item.colors) ? item.colors : [],
          weights: Array.isArray(item.weights) ? item.weights : [],
          sizes: Array.isArray(item.sizes) ? item.sizes : [],
        }));

        setRows(formatted);
         console.log("Formatted rows:", formatted);
      } else {
        console.error("Error loading products", res);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }


 
  
  
  const handleEdit =(row)=> {
    navigate(`/EditProduct/${row.id}`);
  }

  const handleDelete =(id)=>{
    setDeleteId(id);
    setOpenConfirm(true);
  }
  const handleView =(row)=>{
    // console.log("Delete ID:", id);
    navigate(`/ProductView/${row.id}`);
  }
const handleClose = () => {
    setMessage({ ...message, open: false });
  };
 
 const paginationModel = { page: 0, pageSize: 5 };
 const add = () =>{
    navigate('/uploadProduct')
  }
  return (
    <>
         <Dialog open={openConfirm} onClose={handleCancelDelete}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>Are you sure you want to delete this category?</DialogContent>
                <DialogActions>
                  <Button onClick={handleCancelDelete}>Cancel</Button>
                  <Button color="error" onClick={handleConfirmDelete}>{isLoading === true ? <CircularProgress color="inherit" className="loading" />: 'Delete'}</Button>
                </DialogActions>
              </Dialog>
      <div className="container">
        <div className="breadcrumbContainer">
            <div className="breadcrumb">
                <h2>Product List</h2>
                <div className="breadRight">
                    <span><Link to="/">Home</Link>~</span>
                    <span ><Link to="/">Product</Link>~</span>
                     <span className=" text-secondary card shadow p-2 btn-add rounded-5" onClick={add}>Add Product</span>
                </div>
            </div>
        </div>
        <div className="ProductReport mt-5">
                
        <div className="row">
            <div className="col-lg-4 col sm-6">
                <div className="totalProduct mt-2 p-4 border-0 card shadow lg">
                    <h3>53,06</h3>
                    <p>total product</p>
                    <RiShoppingBag4Fill/>
                </div>
            </div>
            <div className="col-lg-4 col sm-6 p-2">
                <div className="totalCategory  p-4 border-0 card shadow lg">
                     <h3>53,06</h3>
                    <p>total product</p>
                    <BiCategory/>
                </div>
            </div>
            <div className="col-lg-4 col sm-6 p-2">
                <div className="totalBrand  p-4 border-0 card shadow lg">
                     <h3>53,06</h3>
                    <p>total product</p>
                    <IoShieldCheckmark/>
                </div>
            </div>
        </div>
        </div>

        <div className="card shadow border-0 p-3 mt-4 productList">
                  <div className="row cardFilter mt-3 mb-2">
                    <div className="col-md-3">
                      <h4>Show By</h4>
                      <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
                        <InputLabel id="demo-select-small-label">Row</InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={byRow}
                          label="Row"
                          onChange={handleRow}
                        >
                          <MenuItem value={10}>10Row</MenuItem>
                          <MenuItem value={20}>20Row</MenuItem>
                          <MenuItem value={30}>30Row</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-md-3">
                      <h4>category By</h4>
                      <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
                        <InputLabel id="demo-select-small-label">category</InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={shortCategory}
                          label="category"
                          onChange={handleByCategory}
                        >
                          <MenuItem value={"Mens"}>Mens</MenuItem>
                          <MenuItem value={"Womans"}>Womans</MenuItem>
                          <MenuItem value={"Kids"}>Kids</MenuItem>
                          <MenuItem value={"Accessory"}>Accessory</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-md-3">
                      <h4>brand by</h4>
                      <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
                        <InputLabel id="demo-select-small-label">Brand</InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={byBrand}
                          label="Brand"
                          onChange={handlebyBrand}
                        >
                          <MenuItem value=""></MenuItem>
                          <MenuItem value={"nike"}>Nike</MenuItem>
                          <MenuItem value={"ecstasy"}>Ecstasy</MenuItem>
                          <MenuItem value={"freelance"}>Freelance</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-md-3">
                      <h4>search by</h4>
                      <TextField
                        label="id/name/categry/brand"
                        id="outlined-size-small"
                        size="small"
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <div className="bestsellingData">
                    <Box sx={{ height: 500, width: "100%" }}>
                      <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        // sx={{ border: 0 }}
                        initialState={{ pagination: { paginationModel } }}
                      />
                    </Box>
                  </div>
                </div>
      </div>
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
  )
}

export default ProductList
