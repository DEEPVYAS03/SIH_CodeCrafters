import React, { useContext, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext"

import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  Grid,
  Card
} from '@mui/material';
import CustomTextField from '../customs/CustomTextField'
// import Logo from "../components/shared/Logo"
// import PageContainer from "../components/container/PageContainer"


 const Login = ({ title, subtitle, subtext }) => {
  // const { user, setUser } = React.useContext(AuthContext);
  const { setUser } = useContext(AuthContext);
  console.log(setUser)
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  function handle_login(event) {
    event.preventDefault();
    let data = {
      "username": username,
      "password": password
    }
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_SERVER_URL}/admin/login`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }
    axios.request(config)
    .then((response) => {
      console.log(response.data);
      if(response.data.status === "success")
      {
        console.log(response.data.data._id);
        Cookies.set('uuid', response.data.data._id);
        setUser(response.data.data._id);
        navigate('/dashboard');
      }
      
      else
      alert("Invalid Credentials");
    })
  }

  return (
    <>
      {
       title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            Username
          </Typography>
          <CustomTextField
            id="username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField
            id="password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remember this Device"
            />
          </FormGroup>
          <Typography
            component={Link}
            to="/"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            Forgot Password?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          component={Link}
          to="/"
          type="submit"
          onClick={handle_login}
        >
          Sign In
        </Button>
      </Box>
      {subtitle} 
    </>
  );
};



export default Login;


// // const Login2 = () => {
  
// //   return (
// //     <PageContainer title="Login" description="this is Login page">
// //       <Box
// //         sx={{
// //           position: 'relative',
// //           '&:before': {
// //             content: '""',
// //             background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
// //             backgroundSize: '400% 400%',
// //             animation: 'gradient 15s ease infinite',
// //             position: 'absolute',
// //             height: '100%',
// //             width: '100%',
// //             opacity: '0.3',
// //           },
// //         }}
// //       >
// //         <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
// //           <Grid
// //             item
// //             xs={12}
// //             sm={12}
// //             lg={4}
// //             xl={3}
// //             display="flex"
// //             justifyContent="center"
// //             alignItems="center"
// //           >
// //             <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
// //               <Box display="flex" alignItems="center" justifyContent="center">
// //                 <Logo />
// //               </Box>
// //               <Login
// //                 subtext={
// //                   <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
               
// //                   </Typography>
// //                 }
// //                 subtitle={
// //                   <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
// //                     <Typography color="textSecondary" variant="h6" fontWeight="500">
// //                       New to WHS?
// //                     </Typography>
// //                     <Typography
// //                       component={Link}
// //                       to="/auth/register"
// //                       fontWeight="500"
// //                       sx={{
// //                         textDecoration: 'none',
// //                         color: 'primary.main',
// //                       }}
// //                     >
// //                       Create an account
// //                     </Typography>
// //                   </Stack>
// //                 }
// //               />
// //             </Card>
// //           </Grid>
// //         </Grid>
// //       </Box>
// //     </PageContainer>
// //   );
// // };

// import React from "react";
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useContext } from "react";
// import { MainContext } from "../context/MainContext";
// const img1 = '../assets/images/login.jpg';
// const elogo = "../assets/images/elogo.svg";
// const plogo = "../assets/images/padlock 1.svg";
// const hide = "../assets/images/hide.svg";
// const show = "../assets/images/show.svg";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   // const [role, setRole] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [emailFocus, setEmailFocus] = useState(false);
//   const [passFocus, setPassFocus] = useState(false);
//   const { mainrole, setmainrole } = useContext(MainContext);

//   const navigate = useNavigate();

//   const submitHandler = (e) => {
//     e.preventDefault();
//     console.log(email, password);
//     if (!email || !password) {
//       alert("Please fill all the fields");
//     }
//     axios
//       .post("http://localhost:4000/api/login", { email, password })
//       .then((res) => {
//         // console.log(res.data);
//         if (res.status === 200) {
//           // console.log(res.data.user);
//           localStorage.setItem("userInfo", JSON.stringify(res.data.user));
//           const role = res.data.user.role;
//           if (role === "admin") {
//             setmainrole("admin");
//             navigate("/admin");
//           } else if (role === "employee") {
//             setmainrole("employee");
//             navigate("/employee");
//           }
//           // console.log(role);
//           // navigate("/");
//           // console.log(res.data.user);
//         } else {
//           alert("Invalid credentials");
//         }
//       });
//   };

//   // const handleRole = (e) => {
//   //   setRole(e.target.value);
//   //   console.log(role);
//   // };

//   return (
//     <div className="login-container flex">
//       <div className="img w-1/2 h-full bg-cover">
//         <img className="h-[100vh]" src={img1} alt="" />
//       </div>
//       <div className="content w-1/2">
//         <div className="content-container flex flex-col font-sans mt-28 mx-28 ">
//           <div className="heading text-3xl font-semibold">Sign in</div>
//           <div className=" register-redirect mt-5 flex flex-col">
//             <div>If you don't have an account register</div>
//             <div>
//               You can{" "}
//               <Link to="/signup">
//                 <span className="font-bold text-orange-600">
//                   Register here !
//                 </span>
//               </Link>
//             </div>
//             <form onSubmit={submitHandler}>
//               <div className="input-field flex flex-col mt-5 gap-3">
//                 {/* <div className="role">
//                   <div className="text font-medium mb-3">Role</div>
//                   <select
//                     value={role}
//                     onChange={handleRole}
//                     onClick={() => {
//                       setEmailFocus(false);
//                       setPassFocus(false);
//                     }}
//                     className="bg-gray-100 w-60 h-9 rounded"
//                   >
//                     <option value="" disabled selected hidden>
//                       Select a role
//                     </option>
//                     <option value="admin">Admin</option>
//                     <option value="employee">Employee</option>
//                   </select>
//                 </div> */}

//                 <div className="email mt-3">
//                   <div className="text font-medium mb-3">Email</div>
//                   <div className="input flex h-6">
//                     <img className="w-6 h-6" src={elogo} alt="" />
//                     <div className="ml-4">
//                       <input
//                         type="text"
//                         className="focus:outline-none"
//                         onFocus={() => {
//                           setEmailFocus(true);
//                           setPassFocus(false);
//                         }}
//                         placeholder="Enter email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                       />
//                     </div>
//                   </div>
//                   {emailFocus ? (
//                     <hr className="mt-2 w-10/12 border-2 border-orange-600" />
//                   ) : (
//                     <hr className="mt-2 w-10/12 border-2 " />
//                   )}
//                 </div>
//                 <div className="password mt-3">
//                   <div className="text font-medium mb-3">Password</div>
//                   <div className="input flex h-6">
//                     <img className="w-6 h-6" src={plogo} alt="" />
//                     <div className="ml-4 pr-40">
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         className="focus:outline-none "
//                         placeholder="Enter password"
//                         onFocus={() => {
//                           setEmailFocus(false);
//                           setPassFocus(true);
//                         }}
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                       />
//                     </div>
//                     {showPassword ? (
//                       <div
//                         className="cursor-pointer"
//                         onClick={() => setShowPassword(false)}
//                       >
//                         <img src={show} alt="" />{" "}
//                       </div>
//                     ) : (
//                       <img src={hide} alt="" />
//                     )}
//                   </div>
//                   {passFocus ? (
//                     <hr className="mt-2 w-10/12 border-2 border-orange-600" />
//                   ) : (
//                     <hr className="mt-2 w-10/12 border-2 " />
//                   )}
//                 </div>
//                 <div className="checkbox-text flex justify-between">
//                   <div className="checkbox-content">
//                     <input type="checkbox" id="logCheck" />
//                     <label htmlFor="logCheck" className="text">
//                       Remember me
//                     </label>
//                   </div>
//                   <div>
//                     <a href="#" className="text mr-20">
//                       Forgot password?
//                     </a>
//                   </div>
//                 </div>
//               </div>
//               <div className="cursor-pointer border-2 w-3/4 mt-16 h-12 bg-orange-600 p-3 text-center ml-8 rounded-full font-medium text-l text-white ">
//                 <input className="cursor-pointer" type="submit" value="Login" />
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
