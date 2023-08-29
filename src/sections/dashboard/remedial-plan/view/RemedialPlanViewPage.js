import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import { PATH_DASHBOARD } from "../../../../routes/paths";
import { useSettingsContext } from "../../../../components/settings";
import { manualHideErrorSnackbarOptions } from "../../../../utils/snackBar";
import { useSnackbar } from "../../../../components/snackbar";
import { generateLessonPlanReport } from "../../../../services/lesson-plan";
import LessonPlanContentTeacherDetails from "../../lesson-plan/view/LessonPlanContentTeacherDetails";
import LessonPlanTeacherInfo from "../../lesson-plan/view/LessonPlanTeacherInfo";
import ViewRemedialPlanToolBar from "./ViewRemedialPlanToolBar";
import { RemedialLessonPlanStepStatus } from "../../../../common/remedialLessonPlanStepStatus";
import { downloadFile } from "../../../../utils/file";

const signedByTeacherStepId = 2;
export default function RemedialPlanViewPage({
  lessonPlan,
  lessonPlanTracking,
}) {
  const {
    id,
    schedule: { teacher, grade, subject },
    remedialReports,
    trackingSteps,
    isValidatedByManager
  } = lessonPlan;
  const lessonPlanCreationDate = new Date(lessonPlan.createdAt);
  const settings = useSettingsContext();
  const [students, setStudents] = useState([]);
  const [isPrintLoading, setIsPrintLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const signedByTeacherStep = trackingSteps.find(step => step.id === signedByTeacherStepId);

  useEffect(() => {
    const currentStudents = lessonPlanTracking.map((tracking) => ({
      id: tracking.student.id,
      name: tracking.student.user.displayName,
      email: tracking.student.user.email,
      isValidated: tracking.isValidated,
    }));
    setStudents(currentStudents);
  }, [lessonPlanTracking]);

  const handlePrint = async () => {
    setIsPrintLoading(true);
    const teacherReportUrl = await generateLessonPlanReport(lessonPlan.id);
    setIsPrintLoading(false);
    if (teacherReportUrl.errorMessage) {
      enqueueSnackbar(
        teacherReportUrl.errorMessage,
        manualHideErrorSnackbarOptions
      );
    } else {
      downloadFile(teacherReportUrl, 'Plan de Clase Remedial - Reporte.pdf');
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <ViewRemedialPlanToolBar
        isSignedByTeacher={signedByTeacherStep.status === RemedialLessonPlanStepStatus.COMPLETED}
        topic={lessonPlan.topic}
        backLink={PATH_DASHBOARD.remedialLessonPlan.listTeacherRemedialPlans}
        createdAt={lessonPlanCreationDate}
        onPrint={handlePrint}
        isThePrintLoading={isPrintLoading}
        remedialPlanId={id}
        isValidatedByManager={lessonPlan.isValidatedByManager}
      />

      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Stack spacing={3} direction={{ xs: "column-reverse", md: "column" }}>
            <LessonPlanContentTeacherDetails lessonPlan={lessonPlan} />
          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
          <LessonPlanTeacherInfo
            teacher={teacher}
            grade={grade}
            subject={subject}
            studentsValidated={students}
            remedialReports={remedialReports}
            isSignedByTeacher={signedByTeacherStep.status === RemedialLessonPlanStepStatus.COMPLETED}
            isSignedByManager={isValidatedByManager}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

RemedialPlanViewPage.propTypes = {
  lessonPlan: PropTypes.object,
  lessonPlanTracking: PropTypes.array,
};
