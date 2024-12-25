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
    { field: 'customer_name', headerName: 'Khách hàng', width: 200 },
    { field: 'total_price', headerName: 'Tổng tiền hàng', width: 150 },
    { field: 'createdAt', headerName: 'Thoi gian', width: 150 },
    { field: 'status', headerName: 'Trang thai', flexGrow: 1 },
];

// Dữ liệu giả lập
const invoiceRows = [
    {
        order_id: 1,
        branch_id: 101,
        table_id: 12,
        customer_name: 'Nguyen Van A',
        staff_id: 7,
        total_price: 250.75,
        status: "Đã thanh toán",
        payment_method: "Thẻ tín dụng",
        createdAt: "20-7 10:30",
        updatedAt: "2024-12-24T11:00:00.000Z",
        order_items: [
            { menu_id: 1, quantity: 2, price: "50.00" },
            { menu_id: 2, quantity: 1, price: "150.75" }
        ]
    },
    {
        order_id: 2,
        branch_id: 102,
        table_id: 14,
        customer_name: 'Nguyen Van A',
        staff_id: 9,
        total_price: 450.00,
        status: "Chưa thanh toán",
        payment_method: "Tiền mặt",
        createdAt: "2024-12-23T08:45:00.000Z",
        updatedAt: "2024-12-23T09:15:00.000Z",
        order_items: [
            { menu_id: 3, quantity: 3, price: "150.00" },
            { menu_id: 4, quantity: 2, price: "300.00" }
        ]
    },
    {
        order_id: 3,
        branch_id: 103,
        table_id: null,
        customer_name: 'Nguyen Van A',
        staff_id: 5,
        total_price: 150.50,
        status: "Chưa thanh toán",
        payment_method: "Ví điện tử",
        createdAt: "2024-12-22T14:20:00.000Z",
        updatedAt: "2024-12-22T15:00:00.000Z",
        order_items: [
            { menu_id: 5, quantity: 1, price: "100.50" }
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

    const [invoices, setInvoices] = useState(invoiceRows);

    const handleUpdateInvoice = (updatedInvoice: any) => {
        setInvoices(prevInvoices => prevInvoices.map(inv => inv.order_id === updatedInvoice.order_id ? updatedInvoice : inv));
    };

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
        </Grid2>
    );
};

export default InvoicesPage;
