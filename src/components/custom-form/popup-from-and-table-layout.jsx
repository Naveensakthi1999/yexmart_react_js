import React, { useEffect, useMemo, useCallback } from 'react';
import { Grid, Button, Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';
import CustomFormField from './custom-form-field';
import { Box } from '@mui/system';
import CustomFormLabel from '../forms/theme-elements/CustomFormLabel';
import TableLayout from 'src/components/custom-table/table-layout';

const PopupFormAndTableLayout = React.memo(({
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
    handleSubmit,
    handleDownload,
    tableData,
    columns,
    search,
    handleSearch,
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
            const value = formData[item.name];
            if (item.required && !value) {
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
            // alert("Please fill all the required fields.");
        }
    };

    return (
        <Dialog
            open={showDrawer}
            onClose={() => setShowDrawer(false)}
            maxWidth="lg"
            fullWidth
        >
            <DialogTitle id="alert-dialog-title" variant="h5">
                {isEdit.status ? `Update ${title}` : `Add ${title}`}
            </DialogTitle>
            <form onSubmit={onSubmit}>
                <DialogContent
                    sx={{
                        overflowY: 'auto',
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
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowDrawer(false)}>Cancel</Button>
                    <Button color="primary" variant="contained" type="submit">
                        {isEdit.status ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </form>
            <Box sx={{ p: 3 }}>
                {/*Table Layout */}
                <TableLayout
                    handleDownload={handleDownload}
                    tableData={tableData}
                    columns={columns}
                    search={search}
                    handleSearch={handleSearch}
                    title={title}
                />
                {/* End Table Layout */}
            </Box>
        </Dialog>
    );
});

export default PopupFormAndTableLayout;
