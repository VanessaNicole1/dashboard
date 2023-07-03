import { Card, Grid, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
import FormProvider from '../../../../components/hook-form/FormProvider';
import {
  RHFAutocomplete,
  RHFEditor,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
  RHFUpload,
} from '../../../../components/hook-form';
import FileNewFolderDialog from './file/FileNewFolderDialog';
import { getSchedules } from '../../../../services/schedule';
import { getStudents } from '../../../../services/student';
import { useAuthContext } from '../../../../auth/useAuthContext';
import { findTeacherActivePeriods } from '../../../../services/teacher';
import { createLessonPlan } from '../../../../services/lesson-plan';
import { manualHideErrorSnackbarOptions } from '../../../../utils/snackBar';
import { useSnackbar } from '../../../../components/snackbar';
import { PATH_DASHBOARD } from '../../../../routes/paths';

const NOTIFICATION_OPTION = [
  { label: 'Notify now', value: 'yes' },
  { label: 'Notify after', value: 'no' },
];

export default function LessonPlanNewFormForm() {
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [openUploadFile, setOpenUploadFile] = useState(false);
  const [teacherActivePeriods, setTeacherActivePeriods] = useState([]);
  const [uniqueSchedules, setUniqueSchedules] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedActivePeriod, setSelectedActivePeriod] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedNotification, setSelectedNotification] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [fields, setFields] = useState(true);

  const newLessonPlanSchema = Yup.object().shape({
    period: Yup.string().required('Period is required'),
    subject: Yup.string().required('Schedule is required'),
    grade: Yup.string().required('Schedule is required'),
    date: Yup.date().required('Date is required'),
    topic: Yup.string().required('Topic is required'),
    description: Yup.string().required('Description is required'),
    content: Yup.string().required('Content is required'),
    students: Yup.array().min(1, 'Must have at least 2 tags'),
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
  })

  const defaultValues = {
    period: "",
    subject: "",
    grade: "",
    date: new Date(),
    topic: "",
    description: "",
    content: "",
    students: [],
    purposeOfClass: "",
    bibliography: "",
    resources: [],
    notification: "yes",
    notificationDate: new Date()
  };

  const methods = useForm({
    resolver: yupResolver(newLessonPlanSchema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

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
    if (selectedActivePeriod && selectedActivePeriod.length > 0) {
      setFields(false);
    } else {
      setFields(true);
    }
    if (selectedActivePeriod) {
      const fetchSchedules = async () => {
        const currentSchedules = await getSchedules(selectedActivePeriod, user.id);
        setSchedules(currentSchedules);
        const uniqueCurrentSchedules = currentSchedules.filter(
          (obj, index) =>
          currentSchedules.findIndex((schedule) => schedule.subject.id === obj.subject.id) === index
        );
        setUniqueSchedules(uniqueCurrentSchedules);
      }
      fetchSchedules();
    }
  }, [selectedActivePeriod]);

  useEffect(() => {
    const currentGradesBySubject = schedules.filter((schedule) => schedule.subject.name === selectedSubject);
    setGrades(currentGradesBySubject);
  }, [selectedSubject]);

  useEffect(() => {
    if (selectedGrade) {
      setValue("students", []);
      const fetchStudents = async () => {
        const currentSchedule = schedules.filter((schedule) => schedule.id === selectedGrade);
        const currentStudents = await getStudents({gradeId: currentSchedule[0].grade.id});
        setStudents(currentStudents);
      }
      fetchStudents();
    }
  }, [selectedGrade]);

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

  const handlePeriodChange = (e) => {
    setValue("grade", '', { shouldValidate: true });
    setValue("students", [], { shouldValidate: true });
    setValue("subject", '', { shouldValidate: true });
    setSchedules([]);
    setSelectedStudent([]);
    setSelectedSubject('');
    setStudents([]);
    setSelectedActivePeriod(e.target.value);
    setValue("period", e.target.value, { shouldValidate: true });
  };

  const handleSubjectChange = (e) => {
    setValue("grade", '', { shouldValidate: true });
    setValue("students", [], { shouldValidate: true });
    setSelectedStudent([]);
    setStudents([]);
    setSelectedSubject(e.target.value);
    setValue("subject", e.target.value, { shouldValidate: true });
  }

  const handleGradeChange = (e) => {
    setValue("students", [], { shouldValidate: true });
    setSelectedStudent([]);
    setStudents([]);
    setSelectedGrade(e.target.value);
    setValue("grade", e.target.value, { shouldValidate: true });
  }

  const selectedNotificationValue = useWatch({
    control,
    name: 'notification',
  });

  function removeDuplicates(arr) {
    return arr.filter((obj, index) => {
      const firstIndex = arr.findIndex((item) => JSON.stringify(item) === JSON.stringify(obj));
      return index === firstIndex;
    });
  }

  const handleStudentChange = (event, newValue) => {
    const validValues = removeDuplicates(newValue);
    setValue("students", validValues, { shouldValidate: true });
    setSelectedStudent(validValues);
  }

  useEffect(() => {
    const notificationValue = selectedNotificationValue === 'no' && true;
    setSelectedNotification(notificationValue);
  }, [selectedNotificationValue]);

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
                disabled={fields}
              >
                <option value="" />
                {uniqueSchedules.map((schedule) => (
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
                value={selectedGrade}
                disabled={fields}
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
                    disabled={fields}
                  />
                )}
              />
              <RHFTextField name="topic" disabled={fields} label="Topic"  />

              <RHFTextField
                name="description"
                label="Description"
                multiline
                rows={3}
                disabled={fields}
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
                  disabled={fields}
                />
              </Stack>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFAutocomplete
                control={control}
                value={selectedStudent}
                name="students"
                label="Students"
                multiple
                freeSolo
                onChange={handleStudentChange}
                options={students.map(
                  (student) => ({id: student.id, displayName: `${student.user.name} ${student.user.lastName}`})
                )}
                getOptionLabel={(option) => option.displayName}
                // setcustomkey={(option) => option.id}
                ChipProps={{ size: "small" }}
                disabled={fields}
              />
              <RHFTextField name="purposeOfClass" disabled={fields} label="Purpose of Class" />
              <RHFTextField
                name="bibliography"
                label="Bibliography"
                fullWidth
                multiline
                rows={3}
                disabled={fields}
              />
              <Stack spacing={1}>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    Notify students
                  </Typography>

                  <RHFRadioGroup control={control} row spacing={4} name="notification" options={NOTIFICATION_OPTION} />
              </Stack>

              {selectedNotification && (
                <Controller
                    name="notificationDate"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <DateTimePicker
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
                        disabled={fields}
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
              disabled={fields}
            >
              Save
            </LoadingButton>
          </Stack>
        </Grid>
        <FileNewFolderDialog
          open={openUploadFile}
          onClose={handleCloseUploadFile}
        />
      </Grid>
    </FormProvider>
  );
}
