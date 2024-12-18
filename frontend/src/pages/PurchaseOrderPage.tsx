// src/pages/ImportOrdersPage.tsx
import { useEffect, useState } from "react";
import { Paper, Box } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import CustomTable from "@/components/CustomTable.tsx";
import SidebarFilter from "@/components/SidebarFilter.tsx";
import HeaderActions from "@/components/HeaderAction.tsx";
import AddImportDialog from "@/components/dialogs/AddImportDialog.tsx";
import ImportOrderDetailsCollapse from "@/components/ImpmortOrderDetailsCollapse.tsx";

// Table Columns
const importOrderColumns = [
    { field: "id", headerName: "Mã nhập hàng", width: 150 },
    { field: "time", headerName: "Thời gian", width: 200 },
    { field: "supplier", headerName: "Nhà cung cấp", flexGrow: 1 },
    { field: "totalAmount", headerName: "Cần trả NCC", width: 150 },
    { field: "status", headerName: "Trạng thái", width: 150 },
];

// Table Rows
const importOrderRows = [
    {
        id: "PN000048",
        time: "18/12/2024 00:00",
        supplier: "Đại lý Hồng Phúc",
        totalAmount: "143,500",
        status: "Đã nhập hàng",
        items: [
            { name: "Bánh mì", quantity: 50, price: 2000, total: 100000 },
            { name: "Sữa hộp", quantity: 30, price: 30000, total: 900000 },
        ],
    },
    {
        id: "PN000049",
        time: "18/12/2024 00:00",
        supplier: "Đại lý Hồng Phúc",
        totalAmount: "1,206,000",
        status: "Đã nhập hàng",
        items: [
            { name: "Sữa chua", quantity: 40, price: 15000, total: 600000 },
            { name: "Nước suối", quantity: 100, price: 2000, total: 200000 },
        ],
    },
    {
        id: "PN000050",
        time: "18/12/2024 00:00",
        supplier: "Cửa hàng Đại Việt",
        totalAmount: "105,000",
        status: "Đã nhập hàng",
        items: [
            { name: "Mì gói", quantity: 20, price: 5000, total: 100000 },
        ],
    },
];

type Filters = {
    search: string;
    status: string[];
};

const ImportOrdersPage = () => {
    const [filters, setFilters] = useState<Filters>({
        search: "",
        status: [],
    });
    const [filteredRows, setFilteredRows] = useState(importOrderRows);

    // Handle search filter
    const handleSearchChange = (value: string) => {
        setFilters((prev) => ({ ...prev, search: value }));
    };

    useEffect(() => {
        const { search } = filters;
        let filtered = importOrderRows;

        // Apply search filter
        if (search) {
            filtered = filtered.filter((row) =>
                Object.values(row).some((val) =>
                    val.toString().toLowerCase().includes(search.toLowerCase())
                )
            );
        }
        setFilteredRows(filtered);
    }, [filters]);

    return (
        <Grid2 container spacing={2} sx={{ height: "100vh", padding: "1rem" }}>
            {/* Sidebar */}
            <Grid2>
                <Paper elevation={3} sx={{ height: "100%" }}>
                    <SidebarFilter
                        title="Tìm kiếm"
                        searchPlaceholder="Theo mã phiếu nhập"
                        onSearchChange={handleSearchChange}
                    />
                </Paper>
            </Grid2>

            {/* Main Content */}
            <Grid2 sx={{ display: "flex", flexDirection: "column" }} flexGrow={1}>
                <Paper elevation={3} sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Box sx={{ padding: "2rem", flex: 1, overflow: "auto" }}>
                        <HeaderActions
                            text="Phiếu nhập hàng"
                            DialogComponent={({ open, onClose }) => (
                                <AddImportDialog open={open} onClose={onClose} onSave={() => console.log("Saved data")} />
                            )}
                        />
                        <CustomTable
                            rows={filteredRows}
                            columns={importOrderColumns}
                            renderCollapse={(row) => (
                                <ImportOrderDetailsCollapse
                                    importCode={row.id}
                                    importDate={row.time}
                                    supplier={row.supplier}
                                    status={row.status}
                                    totalAmount={row.totalAmount}
                                    items={row.items}
                                />
                            )}
                        />
                    </Box>
                </Paper>
            </Grid2>
        </Grid2>
    );
};

export default ImportOrdersPage;
