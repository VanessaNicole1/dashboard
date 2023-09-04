import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
// utils
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, {
    RHFSelect,
  RHFTextField,
} from '../../../../components/hook-form';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { getGrades } from '../../../../services/grade';
import { useLocales } from '../../../../locales';


StudentNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function StudentNewEditForm({ isEdit = false, currentUser }) {
  const { translate } = useLocales();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required(translate('student_create_form.name_schema')),
    lastName: Yup.string().required(translate('student_create_form.last_name_schema')),
    email: Yup.string().required(translate('student_create_form.email_schema')).email('Email must be a valid email address'),
    grade: Yup.string().required(translate('student_create_form.grade_schema')),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      lastName: currentUser?.lastname || '',
      email: currentUser?.email || '',
      grade: currentUser?.grade || '',
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

  useEffect(() => {
    const fetchGrades = async () => {
      const grades = await getGrades();
      setGrades(grades);
    };
    fetchGrades();
  },[]);


  const [grades, setGrades] = useState([]);

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.students.listStudents);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
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
              <RHFTextField name="name" label={translate('student_create_form.input_name')} />
              <RHFTextField name="lastName" label={translate('student_create_form.last_name_input')} />
              <RHFTextField name="email" label={translate('student_create_form.email_input')} />
              <RHFSelect native name="grade" label={translate('student_create_form.grade_input')} placeholder="Grado">
                <option value="" />
                {grades.map((grade) => (
                  <option key={grade.id} value={grade.id}>
                    {grade.displayName}
                  </option>
                ))}
              </RHFSelect>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? translate('student_create_form.button_create') : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
