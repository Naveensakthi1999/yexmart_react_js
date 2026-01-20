import React, { useState, useMemo, useCallback } from 'react';
import { Chip, Typography, Tooltip, IconButton } from '@mui/material';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import TableLayout from '../../components/custom-table/table-layout';
import { adTableData, adFormData } from '../../components/form-field';
import { createColumnHelper } from '@tanstack/react-table';
import { IconEdit, IconTrash } from '@tabler/icons';
import PopupFormLayout from '../../components/custom-form/popup-from-layout';
import { CreateSuccessful } from '../../utils/AlertDialog';

const AllAds = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [tableData, setTableData] = useState(adTableData);
  const [formData, setFormData] = useState('');
  const [search, setSearch] = useState('');
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState({ status: false, editId: '' });

  const BCrumb = useMemo(() => [{ to: '/', title: 'Home' }, { title: 'All Ads' }], []);

  const handleDownload = useCallback(() => {
    const headers = ['S.No', 'Ads'];
    const rows = tableData.map((item, index) => [index + 1, item.unit_title]);

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
      columnHelper.accessor('ads_title', {
        header: () => 'Ads Title',
        cell: (info) => <Typography>{info.getValue()}</Typography>,
      }),
      columnHelper.accessor('price', {
        header: () => 'Price',
        cell: (info) => <Typography>{info.getValue()}</Typography>,
      }),
      columnHelper.accessor('contact_email', {
        header: () => 'Posted By',
        cell: (info) => <Typography>{info.getValue()}</Typography>,
      }),
      columnHelper.accessor('expires_at', {
        header: () => 'Expires At',
        cell: (info) => {
          const date = new Date(info.getValue());
          return (
            <Typography>
              {date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </Typography>
          );
        },
      }),
      columnHelper.accessor((row) => row, {
        id: 'status',
        header: () => 'Status',
        cell: (info) => {
          const { status } = info.row.original;

          // Set color based on status
          const statusColor =
            {
              active: 'success',
              inactive: 'default',
              pending: 'warning',
              expired: 'error',
              rejected: 'error',
            }[status] || 'default';

          return (
            <Typography>
              <Chip
                label={status.charAt(0).toUpperCase() + status.slice(1)}
                color={statusColor}
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
        cell: (info) => (
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
    <PageContainer title="All Ads Details" description="this is All Ads Form page">
      <Breadcrumb title="All Ads Information" items={BCrumb} />

      {/*Table Layout */}
      <TableLayout
        setShowDrawer={setShowDrawer}
        handleDownload={handleDownload}
        tableData={tableData}
        columns={columns}
        search={search}
        handleSearch={handleSearch}
        title={'Ads'}
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
        field={adFormData}
        title={'Ads'}
        col={6}
      />
      {/* End Popup Form Layout */}
    </PageContainer>
  );
};

export default React.memo(AllAds);
