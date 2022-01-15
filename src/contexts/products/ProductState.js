import axios from "axios";
import React, { useState, useContext } from "react";
import ProductContext from "./productContext";

const ProductState = (props) =>{
    const [authToken, setAuthToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiOGE0ZWE3YjJjZmQ3YWVmZDU3MDJiIn0sImlhdCI6MTY0MDI4MDMxNH0.rqfORNXMoBYiSGZ35VzRT35JutVdYqZUxtVYmIDGWCY');
    const host = 'http://localhost:8500/api/productDetail'
    const [products, setProducts] = useState([]);
    const [myProducts, setMyProducts] = useState([]);

    // To get the product details from api
    const getProductDetails = async() =>{
        const response = await fetch(`${host}/getProduct`,{
            method : 'GET',
            headers : {
                'Content-Type': 'application/json',
                'auth-token': authToken
            }
        })

        const Pjson = await response.json();
        // console.log(Pjson);
        setProducts(Pjson);
    }

    const getMyProduct = async() =>{
        const response = await fetch(`${host}/myProduct`,{
            method : 'GET',
            headers : {
                'Content-Type': 'application/json',
                'auth-token': authToken
            }
        })

        const Pjson = await response.json();
        // console.log(Pjson);
        setMyProducts(Pjson);
    }

    const postProduct = async(productDe) =>{
        var formData = new FormData();

        axios.defaults.headers.common['auth-token'] = authToken;
        axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

        formData.append("productImage",productDe.productImage,productDe.productImage.name);
        formData.append("productName",productDe.productName);
        formData.append("price",productDe.price);
        formData.append("location",productDe.location);
        formData.append("category",productDe.category);
        formData.append("model",productDe.model);
        formData.append("noOfProduct",productDe.noOfProduct);
        formData.append("duration",productDe.duration);
        // const response = await fetch(`${host}/addProduct`,{
        //     method : 'POST',
        //     headers : {
        //         "Content-Type": "multipart/form-data",
        //         'auth-token': authToken
        //     },
        //     body: formData
        // })

        const response = await axios.post(`${host}/addProduct`,formData);

        // const Pjson = await response.json();
        console.log(response);
    }

    const deleteProduct = async(_id) =>{
        const response = await fetch(`${host}/deleteProduct/${_id}`,{
            method : 'DELETE',
            headers : {
                'Content-Type': 'application/json',
                'auth-token': authToken
            }
        })

        const Djson = await response.json();
        getMyProduct();
        console.log(Djson);
    }

    return (
        <ProductContext.Provider value={{products,myProducts,deleteProduct,getProductDetails,getMyProduct,postProduct}}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductState