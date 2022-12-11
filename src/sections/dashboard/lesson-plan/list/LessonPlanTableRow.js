import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';

import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';

LessonPlanTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function LessonPlanTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { date, grade, teacher, subject } = row;

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
        <TableCell align="center">{date}</TableCell>

        <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
          {grade}
        </TableCell>

        <TableCell align="center">
          {teacher.user.name} {teacher.user.lastName}
        </TableCell>

        <TableCell align="center">
          {subject || 'N/A'}
        </TableCell>

        {/* <TableCell align="left">
          <Label
            variant="soft"
            color={(status === 'banned' && 'error') || 'success'}
            sx={{ textTransform: 'capitalize' }}
          >
            {status}
          </Label>
        </TableCell> */}

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