// src/components/dialogs/AddImportDialog.tsx
import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    Button,
    Box,
    InputLabel,
    Typography,
} from "@mui/material";

type AddImportDialogProps = {
    open: boolean;
    onClose: () => void;
    onSave: (data: ImportOrderFormData) => void;
};

type ImportOrderFormData = {
    supplier: string;
    orderDate: string;
    items: { name: string; quantity: number; price: number }[];
};

const AddImportDialog: React.FC<AddImportDialogProps> = ({ open, onClose, onSave }) => {
    const [formData, setFormData] = useState<ImportOrderFormData>({
        supplier: "",
        orderDate: new Date().toISOString().slice(0, 10),
        items: [{ name: "", quantity: 0, price: 0 }],
    });

    // Handle field changes
    const handleFieldChange = (field: keyof ImportOrderFormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // Handle item change
    const handleItemChange = (index: number, field: string, value: any) => {
        const newItems = [...formData.items];
        newItems[index] = { ...newItems[index], [field]: value };
        setFormData((prev) => ({ ...prev, items: newItems }));
    };

    // Add new row for items
    const handleAddItem = () => {
        setFormData((prev) => ({
            ...prev,
            items: [...prev.items, { name: "", quantity: 0, price: 0 }],
        }));
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>
                <Typography variant="h6" fontWeight="bold">
                    Thêm Phiếu Nhập Hàng
                </Typography>
            </DialogTitle>
            <DialogContent dividers>
                {/* Supplier */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 3 }}>
                    <Box>
                        <InputLabel>Nhà cung cấp</InputLabel>
                        <Select
                            fullWidth
                            value={formData.supplier}
                            onChange={(e) => handleFieldChange("supplier", e.target.value)}
                            displayEmpty
                        >
                            <MenuItem value="">Chọn nhà cung cấp</MenuItem>
                            <MenuItem value="Đại lý Hồng Phúc">Đại lý Hồng Phúc</MenuItem>
                            <MenuItem value="Cửa hàng Đại Việt">Cửa hàng Đại Việt</MenuItem>
                        </Select>
                    </Box>
                    {/* Order Date */}
                    <TextField
                        label="Ngày nhập hàng"
                        type="date"
                        fullWidth
                        value={formData.orderDate}
                        onChange={(e) => handleFieldChange("orderDate", e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>

                {/* Items Table */}
                <Typography fontWeight="bold" marginBottom={2}>
                    Chi tiết hàng hóa
                </Typography>
                {formData.items.map((item, index) => (
                    <Box key={index} sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
                        <TextField
                            label="Tên hàng"
                            fullWidth
                            value={item.name}
                            onChange={(e) => handleItemChange(index, "name", e.target.value)}
                        />
                        <TextField
                            label="Số lượng"
                            type="number"
                            fullWidth
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, "quantity", +e.target.value)}
                        />
                        <TextField
                            label="Đơn giá"
                            type="number"
                            fullWidth
                            value={item.price}
                            onChange={(e) => handleItemChange(index, "price", +e.target.value)}
                        />
                    </Box>
                ))}
                <Button variant="outlined" onClick={handleAddItem}>
                    + Thêm hàng hóa
                </Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary" variant="outlined">
                    Hủy bỏ
                </Button>
                <Button
                    onClick={() => onSave(formData)}
                    color="primary"
                    variant="contained"
                >
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddImportDialog;
