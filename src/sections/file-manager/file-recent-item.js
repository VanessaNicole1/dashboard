import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { Tooltip } from '@mui/material';

import useResponsive from '../../hooks/useResponsive';
import FileThumbnail from '../../components/file-thumbnail/FileThumbnail';
import Iconify from '../../components/iconify/Iconify';
import { fData } from '../../utils/formatNumber';
import { fDateTime } from '../../utils/formatTime';
import { HOST_API_KEY } from '../../config-global';

export default function FileRecentItem({ file, onDelete, sx, ...other }) {
  const smUp = useResponsive('up', 'sm');

  const seeResource = (e) => {
    e.preventDefault();
    window.open(`${HOST_API_KEY}/lesson-plans/resource/${file.url}`, '_blank');
  }

  const renderAction = (
    <Box
      sx={{
        top: 0,
        right: 8,
        position: 'absolute',
        ...(smUp && {
          flexShrink: 0,
          position: 'unset',
        }),
      }}
    > 
      <Tooltip title="Ver Recurso">
        <IconButton color='default' onClick={seeResource}>
          <Iconify icon="majesticons:eye-line" />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const renderText = (
    <ListItemText
      onClick={seeResource}
      primary={file.name}
      secondary={
        <>
          {fData(file.size)}
          <Box
            sx={{ mx: 0.75, width: 2, height: 2, borderRadius: '50%', bgcolor: 'currentColor' }}
          />
          {fDateTime(new Date(file.createdDate))}
        </>
      }
      primaryTypographyProps={{
        noWrap: true,
        typography: 'subtitle2',
      }}
      secondaryTypographyProps={{
        mt: 0.5,
        component: 'span',
        alignItems: 'center',
        typography: 'caption',
        color: 'text.disabled',
        display: 'inline-flex',
      }}
    />
  );

  return (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={1}
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'unset', sm: 'center' }}
      sx={{
        borderRadius: 2,
        bgcolor: 'unset',
        cursor: 'pointer',
        position: 'relative',
        p: { xs: 2.5, sm: 2 },
        '&:hover': {
          bgcolor: 'background.paper',
          boxShadow: (theme) => theme.customShadows.z20,
        },
        ...sx,
      }}
      {...other}
    >
      <FileThumbnail file={file.name} sx={{ width: 36, height: 36, mr: 1 }} />

      {renderText}

      {renderAction}
    </Stack>
    
  );
}

FileRecentItem.propTypes = {
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onDelete: PropTypes.func,
  sx: PropTypes.object,
};
