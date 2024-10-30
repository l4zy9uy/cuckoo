// src/components/SidebarFilter.tsx
import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import CustomAccordion from './CustomAccordion';

const SidebarFilter = () => {
    const accordionData = [
        {
            title: 'Loại thực đơn',
            items: [
                { label: 'Đồ ăn' },
                { label: 'Đồ uống' },
                { label: 'Khác' },
            ],
        },
        {
            title: 'Loại hàng',
            items: [
                { label: 'Hàng hóa thường' },
                { label: 'Chế biến' },
                { label: 'Dịch vụ' },
                { label: 'Combo - Đóng gói' },
            ],
        },
        {
            title: 'Nhóm hàng',
            items: [
                { label: 'Sản phẩm mới' },
                { label: 'Sản phẩm nổi bật' },
            ],
        },
    ];

    return (
        <Box
            sx={{
                width: 250,
                padding: '1rem',
                backgroundColor: '#f5f5f5',
                '& .MuiAccordion-root:first-of-type': {
                    borderTopLeftRadius: '12px !important',
                    borderTopRightRadius: '12px !important',
                },
                '& .MuiAccordion-root:last-of-type': {
                    borderBottomLeftRadius: '12px !important',
                    borderBottomRightRadius: '12px !important',
                },
            }}
        >
            <Typography variant="h6" gutterBottom>
                Tìm kiếm
            </Typography>
            <TextField fullWidth placeholder="Theo mã, tên hàng" margin="normal"
                       sx={{
                           '& .MuiOutlinedInput-root': {
                               borderRadius: '12px', // Round the corners
                           },
                           '& .MuiOutlinedInput-notchedOutline': {
                               borderRadius: '12px', // Round the outline when focused
                           },
                       }}
            />

            {accordionData.map((accordion, index) => (
                <CustomAccordion key={index} title={accordion.title} items={accordion.items} />
            ))}
        </Box>
    );
};

export default SidebarFilter;
