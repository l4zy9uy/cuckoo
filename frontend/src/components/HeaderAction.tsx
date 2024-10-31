// src/components/HeaderActions.tsx
import React from 'react';
import {Box, Button, IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Typography from "@mui/material/Typography";

const HeaderActions = () => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem',
            alignItems: "center"
        }}>
            <Typography
                fontWeight="bold"
                fontSize="28px"

            > Hang hoa </Typography>
            <Button variant="contained" startIcon={<AddIcon/>}>
                Thêm mới
            </Button>

        </Box>
    );
};

export default HeaderActions;
