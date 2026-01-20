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
  Avatar,
} from '@mui/material';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import TableLayout from '../../components/custom-table/table-layout';
import { testimonialFormData } from '../../components/form-field';
import { createColumnHelper } from '@tanstack/react-table';
import { IconEdit, IconTrash } from '@tabler/icons';
import PopupFormLayout from '../../components/custom-form/popup-from-layout';
import req from '../../utils/req';
import AlertMessage from '../../components/utility/AlertMessage';
import { CreateSuccessful } from '../../utils/AlertDialog';

const Testimonial = () => {
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

  const BCrumb = useMemo(() => [{ to: '/', title: 'Home' }, { title: 'Testimonial' }], []);

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

  const handleSearch = useCallback((event) => setSearch(event.target.value), []);

  useEffect(() => {
    if (search) {
      getTableData(currentPage, 10, search);
    }
    getTableData(currentPage, 10);
  }, [currentPage, search]);

  const getTableData = async (page, size, search = '') => {
    try {
      const response = await req().get(
        `/testimonial/all?size=${size}&page=${page}&search=${search}`,
      );

      console.log('API Response:', response.data);
      console.log('First item image data:', response.data.data[0]?.image);

      if (response.data?.status) {
        const rows = response.data.data.map((item) => ({
          id: item.testimonial_id,
          clientname: item.clientname,
          clientprofession: item.clientprofession,
          testimonialcontent: item.testimonialcontent,
          clientimage: item.image?.dataURI || null,
          rating: item.rating,
          status: item.status,
        }));

        setTableData(rows);
        console.log(rows);
      }
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

  const handleEdit = useCallback((data) => {
    console.log(data);
    // setFormData({
    //   ...data,
    //   status: data.status === true ? 'active' : 'inactive',
    // });
    console.log(data.clientimage);

    let clientimageValue = null;
    if (data.clientimage) { 
      clientimageValue = data.clientimage;
      // console.log('Client Value:', clientimageValue);
    }

    setFormData({
      ...data,
      status: data.status === true ? 'active' : 'inactive',
      clientimage: clientimageValue,  
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
      const response = await req().delete(`/testimonial/delete/${selectedData.id}`);
      if (response.data.status) {
        setAlertMessage({
          status: true,
          message: response?.data?.meta?.message ?? 'Testimonial deleted successfully.',
          color: 'success',
        });
        getTableData(currentPage, 10);
      } else {
        setAlertMessage({
          status: true,
          message: response?.data?.meta?.message ?? 'Failed to delete Testimonial.',
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
      columnHelper.accessor('clientname', {
        header: () => 'Client Name',
        cell: (info) => <Typography>{info.getValue()}</Typography>,
      }),
      columnHelper.accessor('clientprofession', {
        header: () => 'Client Profession',
        cell: (info) => <Typography>{info.getValue()}</Typography>,
      }),
      columnHelper.accessor('clientimage', {
        header: () => 'Client Image',
        cell: (info) => {
          const imageUrl = info.getValue();
          return <Avatar alt="Client Image" src={imageUrl} sx={{ width: 40, height: 40 }} />;
        },
      }),
      columnHelper.accessor('rating', {
        header: () => 'Rating',
        cell: (info) => <Typography>{info.getValue()}</Typography>,
      }),
      columnHelper.accessor('testimonialcontent', {
        header: () => 'Testimonial Content',
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

    // console.log('=== SUBMITTING FORM ===');
    console.log('Original Form Data:', formData);

    // Create FormData object
    const fd = new FormData();

    // Append all form fields
    Object.keys(formData).forEach((key) => {
      // Handle file input differently
      if (key === 'clientimage' && formData[key] instanceof File) {
        fd.append(key, formData[key]);
      }
      // Handle status (convert to boolean)
      else if (key === 'status') {
        const statusValue = formData[key] === 'active' ? true : false;
        fd.append(key, statusValue);
      }
      // Handle other fields
      else if (formData[key] !== undefined && formData[key] !== null && formData[key] !== '') {
        fd.append(key, formData[key]);
      }
    });

    // Debug FormData contents
    console.log('=== FormData Contents ===');
    for (let pair of fd.entries()) {
      console.log(pair[0] + ': ', pair[1], typeof pair[1]);
    }

    if (isEdit.status) {
      try {
        // For edit, we need to send the id
        fd.append('id', formData.id);

        const response = await req().put(`/testimonial/update/${formData.id}`, fd, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data.status === true) {
          setShowDrawer(false);
          CreateSuccessful();
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'Testimonial has been updated.',
            color: 'success',
          });
          getTableData(currentPage, 10);
          // Reset form
          setFormData('');
          setIsEdit({ status: false, editId: '' });
        } else {
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'Testimonial has not been updated.',
            color: 'error',
          });
        }
      } catch (error) {
        console.error('Update error:', error);
        setAlertMessage({
          status: true,
          message: error?.response?.data?.meta?.message ?? 'Testimonial has not been updated.',
          color: 'error',
        });
      }
    } else {
      try {
        // For create, ensure all required fields are present
        const response = await req().post('/testimonial/add', fd, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data.status === true) {
          setShowDrawer(false);
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'Testimonial has been created.',
            color: 'success',
          });
          getTableData(currentPage, 10);
          // Reset form
          setFormData('');
        } else {
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'Testimonial has not been created.',
            color: 'error',
          });
        }
      } catch (error) {
        console.error('Create error:', error);
        setAlertMessage({
          status: true,
          message: error?.response?.data?.meta?.message ?? 'Testimonial has not been created.',
          color: 'error',
        });
      }
    }
  };

  return (
    <>
      <PageContainer title="Testimonial Details" description="this is Testimonial Form page">
        <Breadcrumb title="Testimonial Information" items={BCrumb} />

        {/*Table Layout */}
        <TableLayout
          setShowDrawer={setShowDrawer}
          handleDownload={handleDownload}
          tableData={tableData}
          columns={columns}
          search={search}
          handleSearch={handleSearch}
          title={'Testimonial'}
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
          field={testimonialFormData}
          title={'Testimonial'}
          col={6}
        />
        {/* End Popup Form Layout */}
      </PageContainer>
      <AlertMessage alertMessage={alertMessage} setAlertMessage={setAlertMessage} />
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete?</DialogContent>
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

export default React.memo(Testimonial);
