import { Tooltip, Stack, Typography, Box } from "@mui/material";
import { useAuthContext } from "../../auth/useAuthContext";
import LoginLayout from "../../layouts/login";
import AuthLoginForm from "./AuthLoginForm";

export default function Login() {
  const { method } = useAuthContext();

  return (
    <LoginLayout title="Plan de Clases">
      <Stack
        sx={{
          marginTop: "100px",
        }}
      >
        <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
          <Typography variant="h4">Ingresar al Sistema</Typography>

          <Tooltip title={method} placement="left">
            <Box
              component="img"
              alt={method}
              src={`/assets/icons/auth/ic_${method}.png`}
              sx={{ width: 32, height: 32, position: "absolute", right: 0 }}
            />
          </Tooltip>
        </Stack>
        <AuthLoginForm />
      </Stack>
    </LoginLayout>
  );
}
