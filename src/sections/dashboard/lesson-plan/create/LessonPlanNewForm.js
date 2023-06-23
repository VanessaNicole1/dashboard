import { Card, Grid, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Controller, useForm } from "react-hook-form";
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

export default function LessonPlanNewFormForm() {
  const [openUploadFile, setOpenUploadFile] = useState(false);

  const newLessonPlanSchema = Yup.object().shape({
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
    
  }, [])
  

  const onSubmit = (data) => {
    console.log("DATA", data);
  };

  const handleCloseUploadFile = () => {
    setOpenUploadFile(false);
  };

  const students = [];
  const subjects = [];
  const grades = [];

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

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFSelect
                control={control}
                native
                name="subject"
                label="Subject"
              >
                <option value="" />
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.gradeId}>
                    {subject.startHour}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect
                control={control}
                native
                name="grade"
                label="Grade"
              >
                <option value="" />
                {grades.map((grade) => (
                  <option key={grade.id} value={grade.gradeId}>
                    {grade.startHour}
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
