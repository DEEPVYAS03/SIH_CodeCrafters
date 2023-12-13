import React from 'react';
import SidebarComponent from "../globalComponents/Sidebar"
import Topbar from "../globalComponents/Topbar"
const Layout1= ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
    <Topbar />
    <div style={{ display: "flex"}}>
    <SidebarComponent/>
    <main style={{ flex: 1, padding: "20px" }}>{children}</main>
    </div>
    </div>
  );
};

export default Layout1;