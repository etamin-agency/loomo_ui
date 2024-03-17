import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';

import Cart from "pages/Cart"
import Catalog from 'pages/Catalog';
import Delivery from 'pages/Delivery';
import Home from 'pages/home';
import Pickup from 'pages/Pickup';


const Routes: React.FC = () => {
    return (
      <Switch>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/catalog' element={<Catalog/>}></Route>
        <Route path='/delivery' element={<Delivery/>}></Route>
        <Route path='/pickup' element={<Pickup/>}></Route>
      </Switch>
    );
  };


export default Routes;
