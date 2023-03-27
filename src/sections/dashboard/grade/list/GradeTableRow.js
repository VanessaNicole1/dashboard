import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
} from '@mui/material';
import Iconify from '../../../../components/iconify/Iconify';
import MenuPopover from '../../../../components/menu-popover/MenuPopover';

GradeTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onViewStudents: PropTypes.func,
};

export default function GradeTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow, onViewStudents }) {
  const { number, parallel } = row;

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell align="center">{number}</TableCell>

        <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
          {parallel}
        </TableCell>
        <TableCell align="center">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >

        <MenuItem
          onClick={() => {
            onViewStudents();
            handleClosePopover();
          }}
          >
            <Iconify icon="ic:baseline-person" />
            View Students
        </MenuItem>
      </MenuPopover>
    </>
  );
};