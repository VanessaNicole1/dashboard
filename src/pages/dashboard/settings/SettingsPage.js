import { Box, Card, Container, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect, useMemo, useState } from "react";
import FormProvider from "../../../components/hook-form/FormProvider";
import { RHFTextField } from "../../../components/hook-form";
import CustomBreadcrumbs from "../../../components/custom-breadcrumbs/CustomBreadcrumbs";
import { PATH_DASHBOARD } from "../../../routes/paths";
import { useSettingsContext } from "../../../components/settings";
import { useSnackbar } from "../../../components/snackbar";
import {
  getEmailSettings,
  updateEmailSettings,
} from "../../../services/email-settings";
import { manualHideErrorSnackbarOptions } from "../../../utils/snackBar";

export default function SettingsPage() {
  const { themeStretch } = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();
  const [emailSetting, setEmailSetting] = useState({});

  useEffect(() => {
    if (emailSetting) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailSetting]);

  useEffect(() => {
    const fetchEmailSetting = async () => {
      const currentEmailSetting = await getEmailSettings();
      setEmailSetting(currentEmailSetting);
    };
    fetchEmailSetting();
  }, []);

  const userSchema = Yup.object().shape({
    host: Yup.string().required("El host es requerido"),
    port: Yup.number().required("El puerto es requerido"),
    user: Yup.string().required("El usuario es requerido"),
    sender: Yup.string().required("El remitente es requerido"),
    password: Yup.string().required("La contraseña es requerida"),
    confirPassword: Yup.string().required(
      "La confirmación de la contraseña es requerida"
    ),
  });

  const defaultValues = useMemo(
    () => ({
      host: emailSetting?.host || "",
      port: emailSetting?.port || 0,
      user: emailSetting?.user || "",
      sender: emailSetting?.sender || "",
      password: "",
      confirPassword: "",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [emailSetting]
  );

  const methods = useForm({
    resolver: yupResolver(userSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const emailSettingsResponse = await updateEmailSettings(emailSetting.id, data);

    if (emailSettingsResponse.errorMessage) {
      enqueueSnackbar(
        emailSettingsResponse.errorMessage,
        manualHideErrorSnackbarOptions
      );
    } else {
      enqueueSnackbar(emailSettingsResponse.message, {
        variant: "success",
        autoHideDuration: 5000,
      });
    }
  };

  return (
    <Container maxWidth={themeStretch ? false : "lg"}>
      <Container>
        <Helmet>
          <title>Configuración</title>
        </Helmet>

        <CustomBreadcrumbs
          heading="Configuración"
          links={[
            {
              name: "Dashboard",
              href: PATH_DASHBOARD.root,
            },
            {
              name: "Configuración",
            },
          ]}
        />
      </Container>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              }}
            >
              <RHFTextField name="host" label="Host" />
              <RHFTextField name="port" label="Puerto" />
              <RHFTextField name="user" label="Usuario" />
              <RHFTextField name="sender" label="Remitente" />
              <RHFTextField name="password" label="Contraseña" />
              <RHFTextField
                name="confirPassword"
                label="Confirmar Contraseña"
              />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Guardar cambios
              </LoadingButton>
            </Stack>
          </Card>
        </Container>
      </FormProvider>
    </Container>
  );
}
