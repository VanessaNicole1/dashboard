import { Card, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Controller, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useCallback, useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import FormProvider from "../../../../components/hook-form/FormProvider";
import {
  RHFAutocomplete,
  RHFEditor,
  RHFSelect,
  RHFTextField,
  RHFUpload,
} from "../../../../components/hook-form";
import FilePanel from "./FilePanel";
import { PATH_DASHBOARD } from "../../../../routes/paths";
import { _files } from "./_files";
import FileNewFolderDialog from "./file/FileNewFolderDialog";
import { getSchedules } from "../../../../services/schedule";
import { getStudents } from "../../../../services/student";
import { useAuthContext } from "../../../../auth/useAuthContext";
import { findTeacherActivePeriods } from "../../../../services/teacher";

export default function LessonPlanNewFormForm() {
  const { user } = useAuthContext();

  const [openUploadFile, setOpenUploadFile] = useState(false);
  const [teacherActivePeriods, setTeacherActivePeriods] = useState([]);
  const [uniqueSchedules, setUniqueSchedules] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedActivePeriod, setSelectedActivePeriod] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');

  const newLessonPlanSchema = Yup.object().shape({
    // period: Yup.string().required('Period is required'),
    // subject: Yup.string().required('Schedule is required'),
    // grade: Yup.string().required('Schedule is required'),
    // date: Yup.date().required('Date is required'),
    // topic: Yup.string().required('Topic is required'),
    // description: Yup.string().required('Description is required'),
    // content: Yup.string().required('Content is required'),
    // cover: Yup.mixed().required('Cover is required'),
    // students: Yup.array().min(2, 'Must have at least 2 tags'),
    // purposeOfClass: Yup.string().required('Purpose of the class is required'),
    // bibliography: Yup.string().required('Bibliography is required'),
    resources: Yup.array(),
  });

  const defaultValues = {
    period: "",
    subject: "",
    grade: "",
    date: "",
    topic: "",
    description: "",
    content: "",
    cover: [],
    students: [],
    purposeOfClass: "",
    bibliography: "",
    resources: [],
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
        setSelectedActivePeriod(activePeriods[0].id);
        setTeacherActivePeriods(activePeriods);
      }
    };

    fetchTeacherActivePeriods();
  }, [user]);

  useEffect(() => {
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

  const onSubmit = (data) => {
    console.log("DATA", data);
  };

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
    setSelectedActivePeriod(e.target.value);
    setValue("period", e.target.value, { shouldValidate: true });
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    setValue("subject", e.target.value, { shouldValidate: true });
  }

  const handleGradeChange = (e) => {
    setSelectedGrade(e.target.value);
    setValue("grade", e.target.value, { shouldValidate: true });
  }

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
                  />
                )}
              />
              <RHFTextField name="topic" label="Topic" />

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
                  onRemove={handleRemoveFile}
                  onRemoveAll={handleRemoveAllFiles}
                  onUpload={() => console.log("ON UPLOAD")}
                />
              </Stack>

              {/* <div>
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
            </div> */}
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
                options={students.map(
                  (student) => `${student.user.name} ${student.user.lastName}`
                )}
                ChipProps={{ size: "small" }}
              />
              <RHFTextField name="purposeOfClass" label="Purpose of Class" />
              <RHFTextField
                name="bibliography"
                label="Bibliography"
                fullWidth
                multiline
                rows={3}
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
