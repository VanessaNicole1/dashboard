import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Card, Grid, Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, {} from '../../../../components/hook-form';

PeriodNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function PeriodNewForm({ isEdit = false, currentUser }) {
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    createDate: Yup.string().nullable().required('Create date is required'),
    dueDate: Yup.string().nullable().required('Due date is required'),
  });

  const defaultValues = useMemo(
    () => ({
      createDate: currentUser?.createDate || new Date(),
      dueDate: currentUser?.dueDate || null,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async (data) => {
    try {
      const {createDate, dueDate } = data;

      if ( Date.parse(createDate) > Date.parse(dueDate)){
        console.log('Due Date debe ser mayor');
      }
      // await createPeriod(data);
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      <Alert severity="success">This is a success alert — check it out!</Alert>
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <Controller
                name="createDate"
                // control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Date create"
                    value={field.value}
                    onChange={(newValue) => {
                      field.onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
                    )}
                  />
                )}
              />

              <Controller
                name="dueDate"
                // control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Due date"
                    value={field.value}
                    onChange={(newValue) => {
                      field.onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
                    )}
                  />
                )}
              />
            </Box>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Period' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
