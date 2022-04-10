import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useEffect } from 'react'
import ProductCard from './Products/ProductCard';
import { useNavigate } from 'react-router-dom';
import productContext from '../contexts/products/productContext';

const useStyle = makeStyles((theme) => ({
    containerStyle: {
        marginTop: theme.spacing(1),
        maxWidth: '1420px',
    }
}))

const MyBookMarks = () => {
    const classes = useStyle();
    const navigate = useNavigate();

    const context = useContext(productContext);
    const { myBookMarkProducts, MyBookMarkProducts } = context;

    // const [myBookMarkProducts, setmyBookMarkProducts] = useState([]);

    useEffect( () => {
        if (localStorage.getItem('renToken')) {
            MyBookMarkProducts();
        } else {
            navigate('/');
        }
        // eslint-disable-next-line
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
