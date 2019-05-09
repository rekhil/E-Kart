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
            price: this.state.product.price,
            offerPrice: this.state.product.offerPrice,
            deliveryCharge: this.state.product.deliveryCharge,
            accountId: '5cd192282ca7e93e9cba02af',
            guestId: '123456'
        }

        this.props.dispatch(addToCartDetails(data))
    }

    handleAddToWishList = () => {
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

    handleChange = event => {
        this.setState({
            quantity: event.target.value
        });
    };

    render() {
        const { classes } = this.props;

        var view = !this.state.isLoading ?
            (
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
                                <Button variant="contained" color="primary" className={classes.button} onClick={this.handleAddToWishList}>Add to wishlist</Button>
                            </div >
                        </Card>
                    </div >
                </Card>)
            : (<div> No Data Found </div >)

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
