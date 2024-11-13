// src/components/ProductDetailsCollapse.tsx
import React from 'react';
import {
    Box,
    Tabs,
    Tab,
    Typography,
    Button,
    SxProps,
} from '@mui/material';
import Grid2 from '@mui/material/Grid2'; // Use Grid2 for flex layout and spacing
import CheckIcon from "@mui/icons-material/Check";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";

type DetailItem = {
    label: string;
    value: string | React.ReactNode;
    sx?: SxProps; // Style for customization
};

type ProductDetailsCollapseProps = {
    details: DetailItem[];
    tabs?: string[]; // Optional tabs array
    imageUrl?: string;
    productName?: string;
    statusIcons?: { label: string; color: string; icon: React.ReactNode }[];
};

const ProductDetailsCollapse: React.FC<ProductDetailsCollapseProps> = ({
                                                                           details,
                                                                           tabs = ["Thông tin", "Thẻ kho", "Tồn kho", "Món thêm"],
                                                                           imageUrl = "https://via.placeholder.com/150",
                                                                           productName = "Product Name",
                                                                           statusIcons = [
                                                                               { label: "Bán trực tiếp", color: "green", icon: <CheckIcon fontSize="small" /> },
                                                                               { label: "Không tích điểm", color: "red", icon: <CheckIcon fontSize="small" /> },
                                                                               { label: "Không là món thêm", color: "red", icon: <CheckIcon fontSize="small" /> },
                                                                           ],
                                                                       }) => {
    return (
        <Box>
            {/* Tabs for sections */}
            <Tabs
                variant="scrollable"
                scrollButtons="auto"
                sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
                {tabs.map((tab, index) => (
                    <Tab label={tab} key={index} />
                ))}
            </Tabs>

            <Box sx={{ padding: 3, backgroundColor: 'background.paper', borderRadius: 2, marginTop: 2, boxShadow: 1 }}>
                <Grid2 container spacing={3}>
                    {/* Left Section - Image and Status */}
                    <Grid2 size={{ xs: 12, md: 3}} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>{productName}</Typography>
                        {statusIcons.map((status, index) => (
                            <Typography
                                key={index}
                                color={status.color}
                                display="flex"
                                alignItems="center"
                                sx={{ mb: 1 }}
                            >
                                {status.icon} {status.label}
                            </Typography>
                        ))}
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

                    {/* Right Section - Customizable Details */}
                    <Grid2 size={{xs: 12, md: 9}}>
                        <Grid2 container spacing={2}>
                            {details.map((detail, index) => (
                                <Grid2 size={{xs: 12, sm: 6}} key={index} sx={detail.sx}>
                                    <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                        {detail.label}:
                                    </Typography>
                                    <Typography variant="body1">{detail.value}</Typography>
                                </Grid2>
                            ))}
                        </Grid2>
                    </Grid2>
                </Grid2>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" startIcon={<CheckIcon />}>
                        Cập nhật
                    </Button>
                    <Button variant="outlined" color="secondary" startIcon={<PrintIcon />}>
                        In mã vạch
                    </Button>
                    <Button variant="contained" color="success" startIcon={<CheckIcon />}>
                        Trạng thái kinh doanh
                    </Button>
                    <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
                        Xóa
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductDetailsCollapse;
