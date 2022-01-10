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
