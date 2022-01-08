import React, { useState, useContext } from 'react'
import productContext from '../contexts/products/productContext'

const PostProduct = () => {
    const [productDe, setProductDe] = useState({ productName: "", price: "", location: "" });
    const context = useContext(productContext);
    const { postProduct } = context;
    const onChange = (e) => {
        setProductDe({ ...productDe, [e.target.name]: e.target.value });
    }
    const submitProduct = e => {
        e.preventDefault();
        // console.log(productDe);
        postProduct(productDe);
        setProductDe({ productName: '', price: '', location: '' })
    }
    return (
        <div className='container'>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="productName" className="form-label">Product Name</label>
                    <input type="text" className="form-control" onChange={onChange} value={productDe.productName} name="productName" id="productName" />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="text" className="form-control" onChange={onChange} value={productDe.price} name="price" id="price" />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input type="text" className="form-control" onChange={onChange} value={productDe.location} name="location" id="location" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={submitProduct}>Post Product</button>
            </form>
        </div>
    )
}

export default PostProduct