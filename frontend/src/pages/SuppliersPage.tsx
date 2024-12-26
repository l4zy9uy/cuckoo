// src/pages/SuppliersPage.tsx
import {useState} from 'react';
import {Grid2, Paper} from "@mui/material";
import SidebarFilter from "@/components/SidebarFilter.tsx";
import Box from "@mui/material/Box";
import HeaderActions from "@/components/HeaderAction.tsx";
import AddCustomerDialog from "@/components/dialogs/AddCustomerDialog.tsx";
import CustomTable from "@/components/CustomTable.tsx";
//import ProductDetailsCollapse from "@/components/ProductDetailsCollapse.tsx";
import { fakerVI as faker } from '@faker-js/faker';

const tableColumns = [
    {field: 'id', headerName: 'Mã nhà cung cấp', width: 400},
    {field: 'name', headerName: 'Tên nhà cung cấp', width: 300},
    {field: 'phone', headerName: 'Điện thoại', width: 500},
    {field: 'totalPurchase', headerName: 'Tổng mua', flexGrow: 1},
];

const generateSupplierRows = (count: number) => {
    return Array.from({ length: count }, (_, index) => ({
        id: `NCC${(index + 1).toString().padStart(4, '0')}`, // ID in the format NCCXXXX
        name: faker.helpers.arrayElement([
            "Cửa hàng Đại Việt",
            "Đại lý Hồng Phúc",
            "Siêu thị Minh Tâm",
            "Đại lý An Khánh",
            "Kho Phân phối Sài Gòn",
            "Siêu thị Thực Phẩm",
            "Nhà Phân Phối Hương Việt",
            "Đại Lý Phúc An",
        ]), // Random Vietnamese supplier names
        phone: faker.phone.number({style: "human"}), // Generate a Vietnamese-style phone number
        totalPurchase: faker.commerce
            .price({min: 10000000, max: 100000000, dec: 0, symbol: "VND "})
            .replace(/\B(?=(\d{3})+(?!\d))/g, ","), // Generate a formatted total purchase amount
    }));
};

const tableRows = generateSupplierRows(15);

const SuppliersPage = () => {

    // @ts-ignore
    const [statusFilter, setStatusFilter] = useState('active');

    const handleStatusChange = (value: string) => {
        setStatusFilter(value);
        // Additional logic for filtering rows based on status can go here
    };
    return (
        <Grid2 container spacing={2} sx={{height: '100vh', padding: '1rem'}}>
            {/* Sidebar */}
            <Grid2>
                <Paper elevation={3} sx={{height: '100%', padding: '1rem'}}>
                    <SidebarFilter
                        title="Nhóm NCC"
                        searchPlaceholder="Theo mã, tên, điện thoại"
                        onStatusChange={handleStatusChange}
                        accordionData={[
                            {
                                title: 'Nhóm NCC',
                                items: [
                                    {label: 'Tất cả các nhóm'},
                                    {label: 'Nhóm A'},
                                    {label: 'Nhóm B'},
                                ],
                            },
                        ]}
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
                                               onSave={(data) => console.log("Saved data:", data)}
                                           />
                                       )}/>
                        <CustomTable
                            rows={tableRows}
                            columns={tableColumns}
                            // renderCollapse={(row) => (
                            //     <ProductDetailsCollapse
                            //         productName={row.name}
                            //         imageUrl={row.imageUrl} // Add image URL if available
                            //         details={[
                            //             {
                            //                 label: "Mã nhà cung cấp",
                            //                 value: row.id
                            //             },
                            //             {
                            //                 label: "Tên nhà cung cấp",
                            //                 value: row.name
                            //             },
                            //             {label: "Điện thoại", value: row.phone},
                            //             {label: "Email", value: row.email},
                            //             {
                            //                 label: "Nợ cần trả hiện tại",
                            //                 value: row.debt
                            //             },
                            //             {
                            //                 label: "Tổng mua",
                            //                 value: row.totalPurchase,
                            //                 sx: {
                            //                     fontWeight: 'bold',
                            //                     color: 'green'
                            //                 }
                            //             },
                            //         ]}
                            //     />
                            // )}
                        />
                    </Box>
                </Paper>
            </Grid2>
        </Grid2>
    );
};

export default SuppliersPage;
