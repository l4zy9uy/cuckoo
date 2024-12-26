// src/pages/TablesPage.tsx

import {Alert, Grid2, Paper, Snackbar} from "@mui/material";
import SidebarFilter from "@/components/SidebarFilter.tsx";
import Box from "@mui/material/Box";
import HeaderActions from "@/components/HeaderAction.tsx";
import CustomTable from "@/components/CustomTable.tsx";
import {useEffect, useState} from "react";
import AddTableDialog from "@/components/dialogs/AddTableDialog.tsx";

const tableColumns = [
    {field: 'name', headerName: 'Tên phong/ban', width: 350},
    {field: 'description', headerName: 'Ghi chu', flexGrow: 1},
    {field: 'numPerson', headerName: 'So nguoi', width: 350},
    {field: 'status', headerName: 'Trang thai', width: 320},
    {field: 'order', headerName: 'So thu tu', width: 150},
];

// @ts-ignore
const initialTableRows = Array.from({ length: 30 }, (_, i) => {
    const isRoom = Math.random() < 0.5;
    const statuses = ["Ngừng hoạt động", "Đang hoạt động"];

    return {
        id: i + 1,
        name: isRoom
            ? `Phòng ${Math.floor(101 + Math.random() * 400)}`
            : `Bàn ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(1 + Math.random() * 10)}`,
        description: isRoom
            ? `Phòng họp với sức chứa ${Math.floor(5 + Math.random() * 50)} người.`
            : `Bàn tại vị trí ${Math.random() < 0.5 ? "gần cửa sổ" : "gần quầy bar"}.`,
        numPerson: Math.floor(2 + Math.random() * 50),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        order: i + 1,
    };
});


const TablesPage = () => {
    // @ts-ignore
    const [tableRows, setTableRows] = useState(initialTableRows); // State for all rows
    const [filteredRows, setFilteredRows] = useState(initialTableRows); // Rows displayed in the table
    const [statusFilter, setStatusFilter] = useState("all"); // Selected status filter
    const [_isDialogOpen, setIsDialogOpen] = useState(false); // Dialog visibility
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const [snackbar, setSnackbar] = useState({ open: false, type: "success", message: "" });

    const handleStatusChange = (value: string) => {
        setStatusFilter(value);
    };


    const handleAddTable = (newTable: any) => {
        const newTableRow = {
            id: tableRows.length + 1, // Generate a new ID
            name: newTable.name,
            description: newTable.description || "",
            numPerson: parseInt(newTable.numPerson, 10),
            status: newTable.status || "Đang hoạt động",
            order: parseInt(newTable.order, 10),
        };

        setTableRows((prevRows) => [...prevRows, newTableRow]);

        // Immediately update filteredRows based on the current filter
        if (
            statusFilter === "all" ||
            (statusFilter === "active" && newTableRow.status === "Đang hoạt động") ||
            (statusFilter === "inactive" && newTableRow.status === "Ngừng hoạt động")
        ) {
            setFilteredRows((prevRows) => [...prevRows, newTableRow]);
        }

        setIsDialogOpen(false); // Close dialog after saving
    };

    const handleDeleteSelectedRows = () => {
        const selectedIndices = Array.from(selectedRows); // Get indices as an array
        const remainingRows = tableRows.filter((_, index) => !selectedIndices.includes(index)); // Filter by index
        setTableRows(remainingRows);

        // Update filtered rows based on the current status filter
        const updatedFilteredRows = remainingRows.filter((row) => {
            if (statusFilter === "all") return true;
            if (statusFilter === "active") return row.status === "Đang hoạt động";
            if (statusFilter === "inactive") return row.status === "Ngừng hoạt động";
            return false;
        });
        setFilteredRows(updatedFilteredRows);

        console.log("Selected Indices:", selectedIndices);
        console.log("Remaining Rows:", remainingRows);

        // Clear the selected rows and show success message
        setSelectedRows(new Set());
        setSnackbar({ open: true, type: "success", message: "Deleted successfully!" });
    };





    // Update filteredRows based on statusFilter
    useEffect(() => {
        if (statusFilter === "all") {
            setFilteredRows(initialTableRows);
        } else if (statusFilter === "active") {
            setFilteredRows(initialTableRows.filter((row) => row.status === "Đang hoạt động"));
        } else if (statusFilter === "inactive") {
            setFilteredRows(initialTableRows.filter((row) => row.status === "Ngừng hoạt động"));
        }
    }, [statusFilter]);

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
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
                            DialogComponent={({ open, onClose }) => (
                                <AddTableDialog open={open} onClose={onClose} onSave={handleAddTable} />
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

export default TablesPage;
