import PropTypes from 'prop-types';
import {
  TableRow,
  TableCell,
  IconButton,
} from '@mui/material';
import Iconify from '../../../../components/iconify';
import CustomAvatar from '../../../../components/custom-avatar/CustomAvatar';

ReportTeacherTableRow.propTypes = {
  row: PropTypes.object,
  onViewDetailedReportPage: PropTypes.func
};

export default function ReportTeacherTableRow({ row, onViewDetailedReportPage }) {
  const { user } = row;

  return (
    <TableRow>
      <TableCell align="center" sx={{display: "flex", justifyContent: "center"}}>
        <CustomAvatar name={user.name} />
      </TableCell>

      <TableCell align="center">{user.displayName}</TableCell>

      <TableCell align="center">
        {user.email}
      </TableCell>

      <TableCell align="center">
        <IconButton onClick={onViewDetailedReportPage} sx={{ mr: 1, color: 'text.success' }}>
          <Iconify icon="tabler:report" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};