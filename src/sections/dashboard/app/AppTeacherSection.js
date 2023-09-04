import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import LessonPlanTypeTotal from "../general/app/LessonPlanTypeTotal";
import AnalyticsLessonPlans from "../general/app/AnalyticsLessonPlans";
import { getSchedules } from "../../../services/schedule";
import SubjectsByTeacher from "../general/app/SubjectsByTeacher";
import { useAuthContext } from "../../../auth/useAuthContext";
import TeacherGrades from "../general/app/TeacherGrades";

export default function AppTeacherSection({ periodId }) {
  const theme = useTheme();
  const { user } = useAuthContext();
  const [lessonPlanTypes, setLessonPlanTypes] = useState([]);
  const [currentLessonPlans, setLessonPlans] = useState([]);
  const [totalLessonPlans, setTotalLessonPlans] = useState(0);
  const [teacherSubjects, setTeacherSubjects] = useState([]);
  const [studentsGrade, setStudentsGrade] = useState([]);

  useEffect(() => {
    if (periodId.length > 0) {
      const fetchSchedules = async () => {
        let schedules = await getSchedules(periodId, user.id);
        // eslint-disable-next-line no-prototype-builtins
        if (schedules.hasOwnProperty("message")) {
          schedules = [];
        }
        const gradesToPresent = [];
        const teacherSubjectsToPresent = [];
        const acceptedLessonPlans = [];
        const unacceptedLessonPlans = [];
        const remedialLessonPlans = [];
        const normalLessonPlans = [];
        const totalLessonPlansSchedules = [];

        for (const schedule of schedules) {
          const { lessonPlans, subject, grade } = schedule;
          for (const lessonPlan of lessonPlans) {
            totalLessonPlansSchedules.push(lessonPlan);

            if (lessonPlan.type === "NORMAL") {
              normalLessonPlans.push(lessonPlan);
            } else {
              remedialLessonPlans.push(lessonPlan);
            }

            if (lessonPlan.hasQualified) {
              acceptedLessonPlans.push(lessonPlan);
            } else {
              unacceptedLessonPlans.push(lessonPlan);
            }
          }

          const { number, parallel } = grade;

          const gradeToPresent = {
            id: schedule.id,
            name: `${number} "${parallel}"`,
            totalLessonPlans: normalLessonPlans.length,
            totalRemedialPlans: remedialLessonPlans.length,
            subjectName: subject.name,
          };
          gradesToPresent.push(gradeToPresent);

          const totalCurrentLessonPlans = lessonPlans.filter(
            (lessonPlan) => lessonPlan.type === "NORMAL"
          ).length;
          const teacherSubjectToPresent = {
            id: subject.id,
            name: subject.name,
            total: totalCurrentLessonPlans,
          };
          teacherSubjectsToPresent.push(teacherSubjectToPresent);
          setTeacherSubjects(teacherSubjectsToPresent);
        }

        setStudentsGrade(gradesToPresent);

        const acceptedLessonPlansData = {
          label: "Aceptados",
          value: acceptedLessonPlans.length,
        };
        const unacceptedLessonPlansData = {
          label: "No Aceptados",
          value: unacceptedLessonPlans.length,
        };
        setLessonPlans([acceptedLessonPlansData, unacceptedLessonPlansData]);

        const normalLessonPlansData = {
          label: "Plan de Clase",
          value: normalLessonPlans.length,
        };
        const remedialLessonPlansData = {
          label: "Plan Remedial",
          value: remedialLessonPlans.length,
        };
        setTotalLessonPlans(totalLessonPlansSchedules.length);
        setLessonPlanTypes([normalLessonPlansData, remedialLessonPlansData]);
      };
      fetchSchedules();
    }
  }, [periodId, user]);

  return (
    <Grid container spacing={3}>
      {studentsGrade.length > 0 && (
        <Grid item xs={12} md={6} lg={6}>
          <TeacherGrades title="Cursos" list={studentsGrade} />
        </Grid>
      )}
      {teacherSubjects.length > 0 && (
        <Grid item xs={12} md={6} lg={6}>
          <SubjectsByTeacher
            title="Materias Impartidas"
            list={teacherSubjects}
          />
        </Grid>
      )}
      {lessonPlanTypes.length > 0 && (
        <Grid item xs={12} md={6} lg={6}>
          <LessonPlanTypeTotal
            title="Planes de Clases y Planes de Clases Remediales"
            total={totalLessonPlans}
            chart={{
              series: lessonPlanTypes,
            }}
          />
        </Grid>
      )}
      {currentLessonPlans.length > 0 && (
        <Grid item xs={12} md={6} lg={6}>
          <AnalyticsLessonPlans
            title="Planes de clases"
            chart={{
              series: currentLessonPlans,
              colors: [theme.palette.primary.main, theme.palette.warning.main],
            }}
          />
        </Grid>
      )}
    </Grid>
  );
}

AppTeacherSection.propTypes = {
  periodId: PropTypes.string,
};
