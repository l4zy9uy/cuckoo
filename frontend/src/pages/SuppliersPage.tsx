// src/pages/SuppliersPage.tsx
import {useEffect, useState} from 'react';
import {Grid2, Paper, Alert, Snackbar} from "@mui/material";
import SidebarFilter from "@/components/SidebarFilter.tsx";
import Box from "@mui/material/Box";
import HeaderActions from "@/components/HeaderAction.tsx";
//import AddCustomerDialog from "@/components/dialogs/AddCustomerDialog.tsx";
import CustomTable from "@/components/CustomTable.tsx";
//import ProductDetailsCollapse from "@/components/ProductDetailsCollapse.tsx";
import { fakerVI as faker } from '@faker-js/faker';

const tableColumns = [
    {field: 'id', headerName: 'Mã nhà cung cấp', width: 400},
    {field: 'name', headerName: 'Tên nhà cung cấp', width: 300},
    {field: 'phone', headerName: 'Điện thoại', width: 500},
    {field: 'totalPurchase', headerName: 'Tổng mua', flexGrow: 1},
];
type Filters = {
    search: string;
    accordion: Record<string, string[]>;
};
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

const initialRows = generateSupplierRows(15);

const SuppliersPage = () => {
    const [filters, setFilters] = useState<Filters>({
        search: "",
        accordion: {},
    });
    // @ts-ignore
    const [tableRows, setTableRows] = useState(initialRows);
    const [snackbar, setSnackbar] = useState({ open: false, type: "success", message: "" });
    const [filteredRows, setFilteredRows] = useState(initialRows);
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());


    const handleSearchChange = (value: string) => {
        setFilters((prev:any) => ({ ...prev, search: value }));
    };
    const handleAccordionFilterChange = (accordionFilters: Record<string, string[]>) => {
        setFilters((prev: any) => ({ ...prev, accordion: accordionFilters }));
    };

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

    useEffect(() => {
        const filtered = tableRows.filter((row) =>
            Object.values(row).some((val) =>
                val?.toString().toLowerCase().includes(filters.search.toLowerCase())
            )
        );
        setFilteredRows(filtered);
    }, [filters, tableRows]);  // Add invoices to the dependency array to trigger re-filtering when invoices update

    useEffect(() => {
        const { search } = filters;
        let filtered = tableRows;

        if (search) {
            filtered = filtered.filter((row) =>
                Object.values(row).some((val) =>
                    val?.toString().toLowerCase().includes(search.toLowerCase())
                )
            );
        }

        setFilteredRows(filtered);
    }, [filters]);
    return (
        <Grid2 container spacing={2} sx={{height: '100vh', padding: '1rem'}}>
            {/* Sidebar */}
            <Grid2>
                <Paper elevation={3} sx={{height: '100%', padding: '1rem'}}>
                    <SidebarFilter
                        title="Tìm kiếm"
                        searchPlaceholder="Nhap thong tin muon tim"
                        // @ts-ignore
                        accordionData={[
                            {
                                title: 'Nhóm NCC',
                                items: [
                                    {label: 'Tất cả các nhóm'},
                                    {label: 'Nhóm A'},
                                    {label: 'Nhóm B'},
                                ],
                            },
                        ]}                        onSearchChange={handleSearchChange}
                        onAccordionFilterChange={handleAccordionFilterChange}
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
                            text="Nhà cung cấp"
                            //@ts-ignore
                            DialogComponent={({open, onClose}) => (
                                <div />
                            )}
                            selectedNum={selectedRows.size}
                            onDelete={handleDeleteSelectedRows}
                        />
                        <CustomTable
                            rows={filteredRows}
                            columns={tableColumns}
                            onRowSelectionChange={(ids) => setSelectedRows(new Set(ids))}
                        />
                    </Box>
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

export default SuppliersPage;
