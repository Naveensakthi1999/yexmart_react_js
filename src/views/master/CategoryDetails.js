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
import { categoryFormData } from '../../components/form-field';
import { createColumnHelper } from '@tanstack/react-table';
import { IconEdit, IconTrash } from '@tabler/icons';
import PopupFormLayout from '../../components/custom-form/popup-from-layout';
import req from '../../utils/req';
import AlertMessage from '../../components/utility/AlertMessage';
import { CreateSuccessful } from '../../utils/AlertDialog';

const CategoryDetails = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState([]);
  const [search, setSearch] = useState('');
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState({ status: false, editId: '' });
  const [alertMessage, setAlertMessage] = useState({ status: false, message: '', color: '' });
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedData, setSelectedData] = useState();

  const BCrumb = useMemo(() => [{ to: '/', title: 'Home' }, { title: 'Category List' }], []);

  const handleDownload = useCallback(() => {
    const headers = ['S.No', 'Category Name'];
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

  useEffect(() => {
    if (search) {
      getTableData(currentPage, 10, search);
    }
  }, [currentPage, search]);

  const getTableData = async (page, size, search = '') => {
    try {
      const response = await req().get(`/category/all?size=${size}&page=${page}&search=${search}`);

      console.log(response.data);

      if (response.data?.status) {
        const rows = response.data.data.map((item) => ({
          id: item.category_id,
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
          error?.response?.data?.meta?.message ??
          'An error occurred while getting the category list.',
        color: 'error',
      });
    }
  };

  const handleSearch = useCallback((event) => setSearch(event.target.value), []);

  const handleEdit = useCallback((data) => {
    console.log(data);
    setFormData({
      ...data,
      status: data.status === true ? 'active' : 'inactive',
    });

    setErrors({});
    setIsEdit({ status: true, editId: data.id });
    setShowDrawer(true);
  }, []);

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      console.log(selectedData);

      selectedData.status = selectedData.status === 'active' ? true : false;
      const response = await req().delete(`/category/delete/${selectedData.id}`);
      if (response.data.status) {
        setAlertMessage({
          status: true,
          message: response?.data?.meta?.message ?? 'category deleted successfully.',
          color: 'success',
        });
        getTableData(currentPage, 10);
      } else {
        setAlertMessage({
          status: true,
          message: response?.data?.meta?.message ?? 'Failed to delete category.',
          color: 'error',
        });
      }
    } catch (error) {
      setAlertMessage({
        status: true,
        message:
          error?.response?.data?.meta?.message ?? 'An error occurred while deleting the category.',
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

  // show all data
  useEffect(() => {
    getTableData(currentPage, 10, '');
  }, [currentPage]);

  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row, {
        id: 'sno',
        header: () => 'S.no',
        cell: (info) => <Typography>{info.row.index + 1}</Typography>,
      }),
      columnHelper.accessor('title', {
        header: () => 'Category Title',
        cell: (info) => <Typography>{info.getValue()}</Typography>,
      }),
      columnHelper.accessor((row) => row, {
        id: 'status',
        header: () => 'Status',
        cell: (info) => {
          const { status } = info.row.original;
          return (
            <Typography>
              <Chip
                label={status === true ? 'active' : 'inactive'} // Capitalize first letter
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
        console.log(formData);

        formData.status = formData.status === 'active' ? true : false;

        console.log(formData);

        const response = await req().put(`/category/update/${formData.id}`, formData);
        if (response.data.status == true) {
          setShowDrawer(false);
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'category has been Update.',
            color: 'success',
          });
          getTableData(currentPage, 10);
        } else {
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'category has not been Update.',
            color: 'error',
          });
        }
      } catch (error) {
        setAlertMessage({
          status: true,
          message: error?.response?.data?.meta?.message ?? 'category has not been Update.',
          color: 'error',
        });
      }
    } else {
      try {
        console.log(formData);

        formData.status = formData.status === 'active' ? true : false;

        console.log(formData);

        const response = await req().post('/category/add', formData);
        if (response.data.status == true) {
          setShowDrawer(false);
          CreateSuccessful();
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'category has been created.',
            color: 'success',
          });

          getTableData(currentPage, 10);
        } else {
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'category has not been created.',
            color: 'error',
          });
        }
      } catch (error) {
        setAlertMessage({
          status: true,
          message: error?.response?.data?.meta?.message ?? 'category has not been Created.',
          color: 'error',
        });
      }
    }
  };

  return (
    <>
      <PageContainer title="Category Details" description="this is Category Form page">
        <Breadcrumb title="Category Information" items={BCrumb} />

        {/*Table Layout */}
        <TableLayout
          setShowDrawer={setShowDrawer}
          handleDownload={handleDownload}
          totalRows={totalRows}
          tableData={tableData}
          columns={columns}
          search={search}
          handleSearch={handleSearch}
          title={'Category'}
          onClickFormButton={true}
          getTableData={getTableData}
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
          field={categoryFormData}
          title={'Category'}
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

export default React.memo(CategoryDetails);
