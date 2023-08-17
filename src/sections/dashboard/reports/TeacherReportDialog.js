import { useState } from 'react';
import { Button, Dialog, DialogContent, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import WeeksReportSection from './weeks/WeekSection';
import { generateTeacherLessonPlanReport } from '../../../services/lesson-plan';
import { useSnackbar } from '../../../components/snackbar';
import { manualHideErrorSnackbarOptions } from '../../../utils/snackBar';


TeacherReportDialog.propTypes = {
  weeks: PropTypes.array,
  teacher: PropTypes.object,
  period: PropTypes.string,
  openDialog: PropTypes.bool,
  closeDialog: PropTypes.func,
};

export default function TeacherReportDialog({ weeks, teacher, period, openDialog, closeDialog }) {
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const generateLessonPlanTeacherReportForAllWeeks = async (allWeeks) => {
    const firstWeek = allWeeks[0];
    const lastWeek = allWeeks[allWeeks.length - 1];

    const data = {
      fromDate: new Date(firstWeek.from),
      toDate: new Date(lastWeek.to),
      period
    }
    setIsGeneratingReport(true);
    const teacherReportUrl = await generateTeacherLessonPlanReport(teacher.user.id, data);
    setIsGeneratingReport(false);

    if (teacherReportUrl.errorMessage) {
      enqueueSnackbar(
        `El docente aún no ha generado planes de clases`,
        manualHideErrorSnackbarOptions
      );
    } else {
      window.open(teacherReportUrl, "_blank");
    }
  }

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
          period={period}
          subheader={`Docente: ${teacher.user?.displayName}`}
          list={weeks}
          teacher={teacher}
        />

        <Stack display="flex" flexDirection="row" justifyContent="space-between" sx={{marginY: "10px"}}>
          <Button variant='contained' color='inherit' onClick={closeDialog}>
            Cancelar
          </Button>
          <Button fullWidth variant='contained' sx={{marginLeft: "10px"}} color='primary' disabled={isGeneratingReport} onClick={() => generateLessonPlanTeacherReportForAllWeeks(weeks)}>
            {
              isGeneratingReport ? "Cargando...": "Generar Reporte de todas las semanas"
            }
          </Button>  
        </Stack>
      </DialogContent>
    </Dialog>
  )
};
