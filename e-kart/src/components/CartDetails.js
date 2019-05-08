import React, { Component } from 'react';
import CartProduct from './CartProduct';
import { connect } from 'react-redux';
import { getCartDetails } from '../actions/cartAction';

class CartDetails extends Component {
    componentDidMount() {
        this.props.dispatch(getCartDetails('123456'))
    }

    render() {
        var view = this.props.cart && this.props.cart.items ?
            (
                <div className='productItemList'>
                    {this.props.cart.items.map(c => <CartProduct key={c._id} product={c} />)}
                    <div> Subtotal : {this.props.cart.billAmount} ({this.props.cart.items.length} items) </div>
                </div>
            )
            : (<div> No data </div >)

        return view;
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cartReducer
    };
}

export default connect(mapStateToProps)(CartDetails)
