import PropTypes from 'prop-types';
import { Stack, Typography, CircularProgress } from '@mui/material';
import Iconify from '../iconify/Iconify';

BudgeAnalytic.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string,
  percent: PropTypes.number,
  content: PropTypes.any,
  handleClick: PropTypes.func
};

export default function BudgeAnalytic({ title, content, icon, color, percent, handleClick}) {
  return (
    <Stack
      onClick={handleClick}
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 1,
        minWidth: 200, 
        '& > *': {
          cursor: 'pointer',
          '&:hover': {
            textDecoration: 'underline',
          },
        }
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ position: 'relative', marginX: '5px' }}>
        <Iconify icon={icon} width={24} sx={{ color, position: 'absolute' }} />

        <CircularProgress
          variant="determinate"
          value={percent}
          size={56}
          thickness={4}
          sx={{ color, opacity: 0.48 }}
        />
      </Stack>

      <Stack spacing={0.5} sx={{ ml: 2 }}>
        <Typography variant="h6">{title}</Typography>

        <Typography variant="subtitle2">
          { content }
        </Typography>
      </Stack>
    </Stack>
  );
}
