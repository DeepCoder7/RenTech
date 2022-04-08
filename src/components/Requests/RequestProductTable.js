import React, { useState, useEffect, useContext } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import modalContext from '../../contexts/modalOpener/modalContext';
import { useNavigate } from 'react-router-dom';

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: '_id', headerName: 'Request ID', width: 350 },
    { field: 'userId', headerName: 'User ID', width: 250 },
    { field: 'productName', headerName: 'Product Name', width: 250 },
    { field: 'descOfProduct', headerName: 'Specification', width: 250 },
    { field: 'modelName', headerName: 'Model', width: 250 },
    { field: 'category', headerName: 'Category', width: 250 },
    { field: 'date', headerName: 'Date', width: 250 },
];

const RequestProductTable = (props) => {
    const modalOpener = useContext(modalContext);
    const { setIsLoginOpen } = modalOpener;

    const navigate = useNavigate();

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('renToken')) {
            getReqProdDetails();
        } else {
            setIsLoginOpen(true);
            navigate('/');
        }
        // eslint-disable-next-line
    }, [localStorage.getItem('renToken')]);

    const getReqProdDetails = async () => {
        const resp = await fetch(
            'http://localhost:8500/api/requestProduct/viewReqProd',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const viewRequestedProd = await resp.json();
        if (viewRequestedProd.success) {
            setTableData(viewRequestedProd.requestedProd);
        } else {
            console.log(viewRequestedProd.message);
        }
    };
    return (
        <>
            {localStorage.getItem('renToken') &&
                (<div style={{ height: 400, width: '100%' }}>
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
                )}
        </>
    );
};

export default RequestProductTable