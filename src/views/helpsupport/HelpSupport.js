import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Typography,
  Tooltip,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import TableLayout from '../../components/custom-table/table-layout';
import { helpSupportFormData } from '../../components/form-field';
import { createColumnHelper } from '@tanstack/react-table';
import { IconEdit, IconTrash } from '@tabler/icons';
import PopupFormLayout from '../../components/custom-form/popup-from-layout';
import req from '../../utils/req';
import AlertMessage from '../../components/utility/AlertMessage';
import { CreateSuccessful } from '../../utils/AlertDialog';
import SupportChatModal from './SupportChatModal';
import SupportChatWindow from './SupportChatWindow';
import { IconMessages } from '@tabler/icons';
import { Grid, Box } from '@mui/material';

const HelpSupport = () => {
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

  // Chat specific states
  const [chatOpen, setChatOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null); // { id, info }
  const [initialCategory, setInitialCategory] = useState('');

  const BCrumb = useMemo(() => [{ to: '/', title: 'Home' }, { title: 'Help Support' }], []);

  const handleDownload = useCallback(() => {
    const headers = ['S.No', 'Price Name'];
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
    getTableData(currentPage, 10);
  }, [currentPage, search]);

  const getTableData = async (page, size, search = '') => {
    try {
      const response = await req().get(
        `/helpsupport/all?size=${size}&page=${page}&search=${search}`,
      );

      console.log(response.data);

      if (response.data?.status) {
        const rows = response.data.data.map((item) => ({
          id: item.helpsupport_id,
          email: item.email,
          title: item.title,
          content: item.content,
          contenttype: item.contenttype,
          mobile: item.mobile,
          supporthours: item.supporthours,
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
    // console.log(data);
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
      selectedData.status = selectedData.status === 'active' ? true : false;
      console.log(selectedData);

      const response = await req().delete(`/helpsupport/delete/${selectedData.id}`);
      if (response.data.status) {
        setAlertMessage({
          status: true,
          message: response?.data?.meta?.message ?? 'Help Support deleted successfully.',
          color: 'success',
        });
        getTableData(currentPage, 10);
      } else {
        setAlertMessage({
          status: true,
          message: response?.data?.meta?.message ?? 'Failed to delete Help Support.',
          color: 'error',
        });
      }
    } catch (error) {
      setAlertMessage({
        status: true,
        message:
          error?.response?.data?.meta?.message ??
          'An error occurred while deleting the Help Support.',
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

  const onStartChatSubmit = async (data) => {
    try {
      const res = await req().post('/support/chat/start', {
        ...data,
        help_page_url: window.location.href
      });
      setActiveChat({ id: res.data.data.chat_id, info: res.data.data });
      setChatOpen(false);
    } catch (err) {
      console.error(err);
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
      columnHelper.accessor('contenttype', {
        header: () => 'Content Type',
        cell: (info) => <Typography>{info.getValue()}</Typography>,
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
      columnHelper.accessor('email', {
        header: () => 'Contact Email',
        cell: (info) => <Typography>{info.getValue()}</Typography>,
      }),
      columnHelper.accessor('supporthours', {
        header: () => 'Support Hours',
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
            <Tooltip title="Ask About This">
              <IconButton color="primary" onClick={() => {
                setInitialCategory(info.row.original.contenttype);
                setChatOpen(true);
              }}>
                <IconMessages width={22} />
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

        formData.status = formData.status === 'active' ? true : false;

        console.log(formData);
        const response = await req().put(`/helpsupport/update/${formData.id}`, formData);
        if (response.data.status == true) {
          setShowDrawer(false);
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'Help Support has been Update.',
            color: 'success',
          });
          getTableData(currentPage, 10);
        } else {
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'Help Support has not been Update.',
            color: 'error',
          });
        }
      } catch (error) {
        setAlertMessage({
          status: true,
          message: error?.response?.data?.meta?.message ?? 'Help Support has not been Update.',
          color: 'error',
        });
      }
    } else {
      try {

        formData.status = formData.status === 'active' ? true : false;
        console.log(formData);
        const response = await req().post('/helpsupport/add', formData);
        if (response.data.status == true) {
          setShowDrawer(false);
          CreateSuccessful();
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'Help Support has been created.',
            color: 'success',
          });

          getTableData(currentPage, 10);
        } else {
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'Help Support has not been created.',
            color: 'error',
          });
        }
      } catch (error) {
        setAlertMessage({
          status: true,
          message: error?.response?.data?.meta?.message ?? 'Help Support has not been Created.',
          color: 'error',
        });
      }
    }
  };

  return (
    <>
      <PageContainer title="Help Support Details" description="this is Help Support Form page">
        <Breadcrumb title="Help Support Information" items={BCrumb} />

        <Grid container spacing={3}>
          <Grid item xs={12} lg={activeChat ? 7 : 12}>
            {/*Table Layout */}
            <TableLayout
              setShowDrawer={setShowDrawer}
              handleDownload={handleDownload}
              tableData={tableData}
              columns={columns}
              search={search}
              handleSearch={handleSearch}
              title={'Help Support'}
              onClickFormButton={true}
              getTableData={getTableData}
              totalRows={totalRows}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
            {/* End Table Layout */}
          </Grid>
          {activeChat && (
            <Grid item xs={12} lg={5}>
              <SupportChatWindow
                chatId={activeChat.id}
                chatInfo={activeChat.info}
                onEndChat={() => setActiveChat(null)}
              />
            </Grid>
          )}
        </Grid>

        {/* Existing Modals and Dialogs */}
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
          field={helpSupportFormData}
          title={'Help Support'}
          col={6}
        />

        <SupportChatModal
          open={chatOpen}
          onClose={() => setChatOpen(false)}
          onStartChat={onStartChatSubmit}
          initialCategory={initialCategory}
        />

        {/* End Popup Form Layout */}
      </PageContainer>
      <AlertMessage alertMessage={alertMessage} setAlertMessage={setAlertMessage} />
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
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
      </Dialog>
    </>
  );
};

export default React.memo(HelpSupport);
