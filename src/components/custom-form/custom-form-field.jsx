import React, { memo, useRef, useState, useCallback, useEffect } from 'react';
import { Autocomplete, Box, FormHelperText, Grid, IconButton, InputAdornment, MenuItem, Typography } from '@mui/material';
import CustomTextField from '../forms/theme-elements/CustomTextField';
import CustomSelect from '../forms/theme-elements/CustomSelect';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CustomOutlinedInput from '../forms/theme-elements/CustomOutlinedInput';
import { IconEye, IconEyeOff } from '@tabler/icons';
import img4 from 'src/assets/images/backgrounds/no_image.png';
import CustomSelectFilterOption from '../custom-field/custom-select-filter-option';
import CustomSelectAddButton from '../custom-field/custom-select-add-button';

const CustomFormField = memo(({ field, formData, setFormData, col, errors, setErrors }) => {
    const { id, label, name, placeholder, type, required, options, attributeType, onChange, readOnly, optionsLabel, optionsValue, filter, onClick, validationType } = field;

    const [showPassword, setShowPassword] = useState(false);
    const [imageUrl, setImageUrl] = useState(img4);

    const handleClickShowPassword = useCallback(() => setShowPassword((prev) => !prev), []);
    const handleMouseDownPassword = useCallback((event) => event.preventDefault(), []);

    const fileInputRef = useRef(null);

    const handleImageClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const validateField = useCallback((name, value, field) => {
        let errorMessage = '';
        switch (validationType) {
            case 'required':
                if (!value) {
                    errorMessage = `${field.label} is required`;
                }
                break;
            case 'mobile':
                if (value && !/^\d{10}$/.test(value)) {
                    errorMessage = 'Mobile number must be exactly 10 digits';
                }
                break;
            case 'email':
                if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    errorMessage = 'Enter a valid email address';
                }
                break;
            case 'password':
                if (value !== formData['confirm_password']) {
                    errorMessage = 'Passwords do not match';
                }
                break;
            case 'image':
                if (value && value.size > 300 * 1024) {
                    errorMessage = 'File size must be less than 300 KB';
                } else if (value && !['image/jpeg', 'image/png', 'image/gif'].includes(value.type)) {
                    errorMessage = 'Only JPEG, PNG, or GIF formats are allowed';
                }
                break;
            default:
                break;
        }
        return errorMessage;
    }, [formData]);

    const handleFileChange = useCallback(
        (e) => {
            const file = e.target.files[0];
            const errorMessage = validateField(name, file, field);
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: errorMessage,
            }));

            if (file && !errorMessage) {
                setImageUrl(URL.createObjectURL(file));
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: file,
                }));
            } else {
                setImageUrl(img4);
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: null,
                }));
            }
        },
        [name, validateField, field, setErrors, setFormData]
    );

    const handleChangeGeneric = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        if (onChange) onChange(value);
        const errorMessage = validateField(name, value, field);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage,
        }));
    };

    const handleSelectChange = (event, selectedOption) => {
        const value = selectedOption ? selectedOption.value : '';
        const name = event.target.name;
    
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    
        if (onChange) onChange(value);
    
        const errorMessage = validateField(name, value, field);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage,
        }));
    };
    

    const handleDateChange = (date) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: date,
        }));
        if (onChange) onChange(date);
        const errorMessage = validateField(name, value, field);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage,
        }));
    };

    useEffect(() => {
        if (type === 'DATE_FIELD') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: new Date(),
            }));
        }
    }, [type])

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
                    value={formData[name] || ''}
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
                    value={formData[name] || ''}
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
                    value={options.find((option) => option.value === formData[name]) || null}
                    onChange={(event, value) => handleSelectChange(event, value)}
                    options={options}
                    getOptionLabel={(option) => option.label}
                    fullWidth
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            padding: '0px',
                        },
                    }}
                    renderInput={(params) => (
                        <CustomTextField
                            {...params}
                            name={name}
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
                        value={formData[name] || new Date()}
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
                    rows={4}
                    value={formData[name] || ''}
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
                    value={formData[name] || ''}
                    onChange={handleChangeGeneric}
                />
            )}

            {type === 'FILE_UPLOAD_FIELD' && (
                <Box mt={3} mb={2} textAlign="center">
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    {imageUrl ? (
                        <Box>
                            <img
                                src={imageUrl}
                                alt="Preview"
                                onClick={handleImageClick}
                                style={{ maxWidth: '100px', borderRadius: '7px', margin: '0 auto' }}
                            />
                        </Box>
                    ) : null}
                    <Typography variant="body2" textAlign="center">
                        Click on image to change
                    </Typography>
                </Box>
            )}

            {type === 'CUSTOM_SELECT_FIELD_FILTER' && (
                <CustomSelectFilterOption
                    options={options}
                    label={label}
                    name={name}
                    value={formData[name]}
                    onChange={handleChangeGeneric}
                    placeholder={placeholder}
                    optionsLabel={optionsLabel}
                    optionsValue={optionsValue}
                    filter={filter}
                    onClick={onClick}
                />
            )}

            {type === 'CUSTOM_SELECT_FIELD_BUTTON' && (
                <CustomSelectAddButton
                    options={options}
                    label={label}
                    name={name}
                    value={formData[name]}
                    onChange={handleChangeGeneric}
                    placeholder={placeholder}
                    onClick={onClick}
                />
            )}

            {errors[name] && (
                <FormHelperText error>{errors[name]}</FormHelperText>
            )}
        </>
    );
});

export default CustomFormField;
