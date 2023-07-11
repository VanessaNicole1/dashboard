import PropTypes from 'prop-types';
import { Card, Grid, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import FormProvider from '../../../../components/hook-form/FormProvider';
import {
  RHFAutocomplete,
  RHFEditor,
  RHFSelect,
  RHFTextField,
  RHFUpload,
} from '../../../../components/hook-form';
import { getSchedules } from '../../../../services/schedule';
import { getStudents } from '../../../../services/student';
import { useAuthContext } from '../../../../auth/useAuthContext';
import { findTeacherActivePeriods } from '../../../../services/teacher';
import { createLessonPlan, getLessonPlan, removeResource } from '../../../../services/lesson-plan';
import { manualHideErrorSnackbarOptions } from '../../../../utils/snackBar';
import { useSnackbar } from '../../../../components/snackbar';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import FilePanel from './FilePanel';
import FileGeneralRecentCard from './FileGeneralRecentCard';
import FileNewFolderDialog from '../create/file/FileNewFolderDialog';

LessonPlanUpdateForm.propTypes = {
  lessonPlanId: PropTypes.string,
};

export default function LessonPlanUpdateForm({lessonPlanId}) {
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [currentLessonlPlan, setCurrentLessonPlan] = useState({});
  const [teacherActivePeriods, setTeacherActivePeriods] = useState([]);
  const [selectedActivePeriod, setSelectedActivePeriod] = useState('');
  const [uniqueSubjects, setUniqueSubjects] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [grades, setGrades] = useState([]);
  const [selectedScheduleByGrade, setSelectedScheduleByGrade] = useState('');
  const [openUploadFile, setOpenUploadFile] = useState(false);
  const [currentResources, setCurrentResources] = useState([]);
  const [deleteResource, setDeleteResource] = useState(false);

  const today = dayjs();
  const tomorrow = dayjs().add(1, 'day');


  useEffect(() => {
    if (currentLessonlPlan) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLessonlPlan]);

  useEffect(() => {
    const fetchLessonPlan = async () => {
      const lessonPlan = await getLessonPlan(lessonPlanId);
      setCurrentLessonPlan(lessonPlan);
    }
    fetchLessonPlan();
  }, [lessonPlanId]);

  useEffect(() => {
    const fetchTeacherActivePeriods = async () => {
      const activePeriods = await findTeacherActivePeriods(user.id);
      if (activePeriods.length > 0) {
        setTeacherActivePeriods(activePeriods);
      }
    };

    fetchTeacherActivePeriods();
  }, [user]);

  useEffect(() => {
    if (currentLessonlPlan) {
      const resources = currentLessonlPlan?.resources;
      setCurrentResources(resources);
      const currentPeriod = currentLessonlPlan?.schedule?.grade?.degree?.period.id;
      setSelectedActivePeriod(currentPeriod);
    }
  }, [currentLessonlPlan]);

  useEffect(() => {
    if (selectedActivePeriod) {
      const fetchSchedules = async () => {
        const currentSchedules = await getSchedules(selectedActivePeriod, user.id);
        setSchedules(currentSchedules);
        const uniqueCurrentSubjects = currentSchedules.filter(
          (obj, index) =>
          currentSchedules.findIndex((schedule) => schedule.subject.id === obj.subject.id) === index
        );
        setUniqueSubjects(uniqueCurrentSubjects);
      }
      fetchSchedules();
    }
  }, [selectedActivePeriod]);

  useEffect(() => {
    if (currentLessonlPlan) {
      const currentSelectedSubject = currentLessonlPlan?.schedule?.subject?.name;
      setSelectedSubject(currentSelectedSubject);
    }
  }, [currentLessonlPlan]);

  useEffect(() => {
    const currentGradesBySubject = schedules.filter((schedule) => schedule.subject.name === selectedSubject);
    setGrades(currentGradesBySubject);
    const currentSelectedSchedule = currentLessonlPlan?.schedule?.id;
    setSelectedScheduleByGrade(currentSelectedSchedule);
  }, [currentLessonlPlan, schedules]);

  useEffect(() => {
    const currentGradesBySubject = schedules.filter((schedule) => schedule.subject.name === selectedSubject);
    setGrades(currentGradesBySubject);
  }, [selectedSubject]);
  
  const newLessonPlanSchema = Yup.object().shape({
    period: Yup.string().required('Period is required'),
    subject: Yup.string().required('Subject is required'),
    grade: Yup.string().required('Grade is required'),
    date: Yup.date().required('Date is required'),
    topic: Yup.string().required('Topic is required'),
    description: Yup.string().required('Description is required'),
    content: Yup.string().required('Content is required'),
    students: Yup.array().min(1, 'Must have at least 2 students'),
    purposeOfClass: Yup.string().required('Purpose of the class is required'),
    bibliography: Yup.string().required('Bibliography is required'),
    resources: Yup.array(),
    notification: Yup.string().required('Notification is required'),
    notificationDate: Yup.date().when(['notification', 'date'], (notification, date, schema) => {
      if (notification === 'no') {
        return schema.min(date, 'End Date must be after Start Date')
        .typeError('End Date is required')
      }
    }).required('Notification Date is required').typeError('This is an error')
  });

  const defaultValues = useMemo(
    () => ({
      period: currentLessonlPlan?.schedule?.grade.degree.period.id || '',
      subject: currentLessonlPlan?.schedule?.subject.name || '',
      grade: currentLessonlPlan?.schedule?.id || '',
      date: currentLessonlPlan?.date || '',
      topic: currentLessonlPlan?.topic || '',
      description: currentLessonlPlan?.description || '',
      content: currentLessonlPlan?.content || '',
      students: [],
      purposeOfClass: currentLessonlPlan?.purposeOfClass || '',
      bibliography: currentLessonlPlan?.bibliography || '',
      resources: [],
      notificationDate: currentLessonlPlan?.notificationDate || '',
      
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentLessonlPlan]
  );

  const methods = useForm({
    resolver: yupResolver(newLessonPlanSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const handleOpenUploadFile = () => {
    setOpenUploadFile(true);
  };

  const handlePeriodChange = (e) => {
    setValue("grade", '');
    setValue("students", []);
    setValue("subject", '');
    setSchedules([]);
    setSelectedActivePeriod(e.target.value);
    setValue("period", e.target.value, { shouldValidate: true });
  };

  const handleSubjectChange = (e) => {
    setValue("grade", '');
    setValue("students", []);
    setSelectedSubject(e.target.value);
    setValue("subject", e.target.value, { shouldValidate: true });
  }

  const handleGradeChange = (e) => {
    setSelectedScheduleByGrade(e.target.value);
    setValue("grade", e.target.value, { shouldValidate: true });
  }

  const handleRemoveResources = async (e) => {
    console.log('E', e);
    await removeResource(currentLessonlPlan.id, e);
  }

  const handleCloseUploadFile = () => {
    setOpenUploadFile(false);
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const files = values.resources || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue("resources", [...files, ...newFiles], { shouldValidate: true });
      console.log('values.resources', values.resources);
    },
    [setValue, values.resources]
  );

  const handleRemoveFile = (inputFile) => {
    const filtered = values.resources && values.resources?.filter((file) => file !== inputFile);
    setValue('resources', filtered);
  };

  const handleRemoveAllFiles = () => {
    setValue('resources', []);
  };

  const onSubmit = async (data) => {
    const { notification, grade: schedule, period, resources } = data;
    let { notificationDate } = data;
    if (notification === 'yes') {
      notificationDate = null;
    }
    data = {
      ...data,
      notificationDate,
      scheduleId: schedule,
      periodId: period,
      date: data.date.toISOString()
    }
    const lessonPlanResponse = await createLessonPlan(data, resources);

    if (lessonPlanResponse.errorMessage) {
      enqueueSnackbar(lessonPlanResponse.errorMessage, manualHideErrorSnackbarOptions);
    } else {
      enqueueSnackbar(lessonPlanResponse.message, { variant: 'success', autoHideDuration: 5000 });
      navigate(PATH_DASHBOARD.lessonPlan.listTeacherPlans);
    }
  };
  const students = [];

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFSelect
                native
                name="period"
                label="Period"
                onChange={handlePeriodChange}
                value={selectedActivePeriod}
              >
                <option value="" />
                {teacherActivePeriods.map((period) => (
                  <option key={period.id} value={period.id}>
                    {period.displayName}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect
                control={control}
                native
                name="subject"
                label="Subject"
                onChange={handleSubjectChange}
                value={selectedSubject}
              >
                <option value="" />
                {uniqueSubjects.map((schedule) => (
                  <option key={schedule.id} value={schedule.name}>
                    {schedule.subject.name}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect
                control={control}
                native
                name="grade"
                label="Grade"
                onChange={handleGradeChange}
                value={selectedScheduleByGrade}
              >
                <option value="" />
                {grades.map((grade) => (
                  <option key={grade.grade.id} value={grade.id}>
                    { `${grade.grade.number} "${grade.grade.parallel}"`}
                  </option>
                ))}
              </RHFSelect>
              <Controller
                name="date"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Date"
                    defaultValue={today}
                    minDate={tomorrow}
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
              <RHFTextField name="topic" label="Topic"  />

              <RHFTextField
                name="description"
                label="Description"
                multiline
                rows={3}
              />

              <Stack spacing={1}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.secondary" }}
                >
                  Content
                </Typography>

                <RHFEditor simple name="content" />
              </Stack>

              <Stack spacing={1}>
              {/* <FilePanel
                title="Resources"
                link={PATH_DASHBOARD.fileManager}
                onOpen={handleOpenUploadFile}
                sx={{ mt: 2 }}
              /> */}
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.secondary" }}
                >
                  Resources uploaded
                </Typography>

              { currentResources &&
                <Stack spacing={2}>
                {currentResources.map((file) => (
                  <FileGeneralRecentCard
                    key={file.url}
                    file={file}
                    onDelete={() => handleRemoveResources(file.url)}
                  />
                ))}

                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.secondary" }}
                >
                  Resources
                </Typography>

                <RHFUpload
                  multiple
                  thumbnail
                  accept={{
                    "text/csv": [".csv"],
                    "text/pdf": [".pdf"],
                    "text/jpg": [".jpg"],
                  }}
                  name="resources"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  type="file"
                  onRemove={handleRemoveFile}
                  onRemoveAll={handleRemoveAllFiles}
                  onUpload={() => console.log("ON UPLOAD")}
                />
              </Stack>
              }
              </Stack>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              {/* <RHFAutocomplete
                control={control}
                value=''
                name="students"
                label="Students"
                multiple
                freeSolo
                onChange={() => {}}
                options={students.map(
                  (student) => ({id: student.id, displayName: `${student.user.name} ${student.user.lastName}`})
                )}
                getOptionLabel={(option) => option.displayName}
                // setcustomkey={(option) => option.id}
                ChipProps={{ size: "small" }}
              /> */}
              <RHFTextField name="purposeOfClass" label="Purpose of Class" />
              <RHFTextField
                name="bibliography"
                label="Bibliography"
                fullWidth
                multiline
                rows={3}
              />
              <Stack spacing={1}>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    Notify students
                  </Typography>
              </Stack>
              {true && (
                <Controller
                    name="notificationDate"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <DateTimePicker
                        defaultValue={today}
                        minDate={tomorrow}
                        views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                        label="Notification Date"
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
              )}
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
              Save
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
        <FileNewFolderDialog open={openUploadFile} onClose={handleCloseUploadFile} />
    </FormProvider>
  );
}
