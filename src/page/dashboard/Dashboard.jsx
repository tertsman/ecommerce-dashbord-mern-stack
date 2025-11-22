import  { useContext, useEffect, useState } from "react";
import DashbaordBox from "./DashbaordBox";
import { LuUsers } from "react-icons/lu";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { RiShoppingBagFill } from "react-icons/ri";
import { GiStarsStack } from "react-icons/gi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IoTimerOutline } from "react-icons/io5";
import { LineChart } from "@mui/x-charts/LineChart";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import { DataGrid } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";

import { Box } from "@mui/material";
import CasesIcon from "@mui/icons-material/Cases";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import LayersIcon from "@mui/icons-material/Layers";

import { MdDateRange } from "react-icons/md";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import OrderOverView from "../../component/orderoverview/OrderOverView";
import CustomizeMenu from "../../component/customizmune/CustomizeMenu";
import { MdMessage } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import RecentActivities from "../../component/recent-avtivity/RecentActivities";
import { deleteData, getData } from "../../util/api";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import { Stack, Chip } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { CiEdit } from "react-icons/ci";
 import { HiTrash } from "react-icons/hi2";


import CircularProgress from "@mui/material/CircularProgress";
import { MyContext } from "../../App";



const ITEM_HEIGHT = 48;
const Dashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
const navigate = useNavigate();
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
  { field: "rating", headerName: "Rating", width: 100 },
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
const context = useContext(MyContext)
  useEffect(()=>{
    getProduct();
    context.setIsHiddenSidebarAndHeader(false);
    
  },[])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const [byRow, setByRow] = useState("");
  const [shortCategory, setShortCategory] = useState("");
  const [byBrand, setByBrand] = useState("");

  const handleRow = (event) => {
    setByRow(event.target.value);
  };
  const handlebyBrand = (event) => {
    setByBrand(event.target.value);
  };
  const handleByCategory = (event) => {
    setShortCategory(event.target.value);
  };



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
  const paginationModel = { page: 0, pageSize: 5 };

  const data = [
    { month: "JAN", invested: 300, earnings: 200, expenses: 150 },
    { month: "FEB", invested: 320, earnings: 240, expenses: 180 },
    { month: "MAR", invested: 350, earnings: 250, expenses: 200 },
    { month: "APR", invested: 300, earnings: 200, expenses: 150 },
    { month: "MAY", invested: 400, earnings: 300, expenses: 220 },
    { month: "JUN", invested: 500, earnings: 370, expenses: 280 },
    { month: "JUL", invested: 350, earnings: 300, expenses: 260 },
    { month: "AGU", invested: 370, earnings: 320, expenses: 270 },
    { month: "SEP", invested: 450, earnings: 350, expenses: 300 },
    { month: "OCT", invested: 470, earnings: 340, expenses: 290 },
    { month: "NOV", invested: 380, earnings: 310, expenses: 260 },
    { month: "DEC", invested: 320, earnings: 280, expenses: 240 },
  ];

  return (
    <>
      <div className="right-content w-100">
        <div className="dashboardBoxWrapper row ">
          <div className="col-md-8 ">
            <div className="dashboardBoxContainer d-flex">
              <DashbaordBox
                title={"Customer"}
                identifier={"78,543"}
                icon={<LuUsers />}
                arrowUp={<FaArrowTrendUp />}
                statis={"5.25%"}
              />
              <DashbaordBox
                title={"Order"}
                identifier={"5,543"}
                icon={<MdOutlineAddShoppingCart />}
                arrowUp={<FaArrowTrendDown />}
                statis={"8.25%"}
                color={"#D91656"}
              />
              <DashbaordBox
                title={"Product"}
                identifier={"543"}
                icon={<RiShoppingBagFill />}
                arrowUp={<FaArrowTrendUp />}
                statis={"5.25%"}
              />
              <DashbaordBox
                title={"Review"}
                identifier={"4,570"}
                icon={<GiStarsStack />}
                arrowUp={<FaArrowTrendDown />}
                statis={"5.25%"}
                color={"#D91656"}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="Box grabBox">
              <div className="head_re">
                <h1>Top sale</h1>
                <div className="topEle">
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? "long-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    className="El_drop"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      paper: {
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: "20ch",
                        },
                      },
                      list: {
                        "aria-labelledby": "long-button",
                      },
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <IoTimerOutline className=" fs-4 fw-bolder" />
                      &nbsp; last Day
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <IoTimerOutline className=" fs-4 fw-bolder" />
                      &nbsp; last Week
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <IoTimerOutline className=" fs-4 fw-bolder" />
                      &nbsp; last Month
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <IoTimerOutline className=" fs-4 fw-bolder" />
                      &nbsp; last Year
                    </MenuItem>
                  </Menu>
                </div>
              </div>
              <div className="sale-card-amount">
                <h3>$3,787,681.00</h3>
                <p className="trendingUp">
                  40.63%
                  <FaArrowTrendUp />
                </p>
              </div>
              <div className="sale-compere">
                <p>$3,578.90 in last month</p>
              </div>
              <div className="rechartContainer">
                <LineChart
                  xAxis={[
                    {
                      data: [1, 2, 3, 5, 8, 10],
                      axisLine: false, // លាក់បន្ទាត់ axis
                      tickLine: false,
                    },
                  ]}
                  series={[
                    {
                      data: [2, 5.5, 2, 8.5, 1.5, 5],
                      area: true,
                      color: "rgba(240, 33, 243, 0.13)",
                      showMark: false, // លាក់ dot
                      curve: null, // បំបាត់ line smooth effect

                      strokeWidth: 0,
                      grid: { horizontal: false, vertical: false },
                    },
                  ]}
                  height={300}
                  width={462}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow border-0 p-3 mt-4 bestSellingContainer ">
          <h3>Best selling Products</h3>

          <div className="row cardFilter mt-3 mb-2">
            <div className="col">
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
        <div className="revenueReportContainer mt-4 p-3">
          <div className="row">
            <div className="col-md-7 card shadow revenueReport p-3 mb-1">
              <div className="revenueReportHeader">
                <h3>revenue report</h3>
                <div className="mc-icon-field">
                  <MdDateRange />
                  <select>
                    <option>Select Option</option>
                    <option value="year 2021">year 2021</option>
                    <option value="year 2020">year 2020</option>
                    <option value="year 2019">year 2019</option>
                    <option value="year 2018">year 2018</option>
                    <option value="year 2017">year 2017</option>
                    <option value="year 2016">year 2016</option>
                    <option value="year 2015">year 2015</option>
                  </select>
                </div>
              </div>
              <div className="mc-revenue-card-group">
                <div className="mc-revenue-card-report">
                  <CasesIcon className="invested" />
                  <h3>
                    <span>invested</span>
                    <br />
                    3,387.67K
                  </h3>
                </div>
                <div className="mc-revenue-card-report">
                  <BookmarksIcon className="earnings" />
                  <h3>
                    <span>earnings</span>
                    <br />
                    2,856.35K
                  </h3>
                </div>
                <div className="mc-revenue-card-report">
                  <LayersIcon className="expanse" />
                  <h3>
                    <span>expenses</span>
                    <br />
                    1,994.12K
                  </h3>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient
                      id="colorInvested"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#2196f3" stopOpacity={0.9} />
                      <stop offset="95%" stopColor="#2196f3" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorEarnings"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#4caf50" stopOpacity={0.9} />
                      <stop offset="95%" stopColor="#4caf50" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorExpenses"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#e91e63" stopOpacity={1} />
                      <stop offset="95%" stopColor="#e91e63" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" stroke="0" color="gray" />
                  <Tooltip />

                  <Area
                    type="stepAfter"
                    dataKey="earnings"
                    stroke="#7DDA58"
                    strokeWidth={2}
                    fill="url(#colorEarnings)"
                  />
                  <Area
                    type="stepAfter"
                    dataKey="invested"
                    strokeWidth={2}
                    stroke="#4CA4E4"
                    fill="url(#colorInvested)"
                  />
                  <Area
                    type="stepAfter"
                    dataKey="expenses"
                    stroke="#DC58C4"
                    strokeWidth={2}
                    fill="url(#colorExpenses)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="col-md-4 card shadow orderOverView mb-1 ">
              <OrderOverView />
            </div>
          </div>
        </div>
        <div className="clientContainer p-2 mt-4 ">
          <div className="row">
            <div className="col-md-6 mb-2">
              <div className=" card shadow popularClientContainer">
                <div className="popularClient p-3">
                  <h3>Popular Clients</h3>
                  <div className="menuRight">
                    <CustomizeMenu />
                  </div>
                </div>
                <div className="clientData p-3">
                  <table>
                    <thead>
                      <tr>
                        <th>Clients</th>
                        <th>Order</th>
                        <th>Amount</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="clientWrapper">
                            <div className="clientImage">
                              <img
                                src="https://d1rig8ldkblbsy.cloudfront.net/app/uploads/2018/01/10150148/iStock-5184662221.jpg"
                                alt=""
                              />
                            </div>
                            <div className="clientName">miron mahmud</div>
                          </div>
                        </td>
                        <td>520</td>
                        <td>$5,000</td>
                        <td>
                          <div className="actionsContainer">
                            <div className="chat">
                              <MdMessage />
                            </div>
                            <div className="View">
                              <FaEye />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="clientWrapper">
                            <div className="clientImage">
                              <img
                                src="https://d1rig8ldkblbsy.cloudfront.net/app/uploads/2018/01/10150148/iStock-5184662221.jpg"
                                alt=""
                              />
                            </div>
                            <div className="clientName">miron mahmud</div>
                          </div>
                        </td>
                        <td>520</td>
                        <td>$5,000</td>
                        <td>
                          <div className="actionsContainer">
                            <div className="chat">
                              <MdMessage />
                            </div>
                            <div className="View">
                              <FaEye />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="clientWrapper">
                            <div className="clientImage">
                              <img
                                src="https://d1rig8ldkblbsy.cloudfront.net/app/uploads/2018/01/10150148/iStock-5184662221.jpg"
                                alt=""
                              />
                            </div>
                            <div className="clientName">miron mahmud</div>
                          </div>
                        </td>
                        <td>520</td>
                        <td>$5,000</td>
                        <td>
                          <div className="actionsContainer">
                            <div className="chat">
                              <MdMessage />
                            </div>
                            <div className="View">
                              <FaEye />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="clientWrapper">
                            <div className="clientImage">
                              <img
                                src="https://d1rig8ldkblbsy.cloudfront.net/app/uploads/2018/01/10150148/iStock-5184662221.jpg"
                                alt=""
                              />
                            </div>
                            <div className="clientName">miron mahmud</div>
                          </div>
                        </td>
                        <td>520</td>
                        <td>$5,000</td>
                        <td>
                          <div className="actionsContainer">
                            <div className="chat">
                              <MdMessage />
                            </div>
                            <div className="View">
                              <FaEye />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="clientWrapper">
                            <div className="clientImage">
                              <img
                                src="https://d1rig8ldkblbsy.cloudfront.net/app/uploads/2018/01/10150148/iStock-5184662221.jpg"
                                alt=""
                              />
                            </div>
                            <div className="clientName">miron mahmud</div>
                          </div>
                        </td>
                        <td>520</td>
                        <td>$5,000</td>
                        <td>
                          <div className="actionsContainer">
                            <div className="chat">
                              <MdMessage />
                            </div>
                            <div className="View">
                              <FaEye />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="clientWrapper">
                            <div className="clientImage">
                              <img
                                src="https://d1rig8ldkblbsy.cloudfront.net/app/uploads/2018/01/10150148/iStock-5184662221.jpg"
                                alt=""
                              />
                            </div>
                            <div className="clientName">miron mahmud</div>
                          </div>
                        </td>
                        <td>520</td>
                        <td>$5,000</td>
                        <td>
                          <div className="actionsContainer">
                            <div className="chat">
                              <MdMessage />
                            </div>
                            <div className="View">
                              <FaEye />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-2">
              <div className="resentClient card shadow">
                <div className="popularClient p-3">
                  <h3>Popular Clients</h3>
                  <div className="menuRight">
                    <CustomizeMenu />
                  </div>
                </div>
                <RecentActivities />
              </div>
            </div>
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

      <Dialog open={openConfirm} onClose={handleCancelDelete}>
                      <DialogTitle>Confirm Delete</DialogTitle>
                      <DialogContent>Are you sure you want to delete this category?</DialogContent>
                      <DialogActions>
                        <Button onClick={handleCancelDelete}>Cancel</Button>
                        <Button color="error" onClick={handleConfirmDelete}>{isLoading === true ? <CircularProgress color="inherit" className="loading" />: 'Delete'}</Button>
                      </DialogActions>
      </Dialog>
    </>
  );
};

export default Dashboard;
