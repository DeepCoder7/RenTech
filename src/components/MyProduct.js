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
    maxWidth: '1420px',
  },
  containerStyleAfterMedia: {
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(0.8),
    paddingRight: theme.spacing(0.8),
  },
  btnFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '2px',
  },
  my2: {
    marginTop: '7px',
  },
}));

const availables = [
  {
    value: 'Yes',
  },
  {
    value: 'No',
  },
];

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
    available: true,
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
      available: currentProduct.available,
      checkAva: currentProduct.available ? "Yes" : "No",
    });
    console.log(currentProduct);
    setEditIsOpen(true);
  };
  const editProducts = (e) => {
    e.preventDefault();
    console.log(curProduct);
    updateProductDetails(curProduct);

    setEditIsOpen(false);
  };

  const changeAvailability = (e) => {
    if (e.target.value === 'Yes') {
      setCurProduct({ ...curProduct, available: true, checkAva: e.target.value });
    } else {
      setCurProduct({ ...curProduct, available: false, checkAva: e.target.value });
    }
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
                width: matches ? '80%' : '95%',
                height: matches ? '640px' : '81.2%',
                marginTop: matches ? '6%' : '22%',
                marginLeft: matches ? 'auto' : '-8%',
                marginRight: 'auto',
              },
            }}
          >
            {/* <h2>Edit a Note</h2> */}
            <div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '70vh',
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
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <TextField
                    label='No Of Product'
                    name='noOfProduct'
                    required
                    style={{ width: '35%' }}
                    variant='outlined'
                    onChange={onChange}
                    value={curProduct.noOfProduct}
                  />
                  <TextField
                    id='category'
                    select
                    label='Available'
                    style={{ width: '35%' }}
                    value={curProduct.checkAva}
                    SelectProps={{
                      native: true,
                    }}
                    variant='outlined'
                    onChange={changeAvailability}
                  >
                    {availables.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </TextField>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  style={{ margin: '4px' }}
                  onClick={() => setEditIsOpen(false)}
                  variant='contained'
                  color='secondary'
                >
                  Close
                </Button>
                <Button
                  style={{ margin: '4px' }}
                  type='submit'
                  onClick={editProducts}
                  variant='contained'
                  color='primary'
                >
                  Submit
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
