import React, { useState, useMemo, useCallback } from 'react';
import { Chip, Typography, Tooltip, IconButton } from '@mui/material';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import TableLayout from '../../components/custom-table/table-layout';
import {
  notificationFilterFormData,
  notificationProductsTableData,
} from '../../components/form-field';
import { createColumnHelper } from '@tanstack/react-table';
import { IconCheckbox, IconEdit, IconTrash } from '@tabler/icons';
import PopupFormLayout from '../../components/custom-form/popup-from-layout';
import { CreateSuccessful } from '../../utils/AlertDialog';

const Notification = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [tableData, setTableData] = useState(notificationProductsTableData);
  const [formData, setFormData] = useState('');
  const [search, setSearch] = useState('');
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState({ status: false, editId: '' });

  const BCrumb = useMemo(
    () => [{ to: '/', title: 'Home' }, { title: 'Product Notification List' }],
    [],
  );

  const handleDownload = useCallback(() => {
    const headers = ['S.No', 'Notification Name'];
    const rows = tableData.map((item, index) => [index + 1, item.category_title]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
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

  const handleDelete = useCallback((id) => {});

  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row, {
        id: 'sno',
        header: () => 'S.no',
        cell: (info) => <Typography>{info.row.index + 1}</Typography>,
      }),
      columnHelper.accessor((row) => row, {
        id: 'package_name',
        header: () => 'User Name',
        cell: ({ row }) => row.original.user_info?.full_name,
      }),
      columnHelper.accessor((row) => row, {
        id: 'user_info',
        header: () => 'Location',
        cell: ({ row }) => row.original.user_info?.location,
      }),
      columnHelper.accessor((row) => row, {
        id: 'product_info',
        header: () => 'Product Title',
        cell: ({ row }) => <Typography>{row.original.product_info?.title}</Typography>,
      }),
   
      columnHelper.accessor((row) => row, {
        id: 'status',
        header: () => 'Status',
        cell: (info) => {
          const { status } = info.row.original;
          return (
            <Typography>
              <Chip
                label={status.charAt(0).toUpperCase() + status.slice(1)}
                color={status === 'approved' ? 'success' : 'error'}
                sx={{
                  height: '100%',
                  lineHeight: 1.3,
                  textAlign: 'center',
                  py: '5px',
                  fontSize: '10px',
                }}
              />
            </Typography>
          );
        },
      }),
      columnHelper.accessor((row) => row, {
        id: 'action',
        header: () => 'Action',
        cell: (info) => {
          const { status } = info.row.original;
          return (
            <Typography>
              {status != 'approved' && (
                <Tooltip title="Accept">
                  <IconButton color="success" onClick={() => handleEdit(info.row.original)}>
                    <IconCheckbox width={22} />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="Delete">
                <IconButton color="error" onClick={() => handleDelete(info.row.original.id)}>
                  <IconTrash width={22} />
                </IconButton>
              </Tooltip>
            </Typography>
          );
        },
      }),
    ],
    [handleEdit, handleDelete],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('formData', formData);
    setShowDrawer(false);
    CreateSuccessful();
  };

  return (
    <PageContainer title="Notification Details" description="this is Notification Form page">
      <Breadcrumb title="Notification Information" items={BCrumb} />

      {/*Table Layout */}
      <TableLayout
        setShowDrawer={setShowDrawer}
        handleDownload={handleDownload}
        tableData={tableData}
        columns={columns}
        search={search}
        handleSearch={handleSearch}
        title={'Notification'}
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
        field={notificationFilterFormData}
        title={'Notification'}
        col={6}
      />
      {/* End Popup Form Layout */}
    </PageContainer>
  );
};

export default React.memo(Notification);
