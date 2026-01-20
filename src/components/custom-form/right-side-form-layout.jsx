import React, { useEffect, useMemo, useCallback } from 'react';
import { Grid, Button, Stack, Drawer } from '@mui/material';
import CustomFormField from './custom-form-field';
import ParentCard from '../../components/shared/ParentCard';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Scrollbar from '../custom-scroll/Scrollbar';
import CustomFormLabel from '../forms/theme-elements/CustomFormLabel';

const SidebarWidth = '320px';

const RightSideFormLayout = React.memo(({
    field,
    formData,
    setFormData,
    setShowDrawer,
    showDrawer,
    setIsEdit,
    isEdit,
    col,
    title,
    setErrors,
    errors
}) => {
    useEffect(() => {
        if (!showDrawer) {
            setFormData({});
            setErrors({});
            setIsEdit({
                status: false,
                editId: ''
            })
        }
    }, [showDrawer, setIsEdit]);

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};
        for (const item of field) {
            if (item.required && !formData[item.name]) {
                newErrors[item.name] = `${item.label} is required`;
                isValid = false;
            }
        }
        setErrors(newErrors);
        return isValid;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            handleSubmit(e);
        } else {
            //alert("Please fill all the required fields.");
        }
    };

    return (
        <Drawer
            anchor="right"
            open={showDrawer}
            onClose={() => setShowDrawer(false)}
            PaperProps={{ sx: { width: SidebarWidth } }}
        >
            <Scrollbar sx={{ height: 'calc(100vh - 5px)' }}>
                <ParentCard title={`${title} Form`}>
                    <form onSubmit={onSubmit}>
                        <Grid container spacing={3}>
                            {field.map((item, index) => (
                                <Grid item xs={col} key={index} style={{ paddingTop: '5px' }}>
                                    <CustomFormLabel htmlFor={item.id} sx={{ marginTop: '5px' }}>
                                        {item.label}
                                        {/* {required && <span style={requiredStyle}>*</span>} */}
                                    </CustomFormLabel>
                                    <CustomFormField
                                        field={item}
                                        formData={formData}
                                        setFormData={setFormData}
                                        errors={errors}
                                        setErrors={setErrors}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 3 }}>
                            <Button onClick={() => setShowDrawer(false)} color="secondary" variant="outlined">
                                Cancel
                            </Button>
                            <Button color="primary" variant="contained" type="submit">
                                {isEdit.status ? 'Update' : 'Submit'}
                            </Button>
                        </Stack>
                    </form>
                </ParentCard>
            </Scrollbar>
        </Drawer>
    );
});

export default RightSideFormLayout;
