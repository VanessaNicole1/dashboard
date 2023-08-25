import PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from 'react';
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
import { uploadSignedReportByTeacher } from '../../../../services/lesson-plan';
import { useSnackbar } from '../../../../components/snackbar';
import { manualHideErrorSnackbarOptions } from '../../../../utils/snackBar';
import { PATH_DASHBOARD } from '../../../../routes/paths';


SignedFileDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  folderName: PropTypes.string,
  onChangeFolderName: PropTypes.func,
  isThePrintLoading: PropTypes.bool,
  onPrint: PropTypes.func,
  remedialPlanId: PropTypes.string
};

export default function SignedFileDialog({
  title = 'Cargar reporte',
  open,
  onClose,
  onCreate,
  onUpdate,
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
      setFiles([...files, ...newFiles]);
      const uploadReportFileResponse = await uploadSignedReportByTeacher(remedialPlanId, newFiles);
      if (uploadReportFileResponse.errorMessage) {
        enqueueSnackbar(uploadReportFileResponse.errorMessage, manualHideErrorSnackbarOptions);
      } else {
        enqueueSnackbar(uploadReportFileResponse.message, { variant: 'success', autoHideDuration: 5000 });
        navigate(PATH_DASHBOARD.remedialLessonPlan.listTeacherRemedialPlans);
      }
    },
    [files]
  );

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
        disabled={isThePrintLoading}
        color="inherit"
        variant="outlined"
        startIcon={<Iconify icon="material-symbols:print" />}
        onClick={() => {
          onPrint();
        }}
      >
        {
          isThePrintLoading ? 'Loading...' : 'Imprimir'
        }
      </Button>
      <Button
        variant="contained"
        startIcon={<Iconify icon="eva:cloud-upload-fill" />}
        onClick={handleUpload}
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
    </Dialog>
  );
}
