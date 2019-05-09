import React, { Component } from 'react';
import ProductItem from './ProductItem';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

const styles = theme => ({
    cartHeader: {
        width: '100%',
        margin: '5px'
    },
    card: {
        display: 'flex',
        margin: '5px'
    },
    button: {
        margin: theme.spacing.unit,
        width: '15%'
    }
});

class ProductItemList extends Component {
    render() {

        const { classes } = this.props;

        var view = this.props.productList ?
            (<div>
                <Card className={classes.card}>
                    <div className={classes.cartHeader}> <b>Search results </b></div >
                </Card>
                <div>
                    {this.props.productList.map(product => <ProductItem key={product._id} product={product} />)}
                </div>
            </div>
            )
            : (<div> No products found </div >)

        return view;
    }
}

const mapStateToProps = state => {
    return {
        productList: state.productsReducer
    };
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(ProductItemList));
