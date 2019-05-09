import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import CartDetails from './components/CartDetails';
import ProductItemList from './components/ProductItemList';
import ProductDetails from './components/ProductDetails';
import WishlistDetails from './components/WishlistDetails';
import './sharedStyle.css';
import Navbar from './components/layout/NavigationBar';
import Profile from './components/Profile';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/products/:id" component={ProductDetails} />
            <Route path="/products" component={ProductItemList} />
            <Route path="/cart" component={CartDetails} />
            <Route path="/wishlist" component={WishlistDetails} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;