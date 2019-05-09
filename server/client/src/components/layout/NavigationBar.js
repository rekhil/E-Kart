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
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import { connect } from "react-redux";
import { searchProducts } from '../../actions/productAction';
import { Link } from "react-router-dom";

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
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
        },
    },
    inputRoot: {
        color: 'inherit',
        width: '100%'
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
});

class NavigationBar extends Component {

    handleSearchProducts = event => {
        this.props.dispatch(searchProducts())
    };

    handleHomeMenuClick = event => {
        // this.setState({ anchorEl: event.currentTarget });

        this.props.history.push("/");
    };

    handleProfileMenuClick = event => {
        // this.setState({ anchorEl: event.currentTarget });
    };

    handleCartMenuClick = event => {
        // this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Link to="/">
                            <IconButton className={classes.homeButton} conClick={this.handleHomeMenuClick} olor="inherit" >
                                <HomeIcon />
                            </IconButton>
                        </Link>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap> E-Kart </Typography>
                        <div className={classes.search}>
                            <InputBase
                                onChange={this.handleSearchProducts}
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <Link to="/cart">
                                <IconButton onClick={this.handleCartMenuClick} color="inherit">
                                    <Badge badgeContent={4} color="secondary">
                                        <ShoppingCart />
                                    </Badge>
                                </IconButton>
                            </Link>
                            <Link to="/profile">
                                <IconButton onClick={this.handleProfileMenuClick} color="inherit">
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

export default withStyles(styles)(connect()(NavigationBar));