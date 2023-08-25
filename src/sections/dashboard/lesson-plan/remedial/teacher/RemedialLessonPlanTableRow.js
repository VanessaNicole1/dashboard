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
import { convertToSpanishDate } from '../../../period/list/utils/date.utils';
import { PATH_DASHBOARD } from '../../../../../routes/paths';

RemedialLessonPlanTableRow.propTypes = {
  row: PropTypes.object
};

export default function RemedialLessonPlanTableRow({ row }) {
  const { isValidated, grade, teacher, subject, creationDate, id, hasQualified } = row;
  const convertedDate = convertToSpanishDate(creationDate);
  const navigate = useNavigate();

  const handleValidate = () => {
    navigate(`${PATH_DASHBOARD.remedialLessonPlan.lessonPlanRemedialTracking(id)}`);
  };

  return (
    <TableRow hover >

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

      <TableCell align="center">
        <Label
          variant="soft"
          color={ isValidated ? 'success' : 'warning' }
          sx={{ textTransform: 'capitalize' }}
        >
          { isValidated ? 'Validado' : 'Pendiente' }
        </Label>
      </TableCell>

      <TableCell align="center">
        <Label
          variant="soft"
          color={ hasQualified ? 'success' : 'warning' }
          sx={{ textTransform: 'capitalize' }}
        >
          { hasQualified ? 'Aceptado' : 'Pendiente' }
        </Label>
      </TableCell>

      <TableCell align="center">
        <Tooltip title="Seguimiento">
          <IconButton onClick={handleValidate}>
            <Iconify icon="ph:eye" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  
  );
}
