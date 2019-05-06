import React, { Component } from 'react';
import ProductItem from './ProductItem';
import { connect } from 'react-redux'

class ProductItemList extends Component {
    render() {
        return <div className='productItemList'> {this.props.productList.map(product => <ProductItem key={product._id} product={product} />)} </div>;
    }
}

const mapStateToProps = state => {
    return {
        productList: state.productsReducer
    };
}

export default connect(mapStateToProps)(ProductItemList)
