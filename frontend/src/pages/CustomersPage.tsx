// src/pages/CustomersPage.tsx
import {useState} from 'react';
import {Grid2, Paper} from "@mui/material";
import SidebarFilter from "@/components/SidebarFilter.tsx";
import Box from "@mui/material/Box";
import HeaderActions from "@/components/HeaderAction.tsx";
import CustomTable from "@/components/CustomTable.tsx";
//import ProductDetailsCollapse from "@/components/ProductDetailsCollapse.tsx";
import AddCustomerDialog from "@/components/dialogs/AddCustomerDialog.tsx";
import { fakerVI as faker } from '@faker-js/faker';

const customerColumns = [
    {field: 'customer_id', headerName: 'Ma khach hang', width: 550},
    {field: 'name', headerName: 'Tên khach hang', width: 550},
    {field: 'phone', headerName: 'So dien thoai', flexGrow: 1},

];

const generateCustomerRows = (count: number): any[] => {
    const branches = [1, 2, 3, 4, 5]; // Example branch IDs
    return Array.from({ length: count }, (_, index) => {
        const gender = faker.helpers.arrayElement(["Male", "Female"]);
        const address = `${faker.location.streetAddress()}, ${faker.location.city()}, Việt Nam`;

        return {
            customer_id: index + 1,
            name: faker.person.fullName({ sex: gender === "Male" ? "male" : "female" }),
            phone: faker.phone.number({style: "human"}),
            branch_id: faker.helpers.arrayElement(branches),
            gender: gender,
            address: address,
            date: faker.date
                .recent({days: 7})
                .toLocaleString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
        };
    });
};

const customerRows = generateCustomerRows(30);


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
