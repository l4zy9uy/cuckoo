// src/pages/ProductsPage.tsx
import CustomTable from "../components/CustomTable.tsx";
import {Grid2, Paper} from "@mui/material";
import SidebarFilter from "@/components/SidebarFilter.tsx";
import Box from "@mui/material/Box";
import HeaderActions from "@/components/HeaderAction.tsx";
import ProductDetailsCollapse from "@/components/ProductDetailsCollapse.tsx"
import AddTableDialog from "@/components/dialogs/AddTableDialog.tsx";

const productColumns = [
    {field: 'id', headerName: 'Mã hàng hóa', width: 150},
    {field: 'name', headerName: 'Tên hàng', flexGrow: 1},
    {field: 'type', headerName: 'Loại thực đơn', width: 150},
    {field: 'price', headerName: 'Giá bán', width: 120},
    {field: 'stock', headerName: 'Tồn kho', width: 120},
];

const productRows = [
    {
        id: 'SP000023',
        name: 'Thuốc lá Vinataba',
        type: 'Khác',
        price: '30,000',
        stock: '25,177'
    },
    {
        id: 'SP000024',
        name: 'Thuốc lá Marlboro',
        type: 'Khác',
        price: '30,000',
        stock: '1,005'
    },
    {
        id: 'SP000025',
        name: 'Thuốc lá Kent HD',
        type: 'Khác',
        price: '30,000',
        stock: '1,011'
    },
    {
        id: 'SP000018',
        name: 'Mint Tea',
        type: 'Khác',
        price: '15,000',
        stock: '1,007'
    },
];

const accordionData = [
    {
        title: 'Loại thực đơn',
        items: [
            { label: 'Đồ ăn' },
            { label: 'Đồ uống' },
            { label: 'Khác' },
        ],
    },
    {
        title: 'Loại hàng',
        items: [
            { label: 'Hàng hóa thường' },
            { label: 'Chế biến' },
            { label: 'Dịch vụ' },
            { label: 'Combo - Đóng gói' },
        ],
    },
    {
        title: 'Nhóm hàng',
        items: [
            { label: 'Sản phẩm mới' },
            { label: 'Sản phẩm nổi bật' },
        ],
    },
];

const ProductsPage = () => {
    return (
        <Grid2 container spacing={2} sx={{height: '100vh', padding: '1rem'}}>
            {/* Sidebar */}
            <Grid2>
                <Paper elevation={3} sx={{height: '100%'}}>
                    <SidebarFilter
                        title="Tìm kiếm"
                        searchPlaceholder="Theo mã, tên hàng"
                        accordionData={accordionData}
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
                                       DialogComponent={({ open, onClose }) => (
                                           <AddTableDialog
                                               open={open}
                                               onClose={onClose}
                                               onSave={(data) => console.log("Saved data:", data)}
                                           />
                                       )}
                        />
                        <CustomTable rows={productRows}
                                     columns={productColumns}
                                     renderCollapse={(row) => (
                                         <ProductDetailsCollapse
                                             productName={row.name}
                                             imageUrl={row.imageUrl}
                                             details={[
                                                 { label: "Mã hàng hóa", value: row.code },
                                                 { label: "Loại thực đơn", value: row.menuType },
                                                 { label: "Nhóm hàng", value: row.category },
                                                 { label: "Loại hàng", value: row.itemType },
                                                 { label: "Định mức tồn", value: row.stockLimit, sx: { color: 'blue' } },
                                                 { label: "Giá bán", value: row.price, sx: { fontWeight: 'bold', color: 'green' } },
                                                 { label: "Giá vốn", value: row.cost, sx: { color: 'red' } },
                                                 { label: "Trọng lượng", value: row.weight },
                                                 { label: "Mô tả", value: row.description, sx: { fontStyle: 'italic' } },
                                                 { label: "Ghi chú đặt hàng", value: row.orderNote },
                                             ]}
                                         />
                                     )}/>
                    </Box>
                </Paper>
            </Grid2>
        </Grid2>
    );
};

export default ProductsPage;
