import React, { useState } from "react";
import { MenuItem, Box, styled, TextField, FormHelperText } from "@mui/material";
import { IconPlus } from "@tabler/icons";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";

const CustomSelectAddButton = ({
    options = [],
    name,
    value,
    onChange,
    placeholder,
    label,
    onClick
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const CustomSelectItem = styled(MenuItem)(() => ({
        color: "#28C76F",
        backgroundColor: "transparent !important",
    }));

    const handleSelectChange = (e) => {
        if (onChange) onChange(e);
    };

    return (
        <>
            <CustomTextField
                select
                id={`${name}-select`}
                fullWidth
                size="small"
                name={name}
                value={value || "0"}
                onChange={handleSelectChange}
                SelectProps={{
                    open: isOpen,
                    onOpen: () => setIsOpen(true),
                    onClose: () => setIsOpen(false),
                    MenuProps: {
                        PaperProps: {
                            style: {
                                maxHeight: 300,
                            },
                        },
                    },
                }}
            >
                <CustomSelectItem onClick={() => onClick(true)}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            "& svg": { mr: 2 },
                        }}
                    >
                        <IconPlus /> Add New {label}
                    </Box>
                </CustomSelectItem>

                <MenuItem value="0" disabled>
                    {placeholder}
                </MenuItem>

                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </CustomTextField>
        </>
    );
};

export default CustomSelectAddButton;
