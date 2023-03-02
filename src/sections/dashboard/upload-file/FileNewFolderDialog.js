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
import Papa from 'papaparse';
import { Upload } from '../../../components/upload';
import Iconify from '../../../components/iconify';

FileNewFolderDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  folderName: PropTypes.string,
  onChangeFolderName: PropTypes.func,
  inputData: PropTypes.array,
  onInputDataChange: PropTypes.func,
};

export default function FileNewFolderDialog({
  title = 'Upload Files',
  open,
  onClose,
  onCreate,
  onUpdate,
  folderName,
  onChangeFolderName,
  inputData,
  onInputDataChange,
  ...other
}) {
  const [files, setFiles] = useState([]);

  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (!open) {
      setFiles([]);
    }
  }, [open]);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFiles([...files, ...newFiles]);
    },
    [files]
  );

  const handleFile = (event) => {
    const [File] = event;
    if(File) {
      Papa.parse(File, {
        header: true,
        skipEmptyLines: true,
        complete (results) {
          const {data} = results;
          setStudents(data);
          onInputDataChange(data);
        },
      });
    }
  }

  const handleUpload = (event) => {
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

        <Upload multiple files={files} onDrop={handleFile} onRemove={handleRemoveFile} />
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          component="label"
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
