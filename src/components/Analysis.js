import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Analysis = () => {
    return (
        <>
            <div className="Header" style={{display:'flex', width:'100%', justifyContent:'space-around'}}>
                <Link to='/analysis/productAnalysis'>Products Analysis</Link>
                <Link to='/analysis/myAnalysis'>My Analysis</Link>
            </div>
            <hr />
            <Outlet />
        </>
    )
}

export default Analysis