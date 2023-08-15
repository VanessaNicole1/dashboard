import { Button, Dialog, DialogContent, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import WeeksReportSection from './weeks/WeekSection';

TeacherReportDialog.propTypes = {
  weeks: PropTypes.array,
  teacher: PropTypes.object,
  openDialog: PropTypes.bool,
  closeDialog: PropTypes.func,
};

export default function TeacherReportDialog({ weeks, teacher, openDialog, closeDialog }) {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={openDialog}
      onClose={closeDialog}
    >
      <DialogContent>
        <WeeksReportSection
          title="Reportes Semanales"
          subheader={`Docente: ${teacher.user?.displayName}`}
          list={weeks}
        />

        <Stack display="flex" flexDirection="row" justifyContent="space-between" sx={{marginY: "10px"}}>
          <Button variant='contained' color='inherit' onClick={closeDialog}>
            Cancelar
          </Button>
          <Button variant='contained' color='primary'>
            Generar Reporte de todas las semanas
          </Button>  
        </Stack>
      </DialogContent>
    </Dialog>
  )
};
