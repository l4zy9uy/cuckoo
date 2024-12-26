import React, {useCallback, useState} from 'react';
import {
    Menu,
    MenuItem,
    Box,
    AppBar,
    Toolbar,
    Typography,
    Button,
    Dialog,
    DialogContent,
    TextField,
    DialogActions,
    DialogTitle,
    FormControl,
    InputLabel,
    Select,
} from '@mui/material';
import {
    FaCog, FaMapMarkerAlt, FaHome, FaBox,
    FaTable, FaExchangeAlt, FaHandshake, FaUsers,
    FaWallet, FaChartLine
} from 'react-icons/fa';
import {TbToolsKitchen} from 'react-icons/tb';
import restaurantLogo from '../assets/restaurant.png';
import DropdownMenuItem from "@/components/DropdownMenuItem.tsx";
import { ViewCompact as ViewCompactIcon,
    AssignmentTurnedIn as AssignmentTurnedInIcon,
    Handyman as HandymanIcon,
    Room as RoomIcon,
    History as HistoryIcon,
    Logout as LogoutIcon,
    Group as GroupIcon,
    Person as PersonIcon,
    Paid as PaidIcon,
    ShoppingCart as ShoppingCartIcon,
    //ManageAccounts as ManageAccountsIcon,
    CalendarMonth as CalendarMonthIcon
} from '@mui/icons-material';
import {useBranchContext} from "@/context/BranchContext.tsx";

//import {CiCalendar} from 'react-icons/ci';
//import {PiMoneyWavy} from 'react-icons/pi';
//import LabelIcon from '@mui/icons-material/Label';

const stItems = [
    {
        icon: <ViewCompactIcon/>,
        title: 'Danh mục',
        pathname: '/Products'
    },

    {
        icon: <AssignmentTurnedInIcon/>,
        title: 'Kiểm kho',
        pathname: '/StockTakes'
    }
];

const cartItems = [
    {
        icon: <PaidIcon/>,
        title: 'Hóa đơn',
        pathname: '/Invoices'
    },
    {
        icon: <ShoppingCartIcon/>,
        title: 'Nhập hàng',
        pathname: '/PurchaseOrder'
    }
];

const nvItems = [
    {
        icon: <GroupIcon/>,
        title: 'Nhân viên',
        pathname: '/Employees'
    },
    {
        icon: <CalendarMonthIcon/>,
        title: 'Lịch làm việc',
        pathname: '/Timesheet'
    },
    // {
    //     icon: <ManageAccountsIcon/>,
    //     title: 'Thiết lập nhân viên',
    //     pathname: '/EmployerSettings'
    // }
];

const navBarItems = [
    {icon: <FaHome/>, title: 'Tổng quan', pathname: '/'},
    {icon: <FaBox/>, title: 'Hàng hóa', submenu: stItems},
    {icon: <FaTable/>, title: 'Phòng/Bàn', pathname: '/Tables'},
    {icon: <FaExchangeAlt/>, title: 'Giao dịch', submenu: cartItems},
    {icon: <PersonIcon/>, title: 'Khách hàng', pathname: '/Customers'},
    {icon: <FaHandshake/>, title: 'Nhà cung cấp', pathname: '/Suppliers'},
    {icon: <FaUsers/>, title: 'Nhân viên', submenu: nvItems},
    {icon: <FaWallet/>, title: 'Sổ quỹ', pathname: '/Cashier'},
    {icon: <FaChartLine/>, title: 'Báo cáo', pathname: '/Reports'},
    {icon: <TbToolsKitchen/>, title: 'Nhà bếp', pathname: '/Kitchen'},
    // {icon: <CiCalendar/>, title: 'Lễ tân', pathname: '/Reception'},
    // {icon: <PiMoneyWavy/>, title: 'Thu ngân', pathname: '/Cashier'}
];

//@ts-ignore
const settings = [
    {
        icon: <RoomIcon/>,
        title: 'Thông tin cá nhân',
        pathname: '/ProfilePage'
    },
    {
        icon: <HandymanIcon/>,
        title: 'Thiết lập cửa hàng',
        pathname: '/PosSettings'
    },
    {
        icon: <RoomIcon/>,
        title: 'Quản lý chi nhánh',
        pathname: '/BranchManagement'
    },
    {
        icon: <HistoryIcon/>,
        title: 'Lịch sử thao tác',
        pathname: '/OperationHistory'
    },
    {
        icon: <LogoutIcon/>,
        title: 'Đăng xuất',
        pathname: '/Logout'
    }
];

