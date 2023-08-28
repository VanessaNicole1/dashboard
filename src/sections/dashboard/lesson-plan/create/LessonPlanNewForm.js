import { Alert, Card, Grid, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Controller, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useCallback, useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import FormProvider from "../../../../components/hook-form/FormProvider";
import {
  RHFAutocomplete,
  RHFEditor,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
  RHFUpload,
} from "../../../../components/hook-form";
import FileNewFolderDialog from "./file/FileNewFolderDialog";
import { getSchedules } from "../../../../services/schedule";
import { getStudents } from "../../../../services/student";
import { useAuthContext } from "../../../../auth/useAuthContext";
import { findTeacherActivePeriods } from "../../../../services/teacher";
import { createLessonPlan } from "../../../../services/lesson-plan";
import { manualHideErrorSnackbarOptions } from "../../../../utils/snackBar";
import { useSnackbar } from "../../../../components/snackbar";
import { PATH_DASHBOARD } from "../../../../routes/paths";
import { useLocales } from "../../../../locales";
import { getPeriod } from "../../../../services/period";

export default function LessonPlanNewForm() {
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { translate } = useLocales();

  const NOTIFICATION_OPTION = [
    { label: translate("lesson_plans_create_form.notify_now"), value: "yes" },
    { label: translate("lesson_plans_create_form.notify_after"), value: "no" },
  ];

  const [openUploadFile, setOpenUploadFile] = useState(false);
  const [teacherActivePeriods, setTeacherActivePeriods] = useState([]);
  const [uniqueSchedules, setUniqueSchedules] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedActivePeriod, setSelectedActivePeriod] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedNotification, setSelectedNotification] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [fields, setFields] = useState(true);
  const [currentDeadlineDate, setDeadlineDate] = useState(new Date());
  const [totalStudentsValidate, setTotalStudentsValidate] = useState(1);
  const [validateDate, setValidateDate] = useState(true);
  const [canCreateLessonPlan, setCanCreateLessonPlan] = useState(true);

  const today = dayjs();
  const tomorrow = dayjs().add(1, "day");

  const newLessonPlanSchema = Yup.object().shape({
    period: Yup.string().required(
      translate("lesson_plans_create_form.period_required")
    ),
    subject: Yup.string().required(
      translate("lesson_plans_create_form.subject_required")
    ),
    grade: Yup.string().required(
      translate("lesson_plans_create_form.grade_required")
    ),
    date: Yup.date().required(
      translate("lesson_plans_create_form.date_required")
    ),
    topic: Yup.string().required(
      translate("lesson_plans_create_form.topic_required")
    ),
    description: Yup.string().required(
      translate("lesson_plans_create_form.desc_required")
    ),
    content: Yup.string().required(
      translate("lesson_plans_create_form.content_required")
    ),
    students: Yup.array().min(
      totalStudentsValidate,
      translate("lesson_plans_create_form.students_required", {
        number: totalStudentsValidate,
      })
    ),
    purposeOfClass: Yup.string().required(
      translate("lesson_plans_create_form.purpose_required")
    ),
    bibliography: Yup.string().required(
      translate("lesson_plans_create_form.biblio_required")
    ),
    resources: Yup.array(),
    materials: Yup.string().required(
      translate("lesson_plans_create_form.materials_required")
    ),
    evaluation: Yup.string().required(
      translate("lesson_plans_create_form.evaluation_required")
    ),
    comments: Yup.string().required(
      translate("lesson_plans_create_form.comments_required")
    ),
    notification: Yup.string().required(
      translate("lesson_plans_create_form.notification_required")
    ),
    notificationDate: Yup.date()
      .when(["notification", "date"], (notification, date, schema) => {
        if (notification === "no") {
          return schema
            .min(date, translate("lesson_plans_create_form.end_after_start"))
            .typeError(translate("lesson_plans_create_form.end_date_required"));
        }
      })
      .required(translate("lesson_plans_create_form.end_date_required")),
    // deadlineDate: Yup.date(),
  });

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
    materials: "",
    evaluation: "",
    comments: "",
    resources: [],
    notification: "yes",
    notificationDate: new Date(),
    deadlineDate: new Date(),
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

  const validateWeekend = (date) => {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  // TODO: Validate the day
  useEffect(() => {
    const currentDate = new Date();
    const isWeekend = validateWeekend(currentDate);
    if (isWeekend) {
      setValidateDate(false);
    } else {
      setValidateDate(true);
    }
  }, []);

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
        const currentSchedules = await getSchedules(
          selectedActivePeriod,
          user.id
        );
        const validateSchedules = currentSchedules.filter(
          (schedule) => schedule.metadata.days.length === 0
        );
        if (validateSchedules.length > 0) {
          setCanCreateLessonPlan(false);
        } else {
          setCanCreateLessonPlan(true);
        }
        setSchedules(currentSchedules);
        const uniqueCurrentSchedules = currentSchedules.filter(
          (obj, index) =>
            currentSchedules.findIndex(
              (schedule) => schedule.subject.id === obj.subject.id
            ) === index
        );
        setUniqueSchedules(uniqueCurrentSchedules);
      };
      fetchSchedules();
    }
  }, [selectedActivePeriod]);

  useEffect(() => {
    if (selectedActivePeriod) {
      const fetchPeriod = async () => {
        const currentPeriod = await getPeriod(selectedActivePeriod);
        const totalStudents =
          currentPeriod.periodConfig.minimumStudentsToEvaluate;
        setTotalStudentsValidate(totalStudents);
      };
      fetchPeriod();
    }
  }, [selectedActivePeriod]);

  useEffect(() => {
    const currentGradesBySubject = schedules.filter(
      (schedule) => schedule.subject.name === selectedSubject
    );
    setGrades(currentGradesBySubject);
  }, [selectedSubject]);

  useEffect(() => {
    if (selectedGrade) {
      setValue("students", []);
      const fetchStudents = async () => {
        const currentSchedule = schedules.filter(
          (schedule) => schedule.id === selectedGrade
        );
        const currentStudents = await getStudents({
          gradeId: currentSchedule[0].grade.id,
        });
        setStudents(currentStudents);
      };
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
    const filtered =
      values.resources &&
      values.resources?.filter((file) => file !== inputFile);
    setValue("resources", filtered);
  };

  const handleRemoveAllFiles = () => {
    setValue("resources", []);
  };

  const handlePeriodChange = (e) => {
    setValue("grade", "");
    setValue("students", []);
    setValue("subject", "");
    setSchedules([]);
    setSelectedStudent([]);
    setSelectedSubject("");
    setStudents([]);
    setSelectedActivePeriod(e.target.value);
    setValue("period", e.target.value, { shouldValidate: true });
  };

  const handleSubjectChange = (e) => {
    setValue("grade", "");
    setValue("students", []);
    setSelectedStudent([]);
    setStudents([]);
    setSelectedSubject(e.target.value);
    setValue("subject", e.target.value, { shouldValidate: true });
  };

  const handleGradeChange = (e) => {
    setValue("students", []);
    setSelectedStudent([]);
    setStudents([]);
    setSelectedGrade(e.target.value);
    setValue("grade", e.target.value, { shouldValidate: true });
  };

  const selectedNotificationValue = useWatch({
    control,
    name: "notification",
  });

  const notificationDateValue = useWatch({
    control,
    name: "notificationDate",
  });

  const addWeekdays = (startDate, numWeekdays) => {
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const currentDate = new Date(startDate);
    while (numWeekdays > 0) {
      currentDate.setTime(currentDate.getTime() + oneDayInMilliseconds);
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        // eslint-disable-next-line no-plusplus
        numWeekdays--;
      }
    }
    return currentDate;
  };

  useEffect(() => {
    if (!selectedNotification) {
      const totalDays = 7;
      const currentDate = new Date();
      const resultDate = addWeekdays(currentDate, totalDays);
      setDeadlineDate(resultDate);
    } else {
      const totalDays = 7;
      setValue("deadlineDate", "");
      const currentNotificationDate = new Date(notificationDateValue);
      const resultDate = addWeekdays(currentNotificationDate, totalDays);
      setDeadlineDate(resultDate);
    }
  }, [selectedNotification, notificationDateValue]);

  function removeDuplicates(arr) {
    return arr.filter((obj, index) => {
      const firstIndex = arr.findIndex(
        (item) => JSON.stringify(item) === JSON.stringify(obj)
      );
      return index === firstIndex;
    });
  }

  const handleStudentChange = (event, newValue) => {
    const validValues = removeDuplicates(newValue);
    setValue("students", validValues, { shouldValidate: true });
    setSelectedStudent(validValues);
  };

  useEffect(() => {
    if (selectedNotificationValue === "no") {
      setSelectedNotification(true);
    } else {
      setSelectedNotification(false);
    }
  }, [selectedNotificationValue]);

  const isWeekend = (date) => {
    const currentDate = new Date(date);
    const currentDay = currentDate.getDay();
    return currentDay === 0 || currentDay === 6;
  };

  function formatDateSpanish(date) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleString("es-ES", options);
  }

  const onSubmit = async (data) => {
    const { notification, grade: schedule, period, resources } = data;
    let { notificationDate } = data;
    if (notification === "yes") {
      notificationDate = null;
    }
    data = {
      ...data,
      notificationDate,
      scheduleId: schedule,
      periodId: period,
      date: data.date.toISOString(),
      deadlineDate: new Date(currentDeadlineDate),
    };
    const lessonPlanResponse = await createLessonPlan(data, resources);

    if (lessonPlanResponse.errorMessage) {
      enqueueSnackbar(
        lessonPlanResponse.errorMessage,
        manualHideErrorSnackbarOptions
      );
    } else {
      enqueueSnackbar(lessonPlanResponse.message, {
        variant: "success",
        autoHideDuration: 5000,
      });
      if (notification === "no") {
        const formattedDate = formatDateSpanish(notificationDate);
        enqueueSnackbar(
          `Students will be notified ${formattedDate} at 8:00 a.m.`,
          { variant: "success", autoHideDuration: 5000 }
        );
      }
      navigate(PATH_DASHBOARD.lessonPlan.listTeacherPlans);
    }
  };

  return (
    <>
      {!canCreateLessonPlan && (
        <Alert severity="warning">
          Para crear planes de clases usted necesita agregar su carga horaria.
        </Alert>
      )}
      <br />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFSelect
                  native
                  name="period"
                  label={translate("lesson_plans_create_form.period")}
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
                  label={translate("lesson_plans_create_form.subject")}
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
                  label={translate("lesson_plans_create_form.grade")}
                  onChange={handleGradeChange}
                  value={selectedGrade}
                  disabled={fields}
                >
                  <option value="" />
                  {grades.map((grade) => (
                    <option key={grade.grade.id} value={grade.id}>
                      {`${grade.grade.number} "${grade.grade.parallel}"`}
                    </option>
                  ))}
                </RHFSelect>
                <Controller
                  name="date"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      label={translate("lesson_plans_create_form.date")}
                      shouldDisableDate={isWeekend}
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
                <RHFTextField
                  name="topic"
                  disabled={fields}
                  label={translate("lesson_plans_create_form.topic")}
                />

                <RHFTextField
                  name="description"
                  label={translate("lesson_plans_create_form.description")}
                  multiline
                  rows={3}
                  disabled={fields}
                />

                <Stack spacing={1}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "text.secondary" }}
                  >
                    {translate("lesson_plans_create_form.content")}
                  </Typography>

                  <RHFEditor simple name="content" />
                </Stack>

                <Stack spacing={1}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "text.secondary" }}
                  >
                    {translate("lesson_plans_create_form.resources")}
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
                  label={translate("lesson_plans_create_form.students")}
                  multiple
                  freeSolo
                  onChange={handleStudentChange}
                  options={students.map((student) => ({
                    id: student.id,
                    displayName: `${student.user.name} ${student.user.lastName}`,
                  }))}
                  getOptionLabel={(option) => option.displayName}
                  // setcustomkey={(option) => option.id}
                  ChipProps={{ size: "small" }}
                  disabled={fields}
                />
                <RHFTextField
                  name="purposeOfClass"
                  disabled={fields}
                  label={translate("lesson_plans_create_form.purpose")}
                />
                <RHFTextField
                  name="bibliography"
                  label={translate("lesson_plans_create_form.biblio")}
                  fullWidth
                  multiline
                  rows={3}
                  disabled={fields}
                />
                <RHFTextField
                  name="materials"
                  label={translate("lesson_plans_create_form.materials")}
                  fullWidth
                  multiline
                  rows={3}
                  disabled={fields}
                />
                <RHFTextField
                  name="evaluation"
                  label={translate("lesson_plans_create_form.evaluation")}
                  fullWidth
                  multiline
                  rows={3}
                  disabled={fields}
                />
                <RHFTextField
                  name="comments"
                  label={translate("lesson_plans_create_form.comments")}
                  fullWidth
                  multiline
                  rows={3}
                  disabled={fields}
                />
                {validateDate && (
                  <Stack spacing={1}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "text.secondary" }}
                    >
                      {translate("lesson_plans_create_form.notify_students")}
                    </Typography>
                    <RHFRadioGroup
                      control={control}
                      row
                      spacing={4}
                      name="notification"
                      options={NOTIFICATION_OPTION}
                    />
                  </Stack>
                )}

                {selectedNotification && (
                  <Controller
                    name="notificationDate"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <DatePicker
                        minTime={new Date(new Date().setHours(8))}
                        maxTime={new Date(new Date().setHours(16))}
                        minDate={tomorrow}
                        defaultValue={today}
                        shouldDisableDate={isWeekend}
                        format="do MMMM yyyy"
                        views={["year", "month", "day"]}
                        label={translate(
                          "lesson_plans_create_form.notify_date"
                        )}
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
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.secondary" }}
                >
                  {translate("lesson_plans_create_form.deadline")}
                </Typography>
                <Controller
                  name="deadlineDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      minDate={tomorrow}
                      defaultValue={today}
                      shouldDisableDate={isWeekend}
                      format="do MMMM yyyy HH"
                      views={["year", "month", "day"]}
                      label={translate("lesson_plans_create_form.deadline")}
                      value={currentDeadlineDate}
                      onChange={setDeadlineDate}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                      disabled
                    />
                  )}
                />
              </Stack>
            </Card>
            
             {
              validateDate && 
              <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
                disabled={fields || !canCreateLessonPlan}
              >
                {translate("lesson_plans_create_form.save")}
              </LoadingButton>
            </Stack>
             }
            
          </Grid>
          <FileNewFolderDialog
            open={openUploadFile}
            onClose={handleCloseUploadFile}
          />
        </Grid>
      </FormProvider>
    </>
  );
}
