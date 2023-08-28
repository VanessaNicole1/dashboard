import PropTypes from "prop-types";
import { useEffect, useState, useCallback } from "react";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Iconify from "../../../../components/iconify";
import { Upload } from "../../../../components/upload";
import { uploadSignedReportByTeacher } from "../../../../services/lesson-plan";
import { useSnackbar } from "../../../../components/snackbar";
import { manualHideErrorSnackbarOptions } from "../../../../utils/snackBar";

SignedFileDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  folderName: PropTypes.string,
  onChangeFolderName: PropTypes.func,
  isThePrintLoading: PropTypes.bool,
  onPrint: PropTypes.func,
  remedialPlanId: PropTypes.string,
};

export default function SignedFileDialog({
  title = "Firmar Clan de Clase Remedial",
  open,
  onClose,
  folderName,
  onChangeFolderName,
  isThePrintLoading,
  onPrint,
  remedialPlanId,
  ...other
}) {
  const [files, setFiles] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) {
      setFiles([]);
    }
  }, [open]);

  const handleDrop = useCallback(
    async (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles([...newFiles]);
    },
    [files]
  );

  const handleUpload = async () => {
    const uploadReportFileResponse = await uploadSignedReportByTeacher(
      remedialPlanId,
      files
    );
    if (uploadReportFileResponse.errorMessage) {
      enqueueSnackbar(
        uploadReportFileResponse.errorMessage,
        manualHideErrorSnackbarOptions
      );
    } else {
      enqueueSnackbar(uploadReportFileResponse.message, {
        variant: "success",
        autoHideDuration: 5000,
      });
      onClose();
    }
  };

  const handleRemoveFile = (inputFile) => {
    const filtered = files.filter((file) => file !== inputFile);
    setFiles(filtered);
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>
        {" "}
        {title}{" "}
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: "none" }}>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Estimado Docente por favor haga click en el siguiente botón para
          descargar el reporte
        </Typography>

        <Button
          fullWidth
          disabled={isThePrintLoading}
          color="primary"
          variant="contained"
          startIcon={<Iconify icon="material-symbols:print" />}
          onClick={onPrint}
        >
          {isThePrintLoading ? "Descargando..." : "Descargar Reporte"}
        </Button>

        <Typography variant="body1" sx={{ marginY: 1 }}>
          Una vez descargado el reporte, por favor fírmelo con la herramienta de
          su preferencia y súbalo nuevamente para que sea validado por el
          Director de Carrera
        </Typography>

        <Typography variant="h6" sx={{ marginY: 1 }}>
          Subir Reporte firmado:
        </Typography>

        <Upload files={files} onDrop={handleDrop} onRemove={handleRemoveFile} />
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          onClick={onClose}
        >
          Cancelar
        </Button>

        <Button
          disabled={files.length === 0}
          variant="contained"
          startIcon={<Iconify icon="eva:cloud-upload-fill" />}
          onClick={handleUpload}
        >
          Subir Reporte
        </Button>
      </DialogActions>
    </Dialog>
  );
}
