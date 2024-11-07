// src/components/AddTableDialog.tsx
import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type AddTableDialogProps = {
    open: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
};

const AddTableDialog: React.FC<AddTableDialogProps> = ({ open, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        area: '',
        order: 1,
        seats: '',
        notes: '',
    });

    const handleChange = (field: string, value: string | number) => {
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
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Thêm phòng/bàn
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Tên phòng/bàn"
                        required
                        fullWidth
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Khu vực</InputLabel>
                        <Select
                            value={formData.area}
                            onChange={(e) => handleChange('area', e.target.value)}
                            label="Khu vực"
                            variant='outlined'>
                            <MenuItem value="">--Lựa chọn--</MenuItem>
                            <MenuItem value="Lầu 1">Lầu 1</MenuItem>
                            <MenuItem value="Lầu 2">Lầu 2</MenuItem>
                            <MenuItem value="Lầu 3">Lầu 3</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Số thứ tự"
                        type="number"
                        fullWidth
                        value={formData.order}
                        onChange={(e) => handleChange('order', parseInt(e.target.value, 10))}
                    />
                    <TextField
                        label="Số ghế"
                        type="number"
                        fullWidth
                        value={formData.seats}
                        onChange={(e) => handleChange('seats', e.target.value)}
                    />
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
                <Button onClick={handleSave} variant="contained" color="success">
                    Lưu
                </Button>
                <Button onClick={onClose} variant="outlined">
                    Bỏ qua
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddTableDialog;
