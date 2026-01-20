import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import { CreateSuccessful } from '../../utils/AlertDialog';
import NormalFormLayout from '../../components/custom-form/normal-from-layout';
import PopupFormLayout from '../../components/custom-form/popup-from-layout';
import { brandFormData, categoryFormData, unitFormData, taxFormData } from '../../components/form-field'

const CreateItemDetails = () => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [reset, setReset] = useState(false);
    const [formData, setFormData] = useState('');
    const [errors, setErrors] = useState({});
    const [isEdit, setIsEdit] = useState({ status: false, editId: '' });

    const [popupFormData, setPopupFormData] = useState('');
    const [popupErrors, setPopupErrors] = useState({});
    const [popupIsEdit, setPopupIsEdit] = useState({ status: false, editId: '' });
    const [popupFormField, setPopupFormField] = useState([]);
    const [popupInfo, setPopupInfo] = useState({ title: '', type: '' });

    const BCrumb = useMemo(() => [
        { to: '/', title: 'Home' },
        { title: 'Items List' },
    ], []);

    useEffect(() => {
        if (!showDrawer) {
            setPopupInfo({ title: '', type: '' });
            setPopupFormField([]);
        }
    }, [showDrawer])

    const handleAddBrand = useCallback(() => {
        setShowDrawer(true);
        setPopupInfo({ title: 'Brand', type: 'brand_type' });
        setPopupFormField(brandFormData);
    }, []);

    const handleAddCategory = useCallback(() => {
        setShowDrawer(true);
        setPopupInfo({ title: 'Category', type: 'category_type' });
        setPopupFormField(categoryFormData);
    }, []);

      const handleAddSubCategory = useCallback(() => {
        setShowDrawer(true);
        setPopupInfo({ title: 'Sub_Category', type: 'sub_category_type' });
        setPopupFormField(categoryFormData);
    }, []);

    const handleAddUnit = useCallback(() => {
        setShowDrawer(true);
        setPopupInfo({ title: 'Unit', type: 'unit_type' });
        setPopupFormField(unitFormData);
    }, []);

    const handleAddTax = useCallback(() => {
        setShowDrawer(true);
        setPopupInfo({ title: 'Tax', type: 'tax_type' });
        setPopupFormField(taxFormData);
    }, []);

    const itemFormData = [
        {
            type: 'TEXT_FIELD',
            label: 'Item Name',
            validationType: 'general',
            attributeType: 'text',
            id: 'item_name',
            name: 'item_name',
            placeholder: 'Enter Your Item Name',
            required: true,
        },
        {
            type: 'CUSTOM_SELECT_FIELD_BUTTON',
            label: 'Brand',
            validationType: 'general',
            id: 'brand_id',
            name: 'brand_id',
            placeholder: 'Select Your Brand',
            required: true,
            onClick: handleAddBrand,
            options: [{
                label: 'Brand - 1',
                value: '1',
            }, {
                label: 'Brand - 2',
                value: '2',
            }]
        },
        {
            type: 'CUSTOM_SELECT_FIELD_BUTTON',
            label: 'Category',
            validationType: 'general',
            id: 'category_id',
            name: 'category_id',
            placeholder: 'Select Your Category',
            required: true,
            onClick: handleAddCategory,
            options: [{
                label: 'Category - 1',
                value: '1',
            }, {
                label: 'Category - 2',
                value: '2',
            }]
        },
        {
            type: 'CUSTOM_SELECT_FIELD_BUTTON',
            label: 'Sub_Category',
            validationType: 'general',
            id: 'sub_category_id',
            name: 'sub_category_type',
            placeholder: 'Select Your Category',
            required: true,
            onClick: handleAddSubCategory,
            options: [{
                label: 'Category - 1',
                value: '1',
            }, {
                label: 'Category - 2',
                value: '2',
            }]
        },
        {
            type: 'CUSTOM_SELECT_FIELD_BUTTON',
            label: 'Unit',
            validationType: 'general',
            id: 'unit_id',
            name: 'unit_id',
            placeholder: 'Select Your Unit',
            required: true,
            onClick: handleAddUnit,
            options: [{
                label: 'Unit - 1',
                value: '1',
            }, {
                label: 'Unit - 2',
                value: '2',
            }]
        },
        {
            type: 'TEXT_FIELD',
            label: 'SKU',
            validationType: 'general',
            attributeType: 'text',
            id: 'sku_code',
            name: 'sku_code',
            placeholder: 'Enter Your sku code',
            required: true,
        },
        {
            type: 'TEXT_FIELD',
            label: 'HSN',
            validationType: 'general',
            attributeType: 'text',
            id: 'hsn_code',
            name: 'hsn_code',
            placeholder: 'Enter Your hsn code',
            required: true,
        },
        {
            type: 'TEXT_FIELD',
            label: 'Minimum Qty',
            validationType: 'general',
            attributeType: 'text',
            id: 'minimum_stock_qty',
            name: 'minimum_stock_qty',
            placeholder: 'Enter Your Minimum Qty',
            required: true,
        },
        {
            type: 'TEXT_FIELD',
            label: 'Lot Number',
            validationType: 'general',
            attributeType: 'text',
            id: 'lot_number',
            name: 'lot_number',
            placeholder: 'Enter Your Lot Number',
            required: true,
        },
        {
            type: 'TEXTAREA_FIELD',
            label: 'Description',
            validationType: 'general',
            id: 'description',
            name: 'description',
            placeholder: 'Enter Your description',
            required: true,
        },
        {
            type: 'FILE_UPLOAD_FIELD',
            label: 'Item Image',
            validationType: 'image',
            id: 'item_image',
            name: 'item_image',
            placeholder: 'Select Item Image',
            required: true,
        },
        {
            type: 'TEXT_FIELD',
            label: 'Purchase Price',
            validationType: 'general',
            attributeType: 'text',
            id: 'purchase_price',
            name: 'purchase_price',
            placeholder: 'Enter Your Purchase Price',
            required: true,
        },
        {
            type: 'CUSTOM_SELECT_FIELD_BUTTON',
            label: 'Purchase Tax',
            validationType: 'general',
            id: 'purchase_tax_id',
            name: 'purchase_tax_id',
            placeholder: 'Select Your Purchase Tax',
            required: true,
            onClick: handleAddTax,
            options: [{
                label: 'GST - 18',
                value: '1',
            }, {
                label: 'CGST - 18',
                value: '2',
            }]
        },
        {
            type: 'SELECT_FIELD',
            label: 'Purchase Tax Type',
            validationType: 'general',
            id: 'purchase_tax_type',
            name: 'purchase_tax_type',
            placeholder: 'Select Your Purchase Tax Type',
            required: true,
            options: [{
                label: 'Inclusive',
                value: '1',
            }, {
                label: 'Exclusive',
                value: '2',
            }]
        },
        {
            type: 'TEXT_FIELD',
            label: 'Final Purchase Price',
            validationType: 'general',
            attributeType: 'text',
            id: 'purchase_price',
            name: 'purchase_price',
            placeholder: 'Enter Your Purchase Price',
            required: true,
        },
        {
            type: 'TEXT_FIELD',
            label: 'Sales Price',
            validationType: 'general',
            attributeType: 'text',
            id: 'sales_price',
            name: 'sales_price',
            placeholder: 'Enter Your Sales Price',
            required: true,
        },
        {
            type: 'CUSTOM_SELECT_FIELD_BUTTON',
            label: 'Sales Tax',
            validationType: 'general',
            id: 'sales_tax_id',
            name: 'sales_tax_id',
            placeholder: 'Select Your Sales Tax',
            required: true,
            onClick: handleAddTax,
            options: [{
                label: 'GST - 18',
                value: '1',
            }, {
                label: 'CGST - 18',
                value: '2',
            }]
        },
        {
            type: 'SELECT_FIELD',
            label: 'Sales Tax Type',
            validationType: 'general',
            id: 'sales_tax_type',
            name: 'sales_tax_type',
            placeholder: 'Select Your Sales Tax Type',
            required: true,
            options: [{
                label: 'Inclusive',
                value: '1',
            }, {
                label: 'Exclusive',
                value: '2',
            }]
        },
        {
            type: 'TEXT_FIELD',
            label: 'Final Sales Price',
            validationType: 'general',
            attributeType: 'text',
            id: 'sales_price',
            name: 'sales_price',
            placeholder: 'Enter Your Sales Price',
            required: true,
        },
        {
            type: 'SELECT_FIELD',
            label: 'Discount Type',
            validationType: 'general',
            id: 'discount_type',
            name: 'discount_type',
            placeholder: 'Select Your Discount Type',
            required: true,
            options: [{
                label: 'Percentage(%)',
                value: '1',
            }, {
                label: 'Fixed(₹)',
                value: '2',
            }]
        },
        {
            type: 'TEXT_FIELD',
            label: 'Discount',
            validationType: 'general',
            attributeType: 'text',
            id: 'discount',
            name: 'discount',
            placeholder: 'Enter Your Discount',
            required: true,
        },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('formData', formData);
        setReset(false);
        CreateSuccessful();
    }

    const handlePopupSubmit = async (e) => {
        e.preventDefault();
        console.log('popupFormData', popupFormData);
        setShowDrawer(false);
        CreateSuccessful();
    }

    return (
        <>
            <PageContainer title="Item Details" description="this is Item Form page">
                <Breadcrumb title="Item Information" items={BCrumb} />

                {/* Popup Form Layout */}
                <NormalFormLayout
                    formData={formData}
                    setFormData={setFormData}
                    isEdit={isEdit}
                    errors={errors}
                    setErrors={setErrors}
                    setIsEdit={setIsEdit}
                    setReset={setReset}
                    reset={reset}
                    handleSubmit={handleSubmit}
                    field={itemFormData}
                    title={'Item'}
                    col={4}
                />
                {/* End Popup Form Layout */}
            </PageContainer>
            {/* Popup Form Layout */}
            <PopupFormLayout
                formData={popupFormData}
                setFormData={setPopupFormData}
                isEdit={popupIsEdit}
                errors={popupErrors}
                setErrors={setPopupErrors}
                setIsEdit={setPopupIsEdit}
                setShowDrawer={setShowDrawer}
                handleSubmit={handlePopupSubmit}
                showDrawer={showDrawer}
                field={popupFormField}
                title={popupInfo.title}
                col={6}
            />
            {/* End Popup Form Layout */}
        </>
    );
};

export default React.memo(CreateItemDetails);
