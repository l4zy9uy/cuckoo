// src/components/CustomerDialog.tsx
import React, {useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Box,
    Typography,
} from '@mui/material';

type CustomerDialogProps = {
    open: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
};

const CustomerDialog: React.FC<CustomerDialogProps> = ({
                                                           open,
                                                           onClose,
                                                           onSave
                                                       }) => {
    const [formData, setFormData] = useState({
        customerId: '',
        name: '',
        phone: '',
        address: '',
        branch: '',
        gender: '',
        notes: '',
    });

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                Thêm khách hàng
            </DialogTitle>
            <DialogContent dividers>
                <Box sx={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr',
                    gap: 2
                }}>
                    <TextField
                        label="Mã khách hàng"
                        fullWidth
                        value={formData.customerId}
                        onChange={(e) => handleChange('customerId', e.target.value)}
                    />
                    <TextField
                        label="Tên khách hàng"
                        fullWidth
                        required
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                    />
                    <TextField
                        label="Điện thoại"
                        fullWidth
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                    />
                    <TextField
                        label="Địa chỉ"
                        fullWidth
                        value={formData.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                    />
                    <TextField
                        label="Chi nhánh"
                        fullWidth
                        value={formData.branch}
                        onChange={(e) => handleChange('branch', e.target.value)}
                    />
                    <FormControl>
                        <Typography variant="subtitle1">Giới tính</Typography>
                        <RadioGroup
                            row
                            value={formData.gender}
                            onChange={(e) => handleChange('gender', e.target.value)}
                        >
                            <FormControlLabel value="male" control={<Radio/>}
                                              label="Nam"/>
                            <FormControlLabel value="female" control={<Radio/>}
                                              label="Nữ"/>
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        label="Ghi chú"
                        fullWidth
                        multiline
                        value={formData.notes}
                        onChange={(e) => handleChange('notes', e.target.value)}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSave} variant="contained"
                        color="success">Lưu</Button>
                <Button onClick={onClose} variant="outlined">Bỏ qua</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomerDialog;
