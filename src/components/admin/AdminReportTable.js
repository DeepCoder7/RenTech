import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    // { field: 'id', headerName: 'ID' },
    { field: '_id', headerName: 'Report ID', width: 350 },
    { field: 'userId', headerName: 'user ID', width: 250 },
    { field: 'proOwnId', headerName: 'Owner ID', width: 250 },
    { field: 'proID', headerName: 'Product ID', width: 250 },
    { field: 'descOfReport', headerName: 'Reason', width: 250 },
    { field: 'date', headerName: 'Date', width: 250 },
];

const AdminReportTable = () => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        // fetch('https://jsonplaceholder.typicode.com/posts')
        //   .then((data) => data.json())
        //   .then((data) => setTableData(data));
        getReportDetails();
    }, []);

    const getReportDetails = async () => {
        const resp = await fetch(
            'http://localhost:8500/api/reportProduct/adminreportDetails',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('renToken'),
                },
            }
        );

        const reportDetails = await resp.json();
        if (reportDetails.success) {
            setTableData(reportDetails.adminrepDtls);
            console.log(reportDetails);
        } else {
            console.log(reportDetails.message);
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

export default AdminReportTable
