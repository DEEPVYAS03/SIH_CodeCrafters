import React,{useState,useEffect} from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';


const AuthRegister = ({ title, subtitle, subtext }) => {
    

    function handle_register()
    {
        console.log(name);
        console.log(email);
        console.log(password);
    }
    const [name,setName]=useState("");
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
                    fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Email Address</Typography>
                <CustomTextField id="email" variant="outlined" fullWidth  onChange={(event) => setEmail(event.target.value)} />

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Password</Typography>
                <CustomTextField id="password" variant="outlined" fullWidth  onChange={(event) => setPassword(event.target.value)}/>
            </Stack>
            <Button color="primary" variant="contained" size="large" fullWidth component={Link} to="/auth/login" onClick={handle_register}>
                Sign Up
            </Button>
        </Box>
        {subtitle}
    </>
    )
    
    };

export default AuthRegister;
