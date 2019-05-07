import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { searchProducts } from '../actions/productAction';

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        }
    }

    changeSearchTextHandler = event => {
        this.setState({ searchText: event.target.value })
    }

    onSearchSubmit = () => {
        this.props.dispatch(searchProducts())
        this.setState({ searchText: '' })
    }

    render() {
        return (
            <div className='navigationBar'>
                <Link to='/' >E-kart</Link>
                <input type='text' value={this.state.searchText} onChange={this.changeSearchTextHandler} />
                <button type='submit' onClick={this.onSearchSubmit} >Search</button>
                <Link to='/cartdetails'>My Cart</Link>
                <Link to='/wishlist'>My Wishlist</Link>
                <Link to='/signin'>Sign In</Link>
            </div>
        )
    }
}

export default connect()(NavigationBar);