import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import Iconify from '../../../../components/iconify';
import PeriodNewForm from '../../period/create/PeriodNewForm';

CreateNewPeriod.propTypes = {
  checkout: PropTypes.object,
  onNextStep: PropTypes.func,
};

export default function CreateNewPeriod({
  checkout,
  onNextStep,
}) {
//   const { cart, total, discount, subtotal } = checkout;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <PeriodNewForm />
      </Grid>
      
      <Grid item xs={12} md={8}>
        <Button
          to={PATH_DASHBOARD.lessonPlan.root}
          component={RouterLink}
          color="inherit"
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
        >
          About Lesson Plan
        </Button>
      </Grid>

      <Grid item xs={12} md={4}>
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={onNextStep}
        >
          Check Out
        </Button>
      </Grid>
    </Grid>
  );
}