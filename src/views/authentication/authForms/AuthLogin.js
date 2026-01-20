import { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material';

import CustomCheckbox from '../../../components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import CustomOutlinedInput from '../../../components/forms/theme-elements/CustomOutlinedInput';
import { IconEye, IconEyeOff } from '@tabler/icons';
import req from '../../../utils/req';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../store/apps/loginUser/LoginUserSlice';
import { useNavigate } from 'react-router-dom';
import AlertMessage from '../../../components/utility/AlertMessage';

const AuthLogin = ({ title, subtext }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '', is_reminder: false });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ status: false, message: '', color: '' });

  const handleClickShowPassword = useCallback(() => setShowPassword((prev) => !prev), []);
  const handleMouseDownPassword = useCallback((event) => event.preventDefault(), []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = 'Username is required.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await req().post('/auth/login', formData);

        console.log(response.data);
        if (response.data.status) {
          // console.log('Responce data : ', response.data.data);
          const user = response.data.data.user;

          dispatch(setUserData(response.data.data));
          if (user.role === 4 || user.role === 5) {
            // Admin & Super Admin
            return navigate('/dashboards/modern');
          } else if (user.role === 3) {
            // Staff
            return navigate('/adsmanage/all-ads');
          } else {
            return navigate('/auth/login');
          }
        } else {
          setAlertMessage({
            status: true,
            message: response?.data?.meta?.message || 'Login failed.',
            color: 'error',
          });
        }
      } catch (err) {
        setAlertMessage({
          status: true,
          message:
            err.response?.data?.meta?.message ||
            'Username or Incorrect Password. Please try again.',
          color: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        {title && (
          <Typography fontWeight="700" variant="h3" mb={1}>
            {title}
          </Typography>
        )}
        {subtext}

        <Stack>
          <Box mb={2}>
            <CustomFormLabel htmlFor="username">Username</CustomFormLabel>
            <CustomTextField
              id="username"
              name="username"
              variant="outlined"
              fullWidth
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <FormHelperText error>{errors.username}</FormHelperText>}
          </Box>

          <Box mb={2}>
            <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
            <CustomOutlinedInput
              type={showPassword ? 'text' : 'password'}
              sx={{
                '& .MuiOutlinedInput-input': {
                  padding: '8px',
                },
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <IconEyeOff size="20" /> : <IconEye size="20" />}
                  </IconButton>
                </InputAdornment>
              }
              id="password"
              name="password"
              placeholder="Enter your password"
              fullWidth
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
          </Box>

          <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
            <FormGroup>
              <FormControlLabel
                control={
                  <CustomCheckbox
                    id="is_reminder"
                    name="is_reminder"
                    checked={formData.is_reminder}
                    onChange={handleChange}
                  />
                }
                label="Remember this Device"
              />
            </FormGroup>
          </Stack>
        </Stack>

        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </Button>
        </Box>
      </form>

      <AlertMessage alertMessage={alertMessage} setAlertMessage={setAlertMessage} />
    </>
  );
};

export default AuthLogin;
