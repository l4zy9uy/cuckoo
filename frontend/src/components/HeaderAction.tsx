// src/components/HeaderActions.tsx
import React from 'react';
import {Box, Button, IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const HeaderActions = () => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem'
        }}>
            <Button variant="contained" startIcon={<AddIcon/>}>
                Thêm mới
            </Button>

        </Box>
    );
};

export default HeaderActions;
