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
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LabelIcon from '@mui/icons-material/Label';
import HandymanIcon from '@mui/icons-material/Handyman';
import RoomIcon from '@mui/icons-material/Room';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import PaidIcon from '@mui/icons-material/Paid';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const stItems = [
    {
        icon: <ViewCompactIcon />,
        title: 'Danh mục',
        pathname: '/Products'
    },
    {
        icon: <LabelIcon />,
        title: 'Thiết lập giá',
        pathname: '/PriceBook'
    },
    {
        icon: <AssignmentTurnedInIcon />,
        title: 'Kiểm kho',
        pathname: '/StockTakes'
    }
];

const cartItems = [
    {
        icon: <PaidIcon />,
        title: 'Hóa đơn',
        pathname: '/Invoices'
    },
    {
        icon: <ShoppingCartIcon />,
        title: 'Nhập hàng',
        pathname: '/PurchaseOrder'
    }
];

const nvItems = [
    {
        icon: <GroupIcon />,
        title: 'Nhân viên',
        pathname: '/Employees'
    },
    {
        icon: <CalendarMonthIcon />,
        title: 'Lịch làm việc',
        pathname: '/Timesheet'
    },
    {
        icon: <ManageAccountsIcon />,
        title: 'Thiết lập nhân viên',
        pathname: '/EmployerSettings'
    }
];

const navBarItems = [
    { icon: <FaHome />, title: 'Tổng quan', pathname: '/' },
    { icon: <FaBox />, title: 'Hàng hóa', submenu: stItems },
    { icon: <FaTable />, title: 'Phòng/Bàn', pathname: '/Tables' },
    { icon: <FaExchangeAlt />, title: 'Giao dịch', submenu: cartItems },
    { icon: <PersonIcon />, title: 'Khách hàng', pathname: '/Customers' },
    { icon: <FaHandshake />, title: 'Nhà cung cấp', pathname: '/Suppliers' },
    { icon: <FaUsers />, title: 'Nhân viên', submenu: nvItems },
    { icon: <FaWallet />, title: 'Sổ quỹ', pathname: '/Cashier' },
    { icon: <FaChartLine />, title: 'Báo cáo', pathname: '/Reports' },
    { icon: <TbToolsKitchen />, title: 'Nhà bếp', pathname: '/Kitchen' },
    { icon: <CiCalendar />, title: 'Lễ tân', pathname: '/Reception' },
    { icon: <PiMoneyWavy />, title: 'Thu ngân', pathname: '/Cashier' }
];

const settings = [
    {
        icon: <RoomIcon />,
        title: 'Thông tin cá nhân',
        pathname: '/ProfilePage'
    },
    {
        icon: <HandymanIcon />,
        title: 'Thiết lập cửa hàng',
        pathname: '/PosSettings'
    },
    {
        icon: <RoomIcon />,
        title: 'Quản lý chi nhánh',
        pathname: '/BranchManagement'
    },
    {
        icon: <HistoryIcon />,
        title: 'Lịch sử thao tác',
        pathname: '/OperationHistory'
    },
    {
        icon: <LogoutIcon />,
        title: 'Đăng xuất',
        pathname: '/Logout'
    }
];

const branches = [
    { title: 'Chi nhánh 1', pathname: '/B1' },
    { title: 'Chi nhánh 2', pathname: '/B2' },
    { title: 'Chi nhánh 3', pathname: '/B3' },
    { title: 'Chi nhánh 4', pathname: '/B4' },
    { title: 'Chi nhánh 5', pathname: '/B5' },
    { title: 'Chi nhánh 6', pathname: '/B6' }
];

const menuItem = [
    {
        title: 'Chi nhánh trung tâm',
        icon: <FaMapMarkerAlt />,
        submenu: branches
    },
    {
        title: 'hi',
        icon: <FaCog />,
        submenu: settings
    }
];

const username = "abcyz";

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
                    <Box display="flex" gap={3} sx={{marginLeft: 10}}>
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
