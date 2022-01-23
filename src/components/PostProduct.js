import React, { useState, useContext, useEffect } from 'react'
import productContext from '../contexts/products/productContext'
import { useNavigate } from 'react-router-dom';

const PostProduct = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if(!localStorage.getItem('renToken')){
            navigate('/');
        }
    }, []);


    const [productDe, setProductDe] = useState({ productName: '', price: '', location: '', category: '', model: '', duration: 28, noOfProduct: 1, productImage: '' });
    const context = useContext(productContext);
    const { postProduct } = context;
    const onChange = (e) => {
        setProductDe({ ...productDe, [e.target.name]: e.target.value });
    }
    const uploadImage = e => {
        console.log((e.target.files[0]));
        setProductDe({ ...productDe, productImage: e.target.files[0] });
    }
    const submitProduct = e => {
        e.preventDefault();
        console.log(productDe);
        postProduct(productDe);
        setProductDe({ productName: '', price: '', location: '', category: '', model: '', duration: 28, noOfProduct: 1 })
    }
    return (
        <div className='container'>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="productName" className="form-label">Product Name</label>
                    <input type="text" className="form-control" onChange={onChange} value={productDe.productName} name="productName" id="productName" />
                </div>
                <div className="mb-3">
                    <label htmlFor="productImage" className="form-label">Product Image</label>
                    <input type="file" className="form-control" onChange={uploadImage} name="productImage" id="productImage" />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="text" className="form-control" onChange={onChange} value={productDe.price} name="price" id="price" />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input type="text" className="form-control" onChange={onChange} value={productDe.location} name="location" id="location" />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <input type="text" className="form-control" onChange={onChange} value={productDe.category} name="category" id="category" />
                </div>
                <div className="mb-3">
                    <label htmlFor="model" className="form-label">Model</label>
                    <input type="text" className="form-control" onChange={onChange} value={productDe.model} name="model" id="model" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={submitProduct}>Post Product</button>
            </form>

        </div>
    )
}

export default PostProduct
