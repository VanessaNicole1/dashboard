import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { useSettingsContext } from '../../../../components/settings';
import { manualHideErrorSnackbarOptions } from '../../../../utils/snackBar';
import { useSnackbar } from '../../../../components/snackbar';
import { generateLessonPlanReport } from '../../../../services/lesson-plan';
import ViewLessonPlanToolBar from './ViewLessonPlanToolBar';
import LessonPlanTeacherInfo from './LessonPlanTeacherInfo';
import LessonPlanContentTeacherDetails from './LessonPlanContentTeacherDetails';

// TODO: Add i18n
export default function LessonPlanViewPage({ lessonPlan, lessonPlanTracking }) {
  const { schedule: { teacher, grade, subject } } = lessonPlan;
  const lessonPlanCreationDate = new Date(lessonPlan.createdAt);
  const settings = useSettingsContext();
  const [students, setStudents] = useState([]);
  const [isPrintLoading, setIsPrintLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const currentStudents = lessonPlanTracking.map((tracking) => ({id: tracking.student.id, name: tracking.student.user.displayName, email: tracking.student.user.email, isValidated: tracking.isValidated}));
    setStudents(currentStudents);
  }, [lessonPlanTracking]);

  const handlePrint = async () => {
    setIsPrintLoading(true);
    const teacherReportUrl = await generateLessonPlanReport(lessonPlan.id);
    setIsPrintLoading(false);
    if (teacherReportUrl.errorMessage) {
      enqueueSnackbar(teacherReportUrl.errorMessage, manualHideErrorSnackbarOptions);
    } else {
      window.open(teacherReportUrl, "_blank");
    }
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <ViewLessonPlanToolBar
        topic={lessonPlan.topic}
        backLink={PATH_DASHBOARD.lessonPlan.listStudentPlans}
        createdAt={lessonPlanCreationDate}
        onPrint={handlePrint}
        isThePrintLoading={isPrintLoading}
      />

      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Stack spacing={3} direction={{ xs: 'column-reverse', md: 'column' }}>
            <LessonPlanContentTeacherDetails
              lessonPlan={lessonPlan}
            />
          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
          <LessonPlanTeacherInfo
            teacher={teacher}
            grade={grade}
            subject={subject}
            studentsValidated={students}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

LessonPlanViewPage.propTypes = {
  lessonPlan: PropTypes.object,
  lessonPlanTracking: PropTypes.array
};