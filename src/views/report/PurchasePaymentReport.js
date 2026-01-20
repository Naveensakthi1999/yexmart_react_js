import * as React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { Grid, Tabs, Tab, Box, CardContent, Divider } from '@mui/material';

// components
import AccountTab from '../../components/pages/account-setting/AccountTab';
import { IconBell, IconUserCircle } from '@tabler/icons';
import BlankCard from '../../components/shared/BlankCard';
import NotificationTab from '../../components/pages/account-setting/NotificationTab';
import PurchasePaymentWays from './PurchasePaymentWays';
import SupplierPaymentWays from './SupplierPaymentWays';

const BCrumb = [
    {
        to: '/',
        title: 'Home',
    },
    {
        title: 'Purchase Report',
    },
];


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const PurchasePaymentReport = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <PageContainer title="Purchase Report" description="this is Purchase Report">
            <Breadcrumb title="Purchase Report Information" items={BCrumb} />

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <BlankCard>
                        <Box sx={{ maxWidth: { xs: 320, sm: 480 } }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                scrollButtons="auto"
                                aria-label="basic tabs example" variant="scrollable"
                            >
                                <Tab
                                    iconPosition="start"
                                    icon={<IconUserCircle size="22" />}
                                    label="Purchase Payment"
                                    {...a11yProps(0)}
                                />

                                <Tab
                                    iconPosition="start"
                                    icon={<IconBell size="22" />}
                                    label="Supplier Payment"
                                    {...a11yProps(1)}
                                />
                            </Tabs>
                        </Box>
                        <Divider />
                        <CardContent style={{ padding: '0px' }}>
                            <TabPanel value={value} index={0}>
                                <PurchasePaymentWays />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <SupplierPaymentWays />
                            </TabPanel>
                        </CardContent>
                    </BlankCard>
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default PurchasePaymentReport;
