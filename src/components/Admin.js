import React, { useContext, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import modalContext from '../contexts/modalOpener/modalContext';
import { useNavigate } from 'react-router-dom';
import userContext from '../contexts/userCred/userContext';

const Admin = () => {
    const modalOpener = useContext(modalContext);
    const { setIsLoginOpen } = modalOpener;

    const userDe = useContext(userContext);
    const { role } = userDe.userCreds;

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('renToken') && role === 'Admin') {
            navigate('/admin/userDetails')
        } else {
            navigate('/');
        }
        // eslint-disable-next-line
    }, [localStorage.getItem('renToken')]);
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

