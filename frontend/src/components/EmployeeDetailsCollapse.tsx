// src/components/EmployeeDetailsCollapse.tsx
import React from 'react';
import {Box, Typography, Grid2, Button} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export type EmployeeDetails = {
    id: string;
    name: string;
    workBranches: string;
    phone: string;
    hireDate: string,
    address: string;
    salary: number;
    gender: string;
    birthDate: string;
    idCard: string;
    position: string;
}
export type EmployeeDetailsProps = {
    employee: EmployeeDetails;
};

const EmployeeDetailsCollapse: React.FC<EmployeeDetailsProps> = ({employee}) => {
    console.log("employee: ", employee);
    return (
        <Box sx={{
            padding: 3,
            borderRadius: 3,
            backgroundColor: 'background.paper'
        }}>
            <Grid2 container spacing={3}>
                {/* Left Column - Employee Info and Image */}
                <Grid2 container size={{xs: 12, md: 3}}>
                    <Box
                        component="img"
                        src="https://via.placeholder.com/150" // Replace with actual image URL if available
                        alt="Employee"
                        sx={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: 2,
                            marginBottom: 2,
                            border: '1px solid',
                            borderColor: 'divider',
                            backgroundColor: 'grey.200',
                        }}
                    />
                </Grid2>

                {/* Center Column - Employee Information */}
                <Grid2 container size={{xs: 12, md: 6}}>
                    <Typography variant="h6"
                                sx={{fontWeight: 'bold', marginBottom: 2}}>
                        Thông tin nhân viên
                    </Typography>
                    <Grid2 container spacing={2}>
                        <Grid2 container size={{xs: 6}}>
                            <Typography variant="subtitle2"
                                        color="text.secondary">Mã nhân
                                viên:</Typography>
                            <Typography
                                variant="body1">{employee.id}</Typography>
                        </Grid2>
                        <Grid2 container size={{xs: 6}}>
                            <Typography variant="subtitle2"
                                        color="text.secondary">Tên nhân
                                viên:</Typography>
                            <Typography
                                variant="body1">{employee.name}</Typography>
                        </Grid2>
                        <Grid2 container size={{xs: 6}}>
                            <Typography variant="subtitle2"
                                        color="text.secondary">Chi nhánh làm
                                việc:</Typography>
                            <Typography
                                variant="body1">{employee.workBranches}</Typography>
                        </Grid2>
                        <Grid2 container size={{xs: 6}}>
                            <Typography variant="subtitle2"
                                        color="text.secondary">Giới
                                tính:</Typography>
                            <Typography
                                variant="body1">{employee.gender}</Typography>
                        </Grid2>
                        <Grid2 container size={{xs: 6}}>
                            <Typography variant="subtitle2"
                                        color="text.secondary">Số
                                CMND/CCCD:</Typography>
                            <Typography
                                variant="body1">{employee.idCard}</Typography>
                        </Grid2>
                        <Grid2 container size={{xs: 6}}>
                            <Typography variant="subtitle2"
                                        color="text.secondary">Số điện
                                thoại:</Typography>
                            <Typography
                                variant="body1">{employee.phone}</Typography>
                        </Grid2>
                        <Grid2 container size={{xs: 6}}>
                            <Typography variant="subtitle2"
                                        color="text.secondary">Chức
                                danh:</Typography>
                            <Typography
                                variant="body1">{employee.position}</Typography>
                        </Grid2>
                        <Grid2 container size={{xs: 12}}>
                            <Typography variant="subtitle2"
                                        color="text.secondary">Địa
                                chỉ:</Typography>
                            <Typography
                                variant="body1">{employee.address}</Typography>
                        </Grid2>
                    </Grid2>
                </Grid2>

                {/* Right Column - Notes and Actions */}
                <Grid2 container size={{xs: 12, md: 3}} direction="column">
                    <Box
                        sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                        <Button variant="contained" color="primary"
                                startIcon={<EditIcon/>}>
                            Cập nhật
                        </Button>
                        <Button variant="contained" color="error"
                                startIcon={<DeleteIcon/>}>
                            Xóa nhân viên
                        </Button>
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default EmployeeDetailsCollapse;
