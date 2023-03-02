import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
} from '@mui/material';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';

LessonPlanTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function LessonPlanTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { date, schedule } = row;

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
          {schedule.grade.displayName}
        </TableCell>

        <TableCell align="center">
          {schedule.teacher.user.name} {schedule.teacher.user.lastName}
        </TableCell>

        <TableCell align="center">
          {schedule.subject.name}
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