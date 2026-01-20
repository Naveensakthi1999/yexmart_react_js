import React, { useEffect, useMemo, useCallback } from 'react';
import { Grid, Button, Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';
import CustomFormField from './custom-form-field';
import { Box } from '@mui/system';
import CustomFormLabel from '../forms/theme-elements/CustomFormLabel';

const PopupFormLayout = React.memo(({
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
    errors,
    handleSubmit
}) => {

    useEffect(() => {
        if (!showDrawer) {
            setFormData({});
            setErrors({});
            setIsEdit({
                status: false,
                editId: ''
            });
        } else if (isEdit.status && formData.clientimage && typeof formData.clientimage === 'string') {
            // When editing, preserve the existing image URL
            // Don't clear the image if it's a URL string (from server)
            setFormData(prev => ({
                ...prev,
                clientimage: prev.clientimage // Keep the existing image URL
            }));
        }
    }, [showDrawer, setIsEdit]);

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        for (const item of field) {
            const value = formData[item.name];

            if (item.required) {
                if (item.type === 'FILE_UPLOAD_FIELD') {
                    // For file uploads in create mode, require a file
                    if (!isEdit.status && !value) {
                        newErrors[item.name] = `${item.label} is required`;
                        isValid = false;
                    }
                } else if (!value) {
                    newErrors[item.name] = `${item.label} is required`;
                    isValid = false;
                }
            }

            // Additional validation for rating
            if (item.name === 'rating') {
                const rating = parseInt(value);
                if (rating < 1 || rating > 5) {
                    newErrors[item.name] = 'Rating must be between 1 and 5';
                    isValid = false;
                }
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            handleSubmit(e);
        }
    };

    return (
        <Dialog
            open={showDrawer}
            onClose={() => setShowDrawer(false)}
            maxWidth="md" // Increased to md for better form layout
            fullWidth
        >
            <DialogTitle id="alert-dialog-title" variant="h5">
                {isEdit.status ? `Update ${title}` : `Add ${title}`}
            </DialogTitle>
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <DialogContent
                    sx={{
                        overflowY: 'auto',
                        maxHeight: '70vh',
                        '&::-webkit-scrollbar': {
                            width: '0px',
                        },
                        '&:hover::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'transparent',
                            borderRadius: '10px',
                        },
                        '&:hover::-webkit-scrollbar-thumb': {
                            backgroundColor: '#d8d8d8',
                            borderRadius: '10px',
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: 'transparent',
                        },
                        '&:hover::-webkit-scrollbar-track': {
                            backgroundColor: '#f1f1f1',
                        },
                    }}
                >
                    <Box mt={3}>
                        <Grid spacing={3} container>
                            {field.map((item, index) => (
                                <Grid item xs={12} sm={col || 6} key={index} style={{ paddingTop: '5px' }}>
                                    <CustomFormLabel htmlFor={item.id} sx={{ marginTop: '5px' }}>
                                        {item.label}
                                        {item.required && <span style={{ color: 'red', marginLeft: '4px' }}>*</span>}
                                    </CustomFormLabel>
                                    <CustomFormField
                                        field={item}
                                        formData={formData}
                                        setFormData={setFormData}
                                        errors={errors}
                                        setErrors={setErrors}
                                        isEdit={isEdit.status}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowDrawer(false)}>Cancel</Button>
                    <Button color="primary" variant="contained" type="submit">
                        {isEdit.status ? 'Update' : 'Submit'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
});

export default PopupFormLayout;
