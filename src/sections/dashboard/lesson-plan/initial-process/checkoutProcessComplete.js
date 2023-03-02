import PropTypes from 'prop-types';
import {
  Box,
  Stack,
} from '@mui/material';
// components
import Iconify from '../../../../components/iconify';

CheckoutSteps.propTypes = {
  sx: PropTypes.object,
  activeStep: PropTypes.number,
  steps: PropTypes.arrayOf(PropTypes.string),
};

export default function CheckoutSteps({ steps, activeStep, sx, ...other }) {
  return (
   <h1>Hello Word</h1>
  );
}

StepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

function StepIcon({ active, completed }) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 24,
        height: 24,
        color: 'text.disabled',
        ...(active && {
          color: 'primary.main',
        }),
      }}
    >
      {completed ? (
        <Iconify icon="eva:checkmark-fill" sx={{ color: 'primary.main' }} />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
          }}
        />
      )}
    </Stack>
  );
}
