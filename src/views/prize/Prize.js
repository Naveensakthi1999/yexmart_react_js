import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Chip,
  Typography,
  Tooltip,
  IconButton,
  DialogActions,
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
} from '@mui/material';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import TableLayout from '../../components/custom-table/table-layout';
import { adsPriceFormData } from '../../components/form-field';
import { createColumnHelper } from '@tanstack/react-table';
import { IconEdit, IconTrash } from '@tabler/icons';
import PopupFormLayout from '../../components/custom-form/popup-from-layout';
import { CreateSuccessful } from '../../utils/AlertDialog';
import AlertMessage from '../../components/utility/AlertMessage';
import req from '../../utils/req';

const Price = () => {
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
  const BCrumb = useMemo(() => [{ to: '/', title: 'Home' }, { title: 'Price List' }], []);

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
  const handleEdit = useCallback((data) => {
    console.log(data);
    setFormData({
      ...data,
      status: data.status,
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

      const response = await req().delete(`/adsprice/delete/${selectedData.id}`);
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

  useEffect(() => {
    if (search) {
      getTableData(currentPage, 10, search);
    }
    getTableData(currentPage, 10);
  }, [currentPage, search]);

  const getTableData = async (page, size, search = '') => {
    try {
      const response = await req().get(`/adsprice/all?size=${size}&page=${page}&search=${search}`);

      console.log(response.data);

      if (response.data?.status) {
        const rows = response.data.data.map((item) => ({
          id: item.adsprice_id,
          adspackagename: item.adspackagename,
          content: item.content,
          max_ads: item?.max_ads,
          billingcycle: item.billingcycle,
          price: item.price,
          expiry_day: item?.expiry_day,
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
      columnHelper.accessor('adspackagename', {
        header: () => 'Package Name',
        cell: (info) => <Typography>{info.getValue()}</Typography>,
      }),
      columnHelper.accessor('price', {
        header: () => 'Package Price',
        cell: (info) => <Typography>{info.getValue()}</Typography>,
      }),
      columnHelper.accessor('billingcycle', {
        header: () => 'Billing Cycle',
        cell: (info) => <Typography>{info.getValue()}</Typography>,
      }),
      columnHelper.accessor('expiry_day', {
        header: () => 'Expiry Day',
        cell: (info) => <Typography>{info.getValue()}</Typography>,
      }),
      columnHelper.accessor('content', {
        id: 'content',
        header: () => 'Features',
        cell: (info) => (
          <Typography
            sx={{
              whiteSpace: 'normal',
              lineHeight: 1.5,
              wordBreak: 'break-word',
            }}
          >
            {info.getValue()}
          </Typography>
        ),

        // cell: (info) => {
        //   const features = info.getValue();
        //   return (
        //     <Box component="ul" sx={{ pl: 1.5, m: 0, maxWidth: 200 }}>
        //       {features.map((feature, index) => (
        //         <Typography
        //           key={index}
        //           component="li"
        //           variant="body2"
        //           sx={{
        //             mb: 0.25,
        //             fontSize: '0.75rem',
        //             lineHeight: 1.3,
        //             display: 'list-item',
        //           }}
        //         >
        //           {feature}
        //         </Typography>
        //       ))}
        //     </Box>
        //   );
        // },
      }),
      columnHelper.accessor((row) => row, {
        id: 'status',
        header: () => 'Status',
        cell: (info) => {
          const { status } = info.row.original;
          return (
            <Typography>
              <Chip
                label={status.charAt(0).toUpperCase() + status.slice(1)} // Capitalize first letter
                color={status === 'active' ? 'success' : 'error'}
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

        const response = await req().put(`/adsprice/update/${formData.id}`, formData);
        if (response.data.status == true) {
          setShowDrawer(false);
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'Testimonial has been Update.',
            color: 'success',
          });
          getTableData(currentPage, 10);
        } else {
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'Testimonial has not been Update.',
            color: 'error',
          });
        }
      } catch (error) {
        setAlertMessage({
          status: true,
          message: error?.response?.data?.meta?.message ?? 'Testimonial has not been Update.',
          color: 'error',
        });
      }
    } else {
      try {
        console.log(formData);

        const response = await req().post('/adsprice/add', formData);
        if (response.data.status == true) {
          setShowDrawer(false);
          CreateSuccessful();
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'Testimonial has been created.',
            color: 'success',
          });
          getTableData(currentPage, 10);
        } else {
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message ?? 'Testimonial has not been created.',
            color: 'error',
          });
        }
      } catch (error) {
        setAlertMessage({
          status: true,
          message: error?.response?.data?.meta?.message ?? 'Ads Price has not been Created.',
          color: 'error',
        });
      }
    }
  };

  return (
    <>
      <PageContainer title="Ads Price Details" description="this is Ads Price Form page">
        <Breadcrumb title="Ads Price Information" items={BCrumb} />

        {/*Table Layout */}
        <TableLayout
          setShowDrawer={setShowDrawer}
          handleDownload={handleDownload}
          tableData={tableData}
          columns={columns}
          search={search}
          handleSearch={handleSearch}
          title={'Ads Price'}
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
          field={adsPriceFormData}
          title={'Ads Price'}
          col={6}
        />
        {/* End Popup Form Layout */}
      </PageContainer>
      <AlertMessage alertMessage={alertMessage} setAlertMessage={setAlertMessage} />
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <strong>{selectedData?.adspackagename}</strong>?
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

export default React.memo(Price);
