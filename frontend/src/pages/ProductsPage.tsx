import { useEffect, useState } from "react";
import {
    Grid2,
    Paper,
    Box,
    Alert, Snackbar
} from "@mui/material";
import SidebarFilter from "@/components/SidebarFilter.tsx";
import HeaderActions from "@/components/HeaderAction.tsx";
import AddProductDialog from "@/components/dialogs/AddProductDialog.tsx";
import CustomTable from "../components/CustomTable.tsx";
import ProductDetailsCollapse from "@/components/ProductDetailsCollapse.tsx";
import axios from "axios";

const productColumns = [
    { field: 'id', headerName: 'Mã hàng hóa', width: 150 },
    { field: 'name', headerName: 'Tên hàng', flexGrow: 1 },
    { field: 'item_type', headerName: 'Loại thực đơn', width: 150 },
    { field: 'price', headerName: 'Giá bán', width: 120 },
    { field: 'stock', headerName: 'Tồn kho', width: 120 },
];
type FiltersState = {
    search: string;
    accordion: Record<string, string[]>; // Explicitly type accordion as a record
    selectedTypes: string[]; // Ensure selectedTypes is string[]
};

export type ProductRow = {
    id: string;
    name: string;
    item_type: string;
    price: string;
    stock: string;
    branch_id: number;
    description: string;
    sale_price: number;
    cost_price: number;
    item_group: string;
    availability?: boolean;
    image?: string;
};

const ProductsPage = () => {
    const [filters, setFilters] = useState<FiltersState>({
        search: "",
        accordion: {},
        selectedTypes: [],
    });

    const [allRows, setAllRows] = useState<ProductRow[]>([]);
    const [filteredRows, setFilteredRows] = useState<ProductRow[]>([]);
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const [_loading, setLoading] = useState(false);
    const [_error, setError] = useState<string | null>(null);
    const [notification, setNotification] = useState<{type: string, message: string} | null>(null); // State for notifications
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        type: "success" | "error" | "warning" | "info";
        message: string;
    }>({
        open: false,
        type: "success", // Default value
        message: "",
    });

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/api/menus");
            const products = response.data.map((product: any) => ({
                id: product.menu_id,
                name: product.name,
                item_type: product.item_type,
                price: product.sale_price.toString(),
                stock: product.stock?.toString() || "N/A",
                branch_id: product.branch_id || 0,
                description: product.description || "No description available",
                sale_price: parseFloat(product.sale_price) || 0,
                cost_price: parseFloat(product.cost_price) || 0,
                item_group: product.item_group || "Unknown",
                availability: product.availability !== undefined ? Boolean(product.availability) : true,
                image: product.image || "https://via.placeholder.com/150",
            }));

            setAllRows(products);
        } catch (err) {
            setError("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (updatedRow: Partial<ProductRow>) => {
        try {
            await axios.put(`http://localhost:3000/api/menus/${updatedRow.id}`, updatedRow);
            await fetchProducts(); // Refresh table data
            setSnackbar({ open: true, type: "success", message: "Updated successfully!" });
        } catch (error) {
            console.error("Failed to update product:", error);
            setSnackbar({ open: true, type: "error", message: "Failed to update product." });
        }
    };

    const handleDeleteSelectedRows = async () => {
        try {
            console.log(selectedRows)
            for (const id of selectedRows) {
                console.log("id: ", allRows[id].id)
                await axios.delete(`http://localhost:3000/api/menus/${allRows[id].id}`);
            }
            await fetchProducts();
            setSelectedRows(new Set());
            setSnackbar({ open: true, type: "success", message: "Deleted successfully!" }); // Success Snackbar
            console.log("Deleting Product successfully");
        } catch (err) {
            setError("Failed to delete selected products");
            setSnackbar({ open: true, type: "error", message: "Failed to delete items." }); // Error Snackbar
        }
    };


    useEffect(() => {
        fetchProducts();
    }, []);

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false }); // Close the Snackbar
    };

    useEffect(() => {
        let filtered = allRows;

        if (filters.search) {
            filtered = filtered.filter((row) =>
                Object.values(row).some((val) =>
                    val.toString().toLowerCase().includes(filters.search.toLowerCase())
                )
            );
        }

        if (filters.selectedTypes.length > 0) {
            filtered = filtered.filter((row) => filters.selectedTypes.includes(row.item_type as never));
        }

        setFilteredRows(filtered);
    }, [filters, allRows]);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 3000); // Auto-hide notification after 3 seconds
            return () => clearTimeout(timer); // Cleanup timeout
        }
    }, [notification]);

    const handleAccordionFilterChange = (filters: Record<string, string[]>) => {
        const selectedTypes = filters['Loại thực đơn'] || [];
        setFilters((prev) => ({
            ...prev,
            accordion: filters, // Update accordion
            selectedTypes, // Update selectedTypes
        }));    };

    return (
        <Grid2 container spacing={2} sx={{ height: '100vh', padding: '1rem' }}>
            <Grid2>
                <Paper elevation={3} sx={{ height: '100%' }}>
                    <SidebarFilter
                        title="Tìm kiếm"
                        searchPlaceholder="Theo mã, tên hàng"
                        accordionData={[
                            { title: "Loại thực đơn", items: [{ label: "Đồ ăn" }, { label: "Đồ uống" }, { label: "Khác" }] },
                            { title: "Loại hàng", items: [{ label: "Hàng hóa thường" }, { label: "Chế biến" }, { label: "Dịch vụ" }, { label: "Combo - Đóng gói" }] },
                        ]}
                        onSearchChange={(value) => setFilters((prev) => ({ ...prev, search: value }))}
                        onAccordionFilterChange={handleAccordionFilterChange}
                    />
                </Paper>
            </Grid2>

            <Grid2 sx={{ display: 'flex', flexDirection: 'column' }} size="grow">
                <Paper elevation={3} sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ padding: '2rem', flex: 1, overflow: 'auto' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '1rem',
                            }}
                        >
                            <HeaderActions
                                text="Khách hàng"
                                DialogComponent={({ open, onClose }) => (
                                    <AddProductDialog open={open} onClose={onClose} onSave={fetchProducts} />
                                )}
                                selectedNum={selectedRows.size}
                                onDelete={handleDeleteSelectedRows}
                            />
                        </Box>
                        <CustomTable
                            rows={filteredRows}
                            columns={productColumns}
                            renderCollapse={(row) => <ProductDetailsCollapse
                                row={row}
                                onUpdate={handleUpdate} // Pass update handler
                            />}
                            onRowSelectionChange={(ids) => setSelectedRows(new Set(ids))}
                        />
                    </Box>
                </Paper>
            </Grid2>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000} // Auto-hide after 3 seconds
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                sx={{
                    '& .MuiSnackbarContent-root': {
                        minWidth: '400px', // Adjust width
                        fontSize: '0.8rem', // Adjust font size
                        padding: '0.8rem', // Add padding
                    },
                }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.type} // 'success' or 'error'
                    sx={{
                        width: '100%',
                        fontSize: '1rem', // Make text larger
                        padding: '1rem', // Add padding to the Alert
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

        </Grid2>
    );
};

export default ProductsPage;
