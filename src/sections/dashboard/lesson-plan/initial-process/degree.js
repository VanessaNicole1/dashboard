import PropTypes from 'prop-types';
import { Grid, Button } from '@mui/material';
import Iconify from '../../../../components/iconify';

CreateNewDegree.propTypes = {
  checkout: PropTypes.object,
  onBackStep: PropTypes.func,
  onNextStep: PropTypes.func,
};

export default function CreateNewDegree({
  checkout,
  onBackStep,
  onNextStep
}) {
//   const { cart, total, discount, subtotal } = checkout;

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
