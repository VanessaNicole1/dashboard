import { useState } from 'react';
import PropTypes from 'prop-types';
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
import { convertToSpanishDate, getFullYears, getMonth } from '../../period/list/utils/date.utils';
import { useLocales } from '../../../../locales';

LessonPlanTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onViewRow: PropTypes.func,
};

export default function LessonPlanTableRow({ row, selected, onEditRow, onDeleteRow, onViewRow }) {
  const { period, grade, subject, hasQualified, date } = row;

  const convertedDate = convertToSpanishDate(date);

  const { startDate, endDate } = period;

  const { translate } = useLocales();

  const startDateFormat = `${new Date(startDate).getDate()} de ${getMonth(startDate)} - ${getFullYears(startDate)} `;
  const endDateFormat = ` ${new Date(endDate).getDate()} de ${getMonth(endDate)} - ${getFullYears(endDate)}`;

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
        <TableCell align="center">{ `${startDateFormat}   -   ${endDateFormat}`}</TableCell>

        <TableCell align="center">
          { convertedDate }
        </TableCell>

        <TableCell align="left">
          { `${grade.number} "${grade.parallel}"` }
        </TableCell>

        <TableCell align="left">
          {subject.name}
        </TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color={!hasQualified ? 'warning' : 'success'}
            sx={{ textTransform: 'capitalize' }}
          >
            {!hasQualified ? 'Pendiente' : 'Validado' }
          </Label>
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
        {
          period.isActive && <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
          >
            <Iconify icon="eva:trash-2-outline" />
            {translate('teachers_lesson_plans.delete')}
          </MenuItem>
        }

        {
          period.isActive && <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
          >
            <Iconify icon="eva:edit-fill" />
            {translate('teachers_lesson_plans.edit')}
          </MenuItem>
        }
          <MenuItem
          onClick={() => {
            onViewRow();
          }}
          >
            <Iconify icon="carbon:view" />
            {translate('teachers_lesson_plans.view')}
          </MenuItem>
        
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={translate('teachers_lesson_plans.delete_title')}
        content={translate('teachers_lesson_plans.content_delete')}
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            {translate('teachers_lesson_plans.delete_button')}
          </Button>
        }
      />
    </>
  );
}