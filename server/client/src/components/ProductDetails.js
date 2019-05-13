import React, { Component } from 'react';
import axios from 'axios';
import { conf } from '../config.js';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import { addToCartDetails } from '../actions/cartAction';
import { connect } from "react-redux";

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
    right_portion: {
        margin: '20px',
        display: 'flex',
        flexDirection: 'column',
        width: '50%'
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 400,
    },
    productName: {
        fontSize: 20,
        color: 'blue',
    },
    button: {
        margin: theme.spacing.unit
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
        margin: '0px 5px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
    },
}))(InputBase);

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            isLoading: true,
            quantity: 1
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

    handleAddToCart = () => {
        const data = {
            productId: this.state.product._id,
            quantity: this.state.quantity,
            guestId: '123456'
        }

        this.props.dispatch(addToCartDetails(data))
    }

    handleAddToWishList = () => {
        axios
            .post(`${conf.baseUrl}wishlist`, { productId: this.state.product._id })
            .then(response => { })
            .catch(err => { });
    }

    handleChange = event => {
        this.setState({
            quantity: event.target.value
        });
    };

    render() {
        const { classes } = this.props;
        var view = (<div> No Data Found </div >)

        if (!this.state.isLoading) {

            var priceText = `MRP: ₹${this.state.product.price.toFixed(2)}`
            var offerPrice = this.state.product.price.toFixed(2);
            if (this.state.product.discount && this.state.product.discount > 0) {
                priceText = `MRP: ₹${this.state.product.price.toFixed(2)}  Discount: ${this.state.product.discount}%`
                offerPrice = (parseFloat(this.state.product.price) -
                    (parseFloat(this.state.product.price) * (parseFloat(this.state.product.discount) / 100))).toFixed(2);
            }
            var todayDate = new Date();
            if (this.state.product.deals && this.state.product.deals.length > 0) {
                var todaysDeal = this.state.product.deals.find(s => s.date === `${todayDate.getFullYear()}/${todayDate.getMonth() + 1}/${todayDate.getDate()}`)
                if (todaysDeal) {
                    priceText = `MRP: ₹${this.state.product.price.toFixed(2)}  Discount (Today's deal): ${todaysDeal.discount}%`
                    offerPrice = (parseFloat(this.state.product.price) -
                        (parseFloat(this.state.product.price) * (parseFloat(todaysDeal.discount) / 100))).toFixed(2);
                }
            }
            view =
                (
                    <div>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cover}
                                image={this.state.product.image}
                                title={this.state.product.displayName} />
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <label className={classes.productName}>
                                        {this.state.product.displayName}
                                    </label>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {this.state.product.category.name}
                                    </Typography>
                                    <Typography component="p">
                                        {this.state.product.shortDesc}
                                    </Typography>
                                    <Typography component="p">
                                        {this.state.product.desc}
                                    </Typography>
                                    <Typography component="p">
                                        {priceText}
                                    </Typography>
                                    <Typography component="p">
                                        Price: ₹{offerPrice}
                                    </Typography>
                                </CardContent>
                            </div >
                            <div className={classes.right_portion}>
                                <Card className={classes.card}>
                                    <div className={classes.details}>
                                        <div className={classes.card}>
                                            <Typography variant="subtitle1" color="textSecondary">Quantity</Typography>
                                            <Select
                                                value={this.state.quantity}
                                                onChange={this.handleChange}
                                                input={<BootstrapInput name="quantity" id="quantity-customized-select" />}>
                                                <MenuItem value={1}>1</MenuItem>
                                                <MenuItem value={2}>2</MenuItem>
                                                <MenuItem value={3}>3</MenuItem>
                                                <MenuItem value={4}>4</MenuItem>
                                            </Select>
                                        </div>
                                        <Button variant="contained" color="primary" className={classes.button} onClick={this.handleAddToCart}>Add to cart</Button>
                                        {this.props.auth.isAuthenticated ? <Button variant="contained" color="primary" className={classes.button} onClick={this.handleAddToWishList}>Add to wishlist</Button> : null}
                                    </div >
                                </Card>
                            </div >
                        </Card>
                        <Card className={classes.card}>
                            <div className={classes.cartHeader}> <b> Customer Reviews </b></div >
                        </Card>
                        <Card className={classes.card}>
                            <div className={classes.cartHeader}> No reviews yet </div >
                        </Card>
                    </div >
                )
        }
        return view;
    }
}

ProductDetails.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.errors
    };
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(ProductDetails));
