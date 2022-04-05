import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';

const columns = [
  { field: 'id', headerName: 'ID' },
  { field: '_id', headerName: 'Identifier', width: 350 },
  { field: 'name', headerName: 'Name', width: 250 },
  { field: 'location', headerName: 'Location', width: 250 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'date', headerName: 'Date', width: 250 },
  {
    field: "active",
    headerName: "Status",
    renderCell: (cellValues) => {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            console.log(cellValues);
          }}
        >
          {cellValues.row.active ? 'Activate' : 'Deactive'}
        </Button>
      );
    }, width: 150
  }
];

const AdminTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // fetch('https://jsonplaceholder.typicode.com/posts')
    //   .then((data) => data.json())
    //   .then((data) => setTableData(data));
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const resp = await fetch(
      'http://localhost:8500/api/auth/adminUserDetails',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const userDetails = await resp.json();
    if (userDetails.success) {
      setTableData(userDetails.adminUsrDtls);
      console.log(userDetails);
    } else {
      console.log(userDetails.message);
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

export default AdminTable;
