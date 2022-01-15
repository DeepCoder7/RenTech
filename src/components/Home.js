import { Container, Grid, Typography } from '@material-ui/core';
import React, { useContext, useEffect } from 'react'
import productContext from '../contexts/products/productContext'
import ProductCard from './ProductCard';
import categoryContext from '../contexts/categories/categoryContext'

const Home = () => {
    const context1 = useContext(categoryContext);
    const { category } = context1;
    const productCon = useContext(productContext);
    const { products, getProductDetails } = productCon;
    // console.log(product);
    useEffect(() => {
        getProductDetails();
        // eslint-disable-next-line
    }, [])

    // useEffect(() => {
    //     console.log(category);
    // }, [category])
    return (
        <>
            <Container>
                <Typography variant='h4'>{ category }</Typography>
                <hr />
                <Grid container spacing={5}>
                    {products.map((product) => {
                        return <ProductCard key={product._id} product={product} />
                    })}
                </Grid>
            </Container>
        </>
    )
}

export default Home
