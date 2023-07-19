import PropTypes from 'prop-types';
import { Card, Grid, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm, useWatch } from 'react-hook-form';
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
  RHFRadioGroup,
} from '../../../../components/hook-form';
import { getSchedules } from '../../../../services/schedule';
import { getStudents } from '../../../../services/student';
import { useAuthContext } from '../../../../auth/useAuthContext';
import { findTeacherActivePeriods } from '../../../../services/teacher';
import { getLessonPlan, removeResource, updateLessonPlan } from '../../../../services/lesson-plan';
import { manualHideErrorSnackbarOptions } from '../../../../utils/snackBar';
import { useSnackbar } from '../../../../components/snackbar';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import FileGeneralRecentCard from './FileGeneralRecentCard';
import FileNewFolderDialog from '../create/file/FileNewFolderDialog';
import { useLocales } from '../../../../locales';
import { getPeriod } from '../../../../services/period';

LessonPlanUpdateForm.propTypes = {
  lessonPlanId: PropTypes.string,
};

export default function LessonPlanUpdateForm({lessonPlanId}) {
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { translate } = useLocales();

  const DEADLINE_NOTIFICATION_OPTION = [
    { label: translate('lesson_plans_update_form.change_no'), value: 'no' },
    { label: translate('lesson_plans_update_form.change_yes'), value: 'yes' },
  ];
  

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
  const [students, setStudents] = useState([]);
  const [currentSelectedStudents, setCurrentSelectedStudents] = useState([]);
  const [startPeriod, setStartPeriod] = useState(new Date());
  const [currentDeadlineNotification, setCurrentDeadlineNotification] = useState(true);
  const [changeResources, setChangeResources] = useState(false);
  const [totalStudentsValidate, setTotalStudentsValidate] = useState(1);

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
    setChangeResources(false);
  }, [lessonPlanId, changeResources]);

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
      if (resources) {
        setCurrentResources(resources);
      }
      const currentPeriod = currentLessonlPlan?.schedule?.grade?.degree?.period.id;
      setSelectedActivePeriod(currentPeriod);
    }
  }, [currentLessonlPlan]);

  useEffect(() => {
    const periodStartDate = currentLessonlPlan?.schedule?.grade?.degree?.period?.startDate;
    setStartPeriod(periodStartDate);
  }, [currentLessonlPlan]);

  useEffect(() => {
    if (selectedActivePeriod && selectedActivePeriod.length < 0) {
      setValue("period", '', { shouldValidate: true });
    }
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
    if (selectedActivePeriod) {
      const fetchPeriod = async () => {
        const currentPeriod = await getPeriod(selectedActivePeriod);
        const totalStudents = currentPeriod.periodConfig.minimumStudentsToEvaluate;
        setTotalStudentsValidate(totalStudents);
      }
      fetchPeriod();
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

  useEffect(() => {
    const currentGrade = currentLessonlPlan?.schedule?.grade;
    if (currentGrade) {
      const fetchCurrentStudents = async () => {
        const currentStudents = await getStudents({gradeId: currentGrade?.id});
        setStudents(currentStudents);
      }
      fetchCurrentStudents();
      const validationsTracking = currentLessonlPlan?.validationsTracking;
      const allStudents = validationsTracking.map((validationTracking) => validationTracking.student);
      const newStudentFormat = allStudents.map((student) => ({id: student.id, displayName: `${student.user.name} ${student.user.lastName}`}))
      setCurrentSelectedStudents(newStudentFormat);
    }
  }, [currentLessonlPlan]);

  useEffect(() => {
    if (selectedScheduleByGrade) {
      setValue("students", []);
      const fetchStudents = async () => {
        const currentSchedule = schedules.filter((schedule) => schedule.id === selectedScheduleByGrade);
        if (currentSchedule.length > 0) {
        const currentStudents = await getStudents({gradeId: currentSchedule[0]?.grade.id});
        setStudents(currentStudents);
        }
      }
      fetchStudents();
    }
  }, [selectedScheduleByGrade]);

  const newLessonPlanSchema = Yup.object().shape({
    period: Yup.string().required(translate('lesson_plans_update_form.period_required')),
    subject: Yup.string().required(translate('lesson_plans_update_form.subject_required')),
    grade: Yup.string().required(translate('lesson_plans_update_form.grade_required')),
    date: Yup.date().required(translate('lesson_plans_update_form.date_required')),
    topic: Yup.string().required(translate('lesson_plans_update_form.topic_required')),
    description: Yup.string().required(translate('lesson_plans_update_form.desc_required')),
    content: Yup.string().required(translate('lesson_plans_update_form.content_required')),
    students: Yup.array().min(totalStudentsValidate, `Must have at least ${totalStudentsValidate} students`),
    purposeOfClass: Yup.string().required(translate('lesson_plans_update_form.purpose_required')),
    bibliography: Yup.string().required(translate('lesson_plans_update_form.biblio_required')),
    deadlineNotification: Yup.string(),
    deadlineDate: Yup.date()
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
      students: currentSelectedStudents || [],
      purposeOfClass: currentLessonlPlan?.purposeOfClass || '',
      bibliography: currentLessonlPlan?.bibliography || '',
      resources: [],
      deadlineNotification: "no",
      deadlineDate: currentLessonlPlan?.maximumValidationDate || '',
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

  const handlePeriodChange = (e) => {
    setValue("grade", '');
    setValue("students", []);
    setValue("subject", '');
    setSchedules([]);
    setCurrentSelectedStudents([]);
    setStudents([]);
    setSelectedActivePeriod(e.target.value);
    setValue("period", e.target.value, { shouldValidate: true });
  };

  const handleSubjectChange = (e) => {
    setValue("grade", '');
    setValue("students", []);
    setCurrentSelectedStudents([]);
    setStudents([]);
    setSelectedSubject(e.target.value);
    setValue("subject", e.target.value, { shouldValidate: true });
  }

  const handleGradeChange = (e) => {
    setValue("students", []);
    setCurrentSelectedStudents([]);
    setStudents([]);
    setSelectedScheduleByGrade(e.target.value);
    setValue("grade", e.target.value, { shouldValidate: true });
  }

  const handleRemoveResources = async (e) => {
    await removeResource(currentLessonlPlan.id, e);
    setChangeResources(true);
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

  function removeDuplicates(arr) {
    return arr.filter((obj, index) => {
      const firstIndex = arr.findIndex((item) => JSON.stringify(item) === JSON.stringify(obj));
      return index === firstIndex;
    });
  }

  const handleStudentChange = (event, newValue) => {
    const validValues = removeDuplicates(newValue);
    setValue("students", validValues);
    setCurrentSelectedStudents(validValues);
  }

  const isWeekend = (date) => {
    const currentDate = new Date(date);
    const currentDay = currentDate.getDay();
    return currentDay === 0 || currentDay === 6;
  };

  const selectedDeadlineNotificationValue = useWatch({
    control,
    name: 'deadlineNotification',
  });

  useEffect(() => {
    if (selectedDeadlineNotificationValue === 'yes') {
      setCurrentDeadlineNotification(false);
    } else {
      setValue("deadlineDate", currentLessonlPlan.maximumValidationDate);
      setCurrentDeadlineNotification(true);
    }
  }, [selectedDeadlineNotificationValue]);

  const onSubmit = async (data) => {
    const { grade: schedule, period, resources } = data;
    data = {
      ...data,
      scheduleId: schedule,
      periodId: period,
      date: data.date.toISOString()
    }
    const lessonPlanResponse = await updateLessonPlan(currentLessonlPlan.id, data, resources);

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
                label={translate('lesson_plans_update_form.period')}
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
                label={translate('lesson_plans_update_form.subject')}
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
                label={translate('lesson_plans_update_form.grade')}
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
                    shouldDisableDate={isWeekend}
                    // shouldDisableMonth={isInCurrentMonth}
                    label={translate('lesson_plans_update_form.date')}
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
              <RHFTextField name="topic" label={translate('lesson_plans_update_form.topic')}  />

              <RHFTextField
                name="description"
                label={translate('lesson_plans_update_form.description')}
                multiline
                rows={3}
              />

              <Stack spacing={1}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.secondary" }}
                >
                  {translate('lesson_plans_update_form.content')}
                </Typography>

                <RHFEditor simple name="content" />
              </Stack>

              <Stack spacing={1}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.secondary" }}
                >
                  {translate('lesson_plans_update_form.resources')}
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
                  {translate('lesson_plans_update_form.new_resources')}
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
              <RHFAutocomplete
                control={control}
                value={currentSelectedStudents}
                name="students"
                label={translate('lesson_plans_update_form.students')}
                multiple
                freeSolo
                onChange={handleStudentChange}
                options={students.map(
                  (student) => ({id: student.id, displayName: `${student.user.name} ${student.user.lastName}`})
                )}
                getOptionLabel={(option) => option.displayName}
                // setcustomkey={(option) => option.id}
                ChipProps={{ size: "small" }}
              />
              <RHFTextField name="purposeOfClass" label={translate('lesson_plans_update_form.purpose')} />
              <RHFTextField
                name="bibliography"
                label={translate('lesson_plans_update_form.biblio')}
                fullWidth
                multiline
                rows={3}
              />
              <Stack spacing={1}>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    {translate('lesson_plans_update_form.change_deadline')}
                  </Typography>
                  <RHFRadioGroup control={control} row spacing={4} name="deadlineNotification" options={DEADLINE_NOTIFICATION_OPTION} />
              </Stack>
              <Stack spacing={1}>
                <Controller
                  name="deadlineDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      minDate={tomorrow}
                      defaultValue={today}
                      shouldDisableDate={isWeekend}
                      disabled={currentDeadlineNotification}
                      views={['year', 'month', 'day']}
                      label={translate('lesson_plans_update_form.deadline')}
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
              {translate('lesson_plans_update_form.save')}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
        <FileNewFolderDialog open={openUploadFile} onClose={handleCloseUploadFile} />
    </FormProvider>
  );
}
