import PropTypes from 'prop-types';
import sum from 'lodash/sum';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Card, Button, CardHeader, Typography } from '@mui/material';
//
import { PATH_DASHBOARD } from '../../../../routes/paths';
import EmptyContent from '../../../../components/empty-content/EmptyContent';
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

CreateNewSubjects.propTypes = {
  checkout: PropTypes.object,
  onNextStep: PropTypes.func,
  onDeleteCart: PropTypes.func,
  onApplyDiscount: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
};

export default function CreateNewSubjects({
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

  return (
    <Grid container spacing={3}>
        <h1>Subjects</h1>
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
