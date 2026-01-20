import React, { useState, useMemo, useCallback } from 'react';
import { Chip, Typography, Tooltip, IconButton } from '@mui/material';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import TableLayout from '../../components/custom-table/table-layout';
import { unitTableData, unitFormData } from '../../components/form-field';
import { createColumnHelper } from '@tanstack/react-table';
import { IconEdit, IconTrash } from '@tabler/icons';
import PopupFormLayout from '../../components/custom-form/popup-from-layout';
import { CreateSuccessful } from '../../utils/AlertDialog';

const AdsManagementDetails = () => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [tableData, setTableData] = useState(unitTableData);
    const [formData, setFormData] = useState('');
    const [search, setSearch] = useState('');
    const [errors, setErrors] = useState({});
    const [isEdit, setIsEdit] = useState({ status: false, editId: '' });

    const BCrumb = useMemo(() => [
        { to: '/', title: 'Home' },
        { title: 'Unit List' },
    ], []);

    const handleDownload = useCallback(() => {
        const headers = ['S.No', 'Unit Name'];
        const rows = tableData.map((item, index) => [index + 1, item.unit_title]);

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

    const handleEdit = useCallback((data) => {
        setFormData(data);
        setErrors({});
        setIsEdit({ status: true, editId: data.id });
        setShowDrawer(true);
    }, []);

    const handleDelete = useCallback((id) => { });

    const columnHelper = createColumnHelper();
    const columns = useMemo(() => [
        columnHelper.accessor(row => row, {
            id: 'sno',
            header: () => 'S.no',
            cell: info => <Typography>{info.row.index + 1}</Typography>,
        }),
        columnHelper.accessor('unit_title', {
            header: () => 'Unit Title',
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
                    <Tooltip title="Edit">
                        <IconButton color="success" onClick={() => handleEdit(info.row.original)}>
                            <IconEdit width={22} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton color="error" onClick={() => handleDelete(info.row.original.id)}>
                            <IconTrash width={22} />
                        </IconButton>
                    </Tooltip>
                </Typography>
            ),
        }),
    ], [handleEdit, handleDelete]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('formData', formData);
        setShowDrawer(false);
        CreateSuccessful();
    }

    return (
        <PageContainer title="Unit Details" description="this is Unit Form page">
            <Breadcrumb title="Unit Information" items={BCrumb} />

            {/*Table Layout */}
            <TableLayout
                setShowDrawer={setShowDrawer}
                handleDownload={handleDownload}
                tableData={tableData}
                columns={columns}
                search={search}
                handleSearch={handleSearch}
                title={'Unit'}
                onClickFormButton={true}
            />
            {/* End Table Layout */}

            {/* Popup Form Layout */}
            <PopupFormLayout
                formData={formData}
                setFormData={setFormData}
                isEdit={isEdit}
                errors={errors}
                setErrors={setErrors}
                setIsEdit={setIsEdit}
                setShowDrawer={setShowDrawer}
                handleSubmit={handleSubmit}
                showDrawer={showDrawer}
                field={unitFormData}
                title={'Unit'}
                col={6}
            />
            {/* End Popup Form Layout */}
        </PageContainer>
    );
};

export default React.memo(AdsManagementDetails);
