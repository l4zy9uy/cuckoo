// src/pages/DashboardPage.tsx
import React, {useState} from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid2,
    MenuItem, Select, FormControl,
} from '@mui/material';
import {DonutLarge, TrendingUp, TrendingDown} from '@mui/icons-material';
import {BarChart} from '@mui/x-charts/BarChart'

const statsData = [
    {label: "12.5K", description: "↑ 15%", icon: <TrendingUp color="success"/>},
    {label: "11K", description: "↓ 4%", icon: <TrendingDown color="error"/>},
    {label: "115%", description: "", icon: <DonutLarge color="primary"/>},
    {label: "3.5K", description: "↑ 12%", icon: <TrendingUp color="success"/>}
];


const DashboardPage: React.FC = () => {
    const [mode, setMode] = useState<'daily' | 'weekly' | 'monthly'>('daily');

    const salesData = {
        daily: [
            {label: '7:00-8:30', sales: 150},
            {label: '8:30-10:00', sales: 200},
            {label: '10:00-11:30', sales: 180},
            {label: '11:30-13:00', sales: 250},
            {label: '13:00-14:30', sales: 220},
            {label: '14:30-16:00', sales: 300},
        ],
        weekly: [
            {label: 'Mon', sales: 1500},
            {label: 'Tue', sales: 1700},
            {label: 'Wed', sales: 1800},
            {label: 'Thu', sales: 1600},
            {label: 'Fri', sales: 2000},
            {label: 'Sat', sales: 2500},
            {label: 'Sun', sales: 2200},
        ],
        monthly: (() => {
            const today = new Date();
            const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
            const daysPassed = today.getDate();
            return Array.from({length: daysPassed}, (_, i) => ({
                label: `${i + 1}`,
                sales: Math.floor(Math.random() * 500) + 100, // Example random sales
            }));
        })(),
    };

    const topPerformers = [
        {employee: "John Smith", sales: 8750},
        {employee: "Michael Lee", sales: 6150},
        {employee: "Anna Taylor", sales: 5800},
        {employee: "Sophia Brown", sales: 4900},
        {employee: "David Johnson", sales: 4300},
    ];

    return (
        <Box sx={{padding: 3, backgroundColor: '#f9fafc'}}>
            <Grid2 container spacing={2} sx={{marginBottom: 3}}>
                {/* Top Stat Cards */}
                {statsData.map((stat, index) => (
                    <Grid2 container size={{xs: 3}} key={index}>
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
                                Sales Data
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
                                    <MenuItem value="daily">Daily</MenuItem>
                                    <MenuItem
                                        value="weekly">Weekly</MenuItem>
                                    <MenuItem
                                        value="monthly">Monthly</MenuItem>
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
                            dataset={salesData[mode]}
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
                                Sales Data
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
                                    <MenuItem value="daily">Daily</MenuItem>
                                    <MenuItem
                                        value="weekly">Weekly</MenuItem>
                                    <MenuItem
                                        value="monthly">Monthly</MenuItem>
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
