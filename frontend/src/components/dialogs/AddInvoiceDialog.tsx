// src/components/InvoiceDialog.tsx
import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Tabs,
    Tab,
    Box,
    TextField,
    Select,
    MenuItem,
    Button,
    Typography,
    IconButton,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type InvoiceDialogProps = {
    open: boolean;
    onClose: () => void;
    onSave: (invoiceData: any) => void; // Replace 'any' with your invoice type
    onSaveAndAddNew?: (invoiceData: any) => void;
};

type OrderItem = {
    menu_id: string;
    quantity: number;
    price: string;
};

const InvoiceDialog: React.FC<InvoiceDialogProps> = ({
                                                         open,
                                                         onClose,
                                                         onSave,
                                                         onSaveAndAddNew
                                                     }) => {
    const [activeTab, setActiveTab] = useState(0);

    // Invoice main information
    const [branchId, setBranchId] = useState('');
    const [tableId, setTableId] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [status, setStatus] = useState('Pending');
    const [totalAmount, setTotalAmount] = useState('0.00');
    const [amountPaid, setAmountPaid] = useState('0.00');

    // Order Items
    const [orderItems, setOrderItems] = useState<OrderItem[]>([
        { menu_id: '', quantity: 1, price: '0.00' }
    ]);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const handleAddItem = () => {
        setOrderItems((prev) => [...prev, { menu_id: '', quantity: 1, price: '0.00' }]);
    };

    const handleRemoveItem = (index: number) => {
        setOrderItems((prev) => prev.filter((_, i) => i !== index));
    };

    const handleItemChange = (index: number, field: keyof OrderItem, value: string | number) => {
        setOrderItems((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
    };

    const handleSave = () => {
        const invoiceData = {
            branch_id: branchId ? parseInt(branchId, 10) : null,
            table_id: tableId ? parseInt(tableId, 10) : null,
            customer_id: customerId ? parseInt(customerId, 10) : null,
            employee_id: employeeId ? parseInt(employeeId, 10) : null,
            order_date: orderDate || new Date().toISOString(),
            total_amount: parseFloat(totalAmount),
            amount_paid: parseFloat(amountPaid),
            status,
            items: orderItems.map((item) => ({
                menu_id: item.menu_id ? parseInt(item.menu_id, 10) : null,
                quantity: item.quantity,
                price: parseFloat(item.price),
            })),
        };

        onSave(invoiceData);
    };

    const handleSaveAndAddNew = () => {
        const invoiceData = {
            branch_id: branchId ? parseInt(branchId, 10) : null,
            table_id: tableId ? parseInt(tableId, 10) : null,
            customer_id: customerId ? parseInt(customerId, 10) : null,
            employee_id: employeeId ? parseInt(employeeId, 10) : null,
            order_date: orderDate || new Date().toISOString(),
            total_amount: parseFloat(totalAmount),
            amount_paid: parseFloat(amountPaid),
            status,
            items: orderItems.map((item) => ({
                menu_id: item.menu_id ? parseInt(item.menu_id, 10) : null,
                quantity: item.quantity,
                price: parseFloat(item.price),
            })),
        };

        onSaveAndAddNew && onSaveAndAddNew(invoiceData);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg"
                sx={{ borderRadius: 3, boxShadow: 3 }}>
            <DialogTitle
                sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6" fontWeight="bold">Thêm hóa đơn</Typography>
                <Typography variant="body2" color="text.secondary">
                    <a href="#"
                       style={{ color: 'inherit', textDecoration: 'underline' }}>
                        Hướng dẫn sử dụng
                    </a>
                </Typography>
            </DialogTitle>
            <DialogContent dividers sx={{
                padding: 4,
                backgroundColor: 'background.paper',
                borderRadius: 3
            }}>
                {/* Tabs */}
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
                >
                    <Tab label="Thông tin hóa đơn" />
                    <Tab label="Món hàng" />
                </Tabs>

                {/* Thông tin hóa đơn Tab */}
                {activeTab === 0 && (
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 3
                    }}>
                        <TextField
                            label="Branch ID"
                            value={branchId}
                            onChange={(e) => setBranchId(e.target.value)}
                        />
                        <TextField
                            label="Table ID"
                            value={tableId}
                            onChange={(e) => setTableId(e.target.value)}
                        />
                        <TextField
                            label="Customer ID"
                            value={customerId}
                            onChange={(e) => setCustomerId(e.target.value)}
                        />
                        <TextField
                            label="Employee ID"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                        />
                        <TextField
                            label="Ngày đặt hàng"
                            type="datetime-local"
                            InputLabelProps={{ shrink: true }}
                            value={orderDate}
                            onChange={(e) => setOrderDate(e.target.value)}
                        />
                        <Select
                            fullWidth
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            displayEmpty
                        >
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                        </Select>
                        <TextField
                            label="Tổng tiền"
                            type="number"
                            value={totalAmount}
                            onChange={(e) => setTotalAmount(e.target.value)}
                        />
                        <TextField
                            label="Khách đã trả"
                            type="number"
                            value={amountPaid}
                            onChange={(e) => setAmountPaid(e.target.value)}
                        />
                    </Box>
                )}

                {/* Món hàng Tab */}
                {activeTab === 1 && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {orderItems.map((item, index) => (
                            <Box key={index} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 2, alignItems: 'center' }}>
                                <TextField
                                    label="Menu ID"
                                    value={item.menu_id}
                                    onChange={(e) => handleItemChange(index, 'menu_id', e.target.value)}
                                />
                                <TextField
                                    label="Số lượng"
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value, 10) || 0)}
                                />
                                <TextField
                                    label="Giá"
                                    type="number"
                                    value={item.price}
                                    onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                                />
                                {orderItems.length > 1 && (
                                    <IconButton onClick={() => handleRemoveItem(index)} color="error">
                                        <RemoveIcon />
                                    </IconButton>
                                )}
                            </Box>
                        ))}
                        <Button startIcon={<AddIcon />} onClick={handleAddItem}>Thêm món hàng</Button>
                    </Box>
                )}
            </DialogContent>

            <DialogActions sx={{ padding: 2, justifyContent: 'space-between' }}>
                <Button variant="outlined" onClick={onClose} color="primary">Bỏ qua</Button>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleSave}
                            startIcon={<SaveIcon />}>Lưu</Button>
                    {onSaveAndAddNew && (
                        <Button variant="contained" color="success"
                                onClick={handleSaveAndAddNew} startIcon={<SaveIcon />}>
                            Lưu & Thêm mới
                        </Button>
                    )}
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default InvoiceDialog;
