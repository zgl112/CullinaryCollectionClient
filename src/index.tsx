import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import {  RouterProvider, createBrowserRouter } from 'react-router-dom';
import { About } from './Components/about';
import HomePage from './Components/homepage';
import './App.css';
import { Shop } from './Components/shop';
import { Contact } from './Components/contact';
import NotFound from './Components/Utils/notfound';
import { Product } from './Components/product';
import { LoginPage } from './Components/loginpage';
import ModalContainers from './Components/Utils/modal';
import Cart from './Components/cart';
import Checkout from './Components/checkout';
import  AdminPage  from './Components/adminpage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/about",
    element: <About/>,
  },
  {
    path: "/shop",
    element: <Shop/>,
  },
  {
    path: "/contact",
    element: <Contact/>,
  },
  {
    path: "/product/:id",
    element: <Product/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/cart",
    element: <Cart/>,
  },
  {
    path: "/checkout",
    element: <Checkout/>,
  },
  {
    path: "/admin",
    element: <AdminPage/>,
  },
  {
    path: "*",
    element: <NotFound/>,
  }
]);

root.render(
  <React.StrictMode>
 <RouterProvider router={router} /> 
 <ModalContainers/>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
