import { Container, Grid } from '@material-ui/core';
import React, { useContext, useEffect } from 'react'
import productContext from '../contexts/products/productContext'
import ProductCard from './ProductCard';

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
            <Container>
                <Grid container spacing={5}>
                    {products.map((product) => {
                        return <ProductCard key={product._id} product={product}/>
                    })}
                </Grid>
            </Container>
        </>
    )
}

export default Home
