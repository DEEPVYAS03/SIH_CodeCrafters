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


// const Login2 = () => {
  
//   return (
//     <PageContainer title="Login" description="this is Login page">
//       <Box
//         sx={{
//           position: 'relative',
//           '&:before': {
//             content: '""',
//             background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
//             backgroundSize: '400% 400%',
//             animation: 'gradient 15s ease infinite',
//             position: 'absolute',
//             height: '100%',
//             width: '100%',
//             opacity: '0.3',
//           },
//         }}
//       >
//         <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
//           <Grid
//             item
//             xs={12}
//             sm={12}
//             lg={4}
//             xl={3}
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//           >
//             <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
//               <Box display="flex" alignItems="center" justifyContent="center">
//                 <Logo />
//               </Box>
//               <Login
//                 subtext={
//                   <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
               
//                   </Typography>
//                 }
//                 subtitle={
//                   <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
//                     <Typography color="textSecondary" variant="h6" fontWeight="500">
//                       New to WHS?
//                     </Typography>
//                     <Typography
//                       component={Link}
//                       to="/auth/register"
//                       fontWeight="500"
//                       sx={{
//                         textDecoration: 'none',
//                         color: 'primary.main',
//                       }}
//                     >
//                       Create an account
//                     </Typography>
//                   </Stack>
//                 }
//               />
//             </Card>
//           </Grid>
//         </Grid>
//       </Box>
//     </PageContainer>
//   );
// };

