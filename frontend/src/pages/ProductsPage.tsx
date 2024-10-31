// src/pages/ProductsPage.tsx
import React from 'react';

import CustomTable from "../components/CustomTable.tsx";
import {Grid2, Paper} from "@mui/material";
import SidebarFilter from "@/components/SignbarFilter.tsx";
import Box from "@mui/material/Box";
import HeaderActions from "@/components/HeaderAction.tsx";

const productColumns = [
    {field: 'id', headerName: 'Mã hàng hóa', width: 150},
    {field: 'name', headerName: 'Tên hàng', flex: 1},
    {field: 'type', headerName: 'Loại thực đơn', width: 150},
    {field: 'price', headerName: 'Giá bán', width: 120},
    {field: 'stock', headerName: 'Tồn kho', width: 120},
];

const productRows = [
    {
        id: 'SP000023',
        name: 'Thuốc lá Vinataba',
        type: 'Khác',
        price: '30,000',
        stock: '25,177'
    },
    {
        id: 'SP000024',
        name: 'Thuốc lá Marlboro',
        type: 'Khác',
        price: '30,000',
        stock: '1,005'
    },
    {
        id: 'SP000025',
        name: 'Thuốc lá Kent HD',
        type: 'Khác',
        price: '30,000',
        stock: '1,011'
    },
    {
        id: 'SP000018',
        name: 'Mint Tea',
        type: 'Khác',
        price: '15,000',
        stock: '1,007'
    },
];

const ProductsPage = () => {
    return (
        <Grid2 container spacing={2} sx={{height: '100vh', padding: '1rem'}}>
            {/* Sidebar */}
            <Grid2 item xs={3}>
                <Paper elevation={3} sx={{height: '100%'}}>
                    <SidebarFilter/>
                </Paper>
            </Grid2>

            {/* Main Content */}
            <Grid2 item xs={9} sx={{display: 'flex', flexDirection: 'column'}}
                   size="grow">
                <Paper elevation={3}
                       sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{padding: '2rem', flex: 1, overflow: 'auto'}}>
                        <HeaderActions/>
                        <CustomTable rows={productRows}
                                     columns={productColumns}/>
                    </Box>
                </Paper>
            </Grid2>
        </Grid2>
    );
};

export default ProductsPage;
