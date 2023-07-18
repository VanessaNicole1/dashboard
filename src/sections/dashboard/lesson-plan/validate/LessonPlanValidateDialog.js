import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";

// TODO: Add i18n
export const LessonPlanValidateDialog = ({ open, onClose, onValidate }) => {
  const [studentDecision, setStudentDecision] = useState(true);

  const handleChange = () => {
    setStudentDecision(!studentDecision);
  }

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle> Validación del Plan de Clase </DialogTitle>

      <DialogContent sx={{ overflow: "unset" }}>
        <Typography variant="subtitle1">
          Está de acuerdo con el contenido del Plan de Clase?
        </Typography>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={studentDecision ? "yes" : "no"}
              onChange={handleChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Si" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "flex-end" }}>
        <Button variant="outlined" color="success" onClick={() => onValidate(studentDecision)}>
          Validar Plan de Clase
        </Button>

        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

LessonPlanValidateDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onValidate: PropTypes.func,
};
