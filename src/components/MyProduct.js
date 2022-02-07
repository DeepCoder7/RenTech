import React, { useState, useEffect, useContext } from 'react';
import productContext from '../contexts/products/productContext';
import { Container, Grid, useMediaQuery, makeStyles } from '@material-ui/core';
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
}))

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
        <Container className={clsx(classes.containerStyle, {
          [classes.containerStyleAfterMedia]: !matches
        })}>
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
              <div className='mb-3'>
                <label htmlFor='productName' className='form-label'>
                  Product Name
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='productName'
                  name='productName'
                  aria-describedby='emailHelp'
                  onChange={onChange}
                  value={curProduct.productName}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='price' className='form-label'>
                  Price
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='price'
                  name='price'
                  aria-describedby='emailHelp'
                  onChange={onChange}
                  value={curProduct.price}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='location' className='form-label'>
                  Location
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='location'
                  name='location'
                  aria-describedby='emailHelp'
                  onChange={onChange}
                  value={curProduct.location}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='model' className='form-label'>
                  Model
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='model'
                  name='model'
                  aria-describedby='emailHelp'
                  onChange={onChange}
                  value={curProduct.model}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='duration' className='form-label'>
                  Duration
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='duration'
                  name='duration'
                  aria-describedby='emailHelp'
                  onChange={onChange}
                  value={curProduct.duration}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='noOfProduct' className='form-label'>
                  No Of Product
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='noOfProduct'
                  name='noOfProduct'
                  aria-describedby='emailHelp'
                  onChange={onChange}
                  value={curProduct.noOfProduct}
                />
              </div>
              <button
                type='submit'
                className='btn btn-primary'
                onClick={editProducts}
              >
                Submit
              </button>
              <button
                className='btn btn-primary mx-2'
                onClick={() => setEditIsOpen(false)}
              >
                Close
              </button>
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
