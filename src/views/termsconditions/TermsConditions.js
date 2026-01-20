import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Typography,
  Tooltip,
  IconButton,
  // Dialog,
  // DialogTitle,
  // DialogContent,
  // DialogActions,
  // Button,
  Chip,
} from '@mui/material';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import TableLayout from '../../components/custom-table/table-layout';
import { termsFormData } from '../../components/form-field';
import { createColumnHelper } from '@tanstack/react-table';
import { IconEdit } from '@tabler/icons';
import PopupFormLayout from '../../components/custom-form/popup-from-layout';
import { CreateSuccessful } from '../../utils/AlertDialog';
import req from '../../utils/req';
import AlertMessage from '../../components/utility/AlertMessage';

const TermsConditions = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState([]);
  const [search, setSearch] = useState('');
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState({ status: false, editId: '' });
  const [alertMessage, setAlertMessage] = useState({ status: false, message: '', color: '' });
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  // const [selectedData, setSelectedData] = useState();

  const BCrumb = useMemo(() => [{ to: '/', title: 'Home' }, { title: 'Terms & Conditions' }], []);

  const handleDownload = useCallback(() => {
    const headers = ['S.No', 'Terms & Conditions'];
    const rows = tableData.map((item, index) => [index + 1, item.item_title]);

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
    console.log(data);
    setFormData({
      ...data,
      status: data.status === true ? 'active' : 'inactive',
    });

    setErrors({});
    setIsEdit({ status: true, editId: data.id });
    setShowDrawer(true);
  }, []);

  // const handleDelete = () => {
  //   setOpenDeleteDialog(true);
  // };

  // const handleConfirmDelete = async () => {
  //   console.log(selectedData);
  //   try {
  //     selectedData.status = selectedData.status === 'active' ? true : false;
  //     const response = await req().delete(`/termsconditions/delete/${selectedData.id}`);
  //     if (response.data.status) {
  //       setAlertMessage({
  //         status: true,
  //         message: response?.data?.meta?.message ?? 'Terms & Conditions deleted successfully.',
  //         color: 'success',
  //       });
  //       getTableData(currentPage, 10);
  //     } else {
  //       setAlertMessage({
  //         status: true,
  //         message: response?.data?.meta?.message ?? 'Failed to delete Terms & Conditions.',
  //         color: 'error',
  //       });
  //     }
  //   } catch (error) {
  //     setAlertMessage({
  //       status: true,
  //       message:
  //         error?.response?.data?.meta?.message ??
  //         'An error occurred while deleting the Terms & Conditions.',
  //       color: 'error',
  //     });
  //   }
  //   setSelectedData();
  //   setOpenDeleteDialog(false);
  // };

  // const handleCloseDeleteDialog = () => {
  //   setOpenDeleteDialog(false);
  //   setSelectedData();
  // };

  useEffect(() => {
    if (search) {
      getTableData(currentPage, 10, search);
    }
    getTableData(currentPage, 10);
  }, [currentPage, search]);

  const getTableData = async (page, size, search = '') => {
    try {
      const response = await req().get(
        `/termsconditions/all?size=${size}&page=${page}&search=${search}`,
      );

      console.log(response.data);

      if (response.data?.status) {
        const rows = response.data.data.map((item) => ({
          id: item.termsconditions_id,
          title: item?.title,
          content: item.content,
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

  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row, {
        id: 'sno',
        header: () => 'S.no',
        cell: (info) => <Typography>{info.row.index + 1}</Typography>,
      }),
      columnHelper.accessor('title', {
        header: () => 'Title',
        cell: (info) => <Typography>{info.getValue()}</Typography>,
      }),
      columnHelper.accessor('content', {
        header: () => 'Content',
        cell: (info) => {
          const value = info.getValue();
          return (
            <Typography
              sx={{
                whiteSpace: 'normal',
                lineHeight: 1.5,
                wordBreak: 'break-word',
              }}
            >
              {value}
            </Typography>
          );
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
            {/* <Tooltip title="Delete">
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
            </Tooltip> */}
          </Typography>
        ),
      }),
    ],
    [handleEdit],
    // [handleEdit, handleDelete],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit.status) {
      try {
        console.log(formData);
        formData.status = formData.status === 'active' ? true : false;
        const response = await req().put(`/termsconditions/update/${formData.id}`, formData);
        if (response.data.status == true) {
          setShowDrawer(false);
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? ' Terms & Conditions has been Update.',
            color: 'success',
          });
          getTableData(currentPage, 10);
        } else {
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'Terms & Conditions has not been Update.',
            color: 'error',
          });
        }
      } catch (error) {
        setAlertMessage({
          status: true,
          message:
            error?.response?.data?.meta?.message ?? 'Terms & Conditions has not been Update.',
          color: 'error',
        });
      }
    } else {
      try {
        console.log(formData);
        formData.status = formData.status === 'active' ? true : false;
        console.log(formData);
        const response = await req().post('/termsconditions/add', formData);
        if (response.data.status == true) {
          setShowDrawer(false);
          CreateSuccessful();
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'Terms & Conditions has been created.',
            color: 'success',
          });

          getTableData(currentPage, 10);
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
      <PageContainer
        title="Terms & Conditions Details"
        description="this is Terms & Conditions Form page"
      >
        <Breadcrumb title="Terms & Conditions Information" items={BCrumb} />

        {/*Table Layout */}
        <TableLayout
          setShowDrawer={setShowDrawer}
          handleDownload={handleDownload}
          tableData={tableData}
          columns={columns}
          search={search}
          handleSearch={handleSearch}
          title={'Terms & Conditions'}
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
          field={termsFormData}
          title={'Terms & Conditions'}
          col={6}
        />
        {/* End Popup Form Layout */}
      </PageContainer>
      <AlertMessage alertMessage={alertMessage} setAlertMessage={setAlertMessage} />
      {/* <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <strong>{selectedData?.title}</strong>?
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDeleteDialog}>
            Cancel
          </Button>
          <Button color="error" variant="outlined" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
};

export default React.memo(TermsConditions);
