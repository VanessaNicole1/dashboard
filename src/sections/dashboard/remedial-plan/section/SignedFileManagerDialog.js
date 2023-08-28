import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
  Stack,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../../../components/iconify';
import { Upload } from '../../../../components/upload';
import { uploadSignedReportByManager } from '../../../../services/lesson-plan';
import { useSnackbar } from '../../../../components/snackbar';
import { manualHideErrorSnackbarOptions } from '../../../../utils/snackBar';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import ConfirmDialog from '../../../../components/confirm-dialog/ConfirmDialog';
import { convertToSpanishDate } from '../../period/list/utils/date.utils';
import RemedialPlanFileRecentItem from './file-recent-item-remedial-plan';


SignedFileManagerDialog.propTypes = {
  reports: PropTypes.any,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  folderName: PropTypes.string,
  onChangeFolderName: PropTypes.func,
  onPrint: PropTypes.func,
  remedialPlanId: PropTypes.string,
  onValidate: PropTypes.func
};

export default function SignedFileManagerDialog({
  reports,
  title = 'Cargar reporte',
  open,
  onClose,
  onCreate,
  onUpdate,
  folderName,
  onChangeFolderName,
  onPrint,
  remedialPlanId,
  onValidate,
  ...other
}) {
  const isThePrintLoading = false;
  const [files, setFiles] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [uploadReport, setUploadReport] = useState(false);

  useEffect(() => {
    if (!open) {
      setFiles([]);
    }
  }, [open]);

  const uploadRemedialReport = async () => {
    const uploadReportFileResponse = await uploadSignedReportByManager(remedialPlanId, files);
    if (uploadReportFileResponse.errorMessage) {
      enqueueSnackbar(uploadReportFileResponse.errorMessage, manualHideErrorSnackbarOptions);
    } else {
      const uploadReportDeadline = uploadReportFileResponse.data.data.maximumValidationDate;
      const convertedDeadline = convertToSpanishDate(uploadReportDeadline);
      enqueueSnackbar(uploadReportFileResponse.message, { variant: 'success', autoHideDuration: 5000 });
      enqueueSnackbar(`Los estudiantes podrán aceptar este plan de clase remedial hasta el día ${convertedDeadline}`, { variant: 'success', autoHideDuration: 5000 });
      navigate(PATH_DASHBOARD.remedialLessonPlan.listTeacherRemedialPlans);
      onClose();
    }
    setOpenConfirm(false);
  }

  const handleDrop = async (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles([...files, ...newFiles]);
    }
  ;

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleRemoveFile = (inputFile) => {
    const filtered = files.filter((file) => file !== inputFile);
    setFiles(filtered);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}> {title} </DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: "none" }}>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Estimado Director por favor descargue el Reporte de Plan Remedial firmado por el docente
          en el siguiente apartado:
        </Typography>

        <RemedialPlanFileRecentItem
          border
          file={reports[0]}
        />

        <Typography variant="body1" sx={{ marginY: 1 }}>
          Una vez descargado el reporte, por favor fírmelo con la herramienta de
          su preferencia y súbalo nuevamente para que pueda ser aceptado por los estudiantes
        </Typography>

        <Typography variant="h6" sx={{ marginY: 1 }}>
          Subir Reporte firmado:
        </Typography>

        <Upload files={files} onDrop={handleDrop} onRemove={handleRemoveFile} />
      </DialogContent>

      <DialogActions>
      <Button
        variant="contained"
        startIcon={<Iconify icon="eva:cloud-upload-fill" />}
        onClick={() => {
          handleOpenConfirm();
          // handleUpload();
        }}
      >
        Subir Reporte
      </Button>
        
      </DialogActions>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Subir reporte firmado"
        content="Al momento de subir el reporte firmado, usted está validando el contenido de este plan de clase remedial, ¿usted está de acuerdo con esto?"
        onAccept={uploadRemedialReport}
      />
    </Dialog>
  );
}
