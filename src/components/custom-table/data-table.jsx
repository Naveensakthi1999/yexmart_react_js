
import * as React from 'react';
import {
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    TableHead,
    Box,
    Grid, MenuItem,
    Button,
    Divider,
    IconButton,
} from '@mui/material';
import { Stack } from '@mui/system';
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table'
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from '@tabler/icons';

const DataTable = ({ totalRows, currentPage, setCurrentPage, getTableData, ...props }) => {
    const [data, setData] = React.useState([...props.tableData]);
    const [columnFilters, setColumnFilters] = React.useState([]);

    React.useEffect(() => {
        setData([...props.tableData]);
    }, [props.tableData]);

    const table = useReactTable({
        data,
        columns: props.columns,
        filterFns: {},
        state: {
            columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(), 
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
    });

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Box>
                    <TableContainer>
                        <Table
                            sx={{
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <TableHead>
                                {table.getHeaderGroups().map((headerGroup) => (

                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableCell key={header.id}>
                                                <Typography
                                                    variant="h6"
                                                    mb={1}
                                                    className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(header.column.columnDef.header, header.getContext())
                                                    }
                                                    {(() => {
                                                        const sortState = header.column.getIsSorted();
                                                        if (sortState === 'asc') return ' 🔼';
                                                        if (sortState === 'desc') return ' 🔽';
                                                        return null;
                                                    })()}
                                                </Typography>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHead>
                            <TableBody>
                                {table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Divider />
                    <Stack gap={1} p={3} alignItems="center" direction="row" justifyContent="space-between">
                        <Box display="flex" alignItems="center" gap={1}>


                            <Button variant="contained" color="primary" onClick={() => rerender()}>Force Rerender</Button>
                            <Typography variant="body1">{table.getPrePaginationRowModel().rows.length} Rows</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>

                            <Stack direction="row" alignItems="center" gap={1}>
                                <Typography variant="body1">Page</Typography>
                                <Typography variant="body1" fontWeight={600}>
                                    {table.getState().pagination.pageIndex + 1} of{' '}
                                    {table.getPageCount()}
                                </Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" gap={1}>
                                | Go to page:
                                <CustomTextField
                                    type="number"
                                    min="1"
                                    max={table.getPageCount()}
                                    defaultValue={table.getState().pagination.pageIndex + 1}
                                    onChange={(e) => {
                                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                                        table.setPageIndex(page)
                                    }}
                                />
                            </Stack>
                            <CustomSelect
                                value={table.getState().pagination.pageSize}
                                onChange={(e) => {
                                    table.setPageSize(Number(e.target.value))
                                }}
                            >
                                {[10, 15, 20, 25].map(pageSize => (
                                    <MenuItem key={pageSize} value={pageSize}>
                                        {pageSize}
                                    </MenuItem>
                                ))}
                            </CustomSelect>

                            <IconButton size='small'
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <IconChevronsLeft />
                            </IconButton>
                            <IconButton size='small'
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <IconChevronLeft />
                            </IconButton>
                            <IconButton size='small'
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <IconChevronRight />
                            </IconButton>
                            <IconButton size='small'
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                disabled={!table.getCanNextPage()}
                            >
                                <IconChevronsRight />
                            </IconButton>
                        </Box>
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    );
};

export default DataTable;
