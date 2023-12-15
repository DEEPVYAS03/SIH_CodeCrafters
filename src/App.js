import logo from './logo.svg';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css';
import Login  from './pages/Login';
import { useState,useContext,createContext } from 'react';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Map from './pages/Map';
import Tablecheck from './components/Tablecheck'
import  Calendar  from './components/Calendar';
import SidebarComponent from './globalComponents/Sidebar';
import Topbar from './globalComponents/Topbar';
import Tableau from "./pages/Tableau"
import { ProSidebarProvider } from "react-pro-sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./customs/theme";
import Layout1 from './layout/Layout';
// export const AuthContext = createContext();
import {AuthProvider} from './context/AuthContext'


function App() {
  const [user,setUser] = useState('');
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    // <AuthContext.Provider value={{user,setUser}}>
    <AuthProvider>
    {/* <ThemeProvider theme={theme}> */}
      <CssBaseline />
      <ProSidebarProvider>
          <div className="App">
            <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/table1" element={<Tablecheck />} />
              <Route path="/map" element = {<Map />} />
              <Route path="/tableau" element = {<Tableau />} />
              </Routes>
              </Router>
          </div>
      </ProSidebarProvider>
    {/* </ThemeProvider> */}
    {/* </AuthContext.Provider> */}
    </AuthProvider>
  );
}

export default App;
