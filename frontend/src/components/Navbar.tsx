// src/components/Navbar.tsx
import React from 'react';
import '../styles/Navbar.css';
import {
    FaCog , FaMapMarkerAlt, FaHome, FaBox,
    FaTable, FaExchangeAlt, FaHandshake, FaUsers,
    FaWallet, FaChartLine
} from 'react-icons/fa';
import { TbToolsKitchen } from "react-icons/tb";
import { CiCalendar } from "react-icons/ci";
import { PiMoneyWavy } from "react-icons/pi";
import { IoMdGlobe } from 'react-icons/io';
import restaurantLogo from '../assets/restaurant.png';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from "../components/ui/navigation-menu";

// Define all menu items in one array
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
    const leftMenuItems = menuItems.slice(0, -3); // All except the last 3
    const rightMenuItems = menuItems.slice(-3);   // Last 3 items

    return (
        <div className="bg-white shadow-md">
            {/* Top Bar */}
            <div className="flex justify-between items-center px-4 py-2">
                <div className="flex items-center gap-2">
                    <img src={restaurantLogo} alt="logo" className="w-10 h-10 rounded-full" />
                    <span className="font-bold text-xl">Cuckoo</span>
                </div>

                <div className="flex items-center gap-4">
                    <FaMapMarkerAlt className="text-lg" />
                    <span>Chi nhánh trung tâm</span>
                    <IoMdGlobe className="text-lg" />
                    <span>Tiếng Việt (VN)</span>
                    <FaCog className="text-lg" />
                    <span>Manager</span>
                </div>
            </div>

            {/* Blue Navigation Bar */}
            <NavigationMenu className="bg-blue-600 text-white">
                <NavigationMenuList className="flex justify-between items-center px-4 py-2">
                    {/* Left Menu Items */}
                    <div className="flex gap-6">
                        {leftMenuItems.map((item, index) => (
                            <NavigationMenuItem key={index}>
                                <NavigationMenuLink className="flex items-center gap-2">
                                    {item.icon}
                                    <span>{item.label}</span>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </div>

                    {/* Right Menu Items */}
                    <div className="flex gap-6">
                        {rightMenuItems.map((item, index) => (
                            <NavigationMenuItem key={index}>
                                <NavigationMenuLink className="flex items-center gap-2">
                                    {item.icon}
                                    <span>{item.label}</span>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </div>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
};

export default NavbarComponent;
