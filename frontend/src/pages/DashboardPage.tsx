// src/pages/DashboardPage.tsx
import React from 'react';
import { Box, Grid2, Typography, Card, CardContent } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const DashboardPage: React.FC = () => {
    const data = {
        labels: ['01', '02', '03', '04', '05', '06', '07'],
        datasets: [
            {
                label: 'Chi nhánh trung tâm',
                data: [100000, 200000, 50000, 300000, 600000, 800000, 400000],
                backgroundColor: '#3f51b5',
            },
        ],
    };

    const topProductsData = {
        labels: [
            'Súp kem gà nữ hoàng',
            'Đĩa thịt người Tây Ba Nha',
            'Súp kem kiểu Paris',
            'Thịt người & phomai viên',
            'Súp kem bí đỏ với sữa dừa',
            'Thuốc lá Vinataba',
            'MILANO',
            'Lemon Tea',
            'Lemon Juice',
        ],
        datasets: [
            {
                label: 'Doanh thu',
                data: [3200000, 3100000, 3000000, 2900000, 2700000, 1200000, 800000, 600000, 400000],
                backgroundColor: '#3f51b5',
            },
        ],
    };

    return (
        <Box p={3}>
            <Grid2 container spacing={3}>
                {/* Sales Results Today */}
                <Grid2>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Kết quả bán hàng hôm nay</Typography>
                            <Box display="flex" justifyContent="space-between" mt={2}>
                                <Typography>Đơn đã xong: 0</Typography>
                                <Typography>Đơn đang phục vụ: 0</Typography>
                                <Typography>Khách hàng: 0</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid2>

                {/* Revenue Chart */}
                <Grid2>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Doanh số tháng này</Typography>
                            <Bar data={data} />
                        </CardContent>
                    </Card>
                </Grid2>

                {/* Today's Customer Count */}
                <Grid2>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Số lượng khách hôm nay</Typography>
                            <Typography variant="h4" color="textSecondary">0</Typography>
                        </CardContent>
                    </Card>
                </Grid2>

                {/* Top 10 Products */}
                <Grid2>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Top 10 hàng hóa bán chạy 7 ngày qua</Typography>
                            <Bar data={topProductsData} options={{ indexAxis: 'y' }} />
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>
        </Box>
    );};

export default DashboardPage;
