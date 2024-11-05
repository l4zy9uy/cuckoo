// src/components/ProductTable.tsx
import React, { useState } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Checkbox,
    Collapse,
    IconButton,
    TableFooter,
    TablePagination,
    Box, Tabs, Tab, Grid2, Button,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";

type ProductTableProps = {
    rows: any[];
    columns: { field: string; headerName: string }[];
    pageSizeOptions?: number[]; // Options for page sizes
    renderCollapse?: (row: any) => React.ReactNode;
};

const CustomTable: React.FC<ProductTableProps> = ({ rows, columns, pageSizeOptions = [5, 10, 25], renderCollapse, }) => {
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pageSizeOptions[0]);
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

    const handleSort = (field: string) => {
        const isAsc = orderBy === field && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(field);
    };

    const sortedRows = React.useMemo(() => {
        if (!orderBy) return rows;
        return [...rows].sort((a, b) => {
            const aValue = a[orderBy];
            const bValue = b[orderBy];
            if (aValue < bValue) return order === 'asc' ? -1 : 1;
            if (aValue > bValue) return order === 'asc' ? 1 : -1;
            return 0;
        });
    }, [rows, order, orderBy]);

    const paginatedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleCheckboxChange = (rowIndex: number) => {
        setSelectedRows((prevSelectedRows) => {
            const newSelectedRows = new Set(prevSelectedRows);
            if (newSelectedRows.has(rowIndex)) {
                newSelectedRows.delete(rowIndex);
            } else {
                newSelectedRows.add(rowIndex);
            }
            return newSelectedRows;
        });
    };

    const handleExpandClick = (rowIndex: number) => {
        setExpandedRows((prevExpandedRows) => {
            const newExpandedRows = new Set(prevExpandedRows);
            if (newExpandedRows.has(rowIndex)) {
                newExpandedRows.delete(rowIndex);
            } else {
                newExpandedRows.add(rowIndex);
            }
            return newExpandedRows;
        });
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset page when changing rows per page
    };

    return (
        <TableContainer component={Paper} style={{ maxHeight: 400, width: '100%' }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                indeterminate={selectedRows.size > 0 && selectedRows.size < rows.length}
                                checked={rows.length > 0 && selectedRows.size === rows.length}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedRows(new Set(rows.map((_, index) => index)));
                                    } else {
                                        setSelectedRows(new Set());
                                    }
                                }}
                            />
                        </TableCell>
                        {columns.map((column) => (
                            <TableCell
                                key={column.field}
                                sortDirection={orderBy === column.field ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === column.field}
                                    direction={orderBy === column.field ? order : 'asc'}
                                    onClick={() => handleSort(column.field)}
                                >
                                    {column.headerName}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedRows.map((row, rowIndex) => {
                        const globalIndex = page * rowsPerPage + rowIndex;
                        return (
                            <React.Fragment key={globalIndex}>
                                <TableRow selected={selectedRows.has(globalIndex)}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedRows.has(globalIndex)}
                                            onChange={() => handleCheckboxChange(globalIndex)}
                                        />
                                    </TableCell>
                                    {columns.map((column) => (
                                        <TableCell key={column.field}>
                                            {row[column.field]}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <IconButton
                                            onClick={() => handleExpandClick(globalIndex)}
                                            aria-label="expand row"
                                            size="small"
                                        >
                                            {expandedRows.has(globalIndex) ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns.length + 2}>
                                        <Collapse in={expandedRows.has(globalIndex)} timeout="auto" unmountOnExit>
                                            {renderCollapse && renderCollapse(row)}
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        );
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={pageSizeOptions}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};

export default CustomTable;
