import React, { memo, useState, useCallback, useEffect } from 'react';
import { Autocomplete, IconButton, InputAdornment, MenuItem } from '@mui/material';
import CustomTextField from '../forms/theme-elements/CustomTextField';
import CustomSelect from '../forms/theme-elements/CustomSelect';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CustomOutlinedInput from '../forms/theme-elements/CustomOutlinedInput';
import { IconEye, IconEyeOff } from '@tabler/icons';

const CustomBillingFormField = memo(({ field, rowIndex, formData }) => {
    const { id, name, placeholder, type, options, attributeType, readOnly, onChange } = field;

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = useCallback(() => setShowPassword((prev) => !prev), []);
    const handleMouseDownPassword = useCallback((event) => event.preventDefault(), []);

    const handleChangeGeneric = (e) => {
        const { name, value } = e.target;
        if (onChange) onChange(rowIndex, name, value);
    };

    const handleSelectChange = (e) => {
        const value = e ? e.value : '';
        if (onChange) onChange(rowIndex, name, value);
    };

    const handleDateChange = (date) => {
        if (onChange) onChange(rowIndex, name, date);
    };

    return (
        <>
            {type === 'TEXT_FIELD' && (
                <CustomTextField
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    type={attributeType}
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={formData[rowIndex][name] || ''}
                    onChange={handleChangeGeneric}
                    InputProps={{
                        readOnly: readOnly,
                    }}
                />
            )}

            {type === 'SELECT_FIELD' && (
                <CustomSelect
                    labelId={`${id}-label`}
                    id={id}
                    name={name}
                    fullWidth
                    size="small"
                    value={formData[rowIndex][name] || ''}
                    onChange={handleChangeGeneric}
                    displayEmpty
                >
                    <MenuItem value="" disabled>
                        {placeholder}
                    </MenuItem>
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </CustomSelect>
            )}

            {type === 'SELECT_FIELD_FILTER' && (
                <Autocomplete
                    disablePortal
                    id={id}
                    name={name}
                    value={options.find(option => option.value === formData[rowIndex][name]) || null}
                    onChange={handleSelectChange}
                    options={options}
                    getOptionLabel={(option) => option.label}
                    getOptionSelected={(option, value) => option.value === value.value}
                    fullWidth
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            padding: '0px'
                        },
                    }}
                    renderInput={(params) => (
                        <CustomTextField
                            {...params}
                            placeholder={placeholder}
                            aria-label={`Select ${placeholder}`}
                        />
                    )}
                />
            )}

            {type === 'DATE_FIELD' && (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        renderInput={(props) => (
                            <CustomTextField
                                {...props}
                                fullWidth
                                size="small"
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                        width: 18,
                                        height: 18,
                                    },
                                    '& .MuiFormHelperText-root': {
                                        display: 'none',
                                    },
                                    '& .MuiIconButton-root': {
                                        marginRight: '0px',
                                    },
                                }}
                                placeholder={placeholder}
                            />
                        )}
                        id={id}
                        name={name}
                        value={formData[rowIndex][name] || new Date()}
                        onChange={handleDateChange}
                        inputFormat="dd/MM/yyyy"
                    />
                </LocalizationProvider>
            )}

            {type === 'TEXTAREA_FIELD' && (
                <CustomTextField
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    multiline
                    fullWidth
                    value={formData[rowIndex][name] || ''}
                    onChange={handleChangeGeneric}
                    sx={{ padding: '0px' }}
                />
            )}

            {type === 'PRIVATE_FIELD' && (
                <CustomOutlinedInput
                    type={showPassword ? 'text' : 'password'}
                    sx={{
                        '& .MuiOutlinedInput-input': {
                            padding: '8px'
                        },
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <IconEyeOff size="20" /> : <IconEye size="20" />}
                            </IconButton>
                        </InputAdornment>
                    }
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    fullWidth
                    value={formData[rowIndex][name] || ''}
                    onChange={handleChangeGeneric}
                />
            )}
        </>
    );
});

export default CustomBillingFormField;
