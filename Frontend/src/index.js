import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import FullLayout from './layouts/full/FullLayout';
import { MyContext } from './context/context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render
(
  
      <BrowserRouter>
       <App />
     </BrowserRouter>
      

);
