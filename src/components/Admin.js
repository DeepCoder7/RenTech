import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Admin = () => {
    return (
        <>
            <div className="Header" style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
                <Link to='/admin/userDetails'>User Details</Link>
                <Link to='/admin/productdetails'>Product Details</Link>
                <Link to='/admin/reportdetails'>Report Details</Link>
            </div>
            <hr />
            <Outlet />
        </>
    )
}

export default Admin

