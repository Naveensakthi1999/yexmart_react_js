import React, { useState, useMemo, useCallback } from 'react';
import { Typography } from '@mui/material';
import TableLayout from 'src/components/custom-table/table-layout';
import { purchaseReportTableData, stockReportFilterData } from '../../components/form-field';
import { createColumnHelper } from '@tanstack/react-table';
import PopupFormLayout from '../../components/custom-form/popup-from-layout';
import { CreateSuccessful } from '../../utils/AlertDialog';

const BrandWaysStock = () => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [tableData, setTableData] = useState(purchaseReportTableData);
    const [formData, setFormData] = useState('');
    const [search, setSearch] = useState('');
    const [errors, setErrors] = useState({});
    const [isEdit, setIsEdit] = useState({ status: false, editId: '' });

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
        columnHelper.accessor('purchase_date', {
            header: () => 'Brand Name',
            cell: info => <Typography></Typography>,
        }),
        columnHelper.accessor('supplier_id', {
            header: () => 'Current Stock',
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
        <>
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
                field={stockReportFilterData}
                title={'Report'}
                col={6}
            />
            {/* End Popup Form Layout */}
        </>
    );
};

export default React.memo(BrandWaysStock);
