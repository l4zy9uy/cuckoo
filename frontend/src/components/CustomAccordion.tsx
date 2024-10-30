// src/components/CustomAccordion.tsx
import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Typography,
    Checkbox,
    FormControlLabel
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type CustomAccordionProps = {
    title: string;
    items: { label: string }[]; // Define the structure of the accordion items
};

const CustomAccordion: React.FC<CustomAccordionProps> = ({ title, items }) => {
    return (
        <Accordion
            defaultExpanded
            disableGutters
            sx={{
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '1rem',
                boxShadow: 3,
                '&:before': { display: 'none' }, // Remove divider
            }}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box>
                    {items.map((item, index) => (
                        <FormControlLabel
                            key={index}
                            control={<Checkbox />}
                            label={item.label}
                        />
                    ))}
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default CustomAccordion;
