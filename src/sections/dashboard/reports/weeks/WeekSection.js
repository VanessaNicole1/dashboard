import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Link, Card, CardHeader, Typography, Stack, Tooltip, IconButton, Alert } from '@mui/material';
import Scrollbar from '../../../../components/scrollbar';
import Iconify from '../../../../components/iconify/Iconify';
import { useSnackbar } from '../../../../components/snackbar';
import CustomAvatar from '../../../../components/custom-avatar/CustomAvatar';
import { generateTeacherLessonPlanReport } from '../../../../services/lesson-plan';
import { manualHideErrorSnackbarOptions } from '../../../../utils/snackBar';

WeeksReportSection.propTypes = {
  period: PropTypes.string,
  list: PropTypes.array,
  title: PropTypes.string,
  subheader: PropTypes.string,
  teacher: PropTypes.any
};

export default function WeeksReportSection({ period, title, subheader, list, teacher = null, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar sx={{height: '450px'}}>
        <Stack spacing={3} sx={{ p: 3 }}>
          {
            list.length === 0 ? (
              <Alert severity='info'>
                Aún no hay reportes semanales
              </Alert>
            ): 
            list.map((week) => (
              <WeekItem key={week.id} week={week} teacher={teacher} period={period}/>
            ))
          }
        </Stack>
      </Scrollbar>
    </Card>
  );
}

WeekItem.propTypes = {
  week: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    range: PropTypes.string,
    from: PropTypes.string,
    to: PropTypes.string
  }),
  period: PropTypes.string,
  teacher: PropTypes.any
};

function WeekItem({ week, period, teacher = null }) {
  const { enqueueSnackbar } = useSnackbar();
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const generateLessonPlan = async (from, to) => {
    if (teacher) {
      await generateLessonPlanTeacherReport(from, to);
    } else {
      await generateLessonPlanForAllTeachersPerWeek();
    }
  };

  const generateLessonPlanForAllTeachersPerWeek = async () => {
  }

  const generateLessonPlanTeacherReport = async (selectedWeek) => {
    const data = {
      fromDate: new Date(selectedWeek.from),
      toDate: new Date(selectedWeek.to),
      period
    }
    setIsGeneratingReport(true);
    const teacherReportUrl = await generateTeacherLessonPlanReport(teacher.user.id, data);
    setIsGeneratingReport(false);

    if (teacherReportUrl.errorMessage) {
      enqueueSnackbar(
        `El docente no ha creado planes de clase para la ${selectedWeek.name}`,
        manualHideErrorSnackbarOptions
      );
    } else {
      window.open(teacherReportUrl, "_blank");
    }
  }

  const { name, id, range } = week;
  return (
    <Stack direction="row" spacing={2}>
      <CustomAvatar
        name={`${id}`}
        custom="yes"
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box sx={{ flexGrow: 1, minWidth: 200 }}>
        <Link sx={{ color: 'text.primary', typography: 'subtitle2' }}>{name}</Link>

        <Stack direction="row">
          <Typography variant="body2" sx={{ color:'text.secondary' }}>
            {range}
          </Typography>
        </Stack>
      </Box>

      <Tooltip title={`Generar Reporte ${name}`}>
        <IconButton onClick={() => generateLessonPlan(week)}>
          {
            isGeneratingReport ? (
              <Iconify icon="eos-icons:bubble-loading"/>
            ): (
              <Iconify icon="tabler:report"/>
            )
          }
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
