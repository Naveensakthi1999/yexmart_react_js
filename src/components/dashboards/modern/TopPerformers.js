import React from 'react';
import DashboardCard from '../../shared/DashboardCard';
import CustomSelect from '../../forms/theme-elements/CustomSelect';
import {
  MenuItem,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  TableContainer,
  Stack,
} from '@mui/material';
import TopPerformerData from './TopPerformerData';

const performers = TopPerformerData;

const TopPerformers = () => {

  return (
    <DashboardCard
      title="Stock Alert"
      subtitle="Low Qty Items"
    >
      <TableContainer>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>#</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>Category Name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>Item Name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>Stock</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {performers.map((basic, index) => (
              <TableRow key={basic.id}>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {index + 1}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    Category - {index + 1}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    Item - {index + 1}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{basic.budget}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  );
};

export default TopPerformers;
