import * as Yup from 'yup';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';

AuthRegisterForm.propTypes = {
  existsError: PropTypes.bool
}

export default function AuthRegisterForm({
  existsError
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    password: Yup.string().required('La contraseña es necesaria.'),
    confirmPassword:  Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir.')
  });

  const defaultValues = {
    password: '',
    confirmPassword: ''
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    // const updatedUser = await updateUserPasswordByRegisteredToken(registeredToken, data.password); 

    // if (updatedUser.errorMessage) {
    //   reset();
    //   setError('afterSubmit', {
    //     message: updatedUser.errorMessage
    //   });
    // } else {
    //   enqueueSnackbar('Contraseña actualizada con éxito', { variant: 'success', autoHideDuration: 5000 });
    //   await updateRegisterToken(registeredToken);
    //   navigate(PATH_AUTH.login);
    // };
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField
          disabled={existsError}
          name="password"
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          disabled={existsError}
          name="confirmPassword"
          label="Confirmar Contraseña"
          type={showConfirmPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          disabled={existsError}
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting || isSubmitSuccessful}
          sx={{
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            },
          }}
        >
          Confirmar Contraseña
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
