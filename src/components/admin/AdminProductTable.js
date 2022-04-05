import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: '_id', headerName: 'Product ID', width: 350 },
    { field: 'userId', headerName: 'User ID', width: 350 },
    { field: 'productName', headerName: 'Product Name', width: 250 },
    { field: 'category', headerName: 'Category', width: 250 },
    { field: 'model', headerName: 'Model', width: 250 },
    { field: 'duration', headerName: 'Duration', width: 250 },
    { field: 'price', headerName: 'price', width: 250 },
    { field: 'location', headerName: 'Location', width: 250 },
    { field: 'date', headerName: 'Date', width: 250 },
];

const AdminProductTable = () => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        // fetch('https://jsonplaceholder.typicode.com/posts')
        //   .then((data) => data.json())
        //   .then((data) => setTableData(data));
        getProdDetails();
    }, []);

    const getProdDetails = async () => {
        const resp = await fetch(
            'http://localhost:8500/api/auth/adminProductDetails',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const prodDetails = await resp.json();
        if (prodDetails.success) {
            setTableData(prodDetails.adminprodDtls);
            console.log(prodDetails);
        } else {
            console.log(prodDetails.message);
        }
    };
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                getRowId={(row) => row._id}
                autoHeight={true}
                rows={tableData}
                columns={columns}
                pageSize={10}
                // autoPageSize={true}
                checkboxSelection
            />
        </div>
    );
};

export default AdminProductTable
