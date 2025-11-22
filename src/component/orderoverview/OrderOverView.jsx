import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import { IoTimerOutline } from "react-icons/io5";
import Menu from "@mui/material/Menu";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { TbCirclePlusFilled } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { PiWarningCircleFill } from "react-icons/pi";
import {
  HourglassEmpty,
  LocalShipping,
  CheckCircle,
  Cancel,
  ReplayCircleFilled,
} from "@mui/icons-material";
const data = [
  { name: "Pending", value: 547, color: "#ff00ff", icon: <PiDotsThreeCircleFill /> },
  { name: "Shipped", value: 398, color: "#42a5f5", icon: <TbCirclePlusFilled /> },
  { name: "Received", value: 605, color: "#4caf50", icon: <FaCheckCircle /> },
  { name: "Cancelled", value: 249, color: "#f44336", icon: <TiDelete /> },
  {
    name: "Refunded",
    value: 176,
    color: "#ffca28",
    icon: <PiWarningCircleFill />,
  },
];
const ITEM_HEIGHT = 48;
const OrderOverView = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

//   const total = data.reduce((sum, d) => sum + d.value, 0);

  const chartData = data.map((d) => ({
    name: d.name,
    value: d.value,
  }));

  const COLORS = data.map((d) => d.color);
  return (
    <>
      <div className="OrderOverViewContainer p-3 ">
        <div className="orderOverviewHeader d-flex align-items-center justify-content-between ">
          <h3 className=" fs-5">orders overview</h3>
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
        <PieChart width={300} height={200}>
          <Pie
            data={chartData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={70}
            innerRadius={40}
            labelLine={false}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        

        <div className="overDatacontainer">
            {data.map((d,i)=>(
                <div className="dataItem" key={i}>
                   <span className="dataIcon" style={{color:d.color}} >{d.icon}</span>
                   <span className="dataLabel">{d.name}</span>
                   <span className="dataValue">{d.value}</span>
                </div>
            ))}
        </div>
        {/* <Stack spacing={1} mt={2}>
        {data.map((d, i) => (
          <Stack key={i} direction="row" alignItems="center" spacing={1}>
            <Chip
              icon={d.icon}
              label={`${d.name}: ${d.value}`}
              sx={{ bgcolor: d.color, color: "#fff", fontWeight: 500 }}
            />
          </Stack>
        ))}
      </Stack> */}
      </div>
    </>
  );
};

export default OrderOverView;
