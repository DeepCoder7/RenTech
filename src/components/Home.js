import React, { useContext, useEffect } from 'react'
import productContext from '../contexts/products/productContext'
import ProductItem from './ProductItem';

const Home = () => {
    const productCon = useContext(productContext);
    const { products, getProductDetails } = productCon;
    // console.log(product);
    useEffect(() => {
        getProductDetails();
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <div className="w-100 bg-light d-flex justify-content-around my-3" style={{ height: '40px', backgroundColor: 'ghostwhite' }}>
                <div className="btn btn-outline-secondary align-self-center">Computer</div>
                <div className="btn btn-outline-secondary align-self-center">Laptop</div>
                <div className="btn btn-outline-secondary align-self-center">Console</div>
            </div>
            <hr />
            <div className="w-100 bg-light d-flex my-3 flex-wrap">
                {products.map((product) =>{
                    return <ProductItem key={product._id} myPro={false} product={product}/>
                })}
            </div>
        </>
    )
}

export default Home
