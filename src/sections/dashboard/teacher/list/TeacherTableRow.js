import PropTypes from "prop-types";
import { TableRow, TableCell } from "@mui/material";

TeacherTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
};

export default function TeacherTableRow({ row, selected }) {
  const { user } = row;
  return (
    <TableRow hover selected={selected}>
        <TableCell align="center">{user.name}</TableCell>

        <TableCell align="center" sx={{ textTransform: "capitalize" }}>
          {user.lastName}
        </TableCell>
        <TableCell align="center">{user.email}</TableCell>
      </TableRow>
  );
}
