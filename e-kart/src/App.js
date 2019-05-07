import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import CartDetails from './components/CartDetails';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ProductItemList from './components/ProductItemList';
import ProductDetails from './components/ProductDetails';
import './sharedStyle.css';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavigationBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/products/:id" component={ProductDetails} />
            <Route path="/products" component={ProductItemList} />
            <Route path="/cartdetails" component={CartDetails} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;