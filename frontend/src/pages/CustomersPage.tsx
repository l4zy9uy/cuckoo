// src/pages/CustomersPage.tsx
import {useState} from 'react';
import {Grid2, Paper} from "@mui/material";
import SidebarFilter from "@/components/SidebarFilter.tsx";
import Box from "@mui/material/Box";
import HeaderActions from "@/components/HeaderAction.tsx";
import CustomTable from "@/components/CustomTable.tsx";
//import ProductDetailsCollapse from "@/components/ProductDetailsCollapse.tsx";
import AddCustomerDialog from "@/components/dialogs/AddCustomerDialog.tsx";

const tableColumns = [
    {field: 'id', headerName: 'Ma khach hang', width: 350},
    {field: 'name', headerName: 'Tên khach hang', width: 350},
    {field: 'phoneNumber', headerName: 'So dien thoai', width: 350},
    {field: 'total sale', headerName: 'Tong ban', flexGrow: 1},

];

const tableRows: any[] = []

const CustomersPage = () => {
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
                <Paper elevation={3} sx={{height: '100%'}}>
                    <SidebarFilter
                        title="Tìm kiếm"
                        searchPlaceholder="Ten khach hang"
                        onStatusChange={handleStatusChange}
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
                        <CustomTable rows={tableRows}
                                     columns={tableColumns}
                                     // renderCollapse={(row) => (
                                     //     // <ProductDetailsCollapse
                                     //     //     productName={row.name}
                                     //     //     imageUrl={row.imageUrl}
                                     //     //     details={[
                                     //     //         {
                                     //     //             label: "Mã hàng ",
                                     //     //             value: row.code
                                     //     //         },
                                     //     //         {
                                     //     //             label: "Loại thực đơn",
                                     //     //             value: row.menuType
                                     //     //         },
                                     //     //         {
                                     //     //             label: "Nhóm hàng",
                                     //     //             value: row.category
                                     //     //         },
                                     //     //         {
                                     //     //             label: "Loại hàng",
                                     //     //             value: row.itemType
                                     //     //         },
                                     //     //         {
                                     //     //             label: "Định mức tồn",
                                     //     //             value: row.stockLimit,
                                     //     //             sx: {color: 'blue'}
                                     //     //         },
                                     //     //         {
                                     //     //             label: "Giá bán",
                                     //     //             value: row.price,
                                     //     //             sx: {
                                     //     //                 fontWeight: 'bold',
                                     //     //                 color: 'green'
                                     //     //             }
                                     //     //         },
                                     //     //         {
                                     //     //             label: "Giá vốn",
                                     //     //             value: row.cost,
                                     //     //             sx: {color: 'red'}
                                     //     //         },
                                     //     //         {
                                     //     //             label: "Trọng lượng",
                                     //     //             value: row.weight
                                     //     //         },
                                     //     //         {
                                     //     //             label: "Mô tả",
                                     //     //             value: row.description,
                                     //     //             sx: {fontStyle: 'italic'}
                                     //     //         },
                                     //     //         {
                                     //     //             label: "Ghi chú đặt hàng",
                                     //     //             value: row.orderNote
                                     //     //         },
                                     //     //     ]}
                                     //     // />
                                     // )}
                        />
                    </Box>
                </Paper>
            </Grid2>
        </Grid2>
    );
};

export default CustomersPage;
