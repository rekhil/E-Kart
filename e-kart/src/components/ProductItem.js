import React from 'react';
import { Link } from 'react-router-dom';
import Img from 'react-image'

const ProductItem = props => {
    const productUrl = `/products/${props.product._id}`
    return (
        <div className='productItem'>
            <Img src={props.product.image} />
            <span>
                {props.product.displayName}
                <Link to={productUrl} >Details</Link>
            </span >
        </div >
    )
}

export default ProductItem;
