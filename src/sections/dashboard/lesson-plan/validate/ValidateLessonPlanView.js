import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import ValidateLessonPlanToolBar from './ValidateLessonPlanToolBar';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import LessonPlanInfo from './LessonPlanInfo';
import { useSettingsContext } from '../../../../components/settings';
import { useSnackbar } from '../../../../components/snackbar';
import { LessonPlanContentDetails } from './LessonPlanContentDetails';
import { LessonPlanValidateDialog } from './LessonPlanValidateDialog';
import { updateLessonPlanTracking } from '../../../../services/lesson-plan-tracking';
import { generateLessonPlanReport } from '../../../../services/lesson-plan';
import { manualHideErrorSnackbarOptions } from '../../../../utils/snackBar';

// TODO: Add i18n
export default function ValidateLessonPlanView({ lessonPlan, lessonPlanTracking, onUpdateLessonPlanTracking }) {
  const [isPrinting, setIsPrinting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [ openValidateDialog, setOpenValidateDialog ] = useState(false);
  const { schedule: { teacher, grade, subject } } = lessonPlan;
  const lessonPlanCreationDate = new Date(lessonPlan.createdAt);
  const settings = useSettingsContext();

  const handleCloseValidateDialog = () => {
    setOpenValidateDialog(false);
  };

  const handleValidate = async (isAgree) => {
    const data = {
      isValidated: true,
      isAgree
    }
    const updateLessonPlanTrackingResponse = await updateLessonPlanTracking(lessonPlanTracking.id, data);
    await onUpdateLessonPlanTracking();
    
    if (updateLessonPlanTrackingResponse.errorMessage) {
      console.log('Something was wrong trying to update the lesson plan tracking');
    } else {
      console.log('Everything is great!');
    }

    setOpenValidateDialog(false);
  };

  const handlePrint = async () => {
    setIsPrinting(true);
    const teacherReportUrl = await generateLessonPlanReport(lessonPlan.id);
    setIsPrinting(false);
    if (teacherReportUrl.errorMessage) {
      enqueueSnackbar(teacherReportUrl.errorMessage, manualHideErrorSnackbarOptions);
    } else {
      window.open(teacherReportUrl, "_blank");
    }
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <ValidateLessonPlanToolBar
        topic={lessonPlan.topic}
        backLink={PATH_DASHBOARD.lessonPlan.listStudentPlans}
        createdAt={lessonPlanCreationDate}
        status={lessonPlanTracking.isValidated}
        enableValidateButton={!lessonPlanTracking.isValidated}
        onClickValidate={() => setOpenValidateDialog(true)}
        onPrint={handlePrint}
        isPrinting={isPrinting}
      />

      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Stack spacing={3} direction={{ xs: 'column-reverse', md: 'column' }}>
            <LessonPlanContentDetails
              lessonPlan={lessonPlan}
              lessonPlanValidationTracking={lessonPlanTracking}
            />
          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
          <LessonPlanInfo
            teacher={teacher}
            grade={grade}
            subject={subject}
          />
        </Grid>
      </Grid>

      <LessonPlanValidateDialog
        onClose={handleCloseValidateDialog}
        onValidate={handleValidate}
        open={openValidateDialog}
      />
    </Container>
  );
}

ValidateLessonPlanView.propTypes = {
  lessonPlan: PropTypes.object,
  lessonPlanTracking: PropTypes.object,
  onUpdateLessonPlanTracking: PropTypes.func
};
