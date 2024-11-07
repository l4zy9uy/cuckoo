// src/components/SidebarFilter.tsx
import React from 'react';
import { Box, Typography, TextField, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import CustomAccordion from './CustomAccordion';

type AccordionItem = {
    label: string;
};

type AccordionData = {
    title: string;
    items: AccordionItem[];
};

type SidebarFilterProps = {
    title: string;
    searchPlaceholder?: string;
    accordionData?: AccordionData[];
    statusFilterOptions?: { label: string; value: string; color?: string }[];
    onStatusChange?: (value: string) => void;
};

const SidebarFilter: React.FC<SidebarFilterProps> = ({
                                                         title,
                                                         searchPlaceholder = "Search...",
                                                         accordionData = [],
                                                         statusFilterOptions = [],
                                                         onStatusChange,
                                                     }) => {
    return (
        <Box
            sx={{
                width: 250,
                padding: '1rem',
                backgroundColor: '#f5f5f5',
                '& .MuiAccordion-root:first-of-type': {
                    borderTopLeftRadius: '12px !important',
                    borderTopRightRadius: '12px !important',
                },
                '& .MuiAccordion-root:last-of-type': {
                    borderBottomLeftRadius: '12px !important',
                    borderBottomRightRadius: '12px !important',
                },
            }}
        >
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <TextField
                fullWidth
                placeholder={searchPlaceholder}
                margin="normal"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderRadius: '12px',
                    },
                }}
            />

            {/* Status Filter */}
            {statusFilterOptions.length > 0 && (
                <FormControl component="fieldset" sx={{ marginTop: '1rem' }}>
                    <Typography variant="subtitle1">Trạng thái</Typography>
                    <RadioGroup
                        defaultValue={statusFilterOptions[0].value}
                        onChange={(e) => onStatusChange && onStatusChange(e.target.value)}
                    >
                        {statusFilterOptions.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio sx={{ color: option.color || 'default' }} />}
                                label={option.label}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            )}

            {/* Accordion Filters */}
            {accordionData && accordionData.map((accordion, index) => (
                <CustomAccordion key={index} title={accordion.title} items={accordion.items} />
            ))}
        </Box>
    );
};

export default SidebarFilter;
