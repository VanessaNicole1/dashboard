import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Iconify from '../../components/iconify/Iconify';

export default function FileManagerPanel({
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
            color="primary"
            onClick={onOpen}
            sx={{
              width: 24,
              height: 24,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            <Iconify icon="mingcute:add-line" />
          </IconButton>
        </Stack>

        <Box sx={{ typography: 'body2', color: 'text.disabled', mt: 0.5 }}>{subTitle}</Box>
      </Stack>

      {onCollapse && (
        <IconButton onClick={onCollapse}>
          <Iconify icon={collapse ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-upward-fill'} />
        </IconButton>
      )}
    </Stack>
  );
}

FileManagerPanel.propTypes = {
  collapse: PropTypes.bool,
  link: PropTypes.string,
  onCollapse: PropTypes.func,
  onOpen: PropTypes.func,
  subTitle: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.string,
};
