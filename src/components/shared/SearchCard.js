'use client'
import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Card, CardHeader, Tooltip, Divider, Button, TextField, InputAdornment, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { IconDownload, IconSearch } from '@tabler/icons';
import { Link } from 'react-router-dom';

const SerachCard = ({ title,
    children,
    setShowDrawer,
    search,
    handleSearch,
    onClickFormButton,
    onClickLinkButton,
    onClickFilterButton,
    link
}) => {
    const customizer = useSelector((state) => state.customizer);
    const theme = useTheme();
    const borderColor = theme.palette.divider;

    return (
        <Card
            sx={{ padding: 0, border: !customizer.isCardShadow ? `1px solid ${borderColor}` : 'none' }}
            elevation={customizer.isCardShadow ? 9 : 0}
            variant={!customizer.isCardShadow ? 'outlined' : undefined}
        >
            <CardHeader sx={{
                padding: "16px"
            }} title={title}
                action={
                    <Box sx={{ flex: '1 1 100%' }}>
                        <TextField
                            sx={{ paddingRight: "16px" }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconSearch size="1.1rem" />
                                    </InputAdornment>
                                ),
                            }}
                            placeholder="Search items..."
                            size="small"
                            onChange={(event) => handleSearch(event)}
                            value={search}
                        />
                        <Tooltip placement='left'>
                            {
                                onClickFormButton && (
                                    <Button
                                        onClick={() => setShowDrawer(true)}
                                        variant="contained"
                                        color="primary">
                                        Add {title} +
                                    </Button>
                                )
                            }
                            {
                                onClickLinkButton && (
                                    <Button variant="contained" color="primary" component={Link} to={link}>
                                        Add {title} +
                                    </Button>
                                )
                            }
                            {
                                onClickFilterButton && (
                                    <Button
                                        onClick={() => setShowDrawer(true)}
                                        variant="contained"
                                        color="primary">
                                        {title} Filter +
                                    </Button>
                                )
                            }
                        </Tooltip>
                    </Box>
                } />
            <Divider />
            {children}
        </Card>
    );
};
SerachCard.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    setShowDrawer: PropTypes.func,
};
export default SerachCard;
