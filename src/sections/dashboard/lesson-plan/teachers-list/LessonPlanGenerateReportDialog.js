import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import LessonPlanGenerateReportForm from "./LessonPlanGenerateReportForm";

// TODO: Add i18n
export const LessonPlanGenerateReportDialog = ({ isLoading, open, onClose, onValidate }) => (
  <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
    <DialogTitle> Generar Reporte de Plan de Clases </DialogTitle>

    <DialogContent sx={{ overflow: "unset", marginBottom: 3 }}>
      <Typography variant="subtitle1">
        Información necesaria para generar el plan de clase:
      </Typography>

      <LessonPlanGenerateReportForm
        isLoading={isLoading}
        onCancel={onClose}
        onFillReportInformation={onValidate}
      />
    </DialogContent>
  </Dialog>
);


LessonPlanGenerateReportDialog.propTypes = {
  isLoading: PropTypes.bool,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onValidate: PropTypes.func,
};
