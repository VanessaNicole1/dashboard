import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { Grid, Card, Stack, Typography } from '@mui/material';
import { RHFAutocomplete, RHFEditor, RHFSelect, RHFTextField } from '../../../../components/hook-form';
import FormProvider from '../../../../components/hook-form/FormProvider';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { useSnackbar } from '../../../../components/snackbar';
import FilePanel from './FilePanel';
import FileGeneralRecentCard from './FileGeneralRecentCard';
import { _files } from './_files';
import FileNewFolderDialog from './FileNewFolderDialog';
import { getSchedulesByTeacher } from '../../../../services/schedule';
import { getStudents } from '../../../../services/student';

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots',
];

export default function LessonPlanNewForm() {
  const { enqueueSnackbar } = useSnackbar();

  const [openUploadFile, setOpenUploadFile] = useState(false);

  const [schedules, setSchedules] = useState([]);

  const [students, setStudents] = useState([]);

  const [gradeId, setGradeId] = useState('');

  useEffect(() => {
      const fetchSchedules = async () => {
        const currentSchedules = await getSchedulesByTeacher('8995b3c2-9e99-4cd1-9689-2c85db1c4833');
        setSchedules(currentSchedules);
        console.log('schedules', currentSchedules);
      }
      fetchSchedules();
  }, []);

  const NewLessonPlanSchema = Yup.object().shape({
    subject: Yup.string().required('Subject is required'),
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    students: Yup.array().min(2, 'Must have at least 2 tags'),
    metaKeywords: Yup.array().min(1, 'Meta keywords is required'),
    cover: Yup.mixed().required('Cover is required'),
    content: Yup.string().required('Content is required'),
  });

  const defaultValues = {
    title: '',
    description: '',
    content: '',
    cover: null,
    students: [],
    metaTitle: '',
    metaDescription: '',
    metaKeywords: [],
  };

  const methods = useForm({
    resolver: yupResolver(NewLessonPlanSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  console.log("Values", values);

  const handleOpenUploadFile = () => {
    setOpenUploadFile(true);
  };

  const handleCloseUploadFile = () => {
    setOpenUploadFile(false);
  };

  const selectedValue = useWatch({
    control,
    name: 'subject',
  });

  useEffect(() => {

    setGradeId(selectedValue);
    
  }, [selectedValue])
  

  console.log('selectedValue', selectedValue);

  console.log('Grade Id', gradeId);

  useEffect(() => {
    const fetchStudents = async () => {
      const currentStudents = await getStudents({gradeId});
      setStudents(currentStudents);
      console.log('currentStudents', currentStudents);
    }
    fetchStudents();
  }, [gradeId]);

  const onSubmit = async (data) => {
    console.log('data', data);
    // try {
    //   await new Promise((resolve) => setTimeout(resolve, 500));
    //   reset();
    //   enqueueSnackbar('Post success!');
    //   // navigate(PATH_DASHBOARD.blog.posts);
    //   console.log('DATA', data);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
            <RHFSelect
              control={control}
              native
              name='subject'
              label='subject'
            >
              <option value='' />
              {schedules.map((manager) => (
                <option key={manager.id} value={manager.gradeId}>
                  {manager.startHour}
              </option>
              ))}
            </RHFSelect>
              <RHFTextField name="title" label="Topic" />

              <RHFTextField name="description" label="Description" multiline rows={3} />

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Content
                </Typography>

                <RHFEditor simple name="content" />
              </Stack>

              <div>

              <FilePanel
                title="Resources"
                link={PATH_DASHBOARD.fileManager}
                onOpen={handleOpenUploadFile}
                sx={{ mt: 2 }}
              />

              <Stack spacing={2}>
                {_files.slice(0, 5).map((file) => (
                  <FileGeneralRecentCard
                    key={file.id}
                    file={file}
                    onDelete={() => console.log('DELETE', file.id)}
                  />
                ))}
              </Stack>
            </div>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>

              <RHFAutocomplete
                name="students"
                label="Students"
                multiple
                freeSolo
                options={students.map((student) => `${student.user.name} ${student.user.lastName}`)}
                ChipProps={{ size: 'small' }}
              />

              <RHFTextField name="metaTitle" label="Meta title" />

              <RHFTextField
                name="metaDescription"
                label="Meta description"
                fullWidth
                multiline
                rows={3}
              />

              <RHFAutocomplete
                name="metaKeywords"
                label="Meta keywords"
                multiple
                freeSolo
                options={TAGS_OPTION.map((option) => option)}
                ChipProps={{ size: 'small' }}
              />
            </Stack>
          </Card>

          <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
            >
              Post
            </LoadingButton>
          </Stack>
        </Grid>
          <FileNewFolderDialog open={openUploadFile} onClose={handleCloseUploadFile} />
      </Grid>
    </FormProvider>
  );
}
