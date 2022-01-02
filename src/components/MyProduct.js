import React, { useEffect, useContext } from 'react'
import productContext from '../contexts/products/productContext'
import ProductItem from './ProductItem'

const MyProduct = () => {
    const context = useContext(productContext);
    const { myProducts, getMyProduct, deleteProduct } = context;
    const DeleteProduct = async(product) =>{
        deleteProduct(product._id);
    }
    useEffect(() => {
        getMyProduct();
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <div className="w-100 bg-light d-flex flex-wrap my-3">
                {myProducts.map((product) =>{
                    return <ProductItem key={product._id} myPro={true} DeleteProduct={DeleteProduct} product={product} />
                })}
            </div>
        </>
    )
}

export default MyProduct
