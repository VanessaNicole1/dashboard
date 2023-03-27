import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
} from '@mui/material';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import Label from '../../../../components/label';

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { name, lastName, email, roles } = row;
  console.log('roles ROW', roles);
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
        <TableCell align="center">{name}</TableCell>
        <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
          {lastName}
        </TableCell>
        <TableCell align="center">
          {email}
        </TableCell>

        <TableCell align="center">
          {
            roles.map((role) => (
                <Label
                key={role.id}
                variant="soft"
                color={(role.name === 'MANAGER' && 'secondary') || (role.name === 'STUDENT' && 'primary') || (role.name === 'TEACHER' && 'error')}
                sx={{ textTransform: 'capitalize' }}
                >
                  {role.name}
                </Label>
            ))
          }
        </TableCell>
        <TableCell align="center">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
      </MenuPopover>
    </>
  );
};