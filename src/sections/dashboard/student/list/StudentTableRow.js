import { useState } from "react";
import PropTypes from "prop-types";
import { TableRow, MenuItem, TableCell, IconButton } from "@mui/material";
import Iconify from "../../../../components/iconify";
import MenuPopover from "../../../../components/menu-popover";

StudentTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
};

export default function StudentTableRow({ row, selected }) {
  const { grade, user } = row;
  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
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
    </>
  );
}
