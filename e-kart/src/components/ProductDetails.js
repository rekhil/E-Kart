import React, { Component } from 'react';
import Img from 'react-image';
import axios from 'axios';

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: { productId: 1, productName: 'Product 1', productImage: 'https://m.media-amazon.com/images/I/71YHXM06IcL._AC_UL320_.jpg' },
            isLoading: true
        }
    }

    componentDidMount() {
        // this.fetchProductDetails();
    }

    fetchProductDetails() {
        axios.get("url_here")
            .then(response => {
                this.setState({
                    product: response.data,
                    isLoading: false
                });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {
        return (
            <div className='productItem'>
                <Img src={this.state.product.productImage} />
                <span>
                    {this.state.product.productName}
                </span >
            </div >
        );
    }
}

export default ProductDetails;
