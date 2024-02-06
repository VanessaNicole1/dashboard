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
import { convertToSpanishDate, getFullYears, getMonth } from '../../period/list/utils/date.utils';
import { PATH_DASHBOARD } from '../../../../routes/paths';

LessonPlanStudentTableRow.propTypes = {
  row: PropTypes.object,
  basePath: PropTypes.string
};

export default function LessonPlanStudentTableRow({ 
  row,
  basePath = `${PATH_DASHBOARD.lessonPlan.studentValidate}`
}) {
  const getDateFormat = (date) => `${getMonth(date)} - ${getFullYears(date)}`;
  const { isValidated, period, grade, teacher, subject, creationDate, lessonPlanId, isAgree } = row;
  const { startDate, endDate } = period;

  const convertedDate = convertToSpanishDate(creationDate);
  const startDateFormat = getDateFormat(startDate);
  const endDateFormat = getDateFormat(endDate);

  const navigate = useNavigate();

  const handleValidate = () => {
    const path = `${basePath}/${lessonPlanId}`;
    navigate(path);
  };

  return (
    <TableRow hover>
      <TableCell align="center" size='medium'>{ `${startDateFormat} - ${endDateFormat}` }</TableCell>

      <TableCell align="left" size='medium'>
        {convertedDate}
      </TableCell>

      <TableCell align="left">
        { `${grade.number} "${grade.parallel}"` }
      </TableCell>

      <TableCell align="center">
        {teacher.user.displayName}
      </TableCell>

      <TableCell align="left">
        {subject.name}
      </TableCell>

      <TableCell align="center">
        <Label
          variant="soft"
          color={ isValidated ? 'info' : 'warning' }
          sx={{ textTransform: 'capitalize' }}
        >
          { isValidated ? 'Revisado' : 'Pendiente' }
        </Label>
      </TableCell>

      <TableCell align="center">
        <Label
          variant="soft"
          color={ isAgree === true ? 'success' : isAgree === false ? 'error' : 'warning' }
          sx={{ textTransform: 'capitalize' }}
        >
          { isAgree === true ? 'Aceptado' : isAgree === false ? 'No Aceptado' : 'Pendiente de aceptar' }
        </Label>
      </TableCell>

      <TableCell align="center" size='10px'>
        <Tooltip title="Aceptar">
          <IconButton onClick={handleValidate}>
            <Iconify icon="ic:outline-rate-review" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  
  );
}
