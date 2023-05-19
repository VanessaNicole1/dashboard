import PropTypes from 'prop-types';
import { Stack, Typography, Alert } from '@mui/material';
import LoginLayout from '../../layouts/login';
import AuthRegisterForm from './AuthRegisterForm';

Register.propTypes = {
  user: PropTypes.object,
  errorMessage: PropTypes.string,
  existsError: PropTypes.bool,
  registeredToken: PropTypes.string
};

export default function Register({
  user,
  errorMessage,
  existsError,
  registeredToken
}) {
  return (
    <LoginLayout title="Módulo de Plan de Clases">
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        {existsError && <Alert severity="error">{errorMessage}</Alert>}

        {user && (
          <>
            <Typography variant="h4">Bienvenido {user.displayName}.</Typography>

            <Stack direction="row" spacing={0.5}>
              <Typography variant="body2"> Como es la primera vez que accedes al sistema, por favor configura tu contraseña </Typography>
            </Stack>
          </>
        )}
      </Stack>

      <AuthRegisterForm existsError={existsError} registeredToken={registeredToken} />

      <Typography
        component="div"
        sx={{ color: 'text.secondary', mt: 3, typography: 'caption', textAlign: 'center' }}
      >
        Carrera de Ingeniería en Sistemas - Universidad Nacional de Loja.
      </Typography>
    </LoginLayout>
  );
}
