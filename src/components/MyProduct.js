import React, { useState, useEffect, useContext } from 'react';
import productContext from '../contexts/products/productContext';
import {
  Container,
  Grid,
  useMediaQuery,
  makeStyles,
  TextField,
  Button,
} from '@material-ui/core';
import MyProductCard from './Products/MyProductCard';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import modalContext from '../contexts/modalOpener/modalContext';
import clsx from 'clsx';

Modal.setAppElement('#root');

const useStyle = makeStyles((theme) => ({
  containerStyle: {
    marginTop: theme.spacing(1),
  },
  containerStyleAfterMedia: {
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(0.8),
    paddingRight: theme.spacing(0.8),
  },
}));

const MyProduct = () => {
  const modalOpener = useContext(modalContext);
  const { setIsLoginOpen } = modalOpener;

  const navigate = useNavigate();
  const context = useContext(productContext);
  const { myProducts, getMyProduct, deleteProduct, updateProductDetails } =
    context;

  const [editIsOpen, setEditIsOpen] = useState(false);

  const matches = useMediaQuery('(min-width:600px)');
  const classes = useStyle();

  const DeleteProduct = async (product) => {
    deleteProduct(product._id);
  };

  useEffect(() => {
    if (localStorage.getItem('renToken')) {
      getMyProduct();
    } else {
      setIsLoginOpen(true);
      navigate('/');
    }
    // eslint-disable-next-line
  }, [localStorage.getItem('renToken')]);

  const [curProduct, setCurProduct] = useState({
    _id: '',
    productName: '',
    price: '',
    location: '',
    category: '',
    model: '',
    duration: 28,
    noOfProduct: 1,
  });
  const updateProduct = (currentProduct) => {
    setCurProduct({
      _id: currentProduct._id,
      productName: currentProduct.productName,
      price: currentProduct.price,
      location: currentProduct.location,
      model: currentProduct.model,
      duration: currentProduct.duration,
      noOfProduct: currentProduct.noOfProduct,
    });
    setEditIsOpen(true);
  };
  const editProducts = (e) => {
    e.preventDefault();
    updateProductDetails(curProduct);

    setEditIsOpen(false);
  };

  const onChange = (e) => {
    setCurProduct({ ...curProduct, [e.target.name]: e.target.value });
  };
  return (
    <>
      {localStorage.getItem('renToken') && (
        <Container
          className={clsx(classes.containerStyle, {
            [classes.containerStyleAfterMedia]: !matches,
          })}
        >
          <Modal
            isOpen={editIsOpen}
            style={{
              overlay: {
                backgroundColor: 'rgba(115,115,115,0.2)',
              },
              content: {
                width: '1000px',
                marginTop: '5.5%',
                marginLeft: 'auto',
                marginRight: 'auto',
                height: '580px',
              },
            }}
          >
            {/* <h2>Edit a Note</h2> */}
            <div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '60vh',
                  justifyContent: 'space-evenly',
                }}
              >
                <TextField
                  label='Product Name'
                  name='productName'
                  required
                  fullWidth
                  variant='outlined'
                  onChange={onChange}
                  value={curProduct.productName}
                />
                <TextField
                  label='Price'
                  name='price'
                  required
                  fullWidth
                  variant='outlined'
                  onChange={onChange}
                  value={curProduct.price}
                />
                <TextField
                  label='Location'
                  name='location'
                  required
                  fullWidth
                  variant='outlined'
                  onChange={onChange}
                  value={curProduct.location}
                />
                <TextField
                  label='Model'
                  name='model'
                  required
                  fullWidth
                  variant='outlined'
                  onChange={onChange}
                  value={curProduct.model}
                />
                <TextField
                  label='Duration'
                  name='duration'
                  required
                  fullWidth
                  variant='outlined'
                  onChange={onChange}
                  value={curProduct.duration}
                />
                <TextField
                  label='No Of Product'
                  name='noOfProduct'
                  required
                  fullWidth
                  variant='outlined'
                  onChange={onChange}
                  value={curProduct.noOfProduct}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  style={{ margin: '4px' }}
                  type='submit'
                  onClick={editProducts}
                  variant='contained'
                  color='secondary'
                >
                  Submit
                </Button>
                <Button
                  style={{ margin: '4px' }}
                  onClick={() => setEditIsOpen(false)}
                  variant='contained'
                  color='primary'
                >
                  Close
                </Button>
              </div>
            </div>
          </Modal>
          <Grid container spacing={2}>
            {myProducts.map((product) => {
              return (
                <MyProductCard
                  key={product._id}
                  updateProduct={updateProduct}
                  product={product}
                  DeleteProduct={DeleteProduct}
                />
              );
            })}
          </Grid>
        </Container>
      )}
    </>
  );
};

export default MyProduct;
