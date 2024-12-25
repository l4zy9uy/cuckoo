// src/pages/DashboardPage.tsx
import React, {useState, useMemo} from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid2,
    MenuItem, Select, FormControl,
} from '@mui/material';
import {DonutLarge, TrendingUp} from '@mui/icons-material';
import {BarChart} from '@mui/x-charts/BarChart'
import {salesData, baseTopPerformers, allSalesData, allTopPerformers} from "@/components/fakeData.ts";
import {useBranchContext} from "@/context/BranchContext.tsx";
const DashboardPage: React.FC = () => {
    const [mode, setMode] = useState<'daily' | 'weekly' | 'monthly'>('daily');
    const [mode2, setMode2] = useState<'daily' | 'weekly' | 'monthly'>('daily');

    const generateSalesData = (baseData: any, mode: any) => {
        const modifier = mode === 'daily' ? 30 : mode === 'weekly' ? 7 : 1;
        return baseData.map((perf: any) => ({
            ...perf,
            sales: Math.floor(perf.sales / modifier) + Math.floor(Math.random() * 500),
        }));
    };
    const { branchIndex } = useBranchContext();

    const currentSalesData = allSalesData[branchIndex];

    const currentTopPerformers = allTopPerformers[branchIndex];

    const topPerformers = generateSalesData(currentTopPerformers.topPerformers, mode2);
    const currentData = salesData[mode];
    const totalSales = useMemo(() => currentData.reduce((acc, curr) => acc + curr.sales, 0), [mode]);
    const averageSales = useMemo(() => totalSales / currentData.length, [totalSales, currentData.length]);
    const maxSale = useMemo(() => Math.max(...currentData.map(s => s.sales)), [mode]);

    const statsData = [
        { label: `${totalSales.toLocaleString()} Sản phẩm`, description: "Tổng doanh thu", icon: <TrendingUp color="success" /> },
        { label: `${averageSales.toFixed(0)} Sản phẩm`, description: "Doanh thu trung bình", icon: <DonutLarge color="primary" /> },
        { label: `${maxSale} Sản phẩm`, description: "Doanh thu cao nhất", icon: <TrendingUp color="success" /> },
    ];



    return (
        <Box sx={{padding: 3, backgroundColor: '#f9fafc'}}>
            <Grid2 container spacing={2} sx={{marginBottom: 3}}>
                {/* Top Stat Cards */}
                {statsData.map((stat, index) => (
                    <Grid2 container size={{xs: 4}} key={index}>
                        <Card sx={{width: '100%'}}>
                            <CardContent sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <Box>
                                    <Typography
                                        variant="h4">{stat.label}</Typography>
                                    <Typography variant="caption"
                                                color="textSecondary">{stat.description}</Typography>
                                </Box>
                                {stat.icon}
                            </CardContent>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>

            {/* Sales vs Target Line Chart */}
            <Grid2 container size={{xs: 12, md: 8}} sx={{marginBottom: 3}}>
                <Card sx={{height: 550, width: '100%'}}>
                    <CardContent>
                        <Box flexDirection="row" display="flex"
                             justifyContent="space-between" height={50}
                             alignItems="center">
                            <Typography variant="h6">
                                Dữ liệu bán hàng
                                ({mode.charAt(0).toUpperCase() + mode.slice(1)} Mode)
                            </Typography>
                            <FormControl
                                sx={{
                                    width: 120,
                                    alignItems: 'center',
                                }}>
                                <Select
                                    sx={{
                                        width: '100%',
                                        '& .MuiOutlinedInput-notchedOutline': { // Target the border
                                            border: 'none',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': { // Remove border on hover
                                            border: 'none',
                                        },
                                        '& .MuiOutlinedInput-root': { // Remove background and elevation
                                            boxShadow: 'none',
                                        },
                                        color: "#3c52b2"
                                    }}
                                    labelId="sales-mode-label"
                                    value={mode}
                                    onChange={(e) => setMode(e.target.value as 'daily' | 'weekly' | 'monthly')}
                                >
                                    <MenuItem value="daily">Hằng ngày</MenuItem>
                                    <MenuItem value="weekly">Hằng tuần</MenuItem>
                                    <MenuItem value="monthly">Hằng tháng</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{height: '100%', width: '100%'}}>
                        </Box>
                        <BarChart
                            xAxis={[
                                {
                                    scaleType: 'band',
                                    dataKey: 'label', // Maps the 'time' field to the x-axis
                                    tickLabelStyle: {
                                        fontSize: 16
                                    }
                                },
                            ]}
                            series={[
                                {
                                    dataKey: 'sales', // Maps the 'sales' field to the y-axis
                                    color: '#8884d9', // Bar color
                                },
                            ]}
                            dataset={currentSalesData[mode]}
                            height={450}
                        />
                    </CardContent>
                </Card>
            </Grid2>

            {/* Top Performance */}
            <Grid2 container size={{xs: 12, md: 4}}>
                <Card sx={{height: 550, width: '100%'}}>
                    <CardContent>
                        <Box flexDirection="row" display="flex"
                             justifyContent="space-between" height={50}
                             alignItems="center">
                            <Typography variant="h6">
                                Doanh so nhan vien
                                ({mode2.charAt(0).toUpperCase() + mode2.slice(1)} Mode)
                            </Typography>
                            <FormControl
                                sx={{
                                    width: 120,
                                    alignItems: 'center',
                                }}>
                                <Select
                                    sx={{
                                        width: '100%',
                                        '& .MuiOutlinedInput-notchedOutline': { // Target the border
                                            border: 'none',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': { // Remove border on hover
                                            border: 'none',
                                        },
                                        '& .MuiOutlinedInput-root': { // Remove background and elevation
                                            boxShadow: 'none',
                                        },
                                        color: "#3c52b2"
                                    }}
                                    labelId="sales-mode-label"
                                    value={mode2}
                                    onChange={(e) => setMode2(e.target.value as 'daily' | 'weekly' | 'monthly')}
                                >
                                    <MenuItem value="daily">Hằng ngày</MenuItem>
                                    <MenuItem value="weekly">Hằng tuần</MenuItem>
                                    <MenuItem value="monthly">Hằng tháng</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <BarChart
                            margin={{
                                left: 200
                            }}
                            xAxis={[
                                {
                                    scaleType: "linear",
                                    dataKey: "sales",
                                    label: "Sales",
                                },
                            ]}
                            yAxis={[
                                {
                                    scaleType: "band",
                                    dataKey: "employee",
                                },
                            ]}
                            layout="horizontal" // Makes the bar chart horizontal
                            series={[
                                {
                                    dataKey: "sales",
                                    color: "#4caf50", // Customize bar color
                                },
                            ]}
                            dataset={topPerformers}
                            height={400}
                        />
                    </CardContent>
                </Card>
            </Grid2>
        </Box>
    );
};

export default DashboardPage;
