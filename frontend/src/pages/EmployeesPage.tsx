// src/pages/EmployeesPage.tsx
import {useState} from 'react';
import {Grid2, Paper, Box, Select, MenuItem, TextField, Alert, Snackbar} from '@mui/material';
//import SidebarFilter from '@/components/SidebarFilter.tsx';
import HeaderActions from '@/components/HeaderAction.tsx';
import CustomTable from '@/components/CustomTable.tsx';
import AddEmployeeDialog from '@/components/dialogs/AddEmployeeDialog.tsx';
import EmployeeDetailsCollapse, {
    EmployeeDetails
} from '@/components/EmployeeDetailsCollapse.tsx';
import Typography from "@mui/material/Typography";
import {fakerVI as faker} from "@faker-js/faker"

const tableColumns = [
    {field: 'id', headerName: 'Mã nhân viên', width: 150},
    {field: 'name', headerName: 'Tên nhân viên', width: 200},
    {field: 'phone', headerName: 'Số điện thoại', width: 150},
    {field: 'idCard', headerName: 'Số CMND/CCCD', width: 150},
    {field: 'position', headerName: 'Vi tri', width: 100},
];

const generateEmployeeRows = (count: number): EmployeeDetails[] => {
    const positions = [
        "Quản lý",
        "Phục vụ",
    ];
    const branches = ["Tất cả chi nhánh", "Chi nhánh 1", "Chi nhánh 2", "Chi nhánh 3", "Chi nhánh 4"];

    return Array.from({ length: count }, (_, index) => {
        const gender = faker.helpers.arrayElement(["Nam", "Nữ"]);
        const birthDate = faker.date.birthdate({ min: 25, max: 60, mode: "age" });

        return {
            id: `NV${String(index + 1).padStart(6, "0")}`,
            name: faker.person.fullName({ sex: gender === "Nam" ? "male" : "female" }),
            phone: faker.phone.number({style: "human"}),
            idCard: faker.string.numeric(9),
            hireDate: faker.date.past({years: 5}).toISOString().split("T")[0],
            workBranches: faker.helpers.arrayElement(branches),
            address: faker.location.streetAddress(),
            gender: gender,
            birthDate: birthDate.toISOString().split("T")[0],
            position: faker.helpers.arrayElement(positions),
            salary: faker.number.int({ min: 5000000, max: 15000000 }),
        };
    });
};

const initialRows = generateEmployeeRows(30);

const EmployeesPage = () => {
    const [tableRows, setTableRows] = useState(initialRows);
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const [snackbar, setSnackbar] = useState({ open: false, type: "success", message: "" });
    const [branch, setBranch] = useState('Tất cả chi nhánh');

    const handleDeleteSelectedRows = () => {
        const selectedIndices = Array.from(selectedRows); // Get indices as an array
        const remainingRows = tableRows.filter((_, index) => !selectedIndices.includes(index)); // Filter by index
        setTableRows(remainingRows);

        // Clear the selected rows and show success message
        setSelectedRows(new Set());
        setSnackbar({ open: true, type: "success", message: "Deleted successfully!" });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

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
                            <MenuItem value="tat ca Chi nhánh ">Tat ca chi nhanh</MenuItem>
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
                        selectedNum={selectedRows.size}
                        onDelete={handleDeleteSelectedRows}
                    />

                    {/* Table */}
                    <CustomTable
                        rows={tableRows}
                        columns={tableColumns}
                        onRowSelectionChange={(ids) => setSelectedRows(new Set(ids))}
                        renderCollapse={(row) => (
                            <EmployeeDetailsCollapse employee={row as EmployeeDetails} />
                        )}
                    />
                </Paper>
            </Grid2>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                sx={{
                    "& .MuiSnackbarContent-root": {
                        minWidth: "400px",
                        fontSize: "0.8rem",
                        padding: "0.8rem",
                    },
                }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    //@ts-ignore
                    severity={snackbar.type}
                    sx={{ width: "100%", fontSize: "1rem", padding: "1rem" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Grid2>
    );
};

export default EmployeesPage;
