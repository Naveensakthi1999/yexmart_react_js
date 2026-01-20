import React, { useState, useMemo, useCallback } from 'react';
import { Chip, Typography, Tooltip, IconButton } from '@mui/material';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import TableLayout from 'src/components/custom-table/table-layout';
import { itemStockFormData, itemStockTableData } from '../../components/form-field';
import { createColumnHelper } from '@tanstack/react-table';
import { IconTrash } from '@tabler/icons';
import { CreateSuccessful } from '../../utils/AlertDialog';
import NormalFormLayout from '../../components/custom-form/normal-from-layout';

const ItemStockDetails = () => {
    const [reset, setReset] = useState(false);
    const [formData, setFormData] = useState('');
    const [tableData, setTableData] = useState(itemStockTableData);
    const [search, setSearch] = useState('');
    const [errors, setErrors] = useState({});
    const [isEdit, setIsEdit] = useState({ status: false, editId: '' });

    const BCrumb = useMemo(() => [
        { to: '/', title: 'Home' },
        { title: 'Adjust Stock' },
    ], []);

    const handleDownload = useCallback(() => {
        const headers = ['S.No', 'Category Name', 'Percentage'];
        const rows = tableData.map((item, index) => [index + 1, item.category_title, item.percentage]);

        const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'table-data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [tableData]);

    const handleSearch = useCallback((event) => setSearch(event.target.value), []);

    const handleDelete = useCallback((id) => { });

    const columnHelper = createColumnHelper();
    const columns = useMemo(() => [
        columnHelper.accessor(row => row, {
            id: 'sno',
            header: () => 'S.no',
            cell: info => <Typography>{info.row.index + 1}</Typography>,
        }),
        columnHelper.accessor('stock_date', {
            header: () => 'Stock Date',
            cell: info => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.accessor('stock_type', {
            header: () => 'Stock Type',
            cell: info => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.accessor('stock_value', {
            header: () => 'Stock Value',
            cell: info => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.accessor('note', {
            header: () => 'Note',
            cell: info => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.accessor(row => row, {
            id: 'lastUpdated',
            header: () => 'Last updated',
            cell: info => {
                const { user_created, user_updated, created_at, updated_at } = info.row.original;
                const displayName = user_updated?.fullname || user_created?.fullname;
                const action = user_updated ? 'Edited by' : 'Created by';
                const date = user_updated ? new Date(updated_at).toLocaleString() : new Date(created_at).toLocaleString();
                return (
                    <Typography>
                        <Chip
                            label={
                                <>
                                    {`${action} ${displayName}`}
                                    <br />
                                    {`on ${date}`}
                                </>
                            }
                            color={user_updated ? 'warning' : 'primary'}
                            sx={{ height: '100%', lineHeight: 1.3, textAlign: 'center', py: '5px', fontSize: '10px' }}
                        />
                    </Typography>
                );
            },
        }),
        columnHelper.accessor(row => row, {
            id: 'action',
            header: () => 'Action',
            cell: info => (
                <Typography>
                    <Tooltip title="Delete">
                        <IconButton color="error" onClick={() => handleDelete(info.row.original.id)}>
                            <IconTrash width={22} />
                        </IconButton>
                    </Tooltip>
                </Typography>
            ),
        }),
    ], [handleDelete]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('formData', formData);
        setReset(false);
        CreateSuccessful();
    }

    return (
        <PageContainer title="Adjust Stock Details" description="this is Adjust Stock Form page">
            <Breadcrumb title="Adjust Stock Information" items={BCrumb} />

            <NormalFormLayout
                formData={formData}
                setFormData={setFormData}
                isEdit={isEdit}
                errors={errors}
                setErrors={setErrors}
                setIsEdit={setIsEdit}
                handleSubmit={handleSubmit}
                setReset={setReset}
                reset={reset}
                field={itemStockFormData}
                title={'Adjust Stock'}
                col={4}
            />

            <TableLayout
                handleDownload={handleDownload}
                tableData={tableData}
                columns={columns}
                search={search}
                handleSearch={handleSearch}
                title={'Adjust Stock'}
            />
        </PageContainer>
    );
};

export default React.memo(ItemStockDetails);
