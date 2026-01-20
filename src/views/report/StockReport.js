import * as React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { Grid, Tabs, Tab, Box, CardContent, Divider } from '@mui/material';

// components
import AccountTab from '../../components/pages/account-setting/AccountTab';
import { IconBell, IconUserCircle } from '@tabler/icons';
import BlankCard from '../../components/shared/BlankCard';
import ItemsWaysStock from './ItemsWaysStock';
import BrandWaysStock from './BrandWaysStock';
import CategoryWaysStock from './CategoryWaysStock';

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

const StockReport = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <PageContainer title="Stock Report" description="this is Stock Report">
            <Breadcrumb title="Stock Report Information" items={BCrumb} />

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
                                    label="Item Wise"
                                    {...a11yProps(0)}
                                />

                                <Tab
                                    iconPosition="start"
                                    icon={<IconBell size="22" />}
                                    label="Brand Wise"
                                    {...a11yProps(1)}
                                />

                                <Tab
                                    iconPosition="start"
                                    icon={<IconBell size="22" />}
                                    label="Category Wise"
                                    {...a11yProps(2)}
                                />
                            </Tabs>
                        </Box>
                        <Divider />
                        <CardContent style={{ padding: '0px' }}>
                            <TabPanel value={value} index={0}>
                                <ItemsWaysStock />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <BrandWaysStock />
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <CategoryWaysStock />
                            </TabPanel>
                        </CardContent>
                    </BlankCard>
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default StockReport;
