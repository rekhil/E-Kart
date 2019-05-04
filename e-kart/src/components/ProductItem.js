import React from 'react';
import { Link } from 'react-router-dom';
import Img from 'react-image'

const ProductItem = props => {
    const productUrl = `/products/${props.product.productId}`
    return (
        <div className='productItem'>
            <Img src={props.product.productImage} />
            <span>
                {props.product.productName}
                <Link to={productUrl} >Details</Link>
            </span >
        </div >
    )
}

export default ProductItem;
