import React from 'react'

const ProductItem = (props) => {
    const { productName, price, location } = props.product
    return (
        <div className="col-md-3">
            <div className="card mx-2 my-2" style={{ width: "18rem" }}>
                <div className="card-body">
                    {props.myPro && <div className="d-flex">
                        <div className="btn btn-primary mx-2">Edit</div>
                        <div className="btn btn-primary mx-2" onClick={()=>{props.DeleteProduct(props.product)}}>Delete</div>
                    </div>}
                    <h5 className="card-title">Product : {productName}</h5>
                    <p className="card-text">Price : {price}</p>
                    <p className="card-text">Location : {location}</p>
                    {/* <a href="/" className="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>
        </div>
    )
}

export default ProductItem
