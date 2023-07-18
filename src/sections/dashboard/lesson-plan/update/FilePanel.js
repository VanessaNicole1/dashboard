import PropTypes from 'prop-types';
import { Stack, Typography, IconButton } from '@mui/material';
import Iconify from '../../../../components/iconify/Iconify';

FilePanel.propTypes = {
  sx: PropTypes.object,
  link: PropTypes.string,
  onOpen: PropTypes.func,
  title: PropTypes.string,
  collapse: PropTypes.bool,
  subTitle: PropTypes.string,
  onCollapse: PropTypes.func,
};

export default function FilePanel({
  title,
  subTitle,
  link,
  onOpen,
  collapse,
  onCollapse,
  sx,
  ...other
}) {
  return (
    <Stack direction="row" alignItems="center" sx={{ mb: 3, ...sx }} {...other}>
      <Stack flexGrow={1}>
        <Stack direction="row" alignItems="center" spacing={1} flexGrow={1}>
          <Typography variant="h6"> {title} </Typography>

          <IconButton
            size="small"
            color="success"
            onClick={onOpen}
            sx={{
              p: 0,
              width: 24,
              height: 24,
              color: 'common.white',
              bgcolor: 'success.main',
              '&:hover': {
                bgcolor: 'success.main',
              },
            }}
          >
            <Iconify icon="eva:plus-fill" />
          </IconButton>
        </Stack>

        <Typography variant="body2" sx={{ color: 'text.disabled', mt: 0.5 }}>
          {subTitle}
        </Typography>
      </Stack>
      {onCollapse && (
        <IconButton onClick={onCollapse}>
          <Iconify icon={collapse ? 'eva:chevron-down-fill' : 'eva:chevron-up-fill'} />
        </IconButton>
      )}
    </Stack>
  );
}
