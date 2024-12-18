// src/pages/InvoicesPage.tsx
import { useEffect, useState } from 'react';
import { Paper } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import SidebarFilter from "@/components/SidebarFilter.tsx";
import HeaderActions from "@/components/HeaderAction.tsx";
import CustomTable from "@/components/CustomTable.tsx";
import InvoiceDetailsCollapse from "@/components/InvoicesDetailsCollapse.tsx";
import AddInvoiceDialog from "@/components/dialogs/AddInvoiceDialog.tsx";

// Các cột hiển thị trên bảng
const invoiceColumns = [
    { field: 'order_id', headerName: 'Mã hóa đơn', width: 150 },
    { field: 'order_date', headerName: 'Thời gian (Giờ đi)', width: 200 },
    { field: 'customer_id', headerName: 'Khách hàng', width: 200 },
    { field: 'total_amount', headerName: 'Tổng tiền hàng', width: 150 },
    // Giảm giá (invoice discount) hiện tại model không có, ta có thể bỏ qua hoặc hiển thị 0
    // Khách đã trả: hiển thị amount_paid
    { field: 'amount_paid', headerName: 'Khách đã trả', width: 150 },
];

// Dữ liệu giả lập
const invoiceRows = [
    {
        order_id: 50,
        branch_id: 1,
        table_id: 6,
        customer_id: 101,
        employee_id: 201,
        order_date: '2024-12-18T19:00:00Z',
        total_amount: 1500.00,   // Tương đương 1,500,000 nếu muốn formatting
        amount_paid: 1430.00,
        status: 'Completed', // "Pending", "Completed", hoặc "Cancelled"
        order_items: [
            {
                menu_id: 12,
                quantity: 10,
                price: '125.00'  // mỗi món 125
            }
        ]
    },
    {
        order_id: 49,
        branch_id: 1,
        table_id: 6,
        customer_id: 102,
        employee_id: 201,
        order_date: '2024-12-18T18:00:00Z',
        total_amount: 1250.00,
        amount_paid: 1250.00,
        status: 'Completed',
        order_items: [
            {
                menu_id: 12,
                quantity: 10,
                price: '125.00'
            }
        ]
    },
    {
        order_id: 48,
        branch_id: 1,
        table_id: 6,
        customer_id: 102,
        employee_id: 201,
        order_date: '2024-12-18T17:00:00Z',
        total_amount: 150.00,
        amount_paid: 149.00,
        status: 'Completed',
        order_items: [
            {
                menu_id: 12,
                quantity: 10,
                price: '15.00'
            }
        ]
    },
];

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

    const [filteredRows, setFilteredRows] = useState(invoiceRows);

    const handleSearchChange = (value: string) => {
        setFilters((prev) => ({ ...prev, search: value }));
    };

    const handleAccordionFilterChange = (accordionFilters: Record<string, string[]>) => {
        setFilters((prev) => ({ ...prev, accordion: accordionFilters }));
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

    return (
        <Grid2 container spacing={2} sx={{height: '100vh', padding: '1rem'}}>
            <Grid2>
                <Paper elevation={3} sx={{height: '100%'}}>
                    <SidebarFilter
                        title="Tìm kiếm"
                        searchPlaceholder="Theo mã, tên hàng"
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
                            text="Khách hàng"
                            DialogComponent={({open, onClose}) => (
                                <AddInvoiceDialog
                                    open={open}
                                    onClose={onClose}
                                    onSave={() => console.log("Saved data:")}
                                />
                            )}
                        />
                        <CustomTable
                            rows={filteredRows}
                            columns={invoiceColumns}
                            // Khi expand row, ta truyền dữ liệu vào InvoiceDetailsCollapse
                            renderCollapse={(row) => (
                                <InvoiceDetailsCollapse
                                    order_id={row.order_id}
                                    branch_id={row.branch_id}
                                    table_id={row.table_id}
                                    customer_id={row.customer_id}
                                    employee_id={row.employee_id}
                                    order_date={row.order_date}
                                    total_amount={row.total_amount}
                                    amount_paid={row.amount_paid}
                                    status={row.status}
                                    order_items={row.order_items}
                                />
                            )}
                        />
                    </Box>
                </Paper>
            </Grid2>
        </Grid2>
    );
};

export default InvoicesPage;
