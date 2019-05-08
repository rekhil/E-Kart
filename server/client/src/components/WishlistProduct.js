import React from 'react';
import Img from 'react-image'

const WishlistProduct = props => {
    return (
        <div className='productItem'>
            <Img src={props.product.image} />
            <span>
                {props.product.displayName}
            </span >
        </div >
    )
}

export default WishlistProduct;