import React from 'react';
import { Popover, Typography, Button, Box, Tooltip, IconButton, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import { IconPencil, IconTrash, IconEye, IconCurrencyRupee, IconTruckDelivery } from '@tabler/icons';

const ActionButton = ({ row, handleEdit, handleDelete, handleView, handlePayment }) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (

        <>
            <Button aria-describedby={id} variant="contained" color='warning' onClick={handleClick}>
                Action
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box>
                    <MenuItem onClick={() => handleEdit(row)}>
                        <ListItemIcon>
                            <IconPencil size="1.2rem" />
                        </ListItemIcon>
                        <ListItemText> Edit</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => handleDelete(row.id)}>
                        <ListItemIcon>
                            <IconTrash size="1.2rem" />
                        </ListItemIcon>
                        <ListItemText> Delete</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => handleView(row)}>
                        <ListItemIcon>
                            <IconEye size="1.2rem" />
                        </ListItemIcon>
                        <ListItemText> View</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => handlePayment(row.id)}>
                        <ListItemIcon>
                            <IconCurrencyRupee size="1.2rem" />
                        </ListItemIcon>
                        <ListItemText>Add Payment</ListItemText>
                    </MenuItem>
                </Box>
            </Popover>
        </>
    );
}
export default ActionButton;
