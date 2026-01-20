import React, { useEffect, useMemo, useCallback } from 'react';
import { Grid, Button, Stack } from '@mui/material';
import CustomFormField from './custom-form-field';
import ParentCard from '../../components/shared/ParentCard';
import CustomFormLabel from '../forms/theme-elements/CustomFormLabel';

const requiredStyle = { color: 'red', fontSize: 20, fontWeight: 'bold' };

const NormalFormLayout = React.memo(({
    field,
    formData,
    setFormData,
    setReset,
    reset,
    setIsEdit,
    isEdit,
    col,
    title,
    setErrors,
    errors
}) => {
    useEffect(() => {
        if (!reset) {
            setFormData({});
            setErrors({});
            setIsEdit({
                status: false,
                editId: ''
            })
        }
    }, [reset, setIsEdit]);

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
        <ParentCard title={`${title} Form`} style={{ marginBottom : '25px'}}>
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
                    <Button onClick={() => setReset(false)} color="secondary" variant="outlined">
                        Reset
                    </Button>
                    <Button color="primary" variant="contained" type="submit">
                        {isEdit.status ? 'Update' : 'Submit'}
                    </Button>
                </Stack>
            </form>
        </ParentCard>
    );
});

export default NormalFormLayout;
