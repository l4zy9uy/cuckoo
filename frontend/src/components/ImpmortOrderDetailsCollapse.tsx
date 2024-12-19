// src/components/ImportDetailsCollapse.tsx
import React from "react";
import {
    Box,
    Typography,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Grid,
} from "@mui/material";

type ImportItem = {
    name: string;
    quantity: number;
    price: number;
    total: number;
};

type ImportDetailsCollapseProps = {
    importCode: string;
    importDate: string;
    supplier: string;
    status: string;
    totalAmount: number;
    items: ImportItem[];
};

const ImportDetailsCollapse: React.FC<ImportDetailsCollapseProps> = ({
                                                                         importCode,
                                                                         importDate,
                                                                         supplier,
                                                                         status,
                                                                         totalAmount,
                                                                         items,
                                                                     }) => {
    return (
        <Box sx={{ mt: 2 }}>
            {/* Header Information */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                    {importCode}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {importDate}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Nhà cung cấp: {supplier}
                </Typography>
            </Box>

            {/* General Info */}
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2" fontWeight="bold">
                            Mã nhập hàng:
                        </Typography>
                        <Typography variant="body1">{importCode}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2" fontWeight="bold">
                            Ngày nhập hàng:
                        </Typography>
                        <Typography variant="body1">{importDate}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2" fontWeight="bold">
                            Nhà cung cấp:
                        </Typography>
                        <Typography variant="body1">{supplier}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2" fontWeight="bold">
                            Trạng thái:
                        </Typography>
                        <Typography variant="body1">{status}</Typography>
                    </Grid>
                </Grid>
            </Paper>

            {/* Items Table */}
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                Danh sách hàng hóa
            </Typography>
            <Paper variant="outlined" sx={{ borderRadius: 2, mb: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>Tên hàng</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Số lượng</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Đơn giá</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Thành tiền</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.price.toLocaleString()}</TableCell>
                                <TableCell>{item.total.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            {/* Totals */}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, minWidth: 300 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="subtitle2" fontWeight="bold">
                            Tổng cộng:
                        </Typography>
                        <Typography variant="body1">{totalAmount.toLocaleString()}</Typography>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default ImportDetailsCollapse;
