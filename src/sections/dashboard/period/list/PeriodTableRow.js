import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Button,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
} from '@mui/material';
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';
import { getFullYears, getMonth } from './utils/date.utils';

PeriodTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onViewTeachers: PropTypes.func,
  onViewStudents: PropTypes.func,
  onViewGrades: PropTypes.func,
};

export default function PeriodTableRow({ row, selected, onEditRow, onDeleteRow, onViewTeachers, onViewStudents, onViewGrades }) {
  const { startDate, endDate, degree, isActive } = row;

  const startDateFormat = `${getMonth(startDate)} - ${getFullYears(startDate)}`;
  const endDateFormat = `${getMonth(endDate)} - ${getFullYears(endDate)}`;

  const {name, manager} = degree;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell align="left">{startDateFormat}</TableCell>

        <TableCell align="left">{endDateFormat}</TableCell>

        <TableCell align="left">
          {manager.user.displayName}
        </TableCell>

        <TableCell align="left">
          {name}
        </TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color={(isActive !== (true) && 'error') || 'success'}
            sx={{ textTransform: 'capitalize' }}
          >
            {isActive !== (true) ? 'Finished' : 'Active' }
          </Label>
        </TableCell>

        <TableCell align="right">
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
        {
          isActive && <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
          >
            <Iconify icon="eva:trash-2-outline" />
            Delete
          </MenuItem>
        }

        {
          isActive && <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
          >
            <Iconify icon="eva:edit-fill" />
            Edit
          </MenuItem>
        }

          <MenuItem
          onClick={() => {
            onViewStudents();
            handleClosePopover();
          }}
          >
            <Iconify icon="ic:baseline-person" />
            View Students
          </MenuItem>

          <MenuItem
          onClick={() => {
            onViewTeachers();
            handleClosePopover();
          }}
          >
            <Iconify icon="ic:baseline-person" />
            View Teachers
          </MenuItem>

          <MenuItem
          onClick={() => {
            onViewGrades();
            handleClosePopover();
          }}
          >
            <Iconify icon="ic:baseline-meeting-room" />
            View Grades
          </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}