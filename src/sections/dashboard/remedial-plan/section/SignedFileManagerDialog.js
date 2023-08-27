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


SignedFileManagerDialog.propTypes = {
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

  useEffect(() => {
    if (uploadReport) {
      const uploadRemedialReport = async () => {
        const uploadReportFileResponse = await uploadSignedReportByManager(remedialPlanId, files);
        const uploadReportDeadline = uploadReportFileResponse.data.data.maximumValidationDate;
        const convertedDeadline = convertToSpanishDate(uploadReportDeadline);
        if (uploadReportFileResponse.errorMessage) {
          enqueueSnackbar(uploadReportFileResponse.errorMessage, manualHideErrorSnackbarOptions);
        } else {
          enqueueSnackbar(uploadReportFileResponse.message, { variant: 'success', autoHideDuration: 5000 });
          enqueueSnackbar(`Los estudiantes podrán aceptar este plan de clase remedial hasta el día ${convertedDeadline}`, { variant: 'success', autoHideDuration: 5000 });
          navigate(PATH_DASHBOARD.remedialLessonPlan.listTeacherRemedialPlans);
        }
      }
      uploadRemedialReport();
      handleUpload();
    }
  }, [uploadReport]);
  

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

  const handleUpload = (e) => {
    onClose();
  };

  const handleRemoveFile = (inputFile) => {
    const filtered = files.filter((file) => file !== inputFile);
    setFiles(filtered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleUploadCurrentFile = () => {
    setUploadReport(true);
    setOpenConfirm(false);
  }

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}> {title} </DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        {(onCreate || onUpdate) && (
          <TextField
            fullWidth
            label="Folder name"
            value={folderName}
            onChange={onChangeFolderName}
            sx={{ mb: 3 }}
          />
        )}

        <Upload multiple files={files} onDrop={handleDrop} onRemove={handleRemoveFile} />
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
        Upload
      </Button>

        {!!files.length && (
          <Button variant="outlined" color="inherit" onClick={handleRemoveAllFiles}>
            Remove all
          </Button>
        )}
        {(onCreate || onUpdate) && (
          <Stack direction="row" justifyContent="flex-end" flexGrow={1}>
            <Button variant="soft" onClick={onCreate || onUpdate}>
              {onUpdate ? 'Save' : 'Create'}
            </Button>
          </Stack>
        )}
      </DialogActions>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Subir reporte firmado"
        content="Al momento de subir el reporte firmado, usted está validando el contenido de este plan de clase remedial, ¿usted está de acuerdo con esto?"
        action={
          <Button variant="contained" color="error" onClick={handleUploadCurrentFile}>
            Subir reporte
          </Button>
        }
      />
    </Dialog>
  );
}
