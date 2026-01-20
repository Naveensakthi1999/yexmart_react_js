
import React, { useMemo, } from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  TableContainer,
  Stack,
  Rating,
  Paper,
  Grid,
} from '@mui/material';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import BlankCard from 'src/components/shared/BlankCard';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';

import user1 from 'src/assets/images/profile/user-1.jpg';
import user2 from 'src/assets/images/profile/user-2.jpg';
import user3 from 'src/assets/images/profile/user-3.jpg';
import user4 from 'src/assets/images/profile/user-4.jpg';
import user5 from 'src/assets/images/profile/user-5.jpg';
import user6 from 'src/assets/images/profile/user-6.jpg';
import user7 from 'src/assets/images/profile/user-7.jpg';
import user8 from 'src/assets/images/profile/user-8.jpg';

const debit_note = [
  {
    id: '1',
    title: 'Total Ads Purchase',
    amount: '0.00',
  },
  {
    id: '2',
    title: 'Total Purchase Tax',
    amount: '0.00',
  },
  {
    id: '3',
    title: 'Total Other Charges of Purchase',
    amount: '0.00',
  },
  {
    id: '4',
    title: 'Total Discount on Purchase',
    amount: '0.00',
  },
  {
    id: '5',
    title: 'Paid Payment',
    amount: '0.00',
  },
  {
    id: '6',
    title: 'Purchase Due',
    amount: '0.00',
  },
  {
    id: '7',
    title: 'Total Purchase Return',
    amount: '0.00',
  },
  {
    id: '8',
    title: 'Total Purchase Return Tax',
    amount: '0.00',
  },
  {
    id: '9',
    title: 'Total Other Charges of Purchase Return',
    amount: '0.00',
  },
  {
    id: '10',
    title: 'Total Discount on Purchase Return',
    amount: '0.00',
  },
  {
    id: '11',
    title: 'Paid Payment',
    amount: '0.00',
  },
  {
    id: '12',
    title: 'Purchase Return Due',
    amount: '0.00',
  },
];

const credit_note = [
  {
    id: '1',
    title: 'Total Sales',
    amount: '0.00',
  },
  {
    id: '2',
    title: 'Total Sales Tax',
    amount: '0.00',
  },
  {
    id: '3',
    title: 'Total Other Charges of Sales',
    amount: '0.00',
  },
  {
    id: '4',
    title: 'Total Discount on Sales',
    amount: '0.00',
  },
  {
    id: '5',
    title: 'Paid Payment',
    amount: '0.00',
  },
  {
    id: '6',
    title: 'Sales Due',
    amount: '0.00',
  },
  {
    id: '7',
    title: 'Total Sales Return',
    amount: '0.00',
  },
  {
    id: '8',
    title: 'Total Sales Return Tax',
    amount: '0.00',
  },
  {
    id: '9',
    title: 'Total Other Charges of Sales Return',
    amount: '0.00',
  },
  {
    id: '10',
    title: 'Total Discount on Sales Return',
    amount: '0.00',
  },
  {
    id: '11',
    title: 'Paid Payment',
    amount: '0.00',
  },
  {
    id: '12',
    title: 'Purchase Sales Due',
    amount: '0.00',
  },
];

const ProfitAndLossReport = () => {
  const BCrumb = useMemo(() => [
    { to: '/', title: 'Home' },
    { title: 'Profit & Loss Report' },
  ], []);

  const currentDate = new Date();
  const oneMonthAgo = new Date(new Date().setMonth(currentDate.getMonth() - 1));

  return (
    <PageContainer title="Profit & Loss Report" description="this is Profit & Loss Report">
      <Breadcrumb title="Profit & Loss Report" items={BCrumb}>
        <Stack spacing={3}>
          <BlankCard>
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
                  />
                )}
                value={oneMonthAgo}
                inputFormat="dd/MM/yyyy"
              />
            </LocalizationProvider>
          </BlankCard>
          <BlankCard>
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
                  />
                )}
                value={currentDate}
                inputFormat="dd/MM/yyyy"
              />
            </LocalizationProvider>
          </BlankCard>
        </Stack>
      </Breadcrumb>

      <Grid container spacing={3}>
        <Grid item lg={6}>
          <Stack spacing={3}>
            <BlankCard>
              <Box p={3}>
                <Typography variant="h5" mb={3}>
                  Debit Notes
                </Typography>
                <TableContainer>
                  <Table aria-label="simple table">
                    <TableBody>
                      {debit_note.map((basic) => (
                        <TableRow key={basic.id}>
                          <TableCell sx={{ pl: 0 }}>
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" fontWeight={600}>
                                {basic.title}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" textAlign="right">
                              {basic.amount}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </BlankCard>
          </Stack>
        </Grid>
        <Grid item lg={6}>
          <Stack spacing={3}>
            <BlankCard>
              <Box p={3}>
                <Typography variant="h5" mb={3}>
                  Credit Notes
                </Typography>

                <TableContainer>
                  <Table aria-label="simple table">
                    <TableBody>
                      {credit_note.map((basic) => (
                        <TableRow key={basic.id}>
                          <TableCell sx={{ pl: 0 }}>
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" fontWeight={600}>
                                {basic.title}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" textAlign="right">
                              {basic.amount}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </BlankCard>
          </Stack>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ProfitAndLossReport;
