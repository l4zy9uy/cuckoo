// src/components/ProductDialog.tsx
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
    Switch,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';

type ProductDialogProps = {
    open: boolean;
    onClose: () => void;
    onSave: () => void;
    onSaveAndAddNew: () => void;
};

const ProductDialog: React.FC<ProductDialogProps> = ({ open, onClose, onSave, onSaveAndAddNew }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [manageStock, setManageStock] = useState(false);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg" sx={{ borderRadius: 3, boxShadow: 3 }}>
            <DialogTitle sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6" fontWeight="bold">Thêm hàng hóa</Typography>
                <Typography variant="body2" color="text.secondary">
                    <a href="#" style={{ color: 'inherit', textDecoration: 'underline' }}>Hướng dẫn sử dụng</a>
                </Typography>
            </DialogTitle>
            <DialogContent dividers sx={{ padding: 4, backgroundColor: 'background.paper', borderRadius: 3 }}>
                {/* Tabs */}
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
                >
                    <Tab label="Thông tin" />
                    <Tab label="Mô tả chi tiết" />
                    <Tab label="Thành phần" />
                    <Tab label="Món thêm" />
                    <Tab label="Chi nhánh" />
                </Tabs>

                {/* Content for Thông tin tab */}
                {activeTab === 0 && (
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: 3 }}>
                        {/* Status and Image Upload */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
                                <InfoIcon fontSize="small" color="action" />
                            </Box>
                        </Box>
                        {/* Product Information */}
                        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(2, 1fr)' }}>
                            <TextField label="Mã hàng hóa" helperText="Mã hàng tự động" disabled />
                            <TextField label="Tên hàng" />
                            <Select fullWidth displayEmpty defaultValue="">
                                <MenuItem value="">Loại thực đơn</MenuItem>
                                <MenuItem value="Đồ ăn">Đồ ăn</MenuItem>
                                <MenuItem value="Đồ uống">Đồ uống</MenuItem>
                            </Select>
                            <Select fullWidth displayEmpty defaultValue="">
                                <MenuItem value="">Nhóm hàng</MenuItem>
                                <MenuItem value="Lựa chọn">--Lựa chọn--</MenuItem>
                            </Select>
                            <TextField label="Vị trí" />
                            <TextField label="Giá vốn" type="number" defaultValue={0} />
                            <TextField
                                label="Giá bán"
                                type="number"
                                defaultValue={0}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton>
                                            <InfoIcon fontSize="small" />
                                        </IconButton>
                                    ),
                                }}
                            />
                            <TextField label="Trọng lượng" />
                        </Box>



                        {/* Stock Management */}
                        <Box sx={{ gridColumn: 'span 2', mt: 3, p: 2, backgroundColor: 'grey.50', borderRadius: 2, boxShadow: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body1" fontWeight="bold">Quản lý tồn kho</Typography>
                                <Switch checked={manageStock} onChange={() => setManageStock(!manageStock)} />
                            </Box>
                            {manageStock && (
                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, mt: 2 }}>
                                    <TextField label="Tồn kho" type="number" />
                                    <TextField label="Ít nhất" type="number" />
                                    <TextField label="Nhiều nhất" type="number" defaultValue="999,999,999" />
                                </Box>
                            )}
                        </Box>

                        {/* Units of Measure */}
                        <Accordion sx={{ gridColumn: 'span 2', mt: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="body1" fontWeight="bold">Đơn vị tính</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TextField label="Đơn vị cơ bản" fullWidth />
                                <Button startIcon={<AddIcon />} sx={{ mt: 1 }}>Thêm đơn vị</Button>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                )}
            </DialogContent>

            <DialogActions sx={{ padding: 2, justifyContent: 'space-between' }}>
                <Button variant="outlined" onClick={onClose} color="primary">Bỏ qua</Button>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="contained" color="primary" onClick={onSave} startIcon={<SaveIcon />}>Lưu</Button>
                    <Button variant="contained" color="success" onClick={onSaveAndAddNew} startIcon={<SaveIcon />}>
                        Lưu & Thêm mới
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default ProductDialog;
