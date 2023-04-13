import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Box, Button, Grid, DialogActions } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, {
  RHFTextField,
} from '../../../../components/hook-form';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { useLocales } from '../../../../locales';
import { updateUser } from '../../../../services/user';

TeacherNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
  onCancel: PropTypes.func,
};

export default function TeacherNewEditForm({ isEdit = false, currentUser, onCancel }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();


  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required(translate('teacher_create_form.name_schema')),
    lastName: Yup.string().required(translate('teacher_create_form.last_name_schema')),
    email: Yup.string().required(translate('teacher_create_form.email_schema')).email('Email must be a valid email address'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      lastName: currentUser?.lastName || '',
      email: currentUser?.email || '',
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
      await updateUser(currentUser.id, data);
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar('Update success!');
      navigate(PATH_DASHBOARD.teachers.listTeachers);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1} sx={{px: 3}}>
        <Grid item xs={6} md={6}>
          <RHFTextField name="name" label={translate('teacher_create_form.input_name')} />
        </Grid>
        <Grid item xs={6} md={6}>
          <RHFTextField name="lastName" label={translate('teacher_create_form.last_name_input')} />
        </Grid>
        <Grid item xs={12} md={12}>
          <RHFTextField name="email" label={translate('teacher_create_form.email_input')} />
        </Grid>
      </Grid>
      <DialogActions>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="outlined" color="inherit" onClick={onCancel}>
          Cancel
        </Button>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Update
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}