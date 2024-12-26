// src/pages/ImportOrdersPage.tsx
import { useEffect, useState } from "react";
import { Paper, Box } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import CustomTable from "@/components/CustomTable.tsx";
import SidebarFilter from "@/components/SidebarFilter.tsx";
import HeaderActions from "@/components/HeaderAction.tsx";
import AddImportDialog from "@/components/dialogs/AddImportDialog.tsx";
import ImportOrderDetailsCollapse from "@/components/ImpmortOrderDetailsCollapse.tsx";
import { fakerVI as faker } from '@faker-js/faker';

// Table Columns
const importOrderColumns = [
    { field: "id", headerName: "Mã nhập hàng", width: 150 },
    { field: "time", headerName: "Thời gian", width: 200 },
    { field: "supplier", headerName: "Nhà cung cấp", flexGrow: 1 },
    { field: "totalAmount", headerName: "Cần trả NCC", width: 150 },
    { field: "status", headerName: "Trạng thái", width: 150 },
];

// Table Rows
const generateImportOrderRows = (count: number) => {
    const suppliers = ["Đại lý Hồng Phúc", "Cửa hàng Đại Việt", "Siêu thị Minh Tâm", "Đại lý An Khánh", "Kho Phân phối Sài Gòn"];
    const statuses = ["Đã nhập hàng", "Đang chờ xử lý", "Đã hủy"];
    const vietnameseProductNames = [
        "Bánh mì", "Sữa hộp", "Sữa chua", "Nước ngọt", "Mì gói",
        "Cà phê", "Trà xanh", "Nước khoáng", "Gạo thơm", "Dầu ăn",
        "Đường", "Muối", "Bột giặt", "Kem đánh răng", "Dầu gội",
        "Nước mắm", "Tương ớt", "Tương cà", "Snack khoai tây", "Phô mai",
        "Chả giò", "Nem nướng", "Bánh xèo", "Bánh tráng", "Thịt heo",
        "Thịt bò", "Gà rán", "Cá hồi", "Tôm sú", "Cua biển"
    ];

    return Array.from({ length: count }, (_) => {
        const numItems = faker.number.int({ min: 1, max: 5 });
        const items = Array.from({ length: numItems }, () => {
            const quantity = faker.number.int({ min: 10, max: 100 });
            const price = faker.number.int({ min: 2000, max: 50000 });
            return {
                name: faker.helpers.arrayElement(vietnameseProductNames),
                quantity,
                price,
                total: quantity * price,
            };
        });

        const totalAmount = items.reduce((acc, item) => acc + item.total, 0);

        return {
            id: `PN${faker.number.int({ min: 100000, max: 999999 })}`,
            time: faker.date
                .future()
                .toLocaleString("vi-VN", { hour12: false }),
            supplier: faker.helpers.arrayElement(suppliers),
            totalAmount: totalAmount.toLocaleString("vi-VN"),
            status: faker.helpers.arrayElement(statuses),
            items,
        };
    });
};

const importOrderRows = generateImportOrderRows(30);


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
