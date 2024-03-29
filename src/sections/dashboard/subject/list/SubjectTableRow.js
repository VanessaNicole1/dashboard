import PropTypes from 'prop-types';
import {
  TableRow,
  TableCell,
  IconButton,
} from '@mui/material';
import Iconify from '../../../../components/iconify';
import Label from '../../../../components/label';

SubjectTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
};

export default function SubjectTableRow({ row, selected, onEditRow }) {
  const { name, schedules } = row;
  return (
    <TableRow hover selected={selected}>
      <TableCell align="center">{name}</TableCell>
      <TableCell align="center">
        {
          schedules.map((schedule) => (
            <Label
              key={schedule.grade.id}
              variant="soft"
              color='secondary'
              sx={{ textTransform: 'capitalize', margin: 0.5, }}
              >
              {`${schedule.grade.number} "${schedule.grade.parallel}"`}
            </Label>
          ))
        }
      </TableCell>
      <TableCell align="center">
        <IconButton color="secondary" aria-label="upload picture" component="label" icon="eva:edit-fill" onClick={() => {
          onEditRow();
        }}>
          <Iconify icon="eva:edit-fill" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};