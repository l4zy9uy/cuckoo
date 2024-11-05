// src/components/ProductDetailsCollapse.tsx
import React from 'react';
import {
    Box,
    Tabs,
    Tab,
    Typography,
    Grid2,
    Button,
    SxProps,
} from '@mui/material';
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
            <Tabs variant="scrollable" scrollButtons="auto">
                {tabs.map((tab, index) => (
                    <Tab label={tab} key={index} />
                ))}
            </Tabs>

            <Box sx={{ padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '8px', marginTop: '1rem' }}>
                <Grid2 container spacing={3}>
                    {/* Left Section - Image and Status */}
                    <Grid2 display="flex" flexDirection="column" alignItems="center">
                        <Typography variant="h5" fontWeight="bold" gutterBottom>{productName}</Typography>
                        {statusIcons.map((status, index) => (
                            <Typography
                                key={index}
                                color={status.color}
                                display="flex"
                                alignItems="center"
                                sx={{ marginBottom: 1 }}
                            >
                                {status.icon} {status.label}
                            </Typography>
                        ))}
                        <Box
                            component="img"
                            src={imageUrl}
                            alt={productName}
                            sx={{ width: '100%', height: 'auto', marginTop: '1rem', borderRadius: '4px' }}
                        />
                    </Grid2>

                    {/* Right Section - Customizable Details */}
                    <Grid2>
                        <Grid2 container spacing={2}>
                            {details.map((detail, index) => (
                                <Grid2 key={index} sx={detail.sx}>
                                    <Typography fontWeight="bold">{detail.label}:</Typography>
                                    <Typography>{detail.value}</Typography>
                                </Grid2>
                            ))}
                        </Grid2>
                    </Grid2>
                </Grid2>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 2, marginTop: '1rem', justifyContent: 'center' }}>
                    <Button variant="contained" color="success" startIcon={<CheckIcon />}>Cập nhật</Button>
                    <Button variant="outlined" startIcon={<PrintIcon />}>In mã vạch</Button>
                    <Button variant="contained" color="primary" startIcon={<CheckIcon />}>Trạng thái kinh doanh</Button>
                    <Button variant="contained" color="error" startIcon={<DeleteIcon />}>Xóa</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductDetailsCollapse;
