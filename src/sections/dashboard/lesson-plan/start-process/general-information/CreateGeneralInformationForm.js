import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Chip, Divider, Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import FormProvider from '../../../../../components/hook-form/FormProvider';
import { RHFSelect, RHFTextField } from '../../../../../components/hook-form';
import { getUsersWithManagerRole } from '../../../../../services/user';

const schemaErrorMessages = {
  requiredStartDate: 'La fecha de inicio del periodo es requerida.',
  requiredEndDate: 'La fecha de fin del periodo es requerida.',
  endDateShouldBeGreater:
    'La fecha de fin de periodo debe ser mayor a la fecha de inicio de periodo.',
  requiredManager: 'El director de carrera es requerido.',
  requiredDegree: 'La carrera es requerida.',
};

CreateGeneralInformationForm.propTypes = {
  onFillGeneralInformation: PropTypes.func,
  generalInformation: PropTypes.shape({
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    manager: PropTypes.string,
    degree: PropTypes.string,
  }),
};

export default function CreateGeneralInformationForm({
  onFillGeneralInformation,
  generalInformation,
}) {
  const OnedayInMiliseconds = 86400000;
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    const fetchManagers = async () => {
      const fetchedManagers = await getUsersWithManagerRole();
      setManagers(fetchedManagers);
    };

    fetchManagers();
  }, []);

  const generalInformationSchema = Yup.object().shape({
    startDate: Yup.date()
      .required(schemaErrorMessages.requiredStartDate)
      .typeError(schemaErrorMessages.requiredStartDate),
    endDate: Yup.date()
      .when('startDate', (startDate, schema) =>
        schema.isValidSync(startDate)
          ? schema.min(
              new Date(startDate.getTime() + OnedayInMiliseconds),
              schemaErrorMessages.endDateShouldBeGreater
            )
          : schema
      )
      .required(schemaErrorMessages.requiredEndDate)
      .typeError(schemaErrorMessages.requiredEndDate),
    manager: Yup.string()
      .uuid(schemaErrorMessages.requiredManager)
      .required(schemaErrorMessages.requiredManager),
    degree: Yup.string().required(schemaErrorMessages.requiredDegree),
  });

  const defaultValues = useMemo(
    () => generalInformation,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(generalInformationSchema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    onFillGeneralInformation(data);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Divider sx={{ marginBottom: 3 }}>
        <Chip label='Periodo' />
      </Divider>

      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
        <Controller
          name='startDate'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              label='Inicio del Periodo'
              value={field.value}
              onChange={(newValue) => {
                field.onChange(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          )}
        />

        <Controller
          name='endDate'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              label='Fin del Periodo'
              value={field.value}
              onChange={(newValue) => {
                field.onChange(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          )}
        />
      </Stack>

      <Divider sx={{ marginBottom: 3, marginTop: 3 }}>
        <Chip label='Carrera' />
      </Divider>

      <RHFTextField name='degree' label='Nombre de la carrera' />

      <Divider sx={{ marginBottom: 3, marginTop: 3 }}>
        <Chip label='Director de Carrera' />
      </Divider>

      <RHFSelect
        native
        name='manager'
        label='Seleccione el director de carrera:'
      >
        <option value='' />
        {managers.map((manager) => (
          <option key={manager.id} value={manager.id}>
            {manager.displayName}
          </option>
        ))}
      </RHFSelect>

      <Stack alignItems='flex-end' sx={{ mt: 3 }}>
        <LoadingButton type='submit' variant='contained' loading={isSubmitting}>
          Siguiente Paso
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
