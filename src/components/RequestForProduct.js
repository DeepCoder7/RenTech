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

const categories = [
    {
        value: 'Computer',
    },
    {
        value: 'Laptop',
    },
    {
        value: 'Console',
    },
    {
        value: 'Camera',
    },
];

const RequestForProduct = () => {

    const [productDe, setProductDe] = useState({ productName: '', category: 'Computer', descOfProduct: '' });
    const classes = useStyles();

    const modalOpener = useContext(modalContext);
    const { setIsLoginOpen } = modalOpener;

    const onChange = (e) => {
        setProductDe({ ...productDe, [e.target.name]: e.target.value });
    };

    const changeCategory = (e) => {
        setProductDe({ ...productDe, category: e.target.value });
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
            category: 'Computer',
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
                        id='category'
                        select
                        label='Category'
                        className={classes.fields}
                        value={productDe.category}
                        SelectProps={{
                            native: true,
                        }}
                        fullWidth
                        variant='outlined'
                        onChange={changeCategory}
                    >
                        {categories.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.value}
                            </option>
                        ))}
                    </TextField>
                    <TextField
                        id="descOfProduct"
                        fullWidth
                        name='descOfProduct'
                        onChange={onChange}
                        variant='outlined'
                        label="Specification"
                    />
                    <Button color='primary' variant='contained' type='submit'>Submit</Button>
                </form>
            </Container>
        </>
    );
};

export default RequestForProduct;
