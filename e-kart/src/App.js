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

  constructor(props) {
    super(props);
    this.state = {
      isAuthed: false,
      searchProductList: [
        { productId: 1, productName: 'Product 1', productImage: 'https://m.media-amazon.com/images/I/71YHXM06IcL._AC_UL320_.jpg' },
        { productId: 2, productName: 'Product 2', productImage: 'https://m.media-amazon.com/images/I/81io5so89hL._AC_UL320_.jpg' },
        { productId: 3, productName: 'Product 3', productImage: 'https://m.media-amazon.com/images/I/71DpKilMkrL._AC_UL320_.jpg' },
        { productId: 4, productName: 'Product 4', productImage: 'https://m.media-amazon.com/images/I/81E0uiZHnOL._AC_UL320_.jpg' },
        { productId: 5, productName: 'Product 5', productImage: 'https://m.media-amazon.com/images/I/61QilOJjc8L._AC_UL320_.jpg' },
        { productId: 6, productName: 'Product 6', productImage: 'https://m.media-amazon.com/images/I/71F7zQM9Y8L._AC_UL320_.jpg' }
      ]
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavigationBar searchProductList={this.state.searchProductList} />
          <Switch>
            <Route exact path="/"
              render={(props) => <Home {...props} isAuthed={this.state.isAuthed} />}
            />
            <Route exact path="/products"
              render={(props) => <ProductItemList {...props} isAuthed={this.state.isAuthed} productList={this.state.searchProductList} />}
            />
            <Route path="/products/:id" component={ProductDetails} />
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