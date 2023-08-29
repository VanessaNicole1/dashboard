import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
} from '@mui/material';
import Label from '../../../../../components/label';
import Iconify from '../../../../../components/iconify';
import { convertToSpanishDate, getFullYears, getMonth } from '../../../period/list/utils/date.utils';
import { PATH_DASHBOARD } from '../../../../../routes/paths';

RemedialLessonPlanManagerTableRow.propTypes = {
  row: PropTypes.object
};

const getDateFormat = (date) => `${getMonth(date)} - ${getFullYears(date)}`;

export default function RemedialLessonPlanManagerTableRow({ row }) {
  const { isValidated, period, grade, teacher, subject, creationDate, id } = row;
  const { startDate, endDate } = period
  const convertedDate = convertToSpanishDate(creationDate);
  const startDateFormat = getDateFormat(startDate);
  const endDateFormat = getDateFormat(endDate);
  const navigate = useNavigate();

  const handleValidate = () => {
    navigate(`${PATH_DASHBOARD.remedialLessonPlan.lessonPlanRemedialTracking(id)}`);
  };

  const handleViewRemedialPlan = () => {
    navigate(`${PATH_DASHBOARD.remedialLessonPlan.remedialPlanViewManager}/${id}`);
  }

  return (
    <TableRow hover >
      <TableCell align="center">{ `${startDateFormat} - ${endDateFormat}` }</TableCell>

      <TableCell align="left">
        {convertedDate}
      </TableCell>

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
          { isValidated ? 'Validada' : 'Pendiente' }
        </Label>
      </TableCell>

      <TableCell align="center">
        <Tooltip title="Seguimiento">
          <IconButton onClick={handleValidate}>
            <Iconify icon="ph:eye" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Ver">
          <IconButton onClick={handleViewRemedialPlan}>
            <Iconify icon="solar:document-linear" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  
  );
}
