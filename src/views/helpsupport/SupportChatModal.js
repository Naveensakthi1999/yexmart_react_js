import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Grid,
    Typography,
    Box
} from '@mui/material';
import { useSelector } from 'react-redux';

const SupportChatModal = ({ open, onClose, onStartChat, initialCategory }) => {
    const user = useSelector((state) => state.auth?.user || {});
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        mobile: '',
        help_category: initialCategory || '',
        issue_description: '',
        priority: 'Medium'
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                user_name: user.fullname || '',
                user_email: user.email || '',
                mobile: user.mobile || ''
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onStartChat(formData);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Start a Support Chat</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Name"
                                name="user_name"
                                value={formData.user_name}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Email"
                                name="user_email"
                                value={formData.user_email}
                                onChange={handleChange}
                                fullWidth
                                required
                                type="email"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Contact Number"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                label="Priority"
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                fullWidth
                            >
                                <MenuItem value="Low">Low</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Category"
                                name="help_category"
                                value={formData.help_category}
                                onChange={handleChange}
                                fullWidth
                                disabled={!!initialCategory}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                name="issue_description"
                                value={formData.issue_description}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={3}
                                inputProps={{ maxLength: 500 }}
                            />
                            <Typography variant="caption" color="textSecondary">
                                {formData.issue_description.length}/500
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">
                        Start Chat
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default SupportChatModal;
