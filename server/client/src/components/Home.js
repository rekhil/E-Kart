import React, { Component } from 'react';
import axios from "axios";
import { conf } from '../config';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ItemsCarousel from 'react-items-carousel';
import ProductThumbnail from './ProductThumbnail'

const styles = theme => ({
    cartHeader: {
        width: '100%',
        margin: '5px'
    },
    card: {
        display: 'flex',
        margin: '5px'
    },
    carousel_card: {
        margin: '5px',
        padding: '15px'
    }
});

class Home extends Component {
    componentWillMount() {
        this.setState({
            dealChildren: [],
            recommendChildren: [],
            dealActiveItemIndex: 0,
            recommendActiveItemIndex: 0,
        });
    }

    componentDidMount() {
        axios
            .get(`${conf.baseUrl}products/deals`)
            .then(response => {
                this.setState({
                    dealChildren: response.data.data.map(product => <ProductThumbnail key={product._id} product={product} />)
                })
            })
            .catch(err => console.log(err));

        axios
            .get(`${conf.baseUrl}products/recommendations`)
            .then(response => {
                this.setState({
                    recommendChildren: response.data.data.map(product => <ProductThumbnail key={product._id} product={product} />)
                })
            })
            .catch(err => console.log(err));
    }

    changeActiveDealItem = (dealActiveItemIndex) => this.setState({ dealActiveItemIndex });
    changeActiveReccomendItem = (recommendActiveItemIndex) => this.setState({ recommendActiveItemIndex });

    render() {
        const { classes } = this.props;
        const { dealChildren, recommendChildren, dealActiveItemIndex, recommendActiveItemIndex } = this.state;

        return (
            <div>
                <Card className={classes.card}>
                    <div className={classes.cartHeader}> <b> Today's Deals </b></div >
                </Card>
                <Card className={classes.carousel_card}>
                    <ItemsCarousel
                        numberOfCards={3} gutter={12} showSlither={true} firstAndLastGutter={true} freeScrolling={false}
                        requestToChangeActive={this.changeActiveDealItem} activeItemIndex={dealActiveItemIndex} activePosition={'center'}
                        chevronWidth={24} rightChevron={'>'} leftChevron={'<'} outsideChevron={false}>
                        {dealChildren}
                    </ItemsCarousel>
                </Card>
                {this.props.auth.isAuthenticated ?
                    <div>
                        <Card className={classes.card}>
                            <div className={classes.cartHeader}> <b> Recommendations For You </b></div >
                        </Card>
                        <Card className={classes.carousel_card}>
                            <ItemsCarousel
                                numberOfCards={3} gutter={12} showSlither={true} firstAndLastGutter={true} freeScrolling={false}
                                requestToChangeActive={this.changeActiveReccomendItem} activeItemIndex={recommendActiveItemIndex} activePosition={'center'}
                                chevronWidth={24} rightChevron={'>'} leftChevron={'<'} outsideChevron={false}>
                                {recommendChildren}
                            </ItemsCarousel>
                        </Card>
                    </div>
                    : null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.errors
    };
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(Home));
