import React, { useState, useContext, useEffect } from 'react';
import {
  Grid,
  makeStyles,
  Paper,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import productContext from '../contexts/products/productContext';
import { useNavigate } from 'react-router-dom';
import modalContext from '../contexts/modalOpener/modalContext';
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  fields: {
    width: '90%',
    margin: theme.spacing(1),
  },

  head: {
    margin: theme.spacing(2),
  },

  pageContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  pageContentMobileView: {
    margin: theme.spacing(0),
    padding: theme.spacing(0),
  },
}));

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

const PostProduct = () => {
  const modalOpener = useContext(modalContext);
  const { setIsLoginOpen } = modalOpener;

  const context = useContext(productContext);
  const { postProduct } = context;

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('renToken')) {
      setIsLoginOpen(true);
      navigate('/');
    }
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();

  const [productDe, setProductDe] = useState({
    productName: '',
    model: '',
    price: '',
    category: 'Computer',
    productImage: '',
    duration: 28,
    location: '',
    noOfProduct: 1,
    proDesc: '',
  });
  const onChange = e => {
    setProductDe({ ...productDe, [e.target.name]: e.target.value });
  }
  const changeCategory = (e) => {
    setProductDe({ ...productDe, category: e.target.value });
  };

  const uploadImage = e => {
    setProductDe({ ...productDe, productImage: e.target.files[0] });
  }

  const resetFormValues = e =>{
    // e.preventDefault();
    setProductDe({
      productName: '',
      model: '',
      price: '',
      category: 'Computer',
      productImage: '',
      duration: 28,
      location: '',
      noOfProduct: 1,
      proDesc: '',
    });
  }

  const submitProduct = e => {
    e.preventDefault();
    console.log(productDe);
    postProduct(productDe);
    setProductDe({
      productName: '',
      model: '',
      price: '',
      category: 'Computer',
      productImage: '',
      duration: 28,
      location: '',
      noOfProduct: 1,
      proDesc: '',
    });
  }

  return (
    <>
      <Paper className={clsx(classes.pageContent,{
        [classes.pageContentMobileView]: true
      })}>
        <form onSubmit={submitProduct}>
          <Typography variant='h5' align='center'>
            Post Product Form
          </Typography>
          <hr />
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography variant='h5' align='center' className={classes.head}>
                Product Details
              </Typography>
              <TextField
                id='category'
                select
                label='Category'
                className={classes.fields}
                value={productDe.category}
                SelectProps={{
                  native: true,
                }}
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
                className={classes.fields}
                name='productName'
                id='productName'
                onChange={onChange}
                value={productDe.productName}
                variant='outlined'
                label='Product Name'
              />
              <TextField
                className={classes.fields}
                name='model'
                id='model'
                onChange={onChange}
                value={productDe.model}
                variant='outlined'
                label='Model'
              />
              <TextField
                className={classes.fields}
                name='noOfProduct'
                id='noOfProduct'
                onChange={onChange}
                variant='outlined'
                type='number'
                inputProps={{ min: 1 }}
                defaultValue={1}
                label='Total Products'
              />
              <TextField
                className={classes.fields}
                required
                onChange={uploadImage}
                type='file'
                name='prodImage'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='h5' align='center' className={classes.head}>
                Rent Details
              </Typography>
              <TextField
                className={classes.fields}
                label='Rent Price ₹'
                name='price'
                id='price'
                onChange={onChange}
                inputProps={{ min: 0 }}
                type='number'
                variant='outlined'
                defaultValue={0}
              />
              <TextField
                className={classes.fields}
                name='duration'
                id='duration'
                required
                onChange={onChange}
                label='Rent Duration In Days'
                inputProps={{ min: 1 }}
                type='number'
                variant='outlined'
                defaultValue={1}
              />
              <TextField
                className={classes.fields}
                name='location'
                id='location'
                value={productDe.location}
                required
                onChange={onChange}
                value={productDe.location}
                label='Rent Location'
                variant='outlined'
              />
              <TextField
                className={classes.fields}
                name='proDesc'
                id='proDesc'
                required
                onChange={onChange}
                value={productDe.proDesc}
                multiline
                rows={2}
                label='Description'
                variant='outlined'
              />
              <Grid container justifyContent='space-around'>
                <Button
                  style={{ margin: '4px' }}
                  type='reset'
                  onClick={resetFormValues}
                  variant='contained'
                  color='secondary'
                >
                  Reset
                </Button>
                <Button
                  style={{ margin: '4px' }}
                  type='submit'
                  variant='contained'
                  color='primary'
                >
                  POST
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
};

export default PostProduct;
