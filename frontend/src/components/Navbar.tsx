// src/components/Navbar.tsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
    FaCog, FaMapMarkerAlt, FaHome, FaBox,
    FaTable, FaExchangeAlt, FaHandshake, FaUsers,
    FaWallet, FaChartLine
} from 'react-icons/fa';
import { TbToolsKitchen } from 'react-icons/tb';
import { CiCalendar } from 'react-icons/ci';
import { PiMoneyWavy } from 'react-icons/pi';
import { IoMdGlobe } from 'react-icons/io';
import restaurantLogo from '../assets/restaurant.png';
import { Button } from '@mui/material';

const menuItems = [
    { icon: <FaHome />, label: 'Tổng quan' },
    { icon: <FaBox />, label: 'Hàng hóa' },
    { icon: <FaTable />, label: 'Phòng/Bàn' },
    { icon: <FaExchangeAlt />, label: 'Giao dịch' },
    { icon: <FaHandshake />, label: 'Đối tác' },
    { icon: <FaUsers />, label: 'Nhân viên' },
    { icon: <FaWallet />, label: 'Sổ quỹ' },
    { icon: <FaChartLine />, label: 'Báo cáo' },
    { icon: <TbToolsKitchen />, label: 'Nhà bếp' },
    { icon: <CiCalendar />, label: 'Lễ tân' },
    { icon: <PiMoneyWavy />, label: 'Thu ngân' },
];

const NavbarComponent: React.FC = () => {


    const leftMenuItems = menuItems.slice(0, -3);
    const rightMenuItems = menuItems.slice(-3);

    return (
        <>
            {/* Top AppBar */}
            <AppBar position="static" color="transparent" elevation={1}>
                <Toolbar className="flex justify-between">
                    {/* Logo Section */}
                    <Box display="flex" alignItems="center" gap={2}>
                        <img src={restaurantLogo} alt="logo" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                        <Typography variant="h6" noWrap component="div">
                            Cuckoo
                        </Typography>
                    </Box>

                    {/* Right Section */}
                    <Box display="flex" alignItems="center" gap={2}>
                        <FaMapMarkerAlt />
                        <Typography>Chi nhánh trung tâm</Typography>
                        <IoMdGlobe />
                        <Typography>Tiếng Việt (VN)</Typography>
                        <FaCog />
                        <Typography>Manager</Typography>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Blue Navigation Bar */}
            <AppBar position="static" sx={{ bgcolor: 'primary.main', color: 'white' }}>
                <Toolbar className="flex justify-between">
                    {/* Left Menu Items */}
                    <Box display="flex" gap={3}>
                        {leftMenuItems.map((item, index) => (
                            <Button
                                key={index}
                                startIcon={item.icon}
                                sx={{ color: 'white', textTransform: 'none' }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>

                    {/* Right Menu Items */}
                    <Box display="flex" gap={3}>
                        {rightMenuItems.map((item, index) => (
                            <Button
                                key={index}
                                startIcon={item.icon}
                                sx={{ color: 'white', textTransform: 'none' }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default NavbarComponent;
