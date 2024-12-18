// src/components/EditInvoiceDialog.tsx
import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    Button,
    Box
} from '@mui/material';

type EditInvoiceData = {
    branch_id: number | null;
    table_id: number | null;
    customer_id: number | null;
    employee_id: number | null;
    status: string;
    total_amount: number;
    amount_paid: number;
};

type EditInvoiceDialogProps = {
    open: boolean;
    onClose: () => void;
    onSave: (updatedData: EditInvoiceData) => void;
    initialData: EditInvoiceData;
};

const EditInvoiceDialog: React.FC<EditInvoiceDialogProps> = ({
                                                                 open,
                                                                 onClose,
                                                                 onSave,
                                                                 initialData
                                                             }) => {
    const [branchId, setBranchId] = useState(initialData.branch_id);
    const [tableId, setTableId] = useState(initialData.table_id);
    const [customerId, setCustomerId] = useState(initialData.customer_id);
    const [employeeId, setEmployeeId] = useState(initialData.employee_id);
    const [status, setStatus] = useState(initialData.status);
    const [totalAmount, setTotalAmount] = useState(initialData.total_amount);
    const [amountPaid, setAmountPaid] = useState(initialData.amount_paid);

    const handleSave = () => {
        onSave({
            branch_id: branchId,
            table_id: tableId,
            customer_id: customerId,
            employee_id: employeeId,
            status: status,
            total_amount: totalAmount,
            amount_paid: amountPaid,
        });
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Cập nhật hóa đơn</DialogTitle>
            <DialogContent dividers>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Branch ID"
                        type="number"
                        value={branchId ?? ''}
                        onChange={(e) => setBranchId(e.target.value ? parseInt(e.target.value) : null)}
                        fullWidth
                    />
                    <TextField
                        label="Table ID"
                        type="number"
                        value={tableId ?? ''}
                        onChange={(e) => setTableId(e.target.value ? parseInt(e.target.value) : null)}
                        fullWidth
                    />
                    <TextField
                        label="Customer ID"
                        type="number"
                        value={customerId ?? ''}
                        onChange={(e) => setCustomerId(e.target.value ? parseInt(e.target.value) : null)}
                        fullWidth
                    />
                    <TextField
                        label="Employee ID"
                        type="number"
                        value={employeeId ?? ''}
                        onChange={(e) => setEmployeeId(e.target.value ? parseInt(e.target.value) : null)}
                        fullWidth
                    />
                    <Select
                        fullWidth
                        value={status}
                        onChange={(e) => setStatus(e.target.value as string)}
                        displayEmpty
                    >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                    <TextField
                        label="Tổng tiền hàng (total_amount)"
                        type="number"
                        fullWidth
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(parseFloat(e.target.value))}
                    />
                    <TextField
                        label="Khách đã trả (amount_paid)"
                        type="number"
                        fullWidth
                        value={amountPaid}
                        onChange={(e) => setAmountPaid(parseFloat(e.target.value))}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Hủy</Button>
                <Button variant="contained" onClick={handleSave}>Lưu</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditInvoiceDialog;
