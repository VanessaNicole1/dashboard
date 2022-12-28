import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Container } from '@mui/material';
//
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import Iconify from '../../../../components/iconify';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';

CreateNewStudents.propTypes = {
  checkout: PropTypes.object,
  onNextStep: PropTypes.func,
  onDeleteCart: PropTypes.func,
  onApplyDiscount: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
};

export default function CreateNewStudents({
  checkout,
  onNextStep,
  onApplyDiscount,
  onDeleteCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) {

  const [openUploadFile, setOpenUploadFile] = useState(false);
//   const { cart, total, discount, subtotal } = checkout;

//   const totalItems = sum(cart.map((item) => item.quantity));

//   const isEmptyCart = !cart.length;

  const { themeStretch } = useSettingsContext();

  const handleOpenUploadFile = () => {
    setOpenUploadFile(true);
  };


  return (
    <>
      <h1>Students</h1>
      <Helmet>
        <title> File Manager | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="File Manager"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            { name: 'File Manager' },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:cloud-upload-fill" />}
              onClick={() => {}}
            >
              Upload
            </Button>
          }
        />

      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={onNextStep}
      >
      Check Out
      </Button>
      </Container>
    </>
  );
}
