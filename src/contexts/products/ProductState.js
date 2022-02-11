import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductContext from "./productContext";

const ProductState = (props) => {
    const [authToken, setAuthToken] = useState('');

    useEffect(() => {
        setAuthToken(localStorage.getItem('renToken'));
    }, [localStorage.getItem('renToken')]);

    const host = 'http://localhost:8500/api/productDetail'
    const [products, setProducts] = useState([]);
    const [myProducts, setMyProducts] = useState([]);

    // To get the product details from api
    const getProductDetails = async (search, category) => {
        const response = await fetch(`${host}/getProduct/${category}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'search': search
            }
        })

        const Pjson = await response.json();
        // console.log(Pjson);
        setProducts(Pjson);
    }

    const getMyProduct = async () => {
        const response = await fetch(`${host}/myProduct`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('renToken')
            }
        })

        const Pjson = await response.json();
        // console.log(Pjson);
        setMyProducts(Pjson);
    }

    const postProduct = async (productDe) => {
        var formData = new FormData();

        axios.defaults.headers.common['auth-token'] = localStorage.getItem('renToken');
        axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

        formData.append("productImage", productDe.productImage, productDe.productImage.name);
        formData.append("productName", productDe.productName);
        formData.append("price", productDe.price);
        formData.append("proDesc", productDe.proDesc);
        formData.append("location", productDe.location);
        formData.append("category", productDe.category);
        formData.append("model", productDe.model);
        formData.append("noOfProduct", productDe.noOfProduct);
        formData.append("duration", productDe.duration);
        // const response = await fetch(`${host}/addProduct`,{
        //     method : 'POST',
        //     headers : {
        //         "Content-Type": "multipart/form-data",
        //         'auth-token': authToken
        //     },
        //     body: formData
        // })

        console.log(formData);
        const response = await axios.post(`${host}/addProduct`, formData);

        // const Pjson = await response.json();
        console.log(response);
    }

    const updateProductDetails = async (curProduct) => {
        try {

            const respon = await fetch(`${host}/updateProduct/${curProduct._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken
                },
                body: JSON.stringify(curProduct)
            })
            getMyProduct();
        } catch (err) {
            console.log(err);
        }
    }

    const deleteProduct = async (_id) => {
        const response = await fetch(`${host}/deleteProduct/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            }
        })

        const Djson = await response.json();
        getMyProduct();
    }

    return (
        <ProductContext.Provider value={{ products, myProducts, authToken, setAuthToken, deleteProduct, getProductDetails, getMyProduct, postProduct, updateProductDetails }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductState