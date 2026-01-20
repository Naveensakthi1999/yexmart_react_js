import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Error403 = () => {
    const navigate = useNavigate();

    return (
        <Box
            display="flex"
            flexDirection="column"
            height="100vh"
            textAlign="center"
            justifyContent="center"
        >
            <Container maxWidth="md">
                <Typography align="center" variant="h1" mb={4}>
                    403
                </Typography>
                <Typography align="center" variant="h4" mb={4}>
                    Access Denied
                </Typography>
                <Typography align="center" variant="subtitle1" mb={4}>
                    You do not have permission to view this page.
                </Typography>
                <Button
                    color="primary"
                    variant="contained"
                    disableElevation
                    onClick={() => navigate('/auth/login')}
                >
                    Go Back to Login
                </Button>
            </Container>
        </Box>
    );
};

export default Error403;
