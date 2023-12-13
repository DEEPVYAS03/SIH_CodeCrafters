import React from 'react';
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../customs/theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color="grey"
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color="green">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;