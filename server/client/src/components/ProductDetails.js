import React, { Component } from 'react';
import Img from 'react-image';
import axios from 'axios';
import { conf } from '../config.js';

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            isLoading: true
        }
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            axios.get(`${conf.baseUrl}products/${this.props.match.params.id}`)
                .then(response => {
                    this.setState({
                        product: response.data.data,
                        isLoading: false
                    });
                })
                .catch(error => this.setState({ error, isLoading: false }));
        }
    }

    addToCart = () => {
        const data = {
            productId: this.state.product._id,
            quantity: 1,
            price: this.state.product.price,
            offerPrice: this.state.product.offerPrice,
            deliveryCharge: this.state.product.deliveryCharge,
            accountId: '5cd192282ca7e93e9cba02af',
            guestId: '123456'
        }

        axios({
            method: 'POST',
            url: `${conf.baseUrl}cart`,
            headers: { "Content-Type": "application/json" },
            data: data
        }).then((response) => {
        }).catch((error) => {
        });

    }

    addToWishList = () => {
        const data = {
            productId: this.state.product._id,
            accountId: '5cd192282ca7e93e9cba02af'
        }

        axios({
            method: 'POST',
            url: `${conf.baseUrl}wishlist`,
            headers: { "Content-Type": "application/json" },
            data: data
        }).then((response) => {
        }).catch((error) => {
        });
    }

    render() {
        var view = !this.state.isLoading ?
            (<div className='productItem'>
                <Img src={this.state.product.image} />
                {this.state.product.displayName}
                {this.state.product.shortDesc}
                {this.state.product.desc}
                {this.state.product.category}
                <button onClick={this.addToCart} >Add to cart</button>
                <button onClick={this.addToWishList} >Add to wishlist</button>
            </div >)
            : (<div> No Data Found </div >)

        return view;
    }
}

export default ProductDetails;
