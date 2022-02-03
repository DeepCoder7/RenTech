import { Container, Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import ProductCard from './Products/ProductCard';
import { useNavigate } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
    containerStyle: {
        marginTop: theme.spacing(1),
    }
}))

const MyBookMarks = () => {
    const classes = useStyle();
    const navigate = useNavigate();

    const [myBookMarkProducts, setmyBookMarkProducts] = useState([]);

    useEffect(async () => {
        if (localStorage.getItem('renToken')) {
            const respo = await fetch('http://localhost:8500/api/productDetail/getBookMarkProducts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('renToken')
                }
            });

            const MyBookmarkPro = await respo.json();
            console.log(MyBookmarkPro);
            setmyBookMarkProducts(MyBookmarkPro);
        } else {
            navigate('/');
        }
    }, [localStorage.getItem('renToken')])

    return (
        <>
            <Container className={classes.containerStyle}>
                <Typography variant='h4'>My BookMark Products</Typography>
                <hr />
                <Grid container spacing={5}>
                    {myBookMarkProducts && myBookMarkProducts.map((product) => {
                        return <ProductCard key={product._id} product={product} />
                    })}
                </Grid>
            </Container>
        </>
    )
}

export default MyBookMarks
