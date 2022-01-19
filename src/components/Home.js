import { Container, Grid, Typography, useMediaQuery } from '@material-ui/core';
import React, { useContext, useEffect } from 'react'
import productContext from '../contexts/products/productContext'
import ProductCard from './ProductCard';
import categoryContext from '../contexts/categories/categoryContext'
import Category from './Category';

const Home = () => {
    const context1 = useContext(categoryContext);
    const { category } = context1;
    const productCon = useContext(productContext);
    const { products, getProductDetails } = productCon;
    const matches = useMediaQuery('(min-width:600px)');
    // console.log(product);
    useEffect(() => {
        getProductDetails(category);
    }, [category])

    // useEffect(() => {
    //     console.log(category);
    // }, [category])
    return (
        <>
            {!matches && <Category />}
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
