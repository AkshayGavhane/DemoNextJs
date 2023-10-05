'use client';
import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const DropdownDataGrid: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: string;
  }>({});

  const handleOptionChange = (
    event: React.ChangeEvent<{ value: unknown }>,
    rowId: number
  ) => {
    const newSelectedOptions = { ...selectedOptions };
    newSelectedOptions[rowId] = event.target.value as string;
    setSelectedOptions(newSelectedOptions);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    {
      field: 'selectedRole',
      headerName: 'Selected Role',
      width: 200,
      renderCell: (params) => {
        const rowId = params.row.id as number;
        const selectedRole = selectedOptions[rowId] || '';

        return (
          <FormControl fullWidth>
            {/* <InputLabel>Select Role</InputLabel> */}
            <Select
              //label="Select Role"
              value={selectedRole}
              onChange={(e) => handleOptionChange(e, rowId)}
              variant='standard'
              disableUnderline='true'
            >
              <MenuItem value="Account Manager">Account Manager</MenuItem>
              <MenuItem value="Sales Manager">Sales Manager</MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
  ];

  const rows = [
    { id: 1, name: 'John', selectedRole: '' },
    { id: 2, name: 'Jane', selectedRole: '' },
    // ...other rows
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
};

export default DropdownDataGrid;
