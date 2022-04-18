import React, { useState, useEffect, useContext } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import notifyContext from '../../contexts/NotificationBar/notifyContext';

const AdminProductTable = () => {
  const [tableData, setTableData] = useState([]);
  const notifyCon = useContext(notifyContext);
  const { notify } = notifyCon;

  const columns = [
    // { field: 'id', headerName: 'ID' },
    { field: '_id', headerName: 'Product ID', width: 350 },
    { field: 'userId', headerName: 'User ID', width: 350 },
    { field: 'productName', headerName: 'Product Name', width: 250 },
    { field: 'category', headerName: 'Category', width: 250 },
    { field: 'model', headerName: 'Model', width: 250 },
    { field: 'duration', headerName: 'Duration', width: 250 },
    { field: 'price', headerName: 'price', width: 250 },
    { field: 'location', headerName: 'Location', width: 250 },
    { field: 'date', headerName: 'Date', width: 250 },
    {
      field: 'Action',
      headerName: 'Action',
      renderCell: (cellValues) => {
        return (
          <Button
            variant='contained'
            color='secondary'
            onClick={(e) => {
              //   console.log(cellValues);
              deleteProduct(cellValues.row._id);
            }}
          >
            Delete
          </Button>
        );
      },
      width: 150,
    },
  ];

  const deleteProduct = async (userID) => {
    if (window.confirm("Are You Sure, You want to delete this product")) {
      const resp = await fetch(
        `http://localhost:8500/api/auth/deleteProd/${userID}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('renToken'),
          },
        }
      );

      getProdDetails();
      const deleteresp = await resp.json();
      if (deleteresp.success) {
        notify('success', deleteresp.message);
      } else {
        notify('error', deleteresp.message);
      }
    }
  };

  useEffect(() => {
    getProdDetails();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line
  }, [tableData]);

  const getProdDetails = async () => {
    const resp = await fetch(
      'http://localhost:8500/api/auth/adminProductDetails',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('renToken'),
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
        rowsPerPageOptions={[10]}
        // autoPageSize={true}
        checkboxSelection
      />
    </div>
  );
};

export default AdminProductTable;
