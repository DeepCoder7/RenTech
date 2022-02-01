import React, { useState } from 'react';

const RequestForProduct = () => {

    const [productDe, setProductDe] = useState({ productName: '', category: '', descOfProduct: '' });

    const onChange = (e) => {
        setProductDe({ ...productDe, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) => {
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
            category: '',
            descOfProduct: ''
        })
    }

    return (
        <>
            <div className="container">
                <form className="my-3" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='productName' className='form-label'>
                            Product Name
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            onChange={onChange}
                            value={productDe.productName}
                            name='productName'
                            id='productName'
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='category' className='form-label'>
                            Category
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            onChange={onChange}
                            value={productDe.category}
                            name='category'
                            id='category'
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='descOfProduct' className='form-label'>
                            Description
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            onChange={onChange}
                            value={productDe.descOfProduct}
                            name='descOfProduct'
                            id='descOfProduct'
                        />
                    </div>
                    <button className="btn btn-primary" type='submit'>Submit</button>
                </form>
            </div>
        </>
    );
};

export default RequestForProduct;
