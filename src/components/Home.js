import { Container, Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import React, { useContext, useEffect } from 'react'
import productContext from '../contexts/products/productContext'
import ProductCard from './Products/ProductCard';
import categoryContext from '../contexts/categories/categoryContext'
import Category from './Category';
import clsx from 'clsx';

const useStyle = makeStyles((theme) => ({
    containerStyle: {
        marginTop: theme.spacing(1),
        maxWidth: '1420px',
    },
    containerStyleAfterMedia: {
        marginTop: theme.spacing(1),
        paddingLeft: theme.spacing(0.8),
        paddingRight: theme.spacing(0.8),
    },
}))

const Home = () => {
    const filterCon = useContext(categoryContext);
    const { category, search, filterValue } = filterCon;
    const productCon = useContext(productContext);
    const { products, getProductDetails } = productCon;
    const matches = useMediaQuery('(min-width:600px)');
    const classes = useStyle();
    useEffect(() => {
        getProductDetails(search, category, filterValue);
        // eslint-disable-next-line
    }, [search, category])

    return (
        <>
            {!matches && <Category />}
            <Container className={clsx(classes.containerStyle, {
                [classes.containerStyleAfterMedia]: !matches
            })}>
                <Typography variant='h4'>{category}</Typography>
                <hr />
                <Grid container spacing={2}>
                    {products.map((product) => {
                        return <ProductCard key={product._id} product={product} />
                    })}
                </Grid>
            </Container>
        </>
    )
}

export default Home
