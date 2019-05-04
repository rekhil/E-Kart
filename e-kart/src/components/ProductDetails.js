import React, { Component } from 'react';
import Img from 'react-image'

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: { productId: 1, productName: 'Product 1', productImage: 'https://m.media-amazon.com/images/I/71YHXM06IcL._AC_UL320_.jpg' }
        }
    }

    // componentDidMount() {
    //     console.log(this.props.match.params.id)
    //     const product = this.state.productList.find(s => s.productId === this.props.match.params.id)
    //     this.setState({ product: product })
    // }

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
