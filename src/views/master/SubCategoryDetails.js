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
import { subCategoryFormData } from '../../components/form-field';
import { createColumnHelper } from '@tanstack/react-table';
import { IconEdit, IconTrash } from '@tabler/icons';
import PopupFormLayout from '../../components/custom-form/popup-from-layout';
import req from '../../utils/req';
import AlertMessage from '../../components/utility/AlertMessage';
import { CreateSuccessful } from '../../utils/AlertDialog';

const SubCategoryDetails = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({});
  const [search, setSearch] = useState('');
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState({ status: false, editId: '' });
  const [alertMessage, setAlertMessage] = useState({ status: false, message: '', color: '' });
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [categories, setCategories] = useState([]);
  const [formFields, setFormFields] = useState(subCategoryFormData);

  const BCrumb = useMemo(() => [{ to: '/', title: 'Home' }, { title: 'Sub Category List' }], []);

  useEffect(() => {
    getTableData(currentPage, 10, search);
  }, [currentPage, search]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add this useEffect to debug
  useEffect(() => {
    console.log('formFields updated:', formFields);
  }, [formFields]);

  const fetchCategories = async () => {
    try {
      const response = await req().get('/category/all');
      console.log('Categories loaded:', response.data.data);

      if (response.data?.status) {
        const categoryOptions = response.data.data.map((category) => ({
          label: category.title,
          value: category.category_id || category.id,
        }));

        console.log('Categories updated:', categoryOptions);
        setCategories(categoryOptions);

        // FIX: Look for 'category_name' instead of 'category_id'

        setFormFields((prevFormFields) =>
          prevFormFields.map((field) => {
            if (field.name === 'category_name') {
              // Changed from 'category_id'
              console.log('Updating category field with options:', categoryOptions);
              return {
                ...field,
                name: 'category_id',
                id: 'category_id',
                options: categoryOptions,
              };
            }
            return field;
          }),
        );
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  useEffect(() => {
    console.log('Categories updated:', categories);
  }, [categories]);

  const getTableData = async (page, size, search = '') => {
    try {
      const response = await req().get(
        `/subcategory/all?size=${size}&page=${page}&search=${search}`,
      );

      if (response.data?.status) {
        const rows = response.data.data.map((item) => ({
          id: item.subcategory_id,
          title: item.title,
          status: item.status,
          category_id: item.category_id,
          category_name: item.category?.title || 'No Category',
        }));

        setTableData(rows);
        setTotalRows(response.data.meta?.total || response.data.total || 0);
      } else {
        setAlertMessage({
          status: true,
          message: response.data?.meta?.message || 'Failed to load data',
          color: 'error',
        });
        setTableData([]);
        setTotalRows(0);
      }
    } catch (error) {
      console.error('Error fetching table data:', error);
      setAlertMessage({
        status: true,
        message:
          error?.response?.data?.meta?.message ??
          error?.response?.data?.message ??
          'An error occurred while getting the Subcategory list.',
        color: 'error',
      });
      setTableData([]);
      setTotalRows(0);
    }
  };

  const handleDownload = useCallback(() => {
    if (tableData.length === 0) {
      setAlertMessage({
        status: true,
        message: 'No data to download',
        color: 'warning',
      });
      return;
    }

    const headers = ['S.No', 'Category', 'Sub Category Name', 'Status'];
    const rows = tableData.map((item, index) => [
      index + 1,
      item.category_name,
      item.title,
      item.status ? 'Active' : 'Inactive',
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'subcategories.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [tableData]);

  const handleSearch = useCallback((event) => {
    const value = event.target.value;
    setSearch(value);
    setCurrentPage(1);
  }, []);

  const handleEdit = useCallback((data) => {
    console.log('Editing data:', data);
    setFormData({
      id: data.id,
      title: data.title,
      category_id: data.category_id,
      status: data.status === true ? 'active' : 'inactive',
    });

    setErrors({});
    setIsEdit({ status: true, editId: data.id });
    setShowDrawer(true);
  }, []);

  const handleDelete = useCallback((data) => {
    setSelectedData(data);
    setOpenDeleteDialog(true);
  }, []);

  const handleConfirmDelete = async () => {
    if (!selectedData) return;

    try {
      const response = await req().delete(`/subcategory/delete/${selectedData.id}`);
      if (response.data.status) {
        setAlertMessage({
          status: true,
          message: response?.data?.meta?.message ?? 'Subcategory deleted successfully.',
          color: 'success',
        });
        getTableData(currentPage, 10, search);
      } else {
        setAlertMessage({
          status: true,
          message: response?.data?.meta?.message ?? 'Failed to delete Subcategory.',
          color: 'error',
        });
      }
    } catch (error) {
      setAlertMessage({
        status: true,
        message:
          error?.response?.data?.meta?.message ??
          'An error occurred while deleting the subcategory.',
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
        cell: (info) => <Typography>{(currentPage - 1) * 10 + info.row.index + 1}</Typography>,
      }),
      columnHelper.accessor('category_name', {
        header: () => 'Category',
        cell: (info) => <Typography>{info.getValue()}</Typography>,
      }),
      columnHelper.accessor('title', {
        header: () => 'Sub Category Title',
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
                label={status === true ? 'Active' : 'Inactive'}
                color={status === true ? 'success' : 'error'}
                sx={{
                  height: '24px',
                  lineHeight: 1.3,
                  textAlign: 'center',
                  fontSize: '12px',
                }}
              />
            </Typography>
          );
        },
      }),
      columnHelper.accessor((row) => row, {
        id: 'action',
        header: () => 'Actions',
        cell: (info) => (
          <Typography>
            <Tooltip title="Edit">
              <IconButton color="success" onClick={() => handleEdit(info.row.original)}>
                <IconEdit width={22} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton color="error" onClick={() => handleDelete(info.row.original)}>
                <IconTrash width={22} />
              </IconButton>
            </Tooltip>
          </Typography>
        ),
      }),
    ],
    [currentPage, handleEdit, handleDelete],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit.status) {
      try {
        console.log(formData);

        formData.status = formData.status === 'active' ? true : false;

        console.log(formData);

        const response = await req().put(`/subcategory/update/${formData.id}`, formData);
        if (response.data.status == true) {
          setShowDrawer(false);
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'sub category has been Update.',
            color: 'success',
          });
          getTableData(currentPage, 10);
        } else {
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'sub category has not been Update.',
            color: 'error',
          });
        }
      } catch (error) {
        setAlertMessage({
          status: true,
          message: error?.response?.data?.meta?.message ?? 'sub category has not been Update.',
          color: 'error',
        });
      }
    } else {
      try {
        console.log(formData);

        formData.status = formData.status === 'active' ? true : false;

        console.log(formData);

        const response = await req().post('/subcategory/add', formData);
        if (response.data.status == true) {
          setShowDrawer(false);
          CreateSuccessful();
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'sub category has been created.',
            color: 'success',
          });

          getTableData(currentPage, 10);
        } else {
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'sub category has not been created.',
            color: 'error',
          });
        }
      } catch (error) {
        setAlertMessage({
          status: true,
          message: error?.response?.data?.meta?.message ?? 'sub category has not been Created.',
          color: 'error',
        });
      }
    }
  };

  return (
    <>
      <PageContainer title="Sub Category Details" description="this is sub category Form page">
        <Breadcrumb title="Sub Category Information" items={BCrumb} />

        <AlertMessage alertMessage={alertMessage} setAlertMessage={setAlertMessage} />

        {/* Table Layout */}
        <TableLayout
          setShowDrawer={setShowDrawer}
          handleDownload={handleDownload}
          tableData={tableData}
          totalRows={totalRows}
          columns={columns}
          search={search}
          handleSearch={handleSearch}
          title={'Sub Category'}
          onClickFormButton={true}
          getTableData={getTableData}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
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
          field={formFields}
          title={'Sub Category'}
          col={6}
        />
        {/* End Popup Form Layout */}
      </PageContainer>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <strong>{selectedData?.title}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(SubCategoryDetails);
