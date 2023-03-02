import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Stack,
  Avatar,
  Button,
  Divider,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
  AvatarGroup,
} from '@mui/material';
import { fDate } from '../../../../utils/formatTime';
import { fData } from '../../../../utils/formatNumber';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';
import FileThumbnail from '../../../../components/file-thumbnail';

FileTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function FileTableRow({ row, selected, onSelectRow, onDeleteRow }) {
  const { name, size, type, dateModified, shared, isFavorited } = row;

  const [openShare, setOpenShare] = useState(false);

  const [openDetails, setOpenDetails] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [favorited, setFavorited] = useState(isFavorited);

  const [openPopover, setOpenPopover] = useState(null);

  const handleFavorite = () => {
    setFavorited(!favorited);
  };

  const handleOpenShare = () => {
    setOpenShare(true);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow
        sx={{
          borderRadius: 1,
          '& .MuiTableCell-root': {
            bgcolor: 'background.default',
          },
          ...(openDetails && {
            '& .MuiTableCell-root': {
              color: 'text.primary',
              typography: 'subtitle2',
              bgcolor: 'background.default',
            },
          }),
        }}
      >
        <TableCell
          padding="checkbox"
          sx={{
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          }}
        >
          <Checkbox
            checked={selected}
            onDoubleClick={() => console.log('ON DOUBLE CLICK')}
            onClick={onSelectRow}
          />
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <FileThumbnail file={type} />

            <Typography noWrap variant="inherit" sx={{ maxWidth: 360, cursor: 'pointer' }}>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell
          align="left"
          sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}
        >
          {fData(size)}
        </TableCell>

        <TableCell
          align="center"
          sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}
        >
          {type}
        </TableCell>

        <TableCell
          align="left"
          sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}
        >
          {fDate(dateModified)}
        </TableCell>

        <TableCell align="right">
          <AvatarGroup
            max={4}
            sx={{
              '& .MuiAvatarGroup-avatar': {
                width: 24,
                height: 24,
                '&:first-of-type': {
                  fontSize: 12,
                },
              },
            }}
          >
            {shared &&
              shared.map((person) => (
                <Avatar key={person.id} alt={person.name} src={person.avatar} />
              ))}
          </AvatarGroup>
        </TableCell>

        <TableCell
          align="right"
          sx={{
            whiteSpace: 'nowrap',
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
          }}
        >
          <Checkbox
            color="warning"
            icon={<Iconify icon="eva:star-outline" />}
            checkedIcon={<Iconify icon="eva:star-fill" />}
            checked={favorited}
            onChange={handleFavorite}
            sx={{ p: 0.75 }}
          />

          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:link-2-fill" />
          Copy Link
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClosePopover();
            handleOpenShare();
          }}
        >
          <Iconify icon="eva:share-fill" />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
