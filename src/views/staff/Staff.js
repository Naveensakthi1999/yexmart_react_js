import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Typography,
  Tooltip,
  IconButton,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import TableLayout from 'src/components/custom-table/table-layout';
import { staffFormData } from '../../components/form-field';
import { createColumnHelper } from '@tanstack/react-table';
import { IconEdit, IconTrash } from '@tabler/icons';
import PopupFormLayout from '../../components/custom-form/popup-from-layout';
import { CreateSuccessful } from '../../utils/AlertDialog';
import req from '../../utils/req';
import AlertMessage from '../../components/utility/AlertMessage';

const Staff = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState('');
  const [search, setSearch] = useState('');
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState({ status: false, editId: '' });
  const [alertMessage, setAlertMessage] = useState({ status: false, message: '', color: '' });
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const BCrumb = useMemo(() => [{ to: '/', title: 'Home' }, { title: 'Staff List' }], []);

  const handleDownload = useCallback(() => {
    const headers = ['S.No', 'Staff Name'];
    const rows = tableData.map((item, index) => [index + 1, item.staff_name]);

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
      getStaff(currentPage, 10, search);
    }
    getStaff(currentPage, 10);
  }, [currentPage, search]);

  const getStaff = async (page, size, search = '') => {
    try {
      const response = await req().get(`/staff?size=${size}&page=${page}&search=${search}`);

      console.log(response.data);

      if (response.data?.status) {
        const user = response.data.data.map((item) => ({
          id: item.user_id,
          fullname: item.fullname,
          mobile: item.mobile,
          location: item.location,
          role: item.role,
          // clientimage: item.image?.dataURI || null,
          email: item.email,
          ispremium: item.ispremium,
          status: item.status,
        }));

        setTableData(user);
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

  const handleSearch = useCallback((event) => setSearch(event.target.value), []);

  const handleEdit = useCallback((data) => {
    console.log(data);
    setFormData({
      ...data,
      ispremium: data.ispremium === true ? 'active' : 'inactive',
      status: data.status === true ? 'active' : 'inactive',
    });

    console.log(setFormData);

    setErrors({});
    setIsEdit({ status: true, editId: data.id });
    setShowDrawer(true);
  }, []);

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      selectedData.status = selectedData.status === 'active' ? true : false;
      (selectedData.ispremium = selectedData.ispremium === 'active' ? true : false),
        console.log(selectedData);

      const response = await req().delete(`/user/${selectedData.id}`);
      if (response.data.status) {
        setAlertMessage({
          status: true,
          message: response?.data?.meta?.message ?? 'User deleted successfully.',
          color: 'success',
        });
        getStaff(currentPage, 10);
      } else {
        setAlertMessage({
          status: true,
          message: response?.data?.meta?.message ?? 'Failed to delete User.',
          color: 'error',
        });
      }
    } catch (error) {
      setAlertMessage({
        status: true,
        message:
          error?.response?.data?.meta?.message ?? 'An error occurred while deleting the User.',
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
      columnHelper.accessor('fullname', {
        header: () => 'Staff',
        cell: (info) => <Typography>{info.getValue()}</Typography>,
      }),
      columnHelper.accessor('mobile', {
        header: () => 'Mobile Number',
        cell: (info) => <Typography>{info.getValue()}</Typography>,
      }),
      // columnHelper.accessor('location', {
      //   header: () => 'Location',
      //   cell: (info) => <Typography>{info.getValue()}</Typography>,
      // }),
      columnHelper.accessor('email', {
        header: () => 'Mail Id',
        cell: (info) => <Typography>{info.getValue()}</Typography>,
      }),
      columnHelper.accessor('role', {
        header: () => 'Role',
        cell: (info) => {
          const role = info.getValue();
          const roleMap = { 3: 'Staff', 4: 'Admin', 5: 'Super Admin' };
          return <Typography>{roleMap[role] || role}</Typography>;
        },
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
    console.log('formData', formData);
    if (isEdit.status) {
      try {
        formData.status = formData.status === 'active' ? true : false;
        formData.ispremium = formData.ispremium === 'active' ? true : false;

        console.log(formData);
        const response = await req().put(`/user/${formData.id}`, formData);
        if (response.data.status == true) {
          setShowDrawer(false);
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'User has been Update.',
            color: 'success',
          });
          getStaff(currentPage, 10);
        } else {
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'User has not been Update.',
            color: 'error',
          });
        }
      } catch (error) {
        setAlertMessage({
          status: true,
          message: error?.response?.data?.meta?.message ?? 'User has not been Update.',
          color: 'error',
        });
      }
    } else {
      try {
        console.log(formData);
        formData.status = formData.status === 'active' ? true : false;
        console.log(formData);
        const response = await req().post('/staff/add', formData);
        if (response.data.status == true) {
          setShowDrawer(false);
          CreateSuccessful();
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'Terms & Conditions has been created.',
            color: 'success',
          });

          getStaff(currentPage, 10);
        } else {
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'Terms & Conditions has not been created.',
            color: 'error',
          });
        }
      } catch (error) {
        setAlertMessage({
          status: true,
          message:
            error?.response?.data?.meta?.message ?? 'Terms & Conditions has not been Created.',
          color: 'error',
        });
      }
    }
  };

  return (
    <>
      <PageContainer title="Staff Details" description="this is Staff Form page">
        <Breadcrumb title="Staff Information" items={BCrumb} />

        {/*Table Layout */}
        <TableLayout
          setShowDrawer={setShowDrawer}
          handleDownload={handleDownload}
          tableData={tableData}
          columns={columns}
          search={search}
          handleSearch={handleSearch}
          title={'Staff'}
          onClickFormButton={true}
          getTableData={getStaff}
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
          field={staffFormData}
          title={'Staff'}
          col={6}
        />
        {/* End Popup Form Layout */}
      </PageContainer>
      <AlertMessage alertMessage={alertMessage} setAlertMessage={setAlertMessage} />
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <strong>{selectedData?.fullname}</strong>?
        </DialogContent>
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

export default React.memo(Staff);
