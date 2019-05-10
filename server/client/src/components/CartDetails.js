import React, { Component } from 'react';
import CartProduct from './CartProduct';
import { connect } from 'react-redux';
import { getCartDetails } from '../actions/cartAction';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    emptyDiv: {
        width: '100%',
    },
    cartHeader: {
        width: '100%',
        margin: '5px'
    },
    card: {
        display: 'flex',
        margin: '5px'
    },
    qty_details: {
        margin: '5px',
        display: 'flex',
        flexDirection: 'column',
        width: '10%'
    },
    price_details: {
        margin: '5px',
        display: 'flex',
        flexDirection: 'column',
        width: '35%'
    },
    subtotal_details: {
        marginTop: '15px',
        display: 'flex',
        flexDirection: 'column',
        width: '27%'
    },
    button: {
        margin: theme.spacing.unit,
        width: '15%'
    }
});

class CartDetails extends Component {

    componentDidMount() {
        this.props.dispatch(getCartDetails('123456'))
    }

    render() {
        const { classes } = this.props;

        var view = <div> No items in the cart </div >

        if (this.props.cart && this.props.cart.items) {
            this.props.cart.billAmount = this.props.cart.items

            this.props.cart.billAmount = 0;
            this.props.cart.items.forEach(element => {
                if (element && element.product && element.product.price && element.product.price > 0) {
                    if (element.product.discount && element.product.discount > 0) {
                        this.props.cart.billAmount += ((parseFloat(element.product.price) - (parseFloat(element.product.price) * (parseFloat(element.product.discount) / 100))) * element.quantity)
                    } else {
                        this.props.cart.billAmount += (parseFloat(element.product.price) * element.quantity)
                    }
                }
            });

            view =
                (<div>
                    <Card className={classes.card}>
                        <div className={classes.cartHeader}> <b>Shopping Cart </b></div >
                        <div className={classes.price_details}>Price</div >
                        <div className={classes.qty_details}>Quantity</div >
                    </Card>
                    <div>
                        {this.props.cart.items.map(c => <CartProduct key={c._id} product={c} />)}
                    </div>
                    <Card className={classes.card}>
                        <div className={classes.emptyDiv} />
                        <div className={classes.subtotal_details}><b>Subtotal ({this.props.cart.items.length} items): ₹{this.props.cart.billAmount.toFixed(2)} </b></div >
                        <Button variant="contained" color="primary" className={classes.button}>
                            Place Order
                </Button>
                    </Card>
                </div>)
        }

        return view;
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cartReducer
    };
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(CartDetails));
