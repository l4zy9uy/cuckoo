// src/pages/EmployeesPage.tsx
import {useState} from 'react';
import {Grid2, Paper, Box, Select, MenuItem, TextField} from '@mui/material';
//import SidebarFilter from '@/components/SidebarFilter.tsx';
import HeaderActions from '@/components/HeaderAction.tsx';
import CustomTable from '@/components/CustomTable.tsx';
import AddEmployeeDialog from '@/components/dialogs/AddEmployeeDialog.tsx';
import EmployeeDetailsCollapse, {
    EmployeeDetails
} from '@/components/EmployeeDetailsCollapse.tsx';
import Typography from "@mui/material/Typography";

const tableColumns = [
    {field: 'id', headerName: 'Mã nhân viên', width: 150},
    {field: 'name', headerName: 'Tên nhân viên', width: 200},
    {field: 'phone', headerName: 'Số điện thoại', width: 150},
    {field: 'idCard', headerName: 'Số CMND/CCCD', width: 150},
    {field: 'notes', headerName: 'Ghi chú', width: 100},
];

const tableRows: EmployeeDetails[] = [
    {
        id: 'NV000001',
        name: 'Nguyễn Văn A',
        phone: '0702259661',
        idCard: '123456789',
        notes: 'Ghi chú về nhân viên',
        startDate: '2022-01-01',
        workBranches: 'Tất cả chi nhánh',
        email: "hihi@gmail.com",
        account: 'user123',
        address: '123 Main St',
        gender: 'Nam',
        birthDate: '1990-01-01',
        position: 'Manager',
    },
    // Additional rows can be added here
];

const EmployeesPage = () => {
    const [branch, setBranch] = useState('Chi nhánh trung tâm');

    return (
        <Grid2 container spacing={2} sx={{height: '100vh', padding: '1rem'}}>
            {/* Sidebar */}
            <Grid2>
                <Paper elevation={3} sx={{height: '100%', padding: '1rem'}}>
                    <Box sx={{marginBottom: 2}}>
                        <TextField
                            placeholder="Tìm theo mã, tên nhân viên"
                            variant="outlined"
                            fullWidth
                        />
                    </Box>

                    <Box>
                        <Typography variant="subtitle1">Chi nhánh làm
                            việc</Typography>
                        <Select
                            fullWidth
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                            variant="outlined"
                        >
                            <MenuItem value="Chi nhánh trung tâm">Chi nhánh
                                trung tâm</MenuItem>
                            <MenuItem value="Chi nhánh 1">Chi nhánh 1</MenuItem>
                            <MenuItem value="Chi nhánh 2">Chi nhánh 2</MenuItem>
                        </Select>
                    </Box>
                </Paper>
            </Grid2>

            {/* Main Content */}
            <Grid2 size="grow">
                <Paper elevation={3} sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1rem'
                }}>
                    <HeaderActions
                        text="Nhân viên"
                        DialogComponent={({open, onClose}) => (
                            <AddEmployeeDialog
                                open={open}
                                onClose={onClose}
                                onSave={(data) => console.log("Saved data:", data)}
                            />
                        )}
                    />

                    {/* Table */}
                    <CustomTable
                        rows={tableRows}
                        columns={tableColumns}
                        renderCollapse={(row) => (
                            <EmployeeDetailsCollapse employee={row as EmployeeDetails} />
                        )}
                    />
                </Paper>
            </Grid2>
        </Grid2>
    );
};

export default EmployeesPage;
