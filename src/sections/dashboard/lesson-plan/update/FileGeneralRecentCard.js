import PropTypes from 'prop-types';
import {
  Box,
  Stack,
  MenuItem,
  Typography,
  Tooltip,
  IconButton,
} from '@mui/material';
import useResponsive from '../../../../hooks/useResponsive';
import { fData } from '../../../../utils/formatNumber';
import { fDateTime } from '../../../../utils/formatTime';
import Iconify from '../../../../components/iconify';
import FileThumbnail from '../../../../components/file-thumbnail';

FileGeneralRecentCard.propTypes = {
  sx: PropTypes.object,
  file: PropTypes.object,
  onDelete: PropTypes.func,
  onView: PropTypes.func,
};

export default function FileGeneralRecentCard({ file, onDelete, onView, sx, ...other  }) {
  const isDesktop = useResponsive('up', 'sm');

  const handleOpenDetails = () => {
  };
  const filename = file.url;
  const fileExtension = filename.split('.').pop();
  return (
    <Stack
        spacing={isDesktop ? 1.5 : 2}
        direction={isDesktop ? 'row' : 'column'}
        alignItems={isDesktop ? 'center' : 'flex-start'}
        sx={{
          p: 2.5,
          borderRadius: 2,
          position: 'relative',
          border: (theme) => `solid 1px ${theme.palette.divider}`,
          '&:hover': {
            bgcolor: 'background.paper',
            boxShadow: (theme) => theme.customShadows.z20,
          },
          ...(isDesktop && {
            p: 1.5,
            borderRadius: 1.5,
          }),
          ...sx,
        }}
        {...other}
      >
        <FileThumbnail file={fileExtension} />
        <Stack
          onClick={handleOpenDetails}
          sx={{
            width: 1,
            flexGrow: { sm: 1 },
            minWidth: { sm: '1px' },
          }}
        >
          <Typography variant="subtitle2" noWrap>
            {file.name}
          </Typography>

          <Stack
            spacing={0.75}
            direction="row"
            alignItems="center"
            sx={{ typography: 'caption', color: 'text.disabled', mt: 0.5 }}
          >
            <Box> {fData(file.size)} </Box>

            <Box sx={{ width: 2, height: 2, borderRadius: '50%', bgcolor: 'currentColor' }} />

            <Box> {fDateTime(file.createdDate)} </Box>
          </Stack>
        </Stack>
        <MenuItem
          onClick={() => {
            onDelete();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
        </MenuItem>
        <Tooltip title="Ver Recurso">
        <IconButton color='default' onClick={() => {
          onView();
        }}>
          <Iconify icon="majesticons:eye-line" />
        </IconButton>
      </Tooltip>
      </Stack>
  );
}
