import PropTypes from 'prop-types';
import { Grid, Button } from '@mui/material';

CreateTeachers.propTypes = {
  checkout: PropTypes.object,
  onNextStep: PropTypes.func,
};

export default function CreateTeachers({
  checkout,
  onNextStep,
}) {
//   const { cart, total, discount, subtotal } = checkout;

  return (
    <Grid container spacing={3}>
      <h1>Students</h1>
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
