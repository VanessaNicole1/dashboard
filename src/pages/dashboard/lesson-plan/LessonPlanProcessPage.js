import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Grid, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
// import {
//   // CheckoutCart,
//   // CheckoutSteps,
//   // CheckoutPayment,
//   CheckoutOrderComplete,
//   // CheckoutBillingAddress,
// } from '../../sections/@dashboard/e-commerce/checkout';
import CreateNewPeriod from '../../../sections/dashboard/lesson-plan/initial-process/period';
import CheckoutSteps from '../../../sections/dashboard/lesson-plan/initial-process/checkoutSteps';
import CreateNewDegree from '../../../sections/dashboard/lesson-plan/initial-process/degree';
import CreateNewStudents from '../../../sections/dashboard/lesson-plan/initial-process/students';
import { backStep, nextStep } from '../../../redux/slices/initialProcess';
import CreateNewTeachers from '../../../sections/dashboard/lesson-plan/initial-process/teachers';
import CreateNewSubjects from '../../../sections/dashboard/lesson-plan/initial-process/subjects';

const STEPS = ['Period', 'Degree', 'Students', 'Teachers', 'Subjects'];

console.log('STEPS', STEPS);


export default function EcommerceCheckoutPage() {
  const navigate = useNavigate();

  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();

  const {checkout} = useSelector((state) => state.initial);
  console.log('checkout', checkout);

  const { activeStep } = checkout;

  // const completed = activeStep === STEPS.length;

  // useEffect(() => {
  //   dispatch(getCart(cart));
  // }, [dispatch, cart]);

  // useEffect(() => {
  //   if (activeStep === 1) {
  //     dispatch(createBilling(null));
  //   }
  // }, [dispatch, activeStep]);

  const handleNextStep = () => {
    dispatch(nextStep());
  };

  const handleBackStep = () => {
    dispatch(backStep());
  };

  const handleGotoStep = (step) => {
    // dispatch(gotoStep(step));
  };

  const handleApplyDiscount = (value) => {
    // if (cart.length) {
    //   dispatch(applyDiscount(value));
    // }
  };

  const handleDeleteCart = (productId) => {
    // dispatch(deleteCart(productId));
  };

  const handleIncreaseQuantity = (productId) => {
    // dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    // dispatch(decreaseQuantity(productId));
  };

  const handleCreateBilling = (address) => {
    // dispatch(createBilling(address));
    // dispatch(nextStep());
  };

  const handleApplyShipping = (value) => {
    // dispatch(applyShipping(value));
  };

  const handleReset = () => {
    // if (completed) {
    //   dispatch(resetCart());
    //   navigate(PATH_DASHBOARD.eCommerce.shop, { replace: true });
    // }
  };

  const completed = false;

  return (
    <>
      <Helmet>
        <title> Lesson Plan Process</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Initial Process"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Lesson Plan',
              href: PATH_DASHBOARD.lessonPlan.root,
            },
            { name: 'Initial' },
          ]}
        />

        <Grid container justifyContent={completed ? 'center' : 'flex-start'}>
          <Grid item xs={12} md={8}>
            <CheckoutSteps activeStep={activeStep} steps={STEPS} />
          </Grid>
        </Grid>

        {completed ? (
          <CheckoutSteps open={completed} onReset={handleReset} onDownloadPDF={() => {}} />
        ) : (
          <>
            {activeStep === 0 && (
              <CreateNewPeriod
                checkout={checkout}
                onNextStep={handleNextStep}
                // onDeleteCart={handleDeleteCart}
                // onApplyDiscount={handleApplyDiscount}
                // onIncreaseQuantity={handleIncreaseQuantity}
                // onDecreaseQuantity={handleDecreaseQuantity}
              />
            )}
            {activeStep === 1 && (
              <CreateNewDegree
                // checkout={checkout}
                onBackStep={handleBackStep}
                onNextStep={handleNextStep}
                // onCreateBilling={handleCreateBilling}
              />
            )}
            {activeStep === 2 && (
              <CreateNewStudents
                // checkout={checkout}
                onNextStep={handleNextStep}
                // onBackStep={handleBackStep}
                // onGotoStep={handleGotoStep}
                // onApplyShipping={handleApplyShipping}
                // onReset={handleReset}
              />
            )}
            {activeStep === 3 && (
              <CreateNewTeachers
                // checkout={checkout}
                onNextStep={handleNextStep}
                // onBackStep={handleBackStep}
                // onGotoStep={handleGotoStep}
                // onApplyShipping={handleApplyShipping}
                // onReset={handleReset}
              />
            )}
            {activeStep === 4 && (
              <CreateNewSubjects
                // checkout={checkout}
                onNextStep={handleNextStep}
                // onBackStep={handleBackStep}
                // onGotoStep={handleGotoStep}
                // onApplyShipping={handleApplyShipping}
                // onReset={handleReset}
              />
            )}
          </>
        )}
      </Container>
    </>
  );
}
