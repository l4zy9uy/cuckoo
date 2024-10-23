// src/components/Navbar.tsx
import React, {useState} from 'react';
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
import {Button, Menu, MenuItem} from '@mui/material';

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

const branches = ['Chi nhánh 1', 'Chi nhánh 2', 'Chi nhánh 3', 'Chi nhánh 4'];

const NavbarComponent: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Track menu anchor element
    const [selectedBranch, setSelectedBranch] = useState<string>('Chi nhánh trung tâm'); // Track selected branch
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget); // Set anchor element on click
    };

    const handleMenuClose = () => {
        setAnchorEl(null); // Close the menu
    };

    const handleBranchSelect = (branch: string) => {
        setSelectedBranch(branch); // Update the selected branch
        handleMenuClose(); // Close the menu
    };

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
                        <Button
                            onClick={handleMenuOpen}
                            startIcon={<FaMapMarkerAlt />}
                            sx={{ textTransform: 'none' }}
                        >
                            {selectedBranch}
                        </Button>

                        {/* Dropdown Menu for Branches */}
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleMenuClose}
                            MenuListProps={{
                                'aria-labelledby': 'branch-button',
                            }}
                        >
                            {branches.map((branch, index) => (
                                <MenuItem key={index} onClick={() => handleBranchSelect(branch)}>
                                    {branch}
                                </MenuItem>
                            ))}
                        </Menu>
                        <IoMdGlobe />
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
