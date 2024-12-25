import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, TextField, Button } from '@mui/material';

// type OrderItem = {
//     menu_id: number;
//     quantity: number;
//     price: string;
// };

type InvoiceDetailsCollapseProps = {
    order_id: number;
    branch_id: number | null;
    table_id: number | null;
    customer_name: string | null;
    order_date: string;
    total_price: number;
    amount_paid: number;
    status: string;
    onUpdate: (updatedData: any) => void;
};

const InvoiceDetailsCollapse: React.FC<InvoiceDetailsCollapseProps> = ({
                                                                           order_id,
                                                                           branch_id,
                                                                           table_id,
                                                                           customer_name,
                                                                           order_date,
                                                                           total_price,
                                                                           amount_paid,
                                                                           status,
                                                                           onUpdate,
                                                                       }) => {
    const [editableData, setEditableData] = useState({
        branch_id,
        table_id,
        customer_name,
        total_price,
        amount_paid,
        status,
    });

    const handleChange = (field: keyof typeof editableData, value: any) => {
        setEditableData(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveChanges = () => {
        onUpdate({ ...editableData, order_id, order_date });
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                Mã hóa đơn:
                            </Typography>
                            <Typography variant="body1">{`HD${order_id.toString().padStart(6, '0')}`}</Typography>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                Thời gian:
                            </Typography>
                            <Typography variant="body1">{order_date}</Typography>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                Khách hàng:
                            </Typography>
                            <TextField
                                fullWidth
                                value={editableData.customer_name ?? ''}
                                onChange={(e) => handleChange('customer_name', e.target.value)}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                Trạng thái:
                            </Typography>
                            <TextField
                                fullWidth
                                select
                                SelectProps={{ native: true }}
                                value={editableData.status}
                                onChange={(e) => handleChange('status', e.target.value)}
                            >
                                {['Đã thanh toán', 'Chưa thanh toán', 'Đang xử lý'].map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </TextField>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                Tổng tiền:
                            </Typography>
                            <TextField
                                fullWidth
                                value={editableData.total_price}
                                onChange={(e) => handleChange('total_price', parseFloat(e.target.value))}
                                type="number"
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                Khách đã trả:
                            </Typography>
                            <TextField
                                fullWidth
                                value={editableData.amount_paid}
                                onChange={(e) => handleChange('amount_paid', parseFloat(e.target.value))}
                                type="number"
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                    Lưu Thay Đổi
                </Button>
            </Box>
        </Box>
    );
};

export default InvoiceDetailsCollapse;
