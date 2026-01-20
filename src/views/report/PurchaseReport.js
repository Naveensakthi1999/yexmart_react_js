import React, { useState, useMemo, useCallback } from 'react';
import { Chip, Typography, Tooltip, IconButton } from '@mui/material';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import TableLayout from 'src/components/custom-table/table-layout';
import { purchaseReportTableData, purchaseReportFilterData } from '../../components/form-field';
import { createColumnHelper } from '@tanstack/react-table';
import PopupFormLayout from '../../components/custom-form/popup-from-layout';
import { CreateSuccessful } from '../../utils/AlertDialog';

const PurchaseReport = () => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [tableData, setTableData] = useState(purchaseReportTableData);
    const [formData, setFormData] = useState('');
    const [search, setSearch] = useState('');
    const [errors, setErrors] = useState({});
    const [isEdit, setIsEdit] = useState({ status: false, editId: '' });

    const BCrumb = useMemo(() => [
        { to: '/', title: 'Home' },
        { title: 'Purchase Report' },
    ], []);

    const handleDownload = useCallback(() => {
        const headers = ['S.No', 'Brand Name'];
        const rows = tableData.map((item, index) => [index + 1, item.brand_title]);

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

    const columnHelper = createColumnHelper();
    const columns = useMemo(() => [
        columnHelper.accessor(row => row, {
            id: 'sno',
            header: () => 'S.no',
            cell: info => <Typography>{info.row.index + 1}</Typography>,
        }),
        columnHelper.accessor('invoice_no', {
            header: () => 'Invoice Number',
            cell: info => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.accessor('purchase_date', {
            header: () => 'Purchase Date',
            cell: info => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.accessor('supplier_id', {
            header: () => 'Supplier ID',
            cell: info => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.accessor('supplier_name', {
            header: () => 'Supplier Name',
            cell: info => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.accessor('invoice_total_amount', {
            header: () => 'Invoice Total(₹)',
            cell: info => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.accessor('invoice_paid_amount', {
            header: () => 'Paid Payment(₹)',
            cell: info => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.accessor('invoice_due_amount', {
            header: () => 'Due Amount(₹)',
            cell: info => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.accessor('due_days', {
            header: () => 'Due Days',
            cell: info => <Typography>{info.getValue()}</Typography>,
        }),
    ], []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('formData', formData);
        setShowDrawer(false);
        CreateSuccessful();
    }

    return (
        <PageContainer title="Purchase Report" description="this is Purchase Report">
            <Breadcrumb title="Purchase Report Information" items={BCrumb} />

            {/*Table Layout */}
            <TableLayout
                setShowDrawer={setShowDrawer}
                handleDownload={handleDownload}
                tableData={tableData}
                columns={columns}
                search={search}
                handleSearch={handleSearch}
                title={'Report'}
                onClickFilterButton={true}
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
                field={purchaseReportFilterData}
                title={'Report'}
                col={6}
            />
            {/* End Popup Form Layout */}
        </PageContainer>
    );
};

export default React.memo(PurchaseReport);
