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
    },
    containerStyleAfterMedia: {
        marginTop: theme.spacing(1), 
        paddingLeft: theme.spacing(0.8),
        paddingRight: theme.spacing(0.8),
    },
}))

const Home = () => {
    const context1 = useContext(categoryContext);
    const { category, search } = context1;
    const productCon = useContext(productContext);
    const { products, getProductDetails } = productCon;
    const matches = useMediaQuery('(min-width:600px)');
    const classes = useStyle();
    useEffect(() => {
        getProductDetails(search, category);
        // eslint-disable-next-line
    }, [search, category])

    const DateOfLoad = new Date();

    const CheckDate = e =>{
        e.preventDefault();
        let newDate =new Date();
        newDate.setDate(DateOfLoad.getDate() + 10);
        console.log(DateOfLoad,"<",newDate);
    }

    return (
        <>
            {!matches && <Category />}
            <Container className={clsx(classes.containerStyle,{
                [classes.containerStyleAfterMedia]:!matches
            })}>
                <Typography variant='h4'>{category}</Typography>
                <hr />
                <button onClick={CheckDate}>Click</button>
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
