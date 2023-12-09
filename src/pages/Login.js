import React, { useContext, useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie'

// import {
//   Box,
//   Typography,
//   FormGroup,
//   FormControlLabel,
//   Button,
//   Stack,
//   Checkbox,
// } from '@mui/material';




 const Login = ({ title, subtitle, subtext }) => {
//   // const contextValue = useContext(MyContext);
//   // console.log(contextValue);
//   // const { setUser = () => {} } = useContext(MyContext);
// //   const { setUser,user } = useContext(MyContext);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   function handle_login(event) {
//     event.preventDefault();
//     let data = {
//       "username": username,
//       "password": password
//     }
//     const config = {
//       method: 'post',
//       url: `${process.env.REACT_APP_SERVER_URL}/admin/login`,
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       data: data
//     }
//     axios.request(config)
//     .then((response) => {
//       console.log(response.data);
//       if(response.data.status === "success")
//       {
//         console.log(response.data.data._id);
//         Cookies.set('uuid', response.data.data._id);

//     //  /   setUser({
//     //       uuid: response.data.data._id
//     //     })
//         console.log(user);
//         window.location.href = "/dashboard";
//       }
      
//       else
//       alert("Invalid Credentials");
//     })
//   }

  return (
    <>
      {/* {title ? (
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
      {subtitle} */}
    </>
  );
};

export default Login;