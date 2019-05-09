import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

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
    },
    button: {
        margin: theme.spacing.unit,
        width: '15%'
    }
});

class ProductItem extends Component {

    render() {
        const { classes } = this.props;
        const productUrl = `/products/${this.props.product._id}`

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
                            Price: ₹{this.props.product.price}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link to={productUrl}>
                            <Button size="small" color="primary" > Details </Button>
                        </Link>
                    </CardActions>
                </div >
            </Card>
        )
    }
}

export default withStyles(styles, { withTheme: true })(ProductItem);