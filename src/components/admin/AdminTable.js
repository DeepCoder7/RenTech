import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'title', headerName: 'Title', width: 450 },
  { field: 'body', headerName: 'Body', width: 450 },
];

const AdminTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((data) => data.json())
      .then((data) => setTableData(data));
  },[]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
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
