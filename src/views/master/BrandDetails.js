import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Chip,
  Typography,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import TableLayout from '../../components/custom-table/table-layout';
import { brandFormData } from '../../components/form-field';
import { createColumnHelper } from '@tanstack/react-table';
import { IconEdit, IconTrash } from '@tabler/icons';
import PopupFormLayout from '../../components/custom-form/popup-from-layout';
import AlertMessage from '../../components/utility/AlertMessage';
import req from '../../utils/req';
import { CreateSuccessful } from '../../utils/AlertDialog';

const BrandDetails = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [formData, setFormData] = useState('');
  const [search, setSearch] = useState('');
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState({ status: false, editId: '' });
  const [alertMessage, setAlertMessage] = useState({ status: false, message: '', color: '' });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedData, setSelectedData] = useState();

  const BCrumb = useMemo(() => [{ to: '/', title: 'Home' }, { title: 'Brand List' }], []);

  useEffect(() => {
    if (search) {
      getTableData(currentPage, 10, search);
    }
    getTableData(currentPage, 10, '');
  }, [currentPage, search]);

  const getTableData = async (page, size, search = '') => {
    try {
      const response = await req().get(`/brand/all?size=${size}&page=${page}&search=${search}`);

      console.log(response.data);

      if (response.data?.status) {
        const rows = response.data.data.map((item) => ({
          id: item.brand_id,
          title: item.title,
          status: item.status,
        }));

        setTableData(rows);
      }
      // console.log(response.data.meta.total);
      setTotalRows(response.data.meta.total);
    } catch (error) {
      setAlertMessage({
        status: true,
        message:
          error?.response?.data?.meta?.message ?? 'An error occurred while getting the brand list.',
        color: 'error',
      });
    }
  };

  const handleDownload = useCallback(() => {
    const headers = ['S.No', 'Brand Name', 'Description'];
    const rows = tableData.map((item, index) => [index + 1, item.brand_name, item.descp]);

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
    // console.log(data);
    setFormData({
      ...data,
      status: data.status === true ? 'active' : 'inactive',
    });

    setErrors({});
    setIsEdit({ status: true, editId: data.brand_id });
    setShowDrawer(true);
  }, []);

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      console.log(selectedData);

      selectedData.status = selectedData.status === 'active' ? true : false;
      const response = await req().delete(`/brand/delete/${selectedData.id}`);
      if (response.data.status) {
        setAlertMessage({
          status: true,
          message: response?.data?.meta?.message ?? 'Brand deleted successfully.',
          color: 'success',
        });
        getTableData(currentPage, 10);
      } else {
        setAlertMessage({
          status: true,
          message: response?.data?.meta?.message ?? 'Failed to delete brand.',
          color: 'error',
        });
      }
    } catch (error) {
      setAlertMessage({
        status: true,
        message:
          error?.response?.data?.meta?.message ?? 'An error occurred while deleting the brand.',
        color: 'error',
      });
    }
    setSelectedData();
    setOpenDeleteDialog(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedData();
  };

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row, {
        id: 'sno',
        header: () => 'S.no',
        cell: (info) => <Typography>{info.row.index + 1}</Typography>,
      }),
      columnHelper.accessor('title', {
        header: () => 'Brand Name',
        cell: (info) => <Typography>{info.getValue()}</Typography>,
      }),
      columnHelper.accessor('status', {
        cell: (info) => {
          const status = info.getValue();
          return (
            <Typography>
              <Chip
                label={status === true ? 'active' : 'inactive'}
                color={status === true ? 'success' : 'error'}
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
              <IconButton
                color="error"
                onClick={() => {
                  // console.log(info.row.original.id);
                  // console.log(info.row.original);
                  setSelectedData(info.row.original);
                  handleDelete();
                }}
              >
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
    if (isEdit.status) {
      try {
        // console.log(formData);

        formData.status = formData.status === 'active' ? true : false;

        const response = await req().put(`brand/update/${formData.id}`, formData);
        if (response.data.status == true) {
          setShowDrawer(false);
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'Brand has been Update.',
            color: 'success',
          });
          getTableData(currentPage, 10);
        } else {
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'Brand has not been Update.',
            color: 'error',
          });
        }
      } catch (error) {
        setAlertMessage({
          status: true,
          message: error?.response?.data?.meta?.message ?? 'Brand has not been Update.',
          color: 'error',
        });
      }
    } else {
      try {
        // console.log(formData);

        formData.status = formData.status === 'active' ? true : false;
        const response = await req().post('/brand/add', formData);
        if (response.data.status == true) {
          setShowDrawer(false);
          CreateSuccessful();
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'Brand has been created.',
            color: 'success',
          });

          getTableData(currentPage, 10);
        } else {
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'Brand has not been created.',
            color: 'error',
          });
        }
      } catch (error) {
        setAlertMessage({
          status: true,
          message: error?.response?.data?.meta?.message ?? 'Brand has not been Created.',
          color: 'error',
        });
      }
    }
  };

  return (
    <>
      <PageContainer title="Brand Details" description="this is Brand Form page">
        <Breadcrumb title="Brand Information" items={BCrumb} />

        {/*Table Layout */}
        <TableLayout
          setShowDrawer={setShowDrawer}
          handleDownload={handleDownload}
          tableData={tableData}
          columns={columns}
          search={search}
          handleSearch={handleSearch}
          title={'Brand'}
          onClickFormButton={true}
          getTableData={getTableData}
          totalRows={totalRows}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
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
          field={brandFormData}
          title={'Brand'}
          col={6}
        />
        {/* End Popup Form Layout */}
      </PageContainer>
      <AlertMessage alertMessage={alertMessage} setAlertMessage={setAlertMessage} />
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete <strong>{selectedData?.title}</strong>?</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDeleteDialog}>
            Cancel
          </Button>
          <Button color="error" variant="outlined" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(BrandDetails);
