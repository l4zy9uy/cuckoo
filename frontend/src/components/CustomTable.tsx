// src/components/ProductTable.tsx
import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Paper } from '@mui/material';

type ProductTableProps = {
    rows: any[]; // The data to display in the table
    columns: GridColDef[]; // Column definitions for the DataGrid
};

const ProductTable: React.FC<ProductTableProps> = ({ rows, columns }) => {
    return (
        <Paper style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
            />
        </Paper>
    );
};

export default ProductTable;
