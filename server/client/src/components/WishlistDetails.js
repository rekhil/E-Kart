import React, { Component } from 'react';
import WishlistProduct from './WishlistProduct';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { getWishlistDetails } from '../actions/wishlistActions';

const styles = theme => ({
    cartHeader: {
        width: '100%',
        margin: '5px'
    },
    card: {
        display: 'flex',
        margin: '5px'
    }
});

class WistlistDetails extends Component {
    componentWillReceiveProps(nextProps) {
        if (!nextProps.auth.isAuthenticated) {
            this.props.history.push("/");
        }
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
        this.props.dispatch(getWishlistDetails());
    }

    render() {
        const { classes } = this.props;
        var view = <div> No items in the wishlist </div >
        if (this.props.wishlist && this.props.wishlist.items) {
            view =
                (<div>
                    <Card className={classes.card}>
                        <div className={classes.cartHeader}> <b> Wishlist </b></div >
                    </Card>
                    <div>
                        {this.props.wishlist.items.map(w => <WishlistProduct key={w._id} product={w} wishListId={this.props.wishlist._id} />)}
                    </div>
                </div>)
        }
        return view;
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.errors,
        wishlist: state.wishlistReducer
    };
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(WistlistDetails));