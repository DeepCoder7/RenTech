import { Container, Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import React, { useContext, useEffect } from 'react'
import productContext from '../contexts/products/productContext'
import ProductCard from './Products/ProductCard';
import categoryContext from '../contexts/categories/categoryContext'
import Category from './Category';

const useStyle = makeStyles((theme) => ({
    containerStyle: {
        marginTop: theme.spacing(1),
    }
}))

const Home = () => {
    const context1 = useContext(categoryContext);
    const { category, search } = context1;
    const productCon = useContext(productContext);
    const { products, getProductDetails } = productCon;
    const matches = useMediaQuery('(min-width:600px)');
    const classes = useStyle();
    // console.log(product);
    useEffect(() => {
        getProductDetails(search, category);
    }, [search, category])

    return (
        <>
            {!matches && <Category />}
            <Container className={classes.containerStyle}>
                <Typography variant='h4'>{category}</Typography>
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
