import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useTheme } from "@emotion/react";
import {tokens} from "../customs/theme"
import { useNavigate } from "react-router-dom";

function SidebarComponent() {
  const { collapseSidebar } = useProSidebar();
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const Navigate= useNavigate();

  return (
    <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
      <Sidebar style={{ height: "100vh" }}>
        <Menu>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center" }}
          >
            {" "}
            <h2>Admin</h2>
          </MenuItem>
          <MenuItem icon={<HomeOutlinedIcon />} onClick={()=>{Navigate("/home")}}>Home</MenuItem>
          <MenuItem icon={<PeopleOutlinedIcon />} onClick={()=>{Navigate("/Schema")}}>Schema</MenuItem>
          <MenuItem icon={<ContactsOutlinedIcon />} onClick={()=>{Navigate("/farmer")}}>Users</MenuItem>
        </Menu>
      </Sidebar>
      {/* <main>
        <h1 style={{ color: "white", marginLeft: "5rem" }}>
          Sidebar
        </h1>
      </main> */}
    </div>
  );
}

export default SidebarComponent;