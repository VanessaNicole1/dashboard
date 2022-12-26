import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { createStudent } from '../../../../services/student';
import { getGrades } from '../../../../services/grade';
import { useLocales } from '../../../../locales';


LessonPlanNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function LessonPlanNewEditForm({ isEdit = false, currentUser }) {
  const { translate } = useLocales();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    topic: Yup.string().required(translate('sections.students.schema.name')),
    content: Yup.string().required('Name is required'),
    comment: Yup.string().required('Email is required').email('Email must be a valid email address'),
    grade: Yup.string().required('Grade is required'),
  });

  const defaultValues = useMemo(
    () => ({
      topic: currentUser?.topic || '',
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
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

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
      console.log('grades', grades);
      setGrades(grades);
    };
    fetchGrades();
  },[]);


  const [grades, setGrades] = useState([]);

  console.log('GRADES', grades);

  const onSubmit = async (data) => {
    try {
      const message = await createStudent(data);
      console.log('message', message);
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
              <RHFTextField name="topic" label="Nombre" />
              <RHFTextField name="lastName" label="Apellido" />
              <RHFTextField name="email" label="Correo Electrónico" />
              <RHFSelect native name="grade" label="Grado" placeholder="Grado">
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
                {!isEdit ? 'Crear Estudiante' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
