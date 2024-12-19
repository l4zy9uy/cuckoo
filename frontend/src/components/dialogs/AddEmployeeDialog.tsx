// src/components/dialogs/AddEmployeeDialog.tsx
import React, {useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    IconButton,
    Box,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

type AddEmployeeDialogProps = {
    open: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
};

const AddEmployeeDialog: React.FC<AddEmployeeDialogProps> = ({
                                                                 open,
                                                                 onClose,
                                                                 onSave
                                                             }) => {
    const [formData, setFormData] = useState({
        employeeId: '',
        name: '',
        phone: '',
        workBranch: [],
        payBranch: 'Chi nhánh trung tâm',
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
            <DialogTitle sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                Thông tin khởi tạo
                <IconButton onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Box sx={{display: 'flex', gap: 2}}>
                    {/* Left Side - Image Upload */}
                    <Box sx={{width: '25%'}}>
                        <Box
                            sx={{
                                width: '100%',
                                height: '80%',
                                border: '1px dashed #ddd',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 2,
                            }}
                        >
                            <AddPhotoAlternateIcon fontSize="large"
                                                   color="action"/>
                        </Box>
                        <Button variant="outlined" fullWidth>Chọn ảnh</Button>
                    </Box>

                    {/* Right Side - Employee Details */}
                    <Box sx={{
                        width: '75%',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(1, 1fr)',
                        gap: 2
                    }}>
                        <TextField
                            label="Mã nhân viên"
                            placeholder="Mã nhân viên tự động"
                            fullWidth
                            value={formData.employeeId}
                            onChange={(e) => handleChange('employeeId', e.target.value)}
                        />
                        <TextField
                            label="Tên nhân viên"
                            fullWidth
                            required
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                        />
                        <TextField
                            label="Số điện thoại"
                            fullWidth
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Chi nhánh làm việc</InputLabel>
                            <Select
                                multiple
                                value={formData.workBranch}
                                onChange={(e) => handleChange('workBranch', e.target.value)}
                                renderValue={(selected) => (
                                    <Box sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 0.5
                                    }}>
                                        {(selected as string[]).map((value) => (
                                            <Chip key={value} label={value}/>
                                        ))}
                                    </Box>
                                )}
                            >
                                <MenuItem value="Tất cả chi nhánh">Tất cả chi
                                    nhánh</MenuItem>
                                <MenuItem value="Chi nhánh trung tâm">Chi nhánh
                                    trung tâm</MenuItem>
                                <MenuItem value="Chi nhánh 1">Chi nhánh
                                    1</MenuItem>
                                <MenuItem value="Chi nhánh 2">Chi nhánh
                                    2</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSave} variant="contained"
                        color="success">
                    Lưu
                </Button>
                <Button onClick={onClose} variant="outlined">
                    Bỏ qua
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddEmployeeDialog;
