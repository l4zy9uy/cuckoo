// src/components/ProductDialog.tsx
import React, {useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    TextField,
    Select,
    MenuItem,
    Button,
    Typography,
    Switch,
    Snackbar,
    Alert
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';

type ProductDialogProps = {
    open: boolean;
    onClose: () => void;
    onSave: () => void;
};

type Row = {
    id: string;
    name: string;
    item_type: string;
    price: string;
    stock: string;
    branch_id: number;
    description: string;
    sale_price: number;
    cost_price: number;
    item_group: string;
    availability?: boolean;
    image?: string;
};

const ProductDialog: React.FC<ProductDialogProps> = ({
                                                         open,
                                                         onClose,
                                                        onSave,
                                                     }) => {
    const [manageStock, setManageStock] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [productData, setProductData] = useState<Row>({
        id: "",
        name: "",
        item_type: "",
        price: "0",
        stock: "0",
        branch_id: 1,
        description: "",
        sale_price: 0,
        cost_price: 0,
        item_group: "",
        availability: true,
        image: "",
    });

    const handleSave = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/menus", productData);
            const addedProduct = response.data;
            console.log("Added Product:", addedProduct);
            onSave();
            setSnackbarOpen(true);
            onClose();
        } catch (error) {
            console.error("Failed to add product:", error);
        }
    };

    const handleSnackbarClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleChange = (key: keyof Row, value: any) => {
        setProductData({ ...productData, [key]: value });
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg"
                    sx={{borderRadius: 3, boxShadow: 3}}>
                <DialogTitle
                    sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                    <Typography variant="h6" fontWeight="bold">Thêm hàng
                        hóa</Typography>
                    <Typography variant="body2" color="text.secondary">
                        <a href="#"
                           style={{color: 'inherit', textDecoration: 'underline'}}>Hướng
                            dẫn sử dụng</a>
                    </Typography>
                </DialogTitle>
                <DialogContent dividers sx={{
                    padding: 4,
                    backgroundColor: 'background.paper',
                    borderRadius: 3
                }}>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 3fr',
                        gap: 3
                    }}>
                        {/* Status and Image Upload */}
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3
                        }}>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    border: '1px dashed',
                                    borderColor: 'divider',
                                    borderRadius: 2,
                                    backgroundColor: 'grey.100',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <InfoIcon fontSize="small" color="action"/>
                            </Box>
                        </Box>
                        {/* Product Information */}
                        <Box sx={{
                            display: 'grid',
                            gap: 2,
                            gridTemplateColumns: 'repeat(2, 1fr)'
                        }}>
                            <TextField label="Mã hàng hóa" helperText="Mã hàng tự động" disabled
                                       value={productData.id}
                                       onChange={(e) => handleChange("id", e.target.value)}
                            />
                            <TextField label="Tên hàng" value={productData.name}
                                       onChange={(e) => handleChange("name", e.target.value)}
                            />
                            <Select fullWidth displayEmpty value={productData.item_type}
                                    onChange={(e) => handleChange("item_type", e.target.value)}>
                                <MenuItem value="">Loại thực đơn</MenuItem>
                                <MenuItem value="Đồ ăn">Đồ ăn</MenuItem>
                                <MenuItem value="Đồ uống">Đồ uống</MenuItem>
                            </Select>
                            <Select fullWidth displayEmpty value={productData.item_group}
                                    onChange={(e) => handleChange("item_group", e.target.value)}>
                                <MenuItem value="">Nhóm hàng</MenuItem>
                                <MenuItem value="Lựa chọn">--Lựa chọn--</MenuItem>
                            </Select>
                            <TextField label="Giá vốn" type="number" value={productData.cost_price}
                                       onChange={(e) => handleChange("cost_price", Number(e.target.value))}/>
                            <TextField label="Giá bán" type="number" value={productData.sale_price}
                                       onChange={(e) => handleChange("sale_price", Number(e.target.value))}/>
                            <TextField label="Mô tả" multiline rows={4} value={productData.description}
                                       onChange={(e) => handleChange("description", e.target.value)}/>
                        </Box>

                        {/* Stock Management */}
                        <Box sx={{
                            gridColumn: 'span 2',
                            mt: 3,
                            p: 2,
                            backgroundColor: 'grey.50',
                            borderRadius: 2,
                            boxShadow: 1
                        }}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <Typography variant="body1" fontWeight="bold">Quản lý tồn kho</Typography>
                                <Switch checked={manageStock}
                                        onChange={() => setManageStock(!manageStock)}/>
                            </Box>
                            {manageStock && (
                                <Box sx={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr 1fr',
                                    gap: 2,
                                    mt: 2
                                }}>
                                    <TextField label="Tồn kho" type="number" value={productData.stock}
                                               onChange={(e) => handleChange("stock", e.target.value)}/>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions sx={{padding: 2, justifyContent: 'space-between'}}>
                    <Button variant="outlined" onClick={onClose} color="primary">Bỏ qua</Button>
                    <Box sx={{display: 'flex', gap: 2}}>
                        <Button variant="contained" color="primary" onClick={handleSave}
                                startIcon={<SaveIcon/>}>Lưu</Button>
                    </Box>
                </DialogActions>
            </Dialog>

            {/* Snackbar Notification */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Lưu hàng hóa thành công!
                </Alert>
            </Snackbar>
        </>
    );
};

export default ProductDialog;
