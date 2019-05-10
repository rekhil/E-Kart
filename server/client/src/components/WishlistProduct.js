import React, { Component } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { deleteWishlistDetails } from '../actions/wishlistActions';

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

class WishlistProduct extends Component {

    handleRemoveFromWishlist = () => {
        this.props.dispatch(deleteWishlistDetails(this.props.wishListId, this.props.product._id))
    }

    handleAddToCart = () => {

    }

    render() {

        const productUrl = `/products/${this.props.product._id}`
        const { classes } = this.props;
        var priceText = `MRP: ₹${this.props.product.price.toFixed(2)}`
        this.props.product.offerPrice = this.props.product.price.toFixed(2);
        if (this.props.product.discount && this.props.product.discount > 0) {
            priceText = `MRP: ₹${this.props.product.price.toFixed(2)}  Discount: ${this.props.product.discount}%`
            this.props.product.offerPrice = (parseFloat(this.props.product.price) -
                (parseFloat(this.props.product.price) * (parseFloat(this.props.product.discount) / 100))).toFixed(2);
        }
        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cover}
                    image={this.props.product.image}
                    title={this.props.product.displayName}
                />
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Link to={productUrl} className={classes.productLink}>
                            {this.props.product.displayName}
                        </Link>
                        <Typography variant="subtitle1" color="textSecondary">
                            {this.props.product.category.name}
                        </Typography>
                        <Typography component="p">
                            {this.props.product.shortDesc}
                        </Typography>
                        <Typography component="p">
                            {priceText}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" onClick={this.handleRemoveFromWishlist}> Remove from wishlist </Button>
                        <Button size="small" color="primary" onClick={this.handleAddToCart}> Save for later </Button>
                    </CardActions>
                </div >
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.errors
    };
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(WishlistProduct));