import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ProductContext from './productContext';
import notifyContext from '../NotificationBar/notifyContext';

const ProductState = (props) => {
  const notifyCon = useContext(notifyContext);
  const { notify } = notifyCon;

  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    setAuthToken(localStorage.getItem('renToken'));
    // eslint-disable-next-line
  }, [localStorage.getItem('renToken')]);

  const host = 'http://localhost:8500/api/productDetail';
  const [products, setProducts] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [myBookMarkProducts, setMyBookMarkProducts] = useState([]);

  // To get the product details from api
  const getProductDetails = async (search, category, filterValue) => {
    const response = await fetch(`${host}/getProduct/${category}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        search: search,
      },
      body: JSON.stringify(filterValue)
    });

    const Pjson = await response.json();
    if (Pjson.success) {
      setProducts(Pjson.products);
    } else {
      notify('error', Pjson.message);
    }
  };

  const getMyProduct = async () => {
    const response = await fetch(`${host}/myProduct`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('renToken'),
      },
    });

    const Pjson = await response.json();
    if (Pjson.success) {
      setMyProducts(Pjson.myProduct);
    } else {
      notify('error', Pjson.message);
    }
  };

  const MyBookMarkProducts = async () => {
    try {
      const respo = await fetch(
        'http://localhost:8500/api/productDetail/getBookMarkProducts',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('renToken'),
          },
        }
      );

      const respoJson = await respo.json();
      if (respoJson.success) {
        setMyBookMarkProducts(respoJson.myBookMarkProducts);
      } else {
        notify('error', respoJson.message);
      }
    } catch (err) {
      notify('error', err);
    }
  };

  const postProduct = async (productDe) => {
    var formData = new FormData();

    axios.defaults.headers.common['auth-token'] =
      localStorage.getItem('renToken');
    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

    formData.append(
      'productImage',
      productDe.productImage,
      productDe.productImage.name
    );
    formData.append('productName', productDe.productName);
    formData.append('price', productDe.price);
    formData.append('proDesc', productDe.proDesc);
    formData.append('location', productDe.location);
    formData.append('category', productDe.category);
    formData.append('model', productDe.model);
    formData.append('noOfProduct', productDe.noOfProduct);
    formData.append('duration', productDe.duration);

    console.log(formData);
    const response = await axios.post(`${host}/addProduct`, formData);

    const Pjson = response.data;
    if (Pjson.success) {
      notify('success', Pjson.message);
    } else {
      notify('error', Pjson.message);
    }
  };

  const updateProductDetails = async (curProduct) => {
    try {
      const respon = await fetch(`${host}/updateProduct/${curProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
        body: JSON.stringify(curProduct),
      });
      const Pjson = await respon.json();
      if (Pjson.success) {
        notify('success', Pjson.message);
        getMyProduct();
      } else {
        notify('error', Pjson.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (_id) => {
    const response = await fetch(`${host}/deleteProduct/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken,
      },
    });

    const Pjson = await response.json();
    if (Pjson.success) {
      notify('success', Pjson.message);
      getMyProduct();
    } else {
      notify('error', Pjson.message);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        myBookMarkProducts,
        myProducts,
        authToken,
        setAuthToken,
        deleteProduct,
        getProductDetails,
        getMyProduct,
        postProduct,
        updateProductDetails,
        MyBookMarkProducts,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
