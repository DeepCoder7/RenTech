import React, { useEffect, useContext } from 'react'
import productContext from '../contexts/products/productContext'
import { Container, Grid } from '@material-ui/core';
import ProductCard from './ProductCard';

const MyProduct = () => {
    const context = useContext(productContext);
    const { myProducts, getMyProduct, deleteProduct } = context;
    const DeleteProduct = async(product) =>{
        deleteProduct(product._id);
    }
    useEffect(() => {
        getMyProduct();
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <Container>
                <Grid container spacing={5}>
                    {myProducts.map((product) => {
                        return <ProductCard key={product._id} product={product}/>
                    })}
                </Grid>
            </Container>
        </>
    )
}

export default MyProduct
