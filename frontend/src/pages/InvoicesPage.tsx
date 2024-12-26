// src/pages/InvoicesPage.tsx
import { useEffect, useState } from 'react';
import {Alert, Paper, Snackbar} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import SidebarFilter from "@/components/SidebarFilter.tsx";
import HeaderActions from "@/components/HeaderAction.tsx";
import CustomTable from "@/components/CustomTable.tsx";
import InvoiceDetailsCollapse from "@/components/InvoicesDetailsCollapse.tsx";
import AddInvoiceDialog from "@/components/dialogs/AddInvoiceDialog.tsx";
import { fakerVI as faker} from '@faker-js/faker';


// Các cột hiển thị trên bảng
const invoiceColumns = [
    { field: 'order_id', headerName: 'Mã hóa đơn', width: 150 },
    { field: 'customer_name', headerName: 'Khách hàng', width: 200 },
    { field: 'total_price', headerName: 'Tổng tiền hàng', width: 150 },
    { field: 'createdAt', headerName: 'Thoi gian', width: 150 },
    { field: 'status', headerName: 'Trang thai', flexGrow: 1 },
];


const generateInvoiceRows = (count: number) => {
    const statuses = ["Đã thanh toán", "Chưa thanh toán"];
    const paymentMethods = ["Thẻ tín dụng", "Tiền mặt", "Ví điện tử"];

    return Array.from({ length: count }, (_, index) => {
        const orderItems = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
            menu_id: faker.number.int({ min: 1, max: 50 }),
            quantity: faker.number.int({ min: 1, max: 10 }),
            price: faker.commerce.price({ min: 50, max: 500, dec: 2 }),
        }));

        const totalPrice = orderItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);

        return {
            order_id: index + 1,
            branch_id: faker.number.int({ min: 101, max: 110 }),
            table_id: faker.datatype.boolean() ? faker.number.int({ min: 1, max: 50 }) : null,
            customer_name: faker.person.fullName(),
            staff_id: faker.number.int({ min: 1, max: 20 }),
            total_price: parseFloat(totalPrice.toFixed(2)),
            status: faker.helpers.arrayElement(statuses),
            payment_method: faker.helpers.arrayElement(paymentMethods),
            createdAt: faker.date.recent({ days: 30 }).toLocaleString("vi-VN", { hour12: false }),
            updatedAt: faker.date.recent({ days: 10 }).toISOString(),
            order_items: orderItems,
        };
    });
};

const invoiceRows = generateInvoiceRows(30);

// @ts-ignore
const accordionData = [];

type Filters = {
    search: string;
    accordion: Record<string, string[]>;
};

const InvoicesPage = () => {
    const [filters, setFilters] = useState<Filters>({
        search: "",
        accordion: {},
    });
    const [invoices, setInvoices] = useState(invoiceRows);
    const [filteredRows, setFilteredRows] = useState(invoiceRows);
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const [snackbar, setSnackbar] = useState({ open: false, type: "success", message: "" });

    const handleUpdateInvoice = (updatedInvoice: any) => {
        setInvoices(prevInvoices => prevInvoices.map(inv => inv.order_id === updatedInvoice.order_id ? updatedInvoice : inv));
    };
    const handleSearchChange = (value: string) => {
        setFilters((prev) => ({ ...prev, search: value }));
    };
    const handleAccordionFilterChange = (accordionFilters: Record<string, string[]>) => {
        setFilters((prev) => ({ ...prev, accordion: accordionFilters }));
    };

    const handleDeleteSelectedRows = () => {
        const selectedIndices = Array.from(selectedRows); // Get indices as an array
        const remainingRows = invoices.filter((_, index) => !selectedIndices.includes(index)); // Filter by index
        setInvoices(remainingRows);

        const updatedFilteredRows = remainingRows.filter((row) =>
            Object.values(row).some((val) =>
                val?.toString().toLowerCase().includes(filters.search.toLowerCase())
            )
        );
        setFilteredRows(updatedFilteredRows);

        console.log("Selected Indices:", selectedIndices);
        console.log("Remaining Rows:", remainingRows);

        // Clear the selected rows and show success message
        setSelectedRows(new Set());
        setSnackbar({ open: true, type: "success", message: "Deleted successfully!" });
    };

    useEffect(() => {
        const { search } = filters;
        let filtered = invoiceRows;

        if (search) {
            filtered = filtered.filter((row) =>
                Object.values(row).some((val) =>
                    val?.toString().toLowerCase().includes(search.toLowerCase())
                )
            );
        }

        setFilteredRows(filtered);
    }, [filters]);

    useEffect(() => {
        console.log("Invoices updated:", invoices);
    }, [invoices]);

    useEffect(() => {
        const filtered = invoices.filter((row) =>
            Object.values(row).some((val) =>
                val?.toString().toLowerCase().includes(filters.search.toLowerCase())
            )
        );
        setFilteredRows(filtered);
    }, [filters, invoices]);  // Add invoices to the dependency array to trigger re-filtering when invoices update

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    // @ts-ignore
    return (
        <Grid2 container spacing={2} sx={{height: '100vh', padding: '1rem'}}>
            <Grid2>
                <Paper elevation={3} sx={{height: '100%'}}>
                    <SidebarFilter
                        title="Tìm kiếm"
                        searchPlaceholder="Nhap thong tin muon tim"
                        // @ts-ignore
                        accordionData={accordionData}
                        onSearchChange={handleSearchChange}
                        onAccordionFilterChange={handleAccordionFilterChange}
                    />
                </Paper>
            </Grid2>

            <Grid2 sx={{display: 'flex', flexDirection: 'column'}} flexGrow={1}>
                <Paper elevation={3} sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{padding: '2rem', flex: 1, overflow: 'auto'}}>
                        <HeaderActions
                            text="Hoa don"
                            DialogComponent={({ open, onClose }) => (
                                <AddInvoiceDialog
                                    open={open}
                                    onClose={onClose}
                                    onSave={() => console.log("Saved data:")}
                                />
                            )}
                            selectedNum={selectedRows.size}
                            onDelete={handleDeleteSelectedRows}
                        />
                        <CustomTable
                            rows={filteredRows}
                            columns={invoiceColumns}
                            onRowSelectionChange={(ids) => setSelectedRows(new Set(ids))}
                            renderCollapse={(row) => (
                                <InvoiceDetailsCollapse
                                    order_id={row.order_id}
                                    branch_id={row.branch_id}
                                    table_id={row.table_id}
                                    customer_name={row.customer_name}
                                    order_date={row.createdAt}
                                    total_price={row.total_price}
                                    amount_paid={row.amount_paid}
                                    status={row.status}
                                    //order_items={row.order_items}
                                    onUpdate={handleUpdateInvoice}
                                />
                            )}
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
                    // @ts-ignore
                    severity={snackbar.type}
                    sx={{ width: "100%", fontSize: "1rem", padding: "1rem" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Grid2>
    );
};

export default InvoicesPage;
