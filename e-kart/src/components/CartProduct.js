import React, { Component } from 'react';
import Img from 'react-image'
import { connect } from "react-redux";
import { deleteCartDetails } from '../actions/cartAction';

class CartProduct extends Component {
    removeCart = () => {
        this.props.dispatch(deleteCartDetails(this.props.product._id))
    }

    updateCart = () => {

    }

    render() {
        return (
            <div className='productItem'>
                <Img src={this.props.product.product.image} />
                <span>
                    {this.props.product.product.displayName}
                    <button onClick={this.updateCart} >Update</button>
                    <button onClick={this.removeCart} >Remove</button>
                </span >
            </div >
        )
    }
}

export default connect()(CartProduct);