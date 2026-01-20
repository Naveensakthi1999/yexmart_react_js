import { useEffect, useState } from 'react';
import { Box, CardContent, Grid, Typography } from '@mui/material';
import req from '../../../utils/req';

import icon1 from '../../../assets/images/svgs/icon-connect.svg';
import icon2 from '../../../assets/images/svgs/icon-user-male.svg';
import icon3 from '../../../assets/images/svgs/icon-briefcase.svg';
import icon4 from '../../../assets/images/svgs/icon-mailbox.svg';
import icon5 from '../../../assets/images/svgs/icon-favorites.svg';
import icon6 from '../../../assets/images/svgs/icon-speech-bubble.svg';

const TopCards = ({ admin }) => {
  const [users, setUsers] = useState(0);
  const [premiumUsers, setPremiumUsers] = useState(0);
  const [alertMessage, setAlertMessage] = useState({ status: false, message: '', color: '' });

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await req().get('/user');

      console.log(response.data);

      if (response.data?.status) {
        const user = response.data.data.map((item) => ({
          id: item.user_id,
          ispremium: item.ispremium
        }));

        setUsers(user.length);
        const premiumUser = user.filter((u) => u.ispremium === true);
        setPremiumUsers(premiumUser.length);
        console.log(premiumUsers);

        console.log(users.length);
      }
    } catch (error) {
      setAlertMessage({
        status: true,
        message:
          error?.response?.data?.meta?.message ?? 'An error occurred while getting the brand list.',
        color: 'error',
      });
    }
  };

  const topcards = [
    {
      icon: icon2,
      title: 'Users',
      digits: users,
      bgcolor: 'primary',
      // restricted: false,
    },
    {
      icon: icon3,
      title: 'Premium Users',
      digits: premiumUsers,
      bgcolor: 'warning',
      // restricted: false,
    },
    {
      icon: icon4,
      title: 'Active Ads',
      digits: '356',
      bgcolor: 'secondary',
      // restricted: false,
    },
    {
      icon: icon5,
      title: 'Expired Ads',
      digits: '69',
      bgcolor: 'error',
      // restricted: false,
    },
    {
      icon: icon6,
      title: 'Total Sales Revenue',
      digits: '₹ 96,000',
      bgcolor: 'success',
      // restricted: true,
    },
    {
      icon: icon1,
      title: 'Total Ads Revenue',
      digits: '₹ 59,000',
      bgcolor: 'info',
      // restricted: true,
    },
  ];

  const visibleCards = admin ? topcards : topcards.filter(card => !card.restricted);

  return (
    <Grid container spacing={3}>
      {visibleCards.map((topcard, i) => (
        <Grid item xs={12} sm={4} lg={2} key={i}>
          <Box bgcolor={topcard.bgcolor + '.light'} textAlign="center">
            <CardContent>
              <img src={topcard.icon} alt={topcard.icon} width="50" />
              <Typography
                color={topcard.bgcolor + '.main'}
                mt={1}
                variant="subtitle1"
                fontWeight={600}
              >
                {topcard.title}
              </Typography>
              <Typography color={topcard.bgcolor + '.main'} variant="h4" fontWeight={600}>
                {topcard.digits}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCards;
