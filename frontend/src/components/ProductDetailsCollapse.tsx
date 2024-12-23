import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductRow } from "@/pages/ProductsPage.tsx";

type ProductDetailsCollapseProps = {
    row: Partial<ProductRow> | Record<string, any>; // Accept broader type
    onUpdate: (updatedRow: Partial<ProductRow>) => Promise<void>; // Callback for update
};

const ProductDetailsCollapse: React.FC<ProductDetailsCollapseProps> = ({ row, onUpdate }) => {
    const [editableData, setEditableData] = useState<Partial<ProductRow>>({ ...row }); // Local state for editing
    const [loading, setLoading] = useState(false); // State for update button

    const handleInputChange = (field: string, value: any) => {
        setEditableData((prev) => ({ ...prev, [field]: value }));
    };

    const handleUpdateClick = async () => {
        try {
            setLoading(true);
            await onUpdate(editableData);
        } catch (error) {
            console.error("Failed to update data:", error);
        } finally {
            setLoading(false);
        }
    };

    const imageUrl = editableData.image || "https://via.placeholder.com/150";
    const productName = editableData.name || "Product Name";

    return (
        <Box>
            <Box
                sx={{
                    padding: 3,
                    backgroundColor: 'background.paper',
                    borderRadius: 2,
                    marginTop: 2,
                    boxShadow: 1,
                }}
            >
                <Grid2 container spacing={3}>
                    {/* Left Section - Image and Name */}
                    <Grid2
                        size={{ xs: 12, md: 3 }}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            {productName}
                        </Typography>
                        <Box
                            component="img"
                            src={imageUrl}
                            alt={productName}
                            sx={{
                                width: '100%',
                                height: 'auto',
                                mt: 2,
                                borderRadius: 2,
                                boxShadow: 1,
                                border: '1px solid',
                                borderColor: 'divider',
                            }}
                        />
                    </Grid2>

                    {/* Right Section - Editable Details */}
                    <Grid2 size={{ xs: 12, md: 9 }}>
                        <Grid2 container spacing={2}>
                            {Object.keys(editableData).map((key, index) => (
                                <Grid2 size={{ xs: 12, sm: 6 }} key={index}>
                                    <Typography
                                        variant="subtitle2"
                                        color="text.secondary"
                                        sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}
                                    >
                                        {key.replace(/_/g, ' ').toUpperCase()}:
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        value={editableData[key as keyof ProductRow] ?? ""}
                                        onChange={(e) => handleInputChange(key, e.target.value)}
                                        variant="outlined"
                                    />
                                </Grid2>
                            ))}
                        </Grid2>
                    </Grid2>
                </Grid2>

                {/* Action Buttons */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        mt: 3,
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<CheckIcon />}
                        onClick={handleUpdateClick}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Cập nhật"}
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                    >
                        Xóa
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductDetailsCollapse;
