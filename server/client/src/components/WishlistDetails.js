import React, { Component } from 'react';
import WishlistProduct from './WishlistProduct';
import axios from 'axios';
import { conf } from '../config.js';

class WistlistDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wishlist: [],
            isLoading: true
        }
    }

    componentDidMount() {
        axios.get(`${conf.baseUrl}wishlist/5cd192282ca7e93e9cba02af`)
            .then(response => {
                this.setState({
                    wishlist: response.data.data,
                    isLoading: false
                });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {
        var view = !this.state.isLoading ? (this.state.wishlist && this.state.wishlist.items ?
            (<div className='productItemList'> {this.state.wishlist.items.map(w => <WishlistProduct key={w._id} product={w} />)} </div>)
            : (<div> No data </div >))
            : (<div> Loading </div >)

        return view;
    }
}

export default WistlistDetails;
