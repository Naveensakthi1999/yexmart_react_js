import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const CustomFormLabel = styled((props) => (
  <Typography
    variant="subtitle1"
    fontWeight={600}
    {...props}
    component="label"
    htmlFor={props.htmlFor}
  />
))((sx) => ({
  marginBottom: '5px',
  marginTop: '25px',
  display: 'block',
  ...sx,
}));

export default CustomFormLabel;
