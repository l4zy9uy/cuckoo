import {useCallback, useRef} from "react";
import {Button, Menu, MenuItem, SxProps, Theme, useTheme} from "@mui/material";
import { Link } from 'react-router-dom';


export type whiteBarItem = {
    title: string,
    icon?: Element,
    pathname?: string,
    submenu?: whiteBarItem[]
};


const DropdownMenuItem = ({
                              menuItem,
                              sx,
                              menuShowingDropdown,
                              setMenuShowingDropdown
                          }: {
    menuItem: whiteBarItem;
    sx?: SxProps<Theme>,
    menuShowingDropdown: string;
    setMenuShowingDropdown: (menuTitle: string) => void;
}) => {
    const theme = useTheme();
    const { title, submenu } = menuItem;
    const buttonRef = useRef<null | HTMLButtonElement>(null);

    const showSubMenu = useCallback(() => {
        setMenuShowingDropdown(menuItem.title);
    }, [menuItem.title, setMenuShowingDropdown]);

    const closeSubMenu = useCallback(() => {
        setMenuShowingDropdown("");
    }, [setMenuShowingDropdown]);

    const subMenusNodes = submenu?.map((subMenuItem) => {
        return (
            <MenuItem
                onClick={() => {
                    console.log("second level menu tiem click");
                }}
                key={subMenuItem.title}
                sx={{
                    color: '#ffffff',
                }}
            >
                {subMenuItem.title}
            </MenuItem>
        );
    });


    return (
        <>
            <Button
                ref={buttonRef}
                component={Link}
                to={menuItem.pathname || '#'}
                onClick={() => {
                    console.log("Button is clicked")
                }}
                onMouseLeave={() => {
                    setMenuShowingDropdown("");
                }}
                onMouseEnter={() => {
                    if(menuItem.submenu) {
                        showSubMenu();
                        return;
                    }
                }}
                startIcon={menuItem.icon}
                sx={{
                    textTransform: 'none',
                    ...(submenu && {
                        zIndex: theme.zIndex.modal + 1
                    }),
                    ...sx,
                }}
            >
                {title}
            </Button>
            <Menu
                anchorEl={buttonRef.current}
                open={menuShowingDropdown === title}
                onClose={closeSubMenu}
                slotProps={{
                    paper: {
                        onMouseEnter: () => {
                            console.log("Mouse entered");
                            showSubMenu(); // Open submenu on mouse enter
                        },
                        onMouseLeave: () => {
                            console.log("Mouse left");
                            closeSubMenu(); // Close submenu on mouse leave
                        },
                        sx: {
                            backgroundColor: theme.palette.primary.main, // Set background color of the menu
                        }
                    },
                }}
                MenuListProps={{
                    'aria-labelledby': 'branch-button',
                }}
                sx={{
                }}
            >
                {subMenusNodes}
            </Menu>
        </>
    )
}

export default DropdownMenuItem;