import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFTextField, RHFRadioGroup } from "../../../../components/hook-form";
import FormProvider from "../../../../components/hook-form/FormProvider";

const VALIDATION_OPTIONS = [
  { label: "Si", value: 'true' },
  { label: "No", value: 'false' },
];

export const LessonPlanValidateDialog = ({ open, onClose, onValidate }) => {
  const validationFormSchema = Yup.object().shape({
    studentDecision: Yup.boolean(),
    comment: Yup.string().when("studentDecision", {
      is: false,
      then: Yup.string().required("El comentario es necesario").min(10, "El comentario debe contener al menos 10 carácteres")
    }),
  });

  const defaultValues = {
    studentDecision: true,
  };

  const methods = useForm({
    resolver: yupResolver(validationFormSchema),
    defaultValues,
  });

  const {
    watch,
    control,
    handleSubmit,
    trigger
  } = methods;

  const values = watch();

  const onSubmit = async ({studentDecision, comment}) => {
    let didTheStudentAcceptTheLessonPlan = studentDecision;

    if (typeof studentDecision === 'string') {
      didTheStudentAcceptTheLessonPlan = studentDecision === "true";
    }

    const studentComment = didTheStudentAcceptTheLessonPlan ? '': comment;
    await onValidate(didTheStudentAcceptTheLessonPlan, studentComment);
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle> Validación del Plan de Clase </DialogTitle>

        <DialogContent sx={{ overflow: "unset" }}>
          <Typography variant="subtitle1">
            ¿Está de acuerdo con el contenido del Plan de Clase?
          </Typography>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <RHFRadioGroup
              control={control}
              row
              spacing={4}
              name="studentDecision"
              options={VALIDATION_OPTIONS}
            />
          </div>

          {values.studentDecision === 'false' && (
            <RHFTextField
              name="comment"
              label="Comentario"
              multiline
              rows={3}
            />
          )}
        </DialogContent>

        <DialogActions sx={{ justifyContent: "flex-end" }}>
          <Button type="submit" variant="outlined" color="success">
            Aceptar Plan de Clase
          </Button>

          <Button variant="outlined" color="inherit" onClick={onClose}>
            Cancelar
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

LessonPlanValidateDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onValidate: PropTypes.func,
};
