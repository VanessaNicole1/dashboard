import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import LessonPlanTypeTotal from "../general/app/LessonPlanTypeTotal";
import AnalyticsLessonPlans from "../general/app/AnalyticsLessonPlans";
import { useAuthContext } from "../../../auth/useAuthContext";
import { findStudentLessonPlans } from "../../../services/student";

export default function AppStudentSection ({
  periodId,
}) {
  const theme = useTheme();
  const { user } = useAuthContext();
  const [lessonPlanTypes, setLessonPlanTypes] = useState([]);
  const [currentLessonPlans, setLessonPlans] = useState([]);
  const [totalLessonPlans, setTotalLessonPlans] = useState(0);

  useEffect(() => {
    const fetchStudentLessonPlans = async () => {
      const validatedLessonPlans = await findStudentLessonPlans(true, user.id, periodId);
      const notValidatedLessonPlans = await findStudentLessonPlans(false, user.id, periodId);
      const allLessonPlans = [];
      if (validatedLessonPlans.length !== undefined && notValidatedLessonPlans.length !== undefined) {
        const acceptedLessonPlansData = {
          label: "Aceptados",
          value: validatedLessonPlans.length,
        };
        const unacceptedLessonPlansData = {
          label: "No Aceptados",
          value: notValidatedLessonPlans.length,
        };
        allLessonPlans.push(acceptedLessonPlansData);
        allLessonPlans.push(unacceptedLessonPlansData);
        setLessonPlans(allLessonPlans);
      }
      
      const lessonPlans = [...validatedLessonPlans, ...notValidatedLessonPlans];
      const normalLessonPlans = lessonPlans.filter(
        (lessonPlan) => lessonPlan.lessonPlan.type === "NORMAL"
      );
      const remedialLessonPlans = lessonPlans.filter(
        (lessonPlan) => lessonPlan.lessonPlan.type === "REMEDIAL"
      );
      const normalLessonPlansData = {
        label: "Plan de Clase",
        value: normalLessonPlans.length,
      };
      const remedialLessonPlansData = {
        label: "Plan Remedial",
        value: remedialLessonPlans.length,
      };
      setTotalLessonPlans(lessonPlans.length);
      setLessonPlanTypes([normalLessonPlansData, remedialLessonPlansData]);
    }
    fetchStudentLessonPlans();
  }, [periodId, user]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={6}>
        <LessonPlanTypeTotal
          title="Planes de Clases y Planes de Clases Remediales"
          total={totalLessonPlans}
          chart={{
            series: lessonPlanTypes,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <AnalyticsLessonPlans
          title="Planes de clases"
          chart={{
            series: currentLessonPlans,
            colors: [theme.palette.primary.main, theme.palette.info.main],
          }}
        />
      </Grid>
    </Grid>
  )
}

AppStudentSection.propTypes = {
  periodId: PropTypes.string,
}