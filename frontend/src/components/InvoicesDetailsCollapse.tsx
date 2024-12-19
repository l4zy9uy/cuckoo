// src/components/InvoiceDetailsCollapse.tsx
import React, { useState } from 'react';
import {
    Box,
    Tabs,
    Tab,
    Typography,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Grid,
    Button,
} from '@mui/material';
import EditInvoiceDialog from './EditInvoiceDialog';

type OrderItem = {
    menu_id: number;
    quantity: number;
    price: string;
};

type InvoiceDetailsCollapseProps = {
    order_id: number;
    branch_id: number | null;
    table_id: number | null;
    customer_id: number | null;
    employee_id: number | null;
    order_date: string;
    total_amount: number;
    amount_paid: number;
    status: string;
    order_items: OrderItem[];
    onUpdate?: (updatedData: any) => void;
};

// @ts-ignore
const InvoiceDetailsCollapse: React.FC<InvoiceDetailsCollapseProps> = ({
                                                                           order_id,
                                                                           branch_id,
                                                                           table_id,
                                                                           customer_id,
                                                                           employee_id,
                                                                           order_date,
                                                                           total_amount,
                                                                           amount_paid,
                                                                           status,
                                                                           order_items,
                                                                           // onUpdate,
                                                                       }) => {
    const [tabValue, setTabValue] = useState(0);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

    const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleUpdateClick = () => {
        setOpenUpdateDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenUpdateDialog(false);
    };

    const handleSaveDialog = (updatedData: {
        branch_id: number | null;
        table_id: number | null;
        customer_id: number | null;
        employee_id: number | null;
        status: string;
        total_amount: number;
        amount_paid: number;
    }) => {
        console.log("Data updated:", updatedData);
        // Gọi API hoặc onUpdate để cập nhật dữ liệu
        // onUpdate && onUpdate({ order_id, ...updatedData });
        setOpenUpdateDialog(false);
    };

    const invoiceCode = `HD${order_id.toString().padStart(6, '0')}`;
    const arrivalTime = order_date;
    const time = order_date;
    const customer = customer_id ? `Khách hàng #${customer_id}` : "N/A";
    const priceScheme = "N/A";
    const orderCode = order_id.toString();
    const tableName = table_id ? `Bàn #${table_id}` : "N/A";
    const branch = branch_id ? `Chi nhánh #${branch_id}` : "N/A";
    const receiver = employee_id ? `Nhân viên #${employee_id}` : "N/A";
    const creator = employee_id ? `Nhân viên #${employee_id}` : "N/A";
    const guestCount = "N/A";
    const saleChannel = "N/A";

    const items = order_items.map((item) => {
        const discount = "0";
        const salePrice = item.price;
        const amount = (parseFloat(item.price) * item.quantity).toFixed(2);
        return {
            code: `Menu #${item.menu_id}`,
            name: "N/A",
            quantity: item.quantity,
            unitPrice: item.price,
            discount: discount,
            salePrice: salePrice,
            amount: amount,
        };
    });

    const totalQuantity = order_items.reduce((acc, item) => acc + item.quantity, 0).toString();
    const totalPrice = total_amount.toFixed(2);
    const invoiceDiscount = "0";
    const amountDue = total_amount.toFixed(2);
    const amountPaidStr = amount_paid.toFixed(2);

    return (
        <Box sx={{ mt: 2 }}>
            <EditInvoiceDialog
                open={openUpdateDialog}
                onClose={handleCloseDialog}
                onSave={handleSaveDialog}
                initialData={{
                    branch_id,
                    table_id,
                    customer_id,
                    employee_id,
                    status,
                    total_amount,
                    amount_paid
                }}
            />

            <Tabs value={tabValue} onChange={handleChangeTab} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tab label="Thông tin" />
                <Tab label="Lịch sử thanh toán" />
            </Tabs>

            {tabValue === 0 && (
                <Box sx={{ mt: 2 }}>
                    {/* Thông tin hóa đơn */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mr: 2 }}>
                            {invoiceCode}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', mr: 2 }}>
                            {order_date}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            {customer}
                        </Typography>
                    </Box>

                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                        Mã hóa đơn:
                                    </Typography>
                                    <Typography variant="body1">{invoiceCode}</Typography>
                                </Box>

                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                        Giờ đến:
                                    </Typography>
                                    <Typography variant="body1">{arrivalTime}</Typography>
                                </Box>

                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                        Thời gian:
                                    </Typography>
                                    <Typography variant="body1">{time}</Typography>
                                </Box>

                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                        Khách hàng:
                                    </Typography>
                                    <Typography variant="body1">{customer}</Typography>
                                </Box>

                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                        Bảng giá:
                                    </Typography>
                                    <Typography variant="body1">{priceScheme}</Typography>
                                </Box>

                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                        Mã đặt hàng:
                                    </Typography>
                                    <Typography variant="body1">{orderCode}</Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                        Trạng thái:
                                    </Typography>
                                    <Typography variant="body1">{status}</Typography>
                                </Box>

                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                        Phòng/Bàn:
                                    </Typography>
                                    <Typography variant="body1">{tableName}</Typography>
                                </Box>

                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                        Chi nhánh:
                                    </Typography>
                                    <Typography variant="body1">{branch}</Typography>
                                </Box>

                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                        Người nhận đơn:
                                    </Typography>
                                    <Typography variant="body1">{receiver}</Typography>
                                </Box>

                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                        Người tạo:
                                    </Typography>
                                    <Typography variant="body1">{creator}</Typography>
                                </Box>

                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                        Số khách:
                                    </Typography>
                                    <Typography variant="body1">{guestCount}</Typography>
                                </Box>

                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                        Kênh bán:
                                    </Typography>
                                    <Typography variant="body1">{saleChannel}</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper variant="outlined" sx={{ borderRadius: 2, mb: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Mã hàng hóa</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Tên hàng</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Số lượng</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Đơn giá</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Giảm giá</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Giá bán</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Thành tiền</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.code}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.unitPrice}</TableCell>
                                        <TableCell>{item.discount}</TableCell>
                                        <TableCell>{item.salePrice}</TableCell>
                                        <TableCell>{item.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                        <Box sx={{ minWidth: 200 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                    Tổng số lượng:
                                </Typography>
                                <Typography variant="body1">{totalQuantity}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                    Tổng tiền hàng:
                                </Typography>
                                <Typography variant="body1">{totalPrice}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                    Giảm giá hóa đơn:
                                </Typography>
                                <Typography variant="body1">{invoiceDiscount}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                    Khách cần trả:
                                </Typography>
                                <Typography variant="body1">{amountDue}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                    Khách đã trả:
                                </Typography>
                                <Typography variant="body1">{amountPaidStr}</Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                        <Button variant="contained" color="primary" onClick={handleUpdateClick}>Cập nhật</Button>
                        <Button variant="contained" color="success">Lưu</Button>
                        <Button variant="contained" color="info">In</Button>
                        <Button variant="contained" color="secondary">Xuất file</Button>
                        <Button variant="contained" sx={{ backgroundColor: '#4caf50', color: '#fff' }}>Sao chép</Button>
                        <Button variant="contained" color="error">Hủy bỏ</Button>
                    </Box>
                </Box>
            )}

            {tabValue === 1 && (
                <Box sx={{ mt: 2 }}>
                    <Typography>Đây là lịch sử thanh toán...</Typography>
                </Box>
            )}
        </Box>
    );
};

export default InvoiceDetailsCollapse;
