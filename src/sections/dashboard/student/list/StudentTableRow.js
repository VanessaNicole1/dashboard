import PropTypes from "prop-types";
import { TableRow, TableCell } from "@mui/material";

StudentTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
};

export default function StudentTableRow({ row, selected }) {
  const { grade, user } = row;

  return (
    <TableRow hover selected={selected}>
        <TableCell align="center">{user.name}</TableCell>
        <TableCell align="center" sx={{ textTransform: "capitalize" }}>
          {user.lastName}
        </TableCell>
        <TableCell align="center">{user.email}</TableCell>
        <TableCell align="center">
          {`${grade.number} "${grade.parallel}"`}
        </TableCell>
      </TableRow>
  );
}
