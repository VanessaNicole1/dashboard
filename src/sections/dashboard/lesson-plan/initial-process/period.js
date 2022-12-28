import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
//
import { Helmet } from 'react-helmet-async';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import Iconify from '../../../../components/iconify';
import PeriodNewForm from '../../period/create/PeriodNewForm';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../components/settings';

// ----------------------------------------------------------------------

CreateNewPeriod.propTypes = {
  checkout: PropTypes.object,
  onNextStep: PropTypes.func,
  onDeleteCart: PropTypes.func,
  onApplyDiscount: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
};

export default function CreateNewPeriod({
  checkout,
  onNextStep,
  onApplyDiscount,
  onDeleteCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) {
//   const { cart, total, discount, subtotal } = checkout;

//   const totalItems = sum(cart.map((item) => item.quantity));

//   const isEmptyCart = !cart.length;

  const { themeStretch } = useSettingsContext();

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
          // disabled={!cart.length}
          onClick={onNextStep}
        >
          Check Out
        </Button>
      </Grid>
    </Grid>
  );
}