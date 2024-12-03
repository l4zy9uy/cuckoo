import React, {useState} from 'react';
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
    onFilterChange?: (selectedItems: string[]) => void; // Callback for selected filters
};

const CustomAccordion: React.FC<CustomAccordionProps> = ({
                                                             title,
                                                             items,
                                                             onFilterChange
                                                         }) => {
    //  track selected items.


    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleCheckboxChange = (label: string) => {
        const updatedSelectedItems = selectedItems.includes(label)
            ? selectedItems.filter((item) => item !== label) // Remove item if already selected
            : [...selectedItems, label]; // Add item if not selected

        setSelectedItems(updatedSelectedItems);
        onFilterChange && onFilterChange(updatedSelectedItems); // Notify parent of changes
    };

    return (
        <Accordion
            defaultExpanded
            disableGutters
            sx={{
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '1rem',
                boxShadow: 3,
                '&:before': {display: 'none'}, // Remove divider
            }}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box>
                    {items.map((item, index) => (
                        <FormControlLabel
                            key={index}
                            control={
                                <Checkbox
                                    checked={selectedItems.includes(item.label)}
                                    onChange={() => handleCheckboxChange(item.label)}
                                />
                            }
                            label={item.label}
                        />
                    ))}
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default CustomAccordion;
