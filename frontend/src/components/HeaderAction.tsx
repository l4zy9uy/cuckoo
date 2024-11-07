// src/components/HeaderActions.tsx
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Typography from "@mui/material/Typography";
import React, { useState, ReactNode } from "react";

type HeaderActionsProps = {
    text: string;
    DialogComponent: (props: { open: boolean; onClose: () => void }) => ReactNode; // Dialog as a function prop
};

const HeaderActions: React.FC<HeaderActionsProps> = ({ text, DialogComponent }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDialogOpen = () => {
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem',
            alignItems: "center"
        }}>
            <Typography fontWeight="bold" fontSize="28px">
                {text}
            </Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleDialogOpen}>
                Thêm mới
            </Button>

            {/* Render the DialogComponent with open and onClose props */}
            {DialogComponent({ open: isDialogOpen, onClose: handleDialogClose })}
        </Box>
    );
};

export default HeaderActions;
