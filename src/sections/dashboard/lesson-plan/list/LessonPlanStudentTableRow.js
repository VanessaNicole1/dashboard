import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
} from '@mui/material';
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import { getFullYears, getMonth } from '../../period/list/utils/date.utils';
import { getFancyDate } from '../../../../utils/date';
import { PATH_DASHBOARD } from '../../../../routes/paths';

LessonPlanStudentTableRow.propTypes = {
  row: PropTypes.object
};

// TODO: Add i18n.

export default function LessonPlanStudentTableRow({ row }) { 
  const getDateFormat = (date) => `${getMonth(date)} - ${getFullYears(date)}`

  const { isValidated, period, grade, teacher, subject, creationDate, lessonPlanId } = row;
  const { startDate, endDate } = period;

  const startDateFormat = getDateFormat(startDate);
  const endDateFormat = getDateFormat(endDate);

  const navigate = useNavigate();

  const handleValidate = () => {
    navigate(`${PATH_DASHBOARD.lessonPlan.studentValidate}/${lessonPlanId}`);
  };

  return (
    <TableRow hover >
      <TableCell align="center">{ `${startDateFormat} - ${endDateFormat}` }</TableCell>

      <TableCell align="left">
        { `${grade.number} "${grade.parallel}"` }
      </TableCell>

      <TableCell align="left">
        {teacher.user.displayName}
      </TableCell>

      <TableCell align="left">
        {subject.name}
      </TableCell>

      <TableCell align="left">
        <Label
          variant="soft"
          color={ isValidated ? 'success' : 'warning' }
          sx={{ textTransform: 'capitalize' }}
        >
          { isValidated ? 'Validated' : 'Not Validated' }
        </Label>
      </TableCell>

      <TableCell align="left">
        {getFancyDate(creationDate)}
      </TableCell>

      <TableCell align="center">
        <Tooltip title="Validar">
          <IconButton onClick={handleValidate}>
            <Iconify icon="ic:outline-rate-review" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  
  );
}
