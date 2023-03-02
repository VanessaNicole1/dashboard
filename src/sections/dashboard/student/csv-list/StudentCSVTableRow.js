import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  TableRow,
  MenuItem,
  TableCell,
} from '@mui/material';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';


StudentCSVTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
};

export default function StudentCSVTableRow({ row, selected }) {
  const { user } = row;
  const [openPopover, setOpenPopover] = useState(null);

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell align="center">{user.name}</TableCell>

        <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
          {user.lastName}
        </TableCell>
        <TableCell align="center">
          {user.email}
        </TableCell>
        <TableCell align="center">
          {user.numberParallel}
        </TableCell>
        <TableCell align="center">
          {user.grade}
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >

        <MenuItem
          onClick={() => {}}
        >
          <Iconify icon="ic:baseline-remove-red-eye" />
          View
        </MenuItem>
      </MenuPopover>
    </>
  );
};