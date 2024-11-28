import React, {MutableRefObject, useCallback, useRef} from "react";
import {
    Button, ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    SxProps,
    Theme,
    useTheme
} from "@mui/material";
import {Link} from 'react-router-dom';


export type whiteBarItem = {
    title: string,
    icon?: React.ReactNode,
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
    const {title, submenu} = menuItem;
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
                component={Link} // Use Link to enable routing
                to={subMenuItem.pathname || "#"} // Provide the route path
                key={subMenuItem.title}
                sx={{
                    color: "#ffffff",
                    textDecoration: "none", // Remove underline from link
                }}
            >
                <ListItemIcon
                    sx={{color: "white"}}>{subMenuItem.icon}</ListItemIcon>
                <ListItemText primary={subMenuItem.title}/>
            </MenuItem>
        );
    });

    return (
        // @ts-ignore
        <>

            <Button
                ref={buttonRef as MutableRefObject<HTMLAnchorElement | null>}
                component={Link}
                to={menuItem.pathname || '#'}
                onClick={() => {
                    console.log("Button is clicked")
                }}
                onMouseLeave={() => {
                    setMenuShowingDropdown("");
                }}
                onMouseEnter={() => {
                    if (menuItem.submenu) {
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
                sx={{}}
            >
                {subMenusNodes}
            </Menu>
        </>
    )
}

export default DropdownMenuItem;