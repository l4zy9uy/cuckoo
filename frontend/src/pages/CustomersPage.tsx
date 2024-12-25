// src/pages/CustomersPage.tsx
import {useState} from 'react';
import {Grid2, Paper} from "@mui/material";
import SidebarFilter from "@/components/SidebarFilter.tsx";
import Box from "@mui/material/Box";
import HeaderActions from "@/components/HeaderAction.tsx";
import CustomTable from "@/components/CustomTable.tsx";
//import ProductDetailsCollapse from "@/components/ProductDetailsCollapse.tsx";
import AddCustomerDialog from "@/components/dialogs/AddCustomerDialog.tsx";

const customerColumns = [
    {field: 'customer_id', headerName: 'Ma khach hang', width: 550},
    {field: 'name', headerName: 'Tên khach hang', width: 550},
    {field: 'phone', headerName: 'So dien thoai', flexGrow: 1},

];

const customerRows: any[] = [
    {
        customer_id: 1,
        name: "Nguyễn Văn A",
        phone: "0912345678",
        branch_id: 1,
        gender: "Male",
        email: "nguyenvana@example.com",
        address: "123 Đường ABC, Quận 1, TP.HCM",
    },
    {
        customer_id: 2,
        name: "Trần Thị B",
        phone: "0987654321",
        branch_id: 2,
        gender: "Female",
        email: "tranthib@example.com",
        address: "456 Đường DEF, Quận 5, TP.HCM",
    },
    {
        customer_id: 3,
        name: "Lê Văn C",
        phone: "0123456789",
        branch_id: 1,
        gender: "Male",
        email: "levanc@example.com",
        address: "789 Đường GHI, Quận 3, TP.HCM",
    },
]

const CustomersPage = () => {
    const [customers, setCustomers] = useState(customerRows); // State for customer data

    // Handle saving a new customer
    const handleAddCustomer = (newCustomer: any) => {
        setCustomers((prev) => [...prev, newCustomer]);
    };

    return (
        <Grid2 container spacing={2} sx={{height: '100vh', padding: '1rem'}}>
            {/* Sidebar */}
            <Grid2>
                <Paper elevation={3} sx={{height: '100%'}}>
                    <SidebarFilter
                        title="Tìm kiếm"
                        searchPlaceholder="Tìm theo tên hoặc số điện thoại"
                        onStatusChange={() => {}}
                    />
                </Paper>
            </Grid2>

            {/* Main Content */}
            <Grid2 sx={{display: 'flex', flexDirection: 'column'}}
                   size="grow">
                <Paper elevation={3}
                       sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{padding: '2rem', flex: 1, overflow: 'auto'}}>
                        <HeaderActions text="Khach hang"
                                       DialogComponent={({open, onClose}) => (
                                           <AddCustomerDialog
                                               open={open}
                                               onClose={onClose}
                                               onSave={handleAddCustomer}
                                           />
                                       )}/>
                        <CustomTable rows={customers}
                                     columns={customerColumns}
                        />
                    </Box>
                </Paper>
            </Grid2>
        </Grid2>
    );
};

export default CustomersPage;
