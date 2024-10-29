import React, {useCallback, useRef, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
    FaCog, FaMapMarkerAlt, FaHome, FaBox,
    FaTable, FaExchangeAlt, FaHandshake, FaUsers,
    FaWallet, FaChartLine
} from 'react-icons/fa';
import {TbToolsKitchen} from 'react-icons/tb';
import {CiCalendar} from 'react-icons/ci';
import {PiMoneyWavy} from 'react-icons/pi';
import restaurantLogo from '../assets/restaurant.png';
import DropdownMenuItem, {
    whiteBarItem
} from "@/components/DropdownMenuItem.tsx";

const stItems = [
    {
        title: 'Danh mục',
        pathname: '/list'
    },
    {
        title: 'Thiết lập giá',
        pathname: '/cost'
    },
    {
        title: 'Kiểm kho',
        pathname: '/storage'
    }
];

const nvItems = [
    {
        title: 'Nhân viên',
        pathname: '/nv'
    },
    {
        title: 'Lịch làm việc',
        pathname: '/cal'
    },
    {
        title: 'Thiết lập nhân viên',
        pathname: '/emp'
    }
];

const navBarItems: whiteBarItem[] = [
    { icon: <FaHome />, title: 'Tổng quan', pathname: '/' },
    { icon: <FaBox />, title: 'Hàng hóa', submenu: stItems },
    { icon: <FaTable />, title: 'Phòng/Bàn', pathname: '/tables' },
    { icon: <FaExchangeAlt />, title: 'Giao dịch', pathname: '/transactions' },
    { icon: <FaHandshake />, title: 'Đối tác', pathname: '/partners' },
    { icon: <FaUsers />, title: 'Nhân viên', submenu: nvItems },
    { icon: <FaWallet />, title: 'Sổ quỹ', pathname: '/fund' },
    { icon: <FaChartLine />, title: 'Báo cáo', pathname: '/reports' },
    { icon: <TbToolsKitchen />, title: 'Nhà bếp', pathname: '/kitchen' },
    { icon: <CiCalendar />, title: 'Lễ tân', pathname: '/reception' },
    { icon: <PiMoneyWavy />, title: 'Thu ngân', pathname: '/cashier' },
];

const settings: whiteBarItem[] = [
    {
        title: 'Thong tin ca nhan',
        pathname: '/profile'
    },
    {
        title: 'Thiet lap cua hang',
        pathname: '/store'
    },
    {
        title: 'Quan ly chi nhanh',
        pathname: '/branch1'
    },
    {
        title: 'Lich su thao tac',
        pathname: '/branch1'
    },
    {
        title: 'Dang xuat',
        pathname: '/branch1'
    }
]
const branches = [
    {
        title: 'Chi nhánh 1',
        pathname: '/b1'
    },
    {
        title: 'Chi nhánh 2',
        pathname: '/b2'
    },
    {
        title: 'Chi nhánh 3',
        pathname: '/b3'
    },
    {
        title: 'Chi nhánh 4',
        pathname: 'b/4'
    },
    {
        title: 'Chi nhánh 5',
        pathname: '/b5'
    },
    {
        title: 'Chi nhánh 6',
        pathname: '/b6'
    },
];
const username = "abcyz";

const menuItem: whiteBarItem[] = [
    {
        title: 'Chi nhanh trung tam',
        icon: <FaMapMarkerAlt/>,
        submenu: branches
    },
    {
        title: username,
        icon: <FaCog/>,
        submenu: settings
    }
]

const NavbarComponent: React.FC = () => {
    const [menuShowingDropdown, setMenuShowingDropdown] = useState("");
    const handleMenuShowingDropdownChange = useCallback((menuTitle: string) => {
        setMenuShowingDropdown(menuTitle);
    }, []);

    const menuItems = menuItem.map((menuItem) => {
        return (
            <DropdownMenuItem
                key={menuItem.title}
                menuItem={menuItem}
                menuShowingDropdown={menuShowingDropdown}
                setMenuShowingDropdown={handleMenuShowingDropdownChange}
            />
        );
    });
    const leftMenuItems = navBarItems.slice(0, -3);
    const rightMenuItems = navBarItems.slice(-3);
    return (
        <>
            {/* Top AppBar */}
            <AppBar position="static" color="transparent" elevation={1}>
                <Toolbar className="flex justify-between">
                    {/* Logo Section */}
                    <Box display="flex" alignItems="center" gap={2}>
                        <img src={restaurantLogo} alt="logo" style={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%'
                        }}/>
                        <Typography variant="h6" noWrap component="div"
                                    sx={{fontSize: 72, fontWeight: 'bold'}}>
                            Cuckoo
                        </Typography>
                    </Box>

                    {/* Right Section */}
                    <Box display="flex" alignItems="center" gap={2}>
                        {menuItems}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Blue Navigation Bar */}
            <AppBar position="static" sx={{
                bgcolor: 'primary.main',
                color: 'white',
                justifyContent: 'center',
                height: 'auto'
            }}>
                <Toolbar
                    className="flex justify-between"
                    variant="dense"
                    sx={{
                        height: 10,
                        paddingY: 0,
                    }}
                >
                    {/*Left Menu Items*/}
                    <Box display="flex" gap={3} sx={{ marginLeft: 10}}>
                        {leftMenuItems.map((item) => (
                            <DropdownMenuItem
                                key={item.title}
                                sx={{
                                    color: 'white',
                                    height: 'auto',
                                    minHeight: '0',
                                    fontSize: 'auto',
                                    '&:hover': {
                                        backgroundColor: '#fff',
                                        color: '#3c52b2',
                                    }
                                }}
                                menuItem={item}
                                menuShowingDropdown={menuShowingDropdown}
                                setMenuShowingDropdown={handleMenuShowingDropdownChange}
                            />
                        ))}
                    </Box>

                    {/*Right Menu Items*/}
                    <Box display="flex" gap={3}>
                        {rightMenuItems.map((item) => (
                            <DropdownMenuItem
                                key={item.title}
                                sx={{
                                    color: 'white',
                                    height: 'auto',
                                    minHeight: '0',
                                    fontSize: 'auto',

                                }}
                                menuItem={item}
                                menuShowingDropdown={menuShowingDropdown}
                                setMenuShowingDropdown={handleMenuShowingDropdownChange}
                            />
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default NavbarComponent;
