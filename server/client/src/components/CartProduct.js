import React, { Component } from 'react';
import { connect } from "react-redux";
import { deleteCartDetails, updateCartDetails } from '../actions/cartAction';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import { Link } from 'react-router-dom';

const styles = theme => ({
    card: {
        display: 'flex',
        padding: '5px',
        margin: '5px'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    qty_details: {
        margin: '20px',
        display: 'flex',
        flexDirection: 'column',
        width: '5%'
    },
    price_details: {
        margin: '20px',
        display: 'flex',
        flexDirection: 'column',
        width: '40%',
        color: 'brown'
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 250,
    },
    productLink: {
        fontSize: 16,
        color: 'blue',
    }
});

const BootstrapInput = withStyles(theme => ({
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 12,
        width: 'auto',
        padding: '5px 20px 5px 15px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
    },
}))(InputBase);

class CartProduct extends Component {

    state = {
        cartItemId: null,
        quantity: 1
    };

    componentDidMount() {
        this.setState({
            cartItemId: this.props.product._id,
            quantity: this.props.product.quantity
        });
    }

    handleRemoveCart = () => {
        this.props.dispatch(deleteCartDetails(this.props.product._id, '123456'))
    }

    handleSaveForLater = () => {
        //call api to move item to wishlist
        this.props.dispatch(deleteCartDetails(this.props.product._id, '123456'))
    }

    handleChange = event => {
        this.setState({
            quantity: event.target.value
        }, () => {
            this.props.dispatch(updateCartDetails(this.state, '123456'))
        });
    };

    render() {
        const productUrl = `/products/${this.props.product.product._id}`
        const { classes } = this.props;
        var priceText = `MRP: ₹${this.props.product.product.price.toFixed(2)}`
        this.props.product.product.offerPrice = this.props.product.product.price.toFixed(2);
        if (this.props.product.product.discount && this.props.product.product.discount > 0) {
            priceText = `MRP: ₹${this.props.product.product.price.toFixed(2)}  Discount: ${this.props.product.product.discount}%`
            this.props.product.product.offerPrice = (parseFloat(this.props.product.product.price) -
                (parseFloat(this.props.product.product.price) * (parseFloat(this.props.product.product.discount) / 100))).toFixed(2);
        }

        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cover}
                    image={this.props.product.product.image}
                    title={this.props.product.product.displayName}
                />
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Link to={productUrl} className={classes.productLink}>
                            {this.props.product.product.displayName}
                        </Link>
                        <Typography variant="subtitle1" color="textSecondary">{this.props.product.product.category.name}</Typography>
                        <Typography component="p">{this.props.product.product.shortDesc}</Typography>
                        <Typography component="p">{priceText}</Typography>
                        {
                            this.props.product.product.deliveryCharge ?
                                <Typography component="p">Delivery Charges: {this.props.product.product.deliveryCharge}</Typography>
                                : null
                        }
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" onClick={this.handleRemoveCart}> Remove from cart </Button>
                        <Button size="small" color="primary" onClick={this.handleSaveForLater}> Save for later </Button>
                    </CardActions>
                </div >
                <div className={classes.price_details}>
                    ₹{this.props.product.product.offerPrice}
                </div >
                <div className={classes.qty_details}>
                    <Select
                        value={this.state.quantity}
                        onChange={this.handleChange}
                        input={<BootstrapInput name="quantity" id="quantity-customized-select" />}>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                    </Select>
                </div >
            </Card>
        )
    }
}

CartProduct.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.errors
    };
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(CartProduct));