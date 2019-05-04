import React from 'react';
import ProductItem from './ProductItem'

const ProductItemList = props => {
    const productList = props.productList.map(product => <ProductItem key={product.productId} product={product} />)
    return <div className='productItemList'> {productList} </div>;
}

export default ProductItemList;
