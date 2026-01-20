import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    Typography,
    IconButton,
    Alert,
    Tabs,
    Tab
} from '@mui/material';
import { IconEdit } from '@tabler/icons';
import req from '../../utils/req';
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

const AdminManagement = () => {
    const [admins, setAdmins] = useState([]);
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0); // 0: Admins, 1: Roles
    const [editingRole, setEditingRole] = useState(null);
    const [isEditingAdmin, setIsEditingAdmin] = useState(false);
    const [editingAdminId, setEditingAdminId] = useState(null);

    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        mobile: '',
        password: '',
        role_id: ''
    });

    const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
    const MODULES = ['dashboard', 'users', 'reports', 'settings', 'admin_management', 'ads', 'create_staff'];

    const fetchData = async () => {
        try {
            const [adminsRes, rolesRes] = await Promise.all([
                req().get('/admin/list'),
                req().get('/admin/roles')
            ]);

            if (adminsRes.data.status) {
                setAdmins(adminsRes.data.data.admins);
            }
            if (rolesRes.data.status) {
                setRoles(rolesRes.data.data.roles);
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
            setNotification({ show: true, message: 'Failed to fetch data', type: 'error' });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpen = () => {
        setFormData({ fullname: '', email: '', mobile: '', password: '', role_id: '' });
        setIsEditingAdmin(false);
        setEditingAdminId(null);
        setOpen(true);
    };

    const handleEditAdmin = (admin) => {
        setFormData({
            fullname: admin.fullname,
            email: admin.email,
            mobile: admin.mobile || '',
            password: '', // Keep empty to not change
            role_id: admin.role
        });
        setIsEditingAdmin(true);
        setEditingAdminId(admin.user_id);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitAdmin = async () => {
        try {
            if (isEditingAdmin) {
                // Remove password if empty so it doesn't try to update it
                const updateData = { ...formData };
                if (!updateData.password) delete updateData.password;

                // Backend needs an update endpoint. Assuming /user/update/:id or similar? 
                // Wait, standard user update might work? Or admin specific?
                // Let's use user update for now as they are users.
                // But user update is usually profile.
                // Let's check backend routes... /user/:user_id (PUT) -> updateById
                // And /user/role/:user_id (PATCH) -> updateRole

                // Let's do two calls or one if backend supports it.
                // adminController doesn't seem to have update. userController does.

                // 1. Update basic info
                await req().put(`/user/${editingAdminId}`, updateData);

                // 2. Update role if changed
                await req().patch(`/user/role/${editingAdminId}`, { role: updateData.role_id });

                setNotification({ show: true, message: 'Admin updated successfully', type: 'success' });

            } else {
                const res = await req().post('/admin/create', formData);
                if (res.data.status) {
                    setNotification({ show: true, message: 'Admin created successfully', type: 'success' });
                }
            }
            fetchData();
            handleClose();
        } catch (error) {
            setNotification({ show: true, message: error.response?.data?.message || 'Error processing request', type: 'error' });
        }
    };

    // Role Permission Logic
    const handleEditPermissions = async (role) => {
        setEditingRole(role);
        try {
            const res = await req().get(`/admin/permissions/${role.id}`);
            const fetchedPerms = res.data.data.permissions || [];

            // Map fetched to full state
            const mappedPerms = MODULES.map(mod => {
                const existing = fetchedPerms.find(p => p.module === mod);
                return existing ? { ...existing } : {
                    module: mod,
                    can_view: false, can_create: false, can_edit: false, can_delete: false
                };
            });
            setPermissions(mappedPerms);
        } catch (error) {
            console.error(error);
            setNotification({ show: true, message: "Failed to fetch permissions", type: 'error' });
        }
    };

    const handlePermissionChange = (index, field) => {
        const newPerms = [...permissions];
        newPerms[index][field] = !newPerms[index][field];
        setPermissions(newPerms);
    };

    const savePermissions = async () => {
        try {
            await req().put(`/admin/permissions/${editingRole.id}`, { permissions });
            setNotification({ show: true, message: "Permissions updated", type: 'success' });
            setEditingRole(null);
        } catch (error) {
            setNotification({ show: true, message: "Failed to update permissions", type: 'error' });
        }
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        setEditingRole(null);
    };

    return (
        <PageContainer title="Admin Management" description="Manage Admins">
            <DashboardCard title="Admin Management">
                <Box>
                    {notification.show && (
                        <Alert
                            severity={notification.type}
                            onClose={() => setNotification({ ...notification, show: false })}
                            sx={{ mb: 2 }}
                        >
                            {notification.message}
                        </Alert>
                    )}

                    <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
                        <Tab label="Admins" />
                        <Tab label="Roles & Permissions" />
                    </Tabs>

                    {activeTab === 0 && (
                        <Box>
                            <Box display="flex" justifyContent="flex-end" mb={2}>
                                <Button variant="contained" color="primary" onClick={handleOpen}>
                                    Add New Admin
                                </Button>
                            </Box>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Role</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {admins.map((admin) => (
                                            <TableRow key={admin.user_id}>
                                                <TableCell>{admin.fullname}</TableCell>
                                                <TableCell>{admin.email}</TableCell>
                                                <TableCell>{admin.userRole?.name}</TableCell>
                                                <TableCell>
                                                    {admin.role !== 5 && (
                                                        <IconButton onClick={() => handleEditAdmin(admin)} color="primary">
                                                            <IconEdit size={20} />
                                                        </IconButton>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}

                    {activeTab === 1 && (
                        <Box>
                            {!editingRole ? (
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Role Name</TableCell>
                                                <TableCell>Slug</TableCell>
                                                <TableCell>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {roles.map((role) => (
                                                <TableRow key={role.id}>
                                                    <TableCell>{role.name}</TableCell>
                                                    <TableCell>{role.slug}</TableCell>
                                                    <TableCell>
                                                        <Button variant="outlined" size="small" onClick={() => handleEditPermissions(role)}>
                                                            Edit Permissions
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                <Box>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                        <Typography variant="h6">Edit Permissions: {editingRole.name}</Typography>
                                        <Button variant="outlined" color="secondary" onClick={() => setEditingRole(null)}>Cancel</Button>
                                    </Box>
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Module</TableCell>
                                                    <TableCell align="center">View</TableCell>
                                                    <TableCell align="center">Create</TableCell>
                                                    <TableCell align="center">Edit</TableCell>
                                                    <TableCell align="center">Delete</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {permissions.map((perm, idx) => (
                                                    <TableRow key={perm.module}>
                                                        <TableCell>{perm.module.toUpperCase()}</TableCell>
                                                        <TableCell align="center">
                                                            <Checkbox checked={perm.can_view} onChange={() => handlePermissionChange(idx, 'can_view')} />
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Checkbox checked={perm.can_create} onChange={() => handlePermissionChange(idx, 'can_create')} />
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Checkbox checked={perm.can_edit} onChange={() => handlePermissionChange(idx, 'can_edit')} />
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Checkbox checked={perm.can_delete} onChange={() => handlePermissionChange(idx, 'can_delete')} />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Box mt={2}>
                                        <Button variant="contained" color="primary" onClick={savePermissions}>Save Changes</Button>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    )}

                    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                        <DialogTitle>{isEditingAdmin ? 'Edit Admin' : 'Add New Admin'}</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="fullname"
                                label="Full Name"
                                type="text"
                                fullWidth
                                value={formData.fullname}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="dense"
                                name="email"
                                label="Email"
                                type="email"
                                fullWidth
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="dense"
                                name="mobile"
                                label="Mobile"
                                type="text"
                                fullWidth
                                value={formData.mobile}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="dense"
                                name="password"
                                label={isEditingAdmin ? "Password (leave blank to keep)" : "Password"}
                                type="password"
                                fullWidth
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="dense"
                                name="role_id"
                                select
                                SelectProps={{ native: true }}
                                fullWidth
                                value={formData.role_id}
                                onChange={handleChange}
                            >
                                {/* <option value="">Select Role</option> */}
                                {roles
                                    .filter(role => [3, 4].includes(role.id))
                                    .map((role) => (
                                        <option key={role.id} value={role.id}>
                                            {role.name}
                                        </option>
                                    ))}
                            </TextField>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="error">Cancel</Button>
                            <Button onClick={handleSubmitAdmin} color="primary">{isEditingAdmin ? 'Update' : 'Create'}</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </DashboardCard>
        </PageContainer>
    );
};

export default AdminManagement;
