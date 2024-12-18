// src/pages/TablesPage.tsx

import {Grid2, Paper} from "@mui/material";
import SidebarFilter from "@/components/SidebarFilter.tsx";
import Box from "@mui/material/Box";
import HeaderActions from "@/components/HeaderAction.tsx";
import CustomTable from "@/components/CustomTable.tsx";
import ProductDetailsCollapse from "@/components/ProductDetailsCollapse.tsx";
import {useState} from "react";
import AddTableDialog from "@/components/dialogs/AddTableDialog.tsx";

const tableColumns = [
    {field: 'name', headerName: 'Tên phong/ban', width: 350},
    {field: 'description', headerName: 'Ghi chu', flexGrow: 1},
    {field: 'numPerson', headerName: 'So nguoi', width: 350},
    {field: 'status', headerName: 'Trang thai', width: 320},
    {field: 'order', headerName: 'So thu tu', width: 150},
];

// @ts-ignore
const tableRows = []

const TablesPage = () => {
    // @ts-ignore
    const [statusFilter, setStatusFilter] = useState('active');

    const handleStatusChange = (value: string) => {
        setStatusFilter(value);
        // Additional logic for filtering rows based on status can go here
    };
    // @ts-ignore
    return (
        <Grid2 container spacing={2} sx={{height: '100vh', padding: '1rem'}}>
            {/* Sidebar */}
            <Grid2>
                <Paper elevation={3} sx={{height: '100%'}}>
                    <SidebarFilter
                        title="Tìm kiếm"
                        searchPlaceholder="Theo tên phòng/bàn"
                        statusFilterOptions={[
                            {
                                label: 'Đang hoạt động',
                                value: 'active',
                                color: 'green'
                            },
                            {
                                label: 'Ngừng hoạt động',
                                value: 'inactive',
                                color: 'red'
                            },
                            {label: 'Tất cả', value: 'all'},
                        ]}
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
                        <HeaderActions
                            text="Phòng/Bàn"
                            DialogComponent={({open, onClose}) => (
                                <AddTableDialog
                                    open={open}
                                    onClose={onClose}
                                    onSave={(data) => console.log("Saved data:", data)}
                                />
                            )}
                        />
                        {/*@ts-ignore*/}
                        <CustomTable rows={tableRows}
                                     columns={tableColumns}
                                     renderCollapse={(row) => (
                                         <ProductDetailsCollapse
                                             productName={row.name}
                                             imageUrl={row.imageUrl}
                                             details={[
                                                 {
                                                     label: "Mã hàng hóa",
                                                     value: row.code
                                                 },
                                                 {
                                                     label: "Loại thực đơn",
                                                     value: row.menuType
                                                 },
                                                 {
                                                     label: "Nhóm hàng",
                                                     value: row.category
                                                 },
                                                 {
                                                     label: "Loại hàng",
                                                     value: row.itemType
                                                 },
                                                 {
                                                     label: "Định mức tồn",
                                                     value: row.stockLimit,
                                                     sx: {color: 'blue'}
                                                 },
                                                 {
                                                     label: "Giá bán",
                                                     value: row.price,
                                                     sx: {
                                                         fontWeight: 'bold',
                                                         color: 'green'
                                                     }
                                                 },
                                                 {
                                                     label: "Giá vốn",
                                                     value: row.cost,
                                                     sx: {color: 'red'}
                                                 },
                                                 {
                                                     label: "Trọng lượng",
                                                     value: row.weight
                                                 },
                                                 {
                                                     label: "Mô tả",
                                                     value: row.description,
                                                     sx: {fontStyle: 'italic'}
                                                 },
                                                 {
                                                     label: "Ghi chú đặt hàng",
                                                     value: row.orderNote
                                                 },
                                             ]}
                                         />
                                     )}/>
                    </Box>
                </Paper>
            </Grid2>
        </Grid2>
    );
};

export default TablesPage;
