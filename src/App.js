import logo from './logo.svg';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css';
import Login  from './pages/Login';
import { useState,useContext,createContext } from 'react';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
export const AuthContext = createContext();




function App() {
  const [user,setUser] = useState('');

  return (
    <AuthContext.Provider value={{user,setUser}}>
    <div className="App">
     <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
     </Router>
    </div>
    </AuthContext.Provider>
  );
}

export default App;
