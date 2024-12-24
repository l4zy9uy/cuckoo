// src/components/HeaderActions.tsx
import {Box, Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Typography from "@mui/material/Typography";
import React, {useState, ReactNode} from "react";

type HeaderActionsProps = {
    text: string;
    DialogComponent: (props: {
        open: boolean;
        onClose: () => void
        onSave?: (data: any) => void;
    }) => ReactNode; // Dialog as a function prop
    selectedNum?: number;
    onDelete?: () => void;
};

const HeaderActions: React.FC<HeaderActionsProps> = ({
                                                         text,
                                                         DialogComponent,
                                                         selectedNum,
                                                         onDelete,
                                                     }) => {
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
            flexDirection: "row",
            marginBottom: '1rem',
            alignItems: "center",
            width: '100%',
        }}>
            <Typography fontWeight="bold" fontSize="28px" marginRight="auto">
                {text}
            </Typography>
            {selectedNum && selectedNum > 0 && (
                <Button
                    variant="contained"
                    color="error"
                    sx={{
                        marginLeft: "auto",
                        marginRight: 1,
                    }}
                    onClick={onDelete}
                >
                    Xóa
                </Button>
            )}
            <Button variant="contained" startIcon={<AddIcon/>}
                    onClick={handleDialogOpen}
                // sx={{
                //     marginLeft: "auto"
                // }}
            >
                Thêm mới
            </Button>
            {/* Render the DialogComponent with open and onClose props */}
            {DialogComponent({open: isDialogOpen, onClose: handleDialogClose})}
        </Box>
    );
};

export default HeaderActions;
