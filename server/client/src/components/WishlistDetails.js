import React, { Component } from 'react';
import WishlistProduct from './WishlistProduct';
import { connect } from 'react-redux';
import axios from 'axios';
import { conf } from '../config.js';
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
    }
});

class WistlistDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wishlist: [],
            isLoading: true
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.auth.isAuthenticated) {
            this.props.history.push("/");
        }
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }

        axios.get(`${conf.baseUrl}wishlist/${this.props.auth.email}`)
            .then(response => {
                this.setState({
                    wishlist: response.data.data,
                    isLoading: false
                });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {
        const { classes } = this.props;
        var view = <div> No items in the wishlist </div >
        if (this.state.isLoading) {
            view = <div> Loading </div >
        } else if (!this.state.isLoading && this.state.wishlist && this.state.wishlist.items) {
            view =
                (<div>
                    <Card className={classes.card}>
                        <div className={classes.cartHeader}> <b> Wishlist </b></div >
                    </Card>
                    <div>
                        {this.state.wishlist.items.map(w => <WishlistProduct key={w._id} product={w} />)}
                    </div>
                </div>)
        }
        return view;
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.errors
    };
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(WistlistDetails));