const branches = [
    {
        title: 'Chi nhánh 1',
        pathname: '/',
        onClick: () => (window.location.href = '/'),
    },
    {
        title: 'Chi nhánh 2',
        pathname: '/',
        onClick: () => (window.location.href = '/'),
    },
    {
        title: 'Chi nhánh 3',
        pathname: '/',
        onClick: () => (window.location.href = '/'),
    },
    {
        title: 'Chi nhánh 4',
        pathname: '/',
        onClick: () => (window.location.href = '/'),
    },
    {
        title: 'Chi nhánh 5',
        pathname: '/',
        onClick: () => (window.location.href = '/'),
    },
    {
        title: 'Chi nhánh 6',
        pathname: '/',
        onClick: () => (window.location.href = '/'),
    },
];


const menuItem = [
    {
        title: 'chon Chi nhánh',
        icon: <FaMapMarkerAlt/>,
        submenu: branches
    },
    // {
    //     title: 'Cai dat',
    //     icon: <FaCog/>,
    //     submenu: settings
    // }
];


const NavbarComponent: React.FC = () => {
    const [menuShowingDropdown, setMenuShowingDropdown] = useState("");
    const handleMenuShowingDropdownChange = useCallback((menuTitle: string) => {
        setMenuShowingDropdown(menuTitle);
    }, []);

    const { setBranchIndex } = useBranchContext();

    const handleBranchClick = (index: number) => {
        console.log(index)
        setBranchIndex(index);
    };

    const menuItems = menuItem.map((menuItem) => {
        return (
            <DropdownMenuItem
                key={menuItem.title}
                menuItem={{
                    ...menuItem,
                    submenu: menuItem.submenu?.map((subItem) => ({
                        ...subItem,
                        onClick: () => handleBranchClick(parseInt(subItem.title.slice(-1), 10)),
                    })),
                }}
                menuShowingDropdown={menuShowingDropdown}
                setMenuShowingDropdown={handleMenuShowingDropdownChange}
            />
        );
    });

    const leftMenuItems = navBarItems.slice(0, -3);
    //tconst rightMenuItems = navBarItems.slice(-1);

    const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
        setSettingsAnchorEl(event.currentTarget);
    };

    const handleSettingsClose = () => {
        setSettingsAnchorEl(null);
    };

    const handleDialogOpen = () => {
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const handleDialogSubmit = () => {
        console.log("New user added"); // Replace with actual logic
        setIsDialogOpen(false);
    };

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
                    <Box display="flex" flexDirection="row">
                        <Box display="flex" alignItems="center" gap={2}>
                            {menuItems}
                        </Box>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Button
                                startIcon={<FaCog />}
                                onClick={handleSettingsClick}
                                sx={{ textTransform: 'none' }}
                            >
                                Cài đặt
                            </Button>

                            <Menu
                                anchorEl={settingsAnchorEl}
                                open={Boolean(settingsAnchorEl)}
                                onClose={handleSettingsClose}
                            >
                                <MenuItem onClick={handleDialogOpen}>Thêm nhân viên</MenuItem>
                                <MenuItem onClick={handleSettingsClose}>Thiết lập cửa hàng</MenuItem>
                                <MenuItem onClick={handleSettingsClose}>Lịch sử thao tác</MenuItem>
                                <MenuItem onClick={handleSettingsClose}>Đăng xuất</MenuItem>
                            </Menu>
                        </Box>
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
                    {/*<Box display="flex" gap={3}>*/}
                    {/*    {rightMenuItems.map((item) => (*/}
                    {/*        <DropdownMenuItem*/}
                    {/*            key={item.title}*/}
                    {/*            sx={{*/}
                    {/*                color: 'white',*/}
                    {/*                height: 'auto',*/}
                    {/*                minHeight: '0',*/}
                    {/*                fontSize: 'auto',*/}

                    {/*            }}*/}
                    {/*            menuItem={item}*/}
                    {/*            menuShowingDropdown={menuShowingDropdown}*/}
                    {/*            setMenuShowingDropdown={handleMenuShowingDropdownChange}*/}
                    {/*        />*/}
                    {/*    ))}*/}
                    {/*</Box>*/}
                </Toolbar>
            </AppBar>
            <Dialog open={isDialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
                <DialogTitle>Thêm nhân viên</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Tên nhân viên"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        label="Tên đăng nhập"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        label="Mật khẩu"
                        type="password"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        label="Xác nhận mật khẩu"
                        type="password"
                        fullWidth
                        variant="outlined"
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Vai trò</InputLabel>
                        <Select>
                            {/*<MuiMenuItem value="Admin">Admin</MuiMenuItem>*/}
                            <MenuItem value="Nhân viên">Nhân viên</MenuItem>
                            <MenuItem value="Quản lý">Quản lý</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Chi nhánh làm việc</InputLabel>
                        <Select>
                            {branches.map((branch) => (
                                <MenuItem value={branch.title}>{branch.title}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="secondary">Hủy</Button>
                    <Button onClick={handleDialogSubmit} color="primary">Lưu</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default NavbarComponent;
