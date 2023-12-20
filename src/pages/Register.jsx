// import React from 'react'
// import { AuthContext } from '../App'
import { useNavigate } from 'react-router-dom';

// const Register = () => {
//     const navigate = useNavigate();
//     const { user, setUser } = React.useContext(AuthContext);
//     function handleClick() {
//         setUser("assss");
//         navigate('/login');
//     }


//     return (
//         <><div>{user}</div><button onClick={() => handleClick()}>Click</button></>
//     )
// }

// export default Register


import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../customs/CustomTextField';
import { Stack } from '@mui/system';


const Register = ({ title, subtitle, subtext }) => {
    
    const navigate = useNavigate();
    function handle_register()
    {
        let data = {
            "name": name,
            "username": usename,
            "email": email,
            "password": password
          }
          const config = {
            method: 'post',
            url: `${process.env.REACT_APP_SERVER_URL}/admin/register`,
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
                // Cookies.set('uuid', response.data.data._id);
                // setUser(response.data.data._id);
                navigate('/login');
            }
            else
            alert("Invalid Credentials");
          })
    }
    const [name,setName]=useState("");
    const [usename,setUsername]=useState("")
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    
    return (
        <>
        {title ? (
            <Typography fontWeight="700" variant="h2" mb={1}>
                {title}
            </Typography>
        ) : null}

        {subtext}

        <Box>
            <Stack mb={3}>
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='name' mb="5px" >Name</Typography>
                <CustomTextField id="name" variant="outlined" fullWidth  onChange={(event) => setName(event.target.value)}/>

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='username'mt="9px" mb="5px" >Username</Typography>
                <CustomTextField id="username" variant="outlined" fullWidth  onChange={(event) => setUsername(event.target.value)}/>

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Email Address</Typography>
                <CustomTextField id="email" variant="outlined" fullWidth  onChange={(event) => setEmail(event.target.value)} />

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Password</Typography>
                <CustomTextField id="password" type="password" variant="outlined" fullWidth  onChange={(event) => setPassword(event.target.value)}/>
            </Stack>
            <Button color="primary" variant="contained" size="large" fullWidth component={Link} to="/auth/login" onClick={handle_register}>
                Sign Up
            </Button>
        </Box>
        {subtitle}
    </>
    )
    
    };

export default Register;