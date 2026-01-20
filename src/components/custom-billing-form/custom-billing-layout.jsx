import React from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Tooltip, Box, Stack, Divider, Grid, MenuItem } from "@mui/material";
import { format, isValid } from "date-fns";
import { IconPlus, IconSquareRoundedPlus, IconTrash } from "@tabler/icons";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomFormField from "../custom-form/custom-form-field";
import CustomBillingFormField from "../custom-form/custom-billing-form-field";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import Logo from "src/layouts/full/shared/logo/Logo";
import CustomSelect from "../forms/theme-elements/CustomSelect";
import { Link } from "react-router-dom";

const CustomBillingLayout = ({ formData, setFormData, errors, setErrors, leftSideFormData, rightSideFormData, tableHeader, tableBodyFormData, leftSideComponents, rightSideComponents, handleAddItem, handleDeleteItem, title, handleReset, handleSubmit }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const parsedDate = isValid(new Date(formData.invoice_date)) ? new Date(formData.invoice_date) : new Date();
    const formattedOrderDate = format(parsedDate, "EEEE, MMMM dd, yyyy");

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};
        const validateFieldArray = (fieldArray) => {
            for (const item of fieldArray) {
                if (item.required && !formData[item.name]) {
                    newErrors[item.name] = `${item.label} is required`;
                    isValid = false;
                }
            }
        };
        validateFieldArray(leftSideFormData);
        validateFieldArray(rightSideFormData);
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
        <form onSubmit={onSubmit}>
            <Box>
                <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 4 }} justifyContent="space-between" mb={3}>
                    <Typography variant="h5"># {formData.invoice_no}</Typography>
                    <Box display="flex" gap={1}>
                        <Button variant="outlined" color="error" onClick={handleReset}>Cancel</Button>
                        <Button variant="outlined" component={Link} to="/invoice/view-invoice-details">Preview</Button>
                        <Button type="submit" variant="contained" color="primary">Create {title}</Button>
                    </Box>
                </Stack>
                <Divider></Divider>
                <Stack
                    direction="row"
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    justifyContent="space-between"
                    alignItems="center"
                    mb={3}
                >
                    <Box>
                        {" "}
                        <Logo />{" "}
                    </Box>
                    <Box textAlign="right">
                        <CustomFormLabel htmlFor="demo-simple-select" sx={{ marginTop: '10px' }}>
                            Knock The Globe Technologies
                        </CustomFormLabel>
                        No.2-B, Sengunthapuram,<br />
                        12th Cross Strret, Karur, Tamilnadu - India<br />
                        33AAYFM6520D1Z8
                    </Box>
                </Stack>
                <Divider></Divider>
                <Grid container spacing={3} mb={4}>
                    <Grid item xs={12} sm={6}>
                        {/* Billing Left Side Components */}
                        {leftSideComponents()}
                        {/* End Billing Left Side Components */}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {/* Billing Right Side Components */}
                        {rightSideComponents()}
                        {/* End Billing Right Side Components */}
                    </Grid>
                </Grid>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >
                    <Typography variant="h6">Items Details :</Typography>
                    <Button
                        onClick={handleAddItem}
                        variant="contained"
                        color="primary"
                        startIcon={<IconPlus width={18} />}
                    >
                        {" "}
                        Add Item{" "}
                    </Button>
                </Stack>
                <Paper variant="outlined">
                    <TableContainer sx={{ whiteSpace: { xs: "nowrap", md: "unset" } }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {tableHeader.map((item, index) => (
                                        <TableCell width={item.width} key={index}>
                                            <Typography variant="h6" fontSize="14px">
                                                {" "}
                                                {item.label}
                                            </Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {formData.billing_details.map((item, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        {tableBodyFormData.map((item, index) => (
                                            <TableCell sx={{ padding: "5px" }} key={index}>
                                                <CustomBillingFormField
                                                    field={item}
                                                    formData={formData.billing_details}
                                                    rowIndex={rowIndex}
                                                />
                                            </TableCell>
                                        ))}
                                        <TableCell sx={{ padding: "5px" }}>
                                            <Tooltip title="Add Item">
                                                <IconButton onClick={handleAddItem} color="primary">
                                                    <IconSquareRoundedPlus width={22} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete Item">
                                                <IconButton
                                                    onClick={() => handleDeleteItem(rowIndex)}
                                                    color="error"
                                                >
                                                    <IconTrash width={22} />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                {/* Totals */}

                <Box display="flex" justifyContent="space-between" gap={3} mb={1}>
                    <Box p={2} mt={2}>
                        <Box display="flex" justifyContent="start" gap={3} mb={1}>
                            <Typography variant="body1" fontWeight={600}>
                                Other Charges :
                            </Typography>
                            <Typography variant="body1" fontWeight={600}>
                                <Box display="flex" justifyContent="space-between" gap={3} mb={1}>
                                    <CustomTextField
                                        id='other_charges'
                                        name='other_charges'
                                        placeholder='Enter your Other Charges'
                                        type='text'
                                        variant="outlined"
                                        style={{ minWidth: '30%' }}
                                        size="small"
                                        value={formData.other_charges || ''}
                                        onChange={handleChange}
                                    />
                                    <CustomSelect
                                        labelId='other_charges_gst-label'
                                        id='other_charges_gst'
                                        name='other_charges_gst'
                                        style={{ minWidth: '30%' }}
                                        size="small"
                                        value={formData.other_charges_gst || 0}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value='0'>None</MenuItem>
                                        <MenuItem value='18'>GST-18</MenuItem>
                                        <MenuItem value='24'>CGST-24</MenuItem>
                                    </CustomSelect>
                                </Box>
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="start" gap={3} mb={1}>
                            <Typography variant="body1" fontWeight={600}>
                                Discount on All :
                            </Typography>
                            <Typography variant="body1" fontWeight={600}>
                                <Box display="flex" justifyContent="space-between" gap={3} mb={1}>
                                    <CustomTextField
                                        id='discount_details'
                                        name='discount_details'
                                        placeholder='Enter your discount'
                                        type='text'
                                        variant="outlined"
                                        style={{ minWidth: '30%' }}
                                        size="small"
                                        value={formData.discount_details || ''}
                                        onChange={handleChange}
                                    />
                                    <CustomSelect
                                        labelId='discount_type-label'
                                        id='discount_type'
                                        name='discount_type'
                                        style={{ minWidth: '30%' }}
                                        size="small"
                                        value={formData.discount_type || 1}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value='1'>Fixed</MenuItem>
                                        <MenuItem value='2'>Per%</MenuItem>
                                    </CustomSelect>
                                </Box>
                            </Typography>
                        </Box>
                    </Box>

                    <Box p={2} mt={2}>
                        <Box display="flex" justifyContent="space-between" gap={3} mb={1}>
                            <Typography variant="body1" fontWeight={600}>
                                Subtotal :
                            </Typography>
                            <Typography variant="body1" fontWeight={600}>
                                {formData.total_amount ? formData.total_amount : '0.00'}
                            </Typography>
                        </Box>
                        {formData.tax_details_amount && formData.tax_details_amount.map((item, index) => (
                            <Box display="flex" justifyContent="space-between" gap={3} mb={1}>
                                <Typography variant="body1" fontWeight={600}>
                                    {item.tax_name} :
                                </Typography>
                                <Typography variant="body1" fontWeight={600}>
                                    {item.tax_value}
                                </Typography>
                            </Box>
                        ))}
                        <Box display="flex" justifyContent="space-between" gap={3} mb={1}>
                            <Typography variant="body1" fontWeight={600}>
                                Other Charges :
                            </Typography>
                            <Typography variant="body1" fontWeight={600}>
                                {formData.other_charges_amount ? formData.other_charges_amount : '0.00'}
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" gap={3} mb={1}>
                            <Typography variant="body1" fontWeight={600}>
                                Discount on All :
                            </Typography>
                            <Typography variant="body1" fontWeight={600}>
                                {formData.discount_amount ? formData.discount_amount : '0.00'}
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" gap={3} mb={1}>
                            <Typography variant="body1" fontWeight={600}>
                                Round Off :
                            </Typography>
                            <Typography variant="body1" fontWeight={600}>
                                {formData.round_off ? formData.round_off : '0.00'}
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" gap={3} mb={1}>
                            <Typography variant="body1" fontWeight={600}>
                                Grand Total :
                            </Typography>
                            <Typography variant="body1" fontWeight={600}>
                                {formData.grand_total_amount ? formData.grand_total_amount : '0.00'}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Grid container spacing={3} mb={4}>
                    <Grid item xs={12} sm={12}>
                        <CustomFormLabel htmlFor="bill-from" sx={{ marginTop: "0px" }}>
                            Note:
                        </CustomFormLabel>
                        <CustomTextField
                            rows={2}
                            fullWidth
                            multiline
                            id="invoice-note"
                            name="billing_note"
                            value={formData.billing_note}
                            defaultValue="It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!"
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={3} mb={4}>
                    <Grid item xs={6} sm={6}>
                        <Stack mb={2}>
                            <Typography variant="h6">Previous Payments Information :</Typography>
                        </Stack>
                        <Paper variant="outlined">
                            <TableContainer >
                                <Table
                                    aria-label="simple table"
                                    sx={{
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <Typography>Date</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>Payment Type</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>Payment Note</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>Payment</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>Action</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <Typography>27-11-2024</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>Cash</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography></Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>₹ 100.00</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography></Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Stack mb={2}>
                            <Typography variant="h6">Previous Billing Due Information :</Typography>
                        </Stack>
                        <Paper variant="outlined">
                            <TableContainer >
                                <Table
                                    aria-label="simple table"
                                    sx={{
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <Typography>Date</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>Invoice No</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>Billing Amount</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>Paid Amount</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>Balance</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <Typography>27-11-2024</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>TD001</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>₹ 200.00</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>₹ 100.00</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>₹ 100.00</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>

                <Stack mb={2}>
                    <Typography variant="h6">Payment Details :</Typography>
                </Stack>
                <Grid container spacing={3} mb={4}>
                    <Grid item xs={4} sm={4}>
                        <CustomFormLabel htmlFor="bill-from" sx={{ marginTop: "0px" }}>
                            Amount :
                        </CustomFormLabel>
                        <CustomTextField
                            id='payment_amount'
                            name='payment_amount'
                            placeholder='Enter your payment Amount'
                            type='text'
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={formData.payment_amount || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={4} sm={4}>
                        <CustomFormLabel htmlFor="bill-from" sx={{ marginTop: "0px" }}>
                            Payment Type:
                        </CustomFormLabel>
                        <CustomSelect
                            labelId='payment_type-label'
                            id='payment_type'
                            name='payment_type'
                            fullWidth
                            size="small"
                            value={formData.payment_type || ''}
                            onChange={handleChange}
                            displayEmpty
                        >
                            <MenuItem value="" disabled>Select</MenuItem>
                            <MenuItem value="1">Cash</MenuItem>
                            <MenuItem value="2">Card</MenuItem>
                        </CustomSelect>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                        <CustomFormLabel htmlFor="bill-from" sx={{ marginTop: "0px" }}>
                            Payment Note:
                        </CustomFormLabel>
                        <CustomTextField
                            id='payment_note'
                            name='payment_note'
                            placeholder='Enter Your Payment Note'
                            multiline
                            fullWidth
                            value={formData.payment_note || ''}
                            onChange={handleChange}
                            sx={{ padding: '0px' }}
                        />
                    </Grid>
                </Grid>

            </Box>
        </form>
    );
};
export default CustomBillingLayout;
