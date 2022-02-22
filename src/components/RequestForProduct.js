import { Button, Container, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import modalContext from '../contexts/modalOpener/modalContext';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: '20px'
        }
    }
}))

const RequestForProduct = () => {

    const [productDe, setProductDe] = useState({ productName: '', category: '', descOfProduct: '' });
    const classes = useStyles();

    const modalOpener = useContext(modalContext);
    const { setIsLoginOpen } = modalOpener;

    const onChange = (e) => {
        setProductDe({ ...productDe, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('renToken')) {
            setIsLoginOpen(true);
            navigate('/');
        }
        // eslint-disable-next-line
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const repo = await fetch('http://localhost:8500/api/requestProduct/addRequestProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('renToken')
                },
                body: JSON.stringify(productDe)
            })
            const Ajson = await repo.json();
            console.log(Ajson);
        } catch (err) {
            console.log(err);
        }
        setProductDe({
            productName: '',
            category: '',
            descOfProduct: ''
        })
    }



    return (
        <>
            <Container className={classes.root}>
                <form onSubmit={handleSubmit} className={classes.root}>
                    <TextField
                        id="productName"
                        fullWidth
                        name='productName'
                        onChange={onChange}
                        variant='outlined'
                        label="Product Name"
                    />
                    <TextField
                        id="category"
                        fullWidth
                        name='category'
                        onChange={onChange}
                        variant='outlined'
                        label="Category"
                    />
                    <TextField
                        id="productName"
                        fullWidth
                        name='productName'
                        onChange={onChange}
                        variant='outlined'
                        label="Product Name"
                    />
                    <Button color='primary' variant='contained' type='submit'>Submit</Button>
                </form>
            </Container>
        </>
    );
};

export default RequestForProduct;
