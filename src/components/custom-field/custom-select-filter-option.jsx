import React, { useState } from "react";
import { MenuItem, Box, styled, TextField, FormHelperText } from "@mui/material";
import { IconPlus } from "@tabler/icons";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";

const CustomSelectFilterOption = ({
    options = [],
    optionsLabel,
    optionsValue,
    name,
    value,
    onChange,
    placeholder,
    label,
    filter = [],
    onClick
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const CustomSelectItem = styled(MenuItem)(() => ({
        color: "#28C76F",
        backgroundColor: "transparent !important",
    }));

    const filteredOptions = options.filter((option) =>
        filter.some((key) =>
            option[key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const handleSelectChange = (e) => {
        if (onChange) onChange(e);
    };

    return (
        <>
            <CustomTextField
                select
                id={`${name}-select`}
                sx={{ marginTop: "25px" }}
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
                <Box sx={{ px: 2, pb: 1 }}>
                    <TextField
                        size="small"
                        placeholder={placeholder}
                        fullWidth
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                    />
                </Box>

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

                {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => (
                        <MenuItem key={option.id} value={option[optionsValue]}>
                            {option[optionsLabel]}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>No results found</MenuItem>
                )}
            </CustomTextField>
        </>
    );
};

export default CustomSelectFilterOption;
