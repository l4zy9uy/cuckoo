import React, { useState, useMemo } from 'react';
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
    TableFooter,
    TablePagination,
} from '@mui/material';

type Column = {
    field: string;
    headerName: string;
    width?: number;
    flexGrow?: number;
};

type CustomTableProps = {
    rows: Record<string, any>[]; // Each row is an object with key-value pairs
    columns: Column[];
    pageSizeOptions?: number[]; // Options for page sizes
    renderCollapse?: (row: Record<string, any>) => React.ReactNode; // Callback for rendering collapsible content
};

const CustomTable: React.FC<CustomTableProps> = ({
                                                     rows,
                                                     columns,
                                                     pageSizeOptions = [5, 10, 25],
                                                     renderCollapse,
                                                 }) => {
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pageSizeOptions[0]);
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

    // Sorting logic
    const sortedRows = useMemo(() => {
        if (!orderBy) return rows;
        return [...rows].sort((a, b) => {
            const aValue = a[orderBy];
            const bValue = b[orderBy];
            if (aValue < bValue) return order === 'asc' ? -1 : 1;
            if (aValue > bValue) return order === 'asc' ? 1 : -1;
            return 0;
        });
    }, [rows, order, orderBy]);

    // Pagination logic
    const paginatedRows = useMemo(
        () => sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [sortedRows, page, rowsPerPage]
    );

    // Handle sorting
    const handleSort = (field: string) => {
        const isAsc = orderBy === field && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(field);
    };

    // Handle row selection
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

    // Handle expand/collapse of rows
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

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset page to the first when changing rows per page
    };

    return (
        <TableContainer component={Paper} style={{ maxHeight: 400, width: '100%' }}>
            <Table stickyHeader>
                {/* Table Header */}
                <TableHead>
                    <TableRow>
                        {/* Select All Checkbox */}
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
                        {/* Columns */}
                        {columns.map((column) => (
                            <TableCell
                                key={column.field}
                                sortDirection={orderBy === column.field ? order : false}
                                sx={{
                                    width: column.width || 'auto',
                                    flex: column.flexGrow ? 1 : undefined,
                                }}
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
                    </TableRow>
                </TableHead>

                {/* Table Body */}
                <TableBody>
                    {paginatedRows.map((row, rowIndex) => {
                        const globalIndex = page * rowsPerPage + rowIndex;
                        return (
                            <React.Fragment key={globalIndex}>
                                {/* Main Row */}
                                <TableRow
                                    selected={selectedRows.has(globalIndex)}
                                    sx={{ cursor: renderCollapse ? 'pointer' : 'default' }}
                                    onClick={() => renderCollapse && handleExpandClick(globalIndex)}
                                >
                                    {/* Checkbox */}
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedRows.has(globalIndex)}
                                            onChange={() => handleCheckboxChange(globalIndex)}
                                            onClick={(e) => e.stopPropagation()} // Prevent row click when toggling checkbox
                                        />
                                    </TableCell>
                                    {/* Columns */}
                                    {columns.map((column) => (
                                        <TableCell key={column.field}>
                                            {row[column.field]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                                {/* Collapsible Row */}
                                {renderCollapse && (
                                    <TableRow>
                                        <TableCell
                                            style={{ paddingBottom: 0, paddingTop: 0 }}
                                            colSpan={columns.length + 1}
                                        >
                                            <Collapse
                                                in={expandedRows.has(globalIndex)}
                                                timeout="auto"
                                                unmountOnExit
                                            >
                                                {renderCollapse(row)}
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </React.Fragment>
                        );
                    })}
                </TableBody>

                {/* Table Footer */}
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
