import PropTypes from 'prop-types';
import {
  TableRow,
  TableCell,
  IconButton,
  Checkbox,
  Tooltip,
} from '@mui/material';

import Iconify from '../../../../components/iconify/Iconify';
import { useLocales } from '../../../../locales';

EntityTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function EntityTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
}) {
  const { translate } = useLocales();
  const { name, lastName, email, numberParallel, subject, parallel } = row;
  const grade = {
    displayName: `${numberParallel} "${parallel}"`,
  };

  return (
    <TableRow hover selected={selected}>
        <TableCell padding='checkbox'>
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell align='center'>{name}</TableCell>

        <TableCell align='center' sx={{ textTransform: 'capitalize' }}>
          {lastName}
        </TableCell>

        <TableCell align='center'>{email}</TableCell>

        {
          subject && <TableCell align='center'>{subject}</TableCell>
        }

        <TableCell align='center'>{grade.displayName}</TableCell>

        <TableCell align='center'>
          <Tooltip title={translate('lesson_plan.start_process.common.table.row.tooltip', {email})}>
            <IconButton onClick={onEditRow}>
              <Iconify icon="eva:edit-fill" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
  );
}
