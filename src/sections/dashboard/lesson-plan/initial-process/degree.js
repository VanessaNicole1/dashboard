import PropTypes from 'prop-types';
import sum from 'lodash/sum';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Card, Button, CardHeader, Typography } from '@mui/material';
//
import { PATH_DASHBOARD } from '../../../../routes/paths';
import EmptyContent from '../../../../components/empty-content/EmptyContent';
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

CreateNewDegree.propTypes = {
  checkout: PropTypes.object,
  onBackStep: PropTypes.func,
  onDeleteCart: PropTypes.func,
  onApplyDiscount: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
  onNextStep: PropTypes.func,
};

export default function CreateNewDegree({
  checkout,
  onBackStep,
  onApplyDiscount,
  onDeleteCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onNextStep
}) {
//   const { cart, total, discount, subtotal } = checkout;

//   const totalItems = sum(cart.map((item) => item.quantity));

//   const isEmptyCart = !cart.length;

  return (
    <Grid container spacing={3}>
      <h1>Degree</h1>
      <Button
        size="small"
        color="inherit"
        onClick={onBackStep}
        startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
      >
        Back
      </Button>
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
    
  );
}
