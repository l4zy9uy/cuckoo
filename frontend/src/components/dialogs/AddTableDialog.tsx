import React, { useState } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type AddTableDialogProps = {
    open: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
};

const AddTableDialog: React.FC<AddTableDialogProps> = ({
                                                           open,
                                                           onClose,
                                                           onSave,
                                                       }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        numPerson: "",
        status: "Đang hoạt động", // Default to active
        order: 1,
        area: "",
    });

    const handleChange = (field: string, value: string | number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = () => {
        const sanitizedData = {
            ...formData,
            numPerson: parseInt(formData.numPerson, 10) || 0,
            order: formData.order || 1,
        };
        console.log(formData)
        onSave(sanitizedData);
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
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                    <TextField
                        label="Tên phòng/bàn"
                        required
                        fullWidth
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />
                    <TextField
                        label="Mô tả"
                        fullWidth
                        multiline
                        value={formData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                    />
                    <TextField
                        label="Số người"
                        type="number"
                        fullWidth
                        value={formData.numPerson}
                        onChange={(e) => handleChange("numPerson", e.target.value)}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Trạng thái</InputLabel>
                        <Select
                            value={formData.status}
                            onChange={(e) => handleChange("status", e.target.value)}
                            label="Trạng thái"
                        >
                            <MenuItem value="Đang hoạt động">Đang hoạt động</MenuItem>
                            <MenuItem value="Ngừng hoạt động">Ngừng hoạt động</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Số thứ tự"
                        type="number"
                        fullWidth
                        value={formData.order}
                        onChange={(e) => handleChange("order", e.target.value)}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Khu vực</InputLabel>
                        <Select
                            value={formData.area}
                            onChange={(e) => handleChange("area", e.target.value)}
                            label="Khu vực"
                        >
                            <MenuItem value="">--Lựa chọn--</MenuItem>
                            <MenuItem value="Lầu 1">Lầu 1</MenuItem>
                            <MenuItem value="Lầu 2">Lầu 2</MenuItem>
                            <MenuItem value="Lầu 3">Lầu 3</MenuItem>
                        </Select>
                    </FormControl>
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
