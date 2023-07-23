import PropTypes from "prop-types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import FormProvider from "../../../../components/hook-form/FormProvider";
import { RHFSelect } from "../../../../components/hook-form";
import { findTeacherActivePeriods } from "../../../../services/teacher";
import { useAuthContext } from "../../../../auth/useAuthContext";
import { getSchedules } from "../../../../services/schedule";

LessonPlanGenerateReportForm.propTypes = {
  isLoading: PropTypes.bool,
  onCancel: PropTypes.func,
  onFillReportInformation: PropTypes.func
};

export default function LessonPlanGenerateReportForm({
  isLoading,
  onCancel,
  onFillReportInformation,
}) {
  const AlmostOnedayInMiliseconds = 85000000;
                              
  const [periods, setPeriods] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [grades, setGrades] = useState([]);
  const { user } = useAuthContext(); 

  useEffect(() => {
    const fetchTeacherActivePeriods = async () => {
      const activePeriods = await findTeacherActivePeriods(user.id);
      setPeriods(activePeriods);
    };

    fetchTeacherActivePeriods();
  }, []);

  const schemaErrorMessages = {
    requiredFromDate: "La fecha de inicio del reporte es requerida",
    requiredToDate: "La fecha de fin del reporte es requerida",
    toDateShouldBeGreater:
      "La fecha de fin debe ser mayor a la fecha de inicio del reporte.",
    requiredPeriod: "El periodo es requerido",
    requiredSubject: "La materia es requerida",
    requiredGrade: "El Ciclo es requerido",
  };

  const generalInformationSchema = Yup.object().shape({
    fromDate: Yup.date()
      .required(schemaErrorMessages.requiredFromDate)
      .typeError(schemaErrorMessages.requiredFromDate),
    toDate: Yup.date()
      .when("fromDate", (fromDate, schema) =>
        schema.isValidSync(fromDate)
          ? schema.min(
              new Date(fromDate.getTime() + AlmostOnedayInMiliseconds),
              schemaErrorMessages.toDateShouldBeGreater
            )
          : schema
      )
      .required(schemaErrorMessages.requiredToDate)
      .typeError(schemaErrorMessages.requiredToDate),
    period: Yup.string()
      .uuid(schemaErrorMessages.requiredPeriod)
      .required(schemaErrorMessages.requiredPeriod),
    subject: Yup.string().required(schemaErrorMessages.requiredSubject),
    grade: Yup.string().required(schemaErrorMessages.requiredGrade),
  });

  const defaultValues = useMemo(
    () => ({
      fromDate: new Date(),
      toDate: new Date(),
      period: periods.length > 0 ? periods[0].id : ''
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(generalInformationSchema),
    defaultValues,
  });

  const {
    getValues,
    control,
    handleSubmit,
    watch,
    setValue
  } = methods;

  const fetchSchedules = async (periodId) => {
    const schedulesData = await getSchedules(periodId, user.id);
    const uniqueSubjectIds = [...new Set(schedulesData.map(schedule => schedule.subjectId))]
    const uniqueSubjects = [];

    for (const subjectId of uniqueSubjectIds) {
      const { subject } = schedulesData.find((schedule) => schedule.subjectId === subjectId);
      uniqueSubjects.push(subject);
    }

    setSubjects(uniqueSubjects);
    setSchedules(schedulesData);
  }

  useEffect(() => {
    const values = getValues();
    setValue('subject', '');

    if (values.period) {
      fetchSchedules(values.period);
    }
  }, [watch('period')]);

  useEffect(() => {
    setValue('grade', '');
    const values = getValues();

    if (values.subject) {
      changeGradeOptions(values.subject);
    }
  }, [watch('subject')]);


  const changeGradeOptions = (subjectId) => {
    const scheduleGrades = schedules.filter(schedule => schedule.subjectId === subjectId).map(schedule => schedule.grade);
    setGrades(scheduleGrades);
  };

  const onSubmit = (data) => {
    onFillReportInformation(data);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} direction={{ xs: "column", sm: "row" }} sx={{marginY: 2}}>
        <Controller
          name="fromDate"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              label='Desde'
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

        <Controller
          name="toDate"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              label='Hasta'
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

      <RHFSelect
        sx={{marginBottom: 2}}
        native
        name="period"
        label='Periodo'
      >
        <option value="" />
        {periods.map((period) => (
          <option key={period.id} value={period.id}>
            {period.displayName}
          </option>
        ))}
      </RHFSelect>

      <RHFSelect
        native
        name="subject"
        label='Materia'
        sx={{marginBottom: 2}}
      >
        <option value="" />
        {subjects.map((subject) => (
          <option key={subject.id} value={subject.id}>
            {subject.name}
          </option>
        ))}
      </RHFSelect>

      <RHFSelect
        native
        name="grade"
        label='Ciclo'
      >
        <option value="" />
        {grades.map((grade) => (
          <option key={grade.id} value={grade.id}>
            {grade.number} - {grade.parallel}
          </option>
        ))}
      </RHFSelect>
  
      <Stack direction="row" justifyContent='flex-end' spacing={1} sx={{ mt: 3 }}>
        <Button variant="outlined" color="inherit" onClick={onCancel}>
          Cancelar
        </Button>

        <LoadingButton type="submit" variant="contained" loading={isLoading}>
          Generar Reporte
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
