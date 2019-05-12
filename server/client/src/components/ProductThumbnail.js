import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    card: {
        padding: '2px',
        margin: '5px',
        height: 205,
        background: '#f7f7f7'
    },
    card_div: {
        display: 'flex'
    },
    cover: {
        height: 100,
        width: 100,
    },
    content: {
        flex: '1 0 auto',
    },
    lower_div: {
        margin: '5px'
    },
    product: {
        fontSize: 14,
        color: 'blue',
    },
    deal_details: {
        marginLeft: '20px',
        marginBottom: '2px',
        color: 'brown'
    }
});

class ProductThumbnail extends Component {
    render() {
        const { classes, product } = this.props;
        const productUrl = `/products/${product._id}`

        var discountText = ''

        product.offerPrice = product.price.toFixed(2);
        if (product.discount && product.discount > 0) {
            discountText = `Discount: ${product.discount}%`
            product.offerPrice = (parseFloat(product.price) -
                (parseFloat(product.price) * (parseFloat(product.discount) / 100))).toFixed(2);
        }

        var todayDate = new Date();
        if (product.deals && product.deals.length > 0) {
            var todaysDeal = product.deals.find(s => s.date === `${todayDate.getFullYear()}/${todayDate.getMonth() + 1}/${todayDate.getDate()}`)
            if (todaysDeal) {
                discountText = `Discount (Today's deal): ${todaysDeal.discount}%`
                product.offerPrice = (parseFloat(product.price) -
                    (parseFloat(product.price) * (parseFloat(todaysDeal.discount) / 100))).toFixed(2);

            }
        }

        return (
            <Link to={productUrl} className={classes.productLink}>
                <Card className={classes.card}>
                    <div className={classes.card_div}>
                        <CardMedia
                            className={classes.cover}
                            image={product.image}
                            title={product.displayName}
                        />
                        <CardContent className={classes.content}>
                            <Typography component="p" className={classes.deal_details}>
                                MRP: ₹{product.price.toFixed(2)}
                            </Typography>
                            {discountText === '' ? null :
                                <Typography component="p" className={classes.deal_details}>
                                    {discountText}
                                </Typography>}
                            <Typography component="p" className={classes.deal_details}>
                                Price: ₹{product.offerPrice}
                            </Typography>
                        </CardContent>
                    </div>
                    <div className={classes.lower_div}>
                        <div className={classes.product}>
                            {product.displayName}
                        </div>
                        <Typography variant="subtitle1" color="textSecondary">
                            {product.category.name}
                        </Typography>
                        <Typography component="p">
                            {product.shortDesc}
                        </Typography>
                    </div>
                </Card>
            </Link>
        )
    }
}

export default withStyles(styles, { withTheme: true })(ProductThumbnail);