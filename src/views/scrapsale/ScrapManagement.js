import React, { useState, useMemo, useEffect } from 'react';
import { Chip, Tooltip, IconButton, Box, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import TableLayout from '../../components/custom-table/table-layout';
import { createColumnHelper } from '@tanstack/react-table';
import { IconEdit, IconTrash, IconDownload } from '@tabler/icons';
import PopupFormLayout from '../../components/custom-form/popup-from-layout';
import { scrapProductFormData, scrapSaleFormData } from '../../components/form-field';
import axios from '../../utils/req';
import { CreateSuccessful, UpdateSuccessful, DeleteSuccessful } from '../../utils/AlertDialog';

const ScrapManagement = () => {
    const [tab, setTab] = useState('1');
    const [products, setProducts] = useState([]);
    const [sales, setSales] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filteredSales, setFilteredSales] = useState([]);
    const [showDrawer, setShowDrawer] = useState(false);
    const [formData, setFormData] = useState({});
    const [isEdit, setIsEdit] = useState({ status: false, editId: '' });
    const [errors, setErrors] = useState({});
    const [search, setSearch] = useState('');

    const BCrumb = useMemo(() => [
        { to: '/', title: 'Home' },
        { title: 'Scrap Sale' }
    ], []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('/scrap/product');
            setProducts(res.data.data);
            setFilteredProducts(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchSales = async () => {
        try {
            const res = await axios.get('/scrap/sale');
            setSales(res.data.data);
            setFilteredSales(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchSales();
    }, []);

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
        setSearch('');
    };

    useEffect(() => {
        if (tab === '1') {
            const filtered = products.filter(p =>
                p.product_name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            const filtered = sales.filter(s =>
                s.buyer_name.toLowerCase().includes(search.toLowerCase()) ||
                (s.product?.product_name && s.product.product_name.toLowerCase().includes(search.toLowerCase()))
            );
            setFilteredSales(filtered);
        }
    }, [search, products, sales, tab]);

    const handleDownload = () => {
        const reportData = tab === '1' ? products : sales;
        const headers = tab === '1'
            ? ['S.No', 'Product Name', 'Stock', 'Unit', 'Status']
            : ['S.No', 'Buyer Name', 'Product', 'Quantity', 'Amount', 'Date'];

        const rows = reportData.map((item, index) => {
            if (tab === '1') {
                return [index + 1, item.product_name, item.total_quantity, item.unit, item.status ? 'Active' : 'Inactive'];
            }
            return [index + 1, item.buyer_name, item.product?.product_name, item.quantity, item.total_amount, item.sale_date];
        });

        const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `scrap_${tab === '1' ? 'products' : 'sales'}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleEdit = (data) => {
        setFormData(data);
        setIsEdit({ status: true, editId: data.scrap_product_id || data.scrap_sale_id });
        setShowDrawer(true);
    };

    const handleDelete = async (id, type) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                const url = type === 'product' ? `/scrap/product/${id}` : `/scrap/sale/${id}`;
                await axios.delete(url);
                DeleteSuccessful();
                type === 'product' ? fetchProducts() : fetchSales();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (tab === '1') {
                if (isEdit.status) {
                    await axios.put(`/scrap/product/${isEdit.editId}`, formData);
                    UpdateSuccessful();
                } else {
                    await axios.post('/scrap/product', formData);
                    CreateSuccessful();
                }
                fetchProducts();
            } else {
                await axios.post('/scrap/sale', formData);
                CreateSuccessful();
                fetchSales();
                fetchProducts(); // Refresh product quantities
            }
            setShowDrawer(false);
        } catch (err) {
            console.error(err);
        }
    };

    const productColumnHelper = createColumnHelper();
    const productColumns = [
        productColumnHelper.accessor((row, index) => index + 1, {
            id: 'sno',
            header: 'S.No',
            cell: (info) => <Typography>{info.getValue()}</Typography>,
        }),
        productColumnHelper.accessor('product_name', {
            header: 'Product Name',
            cell: (info) => <Typography fontWeight={600}>{info.getValue()}</Typography>,
        }),
        productColumnHelper.accessor('total_quantity', {
            header: 'Stock',
            cell: (info) => <Typography>{info.getValue()} {info.row.original.unit}</Typography>,
        }),
        productColumnHelper.accessor('status', {
            header: 'Status',
            cell: (info) => (
                <Chip
                    label={info.getValue() ? 'Active' : 'Inactive'}
                    color={info.getValue() ? 'success' : 'default'}
                    size="small"
                    sx={{ borderRadius: '6px' }}
                />
            ),
        }),
        productColumnHelper.display({
            id: 'action',
            header: 'Action',
            cell: (info) => (
                <Box>
                    <Tooltip title="Edit">
                        <IconButton color="success" onClick={() => handleEdit(info.row.original)}>
                            <IconEdit width={20} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton color="error" onClick={() => handleDelete(info.row.original.scrap_product_id, 'product')}>
                            <IconTrash width={20} />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        }),
    ];

    const salesColumnHelper = createColumnHelper();
    const salesColumns = [
        salesColumnHelper.accessor((row, index) => index + 1, {
            id: 'sno',
            header: 'S.No',
            cell: (info) => <Typography>{info.getValue()}</Typography>,
        }),
        salesColumnHelper.accessor('buyer_name', {
            header: 'Buyer',
            cell: (info) => <Typography fontWeight={600}>{info.getValue()}</Typography>,
        }),
        salesColumnHelper.accessor('product.product_name', {
            header: 'Product',
            cell: (info) => <Typography>{info.getValue()}</Typography>,
        }),
        salesColumnHelper.accessor('quantity', {
            header: 'Qty',
            cell: (info) => <Typography>{info.getValue()}</Typography>,
        }),
        salesColumnHelper.accessor('total_amount', {
            header: 'Amount',
            cell: (info) => <Typography color="primary.main" fontWeight={600}>₹{info.getValue()}</Typography>,
        }),
        salesColumnHelper.accessor('sale_date', {
            header: 'Date',
            cell: (info) => {
                const date = new Date(info.getValue());
                return (
                    <Typography variant="body2" color="textSecondary">
                        {date.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </Typography>
                );
            },
        }),
    ];

    // Prepare product options for the sale form
    const productOptions = products
        .filter(p => p.status)
        .map(p => ({ label: `${p.product_name} (${p.total_quantity} ${p.unit} avail)`, value: p.scrap_product_id }));

    const activeFormData = tab === '1' ? scrapProductFormData : scrapSaleFormData.map(field => {
        if (field.name === 'scrap_product_id') return { ...field, options: productOptions };
        return field;
    });

    return (
        <PageContainer title="Scrap Management" description="Manage scrap products and sales">
            <Breadcrumb title="Scrap Sale" items={BCrumb} />
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={tab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleTabChange}>
                            <Tab label="Product Detail" value="1" />
                            <Tab label="Sales Detail" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ p: 0, pt: 2 }}>
                        <TableLayout
                            setShowDrawer={setShowDrawer}
                            handleDownload={handleDownload}
                            tableData={filteredProducts}
                            columns={productColumns}
                            search={search}
                            handleSearch={(e) => setSearch(e.target.value)}
                            title="Scrap Product"
                            onClickFormButton={true}
                            onAddClick={() => {
                                setFormData({});
                                setIsEdit({ status: false, editId: '' });
                                setShowDrawer(true);
                            }}
                        />
                    </TabPanel>
                    <TabPanel value="2" sx={{ p: 0, pt: 2 }}>
                        <TableLayout
                            setShowDrawer={setShowDrawer}
                            handleDownload={handleDownload}
                            tableData={filteredSales}
                            columns={salesColumns}
                            search={search}
                            handleSearch={(e) => setSearch(e.target.value)}
                            title="Scrap Sale"
                            onClickFormButton={true}
                            onAddClick={() => {
                                setFormData({});
                                setIsEdit({ status: false, editId: '' });
                                setShowDrawer(true);
                            }}
                        />
                    </TabPanel>
                </TabContext>
            </Box>

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
                field={activeFormData}
                title={tab === '1' ? 'Scrap Product' : 'Scrap Sale'}
            />
        </PageContainer>
    );
};

export default ScrapManagement;
