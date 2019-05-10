import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import List from '@material-ui/icons/List';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import { connect } from "react-redux";
import { searchProducts } from '../../actions/productAction';
import { Link } from "react-router-dom";
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import { getCartCount } from '../../actions/cartAction';


const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    homeButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        overflow: 'unset',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        },
    },
    search: {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '50%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
        },
        height: '30px'
    },
    inputRoot: {
        marginLeft: '1%',
        marginTop: '5px',
        color: 'inherit',
        width: '98%',
        height: '28px'
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    fab: {
        margin: theme.spacing.unit,
    }
});

class WishListIcon extends Component {
    render() {
        return (
            <Link to="/wishlist">
                <IconButton color="inherit">
                    <List />
                </IconButton>
            </Link>);
    }
}

class NavigationBar extends Component {
    componentDidMount() {
        this.props.dispatch(getCartCount('123456'))
    }

    handleSearchProducts = event => {
        this.props.dispatch(searchProducts())
    };

    render() {


        const { classes } = this.props;
        const cartItemCount = this.props.cartCount ? this.props.cartCount : 0;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Link to="/">
                            <IconButton className={classes.homeButton} color="inherit" >
                                <HomeIcon />
                            </IconButton>
                        </Link>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap> E-Kart </Typography>
                        <div className={classes.search}>
                            <InputBase
                                classes={{
                                    root: classes.inputRoot
                                }}
                            />
                        </div>
                        <Link to="/products">
                            <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.handleSearchProducts}>
                                <SearchIcon />
                            </Fab>
                        </Link>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            {this.props.auth.isAuthenticated ? <WishListIcon /> : null}
                            <Link to="/cart">
                                <IconButton color="inherit">
                                    <Badge badgeContent={cartItemCount} color="secondary">
                                        <ShoppingCart />
                                    </Badge>
                                </IconButton>
                            </Link>
                            <Link to="/profile">
                                <IconButton color="inherit">
                                    <AccountCircle />
                                </IconButton>
                            </Link>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

NavigationBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        cartCount: state.cartCountReducer.count,
        auth: state.auth
    };
}

export default withStyles(styles)(connect(mapStateToProps)(NavigationBar));