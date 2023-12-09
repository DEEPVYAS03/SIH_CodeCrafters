import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import FullLayout from './layouts/full/FullLayout';
import BlankLayout from './layouts/blank/BlankLayout';
import Dashboard from './views/dashboard/Dashboard';
import SamplePage from './views/sample-page/SamplePage';
import Icons from './views/analysis/Analysis';
import TypographyPage from './views/utilities/TypographyPage';
import Shadow from './views/utilities/Shadow';
import Error from './views/authentication/Error';
import Register from './views/authentication/Register';
import Login from './views/authentication/Login';
import Router from './routes/routes';
import { useRoutes } from 'react-router-dom';
import { baselightTheme } from './theme/DefaultColors';
import { MyContext } from './context/context';

const App = () => {
  const routing = useRoutes(Router);
  const theme = baselightTheme;
  return (
    <MyContext.Provider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {routing}
    </ThemeProvider>
    </MyContext.Provider>
  );
};

export default App;
