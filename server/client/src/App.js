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
import EditProfile from './components/EditProfile';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from './store';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {

  componentDidMount() {
  }
  
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
            <Route exact path="/editprofile" component={EditProfile} />
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