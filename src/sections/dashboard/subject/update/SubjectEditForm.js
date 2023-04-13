import { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider, { RHFTextField } from '../../../../components/hook-form';
import { useLocales } from '../../../../locales';
import { updateSubject } from '../../../../services/subject';
import { useSnackbar } from '../../../../components/snackbar';

SubjectEditForm.propTypes = {
  currentSubject: PropTypes.object,
  onClose: PropTypes.func,
  onDataChange: PropTypes.func
};

export default function SubjectEditForm({ currentSubject, onClose, onDataChange }) {
  const { translate } = useLocales();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required(translate('subject_edit_form.name')),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentSubject?.name || '',
    }),
    [currentSubject]
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
    if (currentSubject) {
      reset(defaultValues);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSubject]);

  const onSubmit = async (data) => {
    const periodId = currentSubject.schedules[0]?.grade.degree.period.id;
    try {
      const updateSubjectData = {
        ...data,
        periodId
      }
      const message = await updateSubject(currentSubject.id, updateSubjectData);
      if (message.error) {
        enqueueSnackbar(message.error && message.message, { variant: 'error' });
      } else {
        enqueueSnackbar(message.message, { variant: 'success' });
      }
      onDataChange(true);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
            >
              <RHFTextField name="name" label={translate('subject_edit_form.name')} />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting} onClick={() => {
                onClose();
              }}>
                {translate('subject_edit_form.button_edit')}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}