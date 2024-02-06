import { Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import UsersTop from "../general/app/UsersTop";
import SubjectsTop from "../general/app/SubjectsTop";
import LessonPlanTypeTotal from "../general/app/LessonPlanTypeTotal";
import AnalyticsLessonPlans from "../general/app/AnalyticsLessonPlans";
import { getAllUsers } from "../../../services/user";
import { getSubjects } from "../../../services/subject";
import { getLessonPlansTypes } from "../../../services/lesson-plan";

export default function AppManagerSection({ periodId }) {
  const theme = useTheme();

  const [users, setUsers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [currentLessonPlans, setLessonPlans] = useState([]);
  const [totalLessonPlans, setTotalLessonPlans] = useState(0);
  const [lessonPlanTypes, setLessonPlanTypes] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const currentUsers = await getAllUsers();
      const currentTeachers = [];
      const currentStudents = [];
      const currentManagers = [];
      for (const currentUser of currentUsers) {
        const { roles } = currentUser;
        const rolesName = roles.map((role) => role.name);
        if (rolesName.includes("STUDENT")) {
          currentStudents.push(currentUser);
        }

        if (rolesName.includes("MANAGER")) {
          currentManagers.push(currentUser);
        }

        if (rolesName.includes("TEACHER")) {
          currentTeachers.push(currentUser);
        }
      }
      const managers = {
        id: 1,
        name: "Directores",
        total: currentManagers.length,
      };
      const teachers = {
        id: 2,
        name: "Docentes",
        total: currentTeachers.length,
      };
      const students = {
        id: 3,
        name: "Estudiantes",
        total: currentStudents.length,
      };

      const totalUsers = [managers, teachers, students];
      setUsers(totalUsers);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (periodId.length > 0) {
        const currentSubjects = await getSubjects({ periodId });

        const subjectsToPresent = [];
        for (const currentSubject of currentSubjects) {
          const { id, name, schedules } = currentSubject;
          let totalSchedule = 0;
          for (const schedule of schedules) {
            const { lessonPlans } = schedule;
            totalSchedule += lessonPlans.length;
          }
          const subjectToPresent = {
            id,
            name,
            total: totalSchedule,
          };
          subjectsToPresent.push(subjectToPresent);
          totalSchedule = 0;
        }
        setSubjects(subjectsToPresent);
      }
    };
    fetchSubjects();
  }, [periodId]);

  useEffect(() => {
    const fetchLessonPlans = async () => {
      const acceptedLessonPlans = [];
      const unacceptedLessonPlans = [];
      const lessonPlansToPresent = await getLessonPlansTypes();
      for (const lessonPlanToPresent of lessonPlansToPresent) {
        const { hasQualified } = lessonPlanToPresent;
        if (hasQualified) {
          acceptedLessonPlans.push(lessonPlanToPresent);
        } else {
          unacceptedLessonPlans.push(lessonPlanToPresent);
        }
      }

      const acceptedLessonPlansData = {
        label: "Aceptados",
        value: acceptedLessonPlans.length,
      };
      const unacceptedLessonPlansData = {
        label: "No Aceptados",
        value: unacceptedLessonPlans.length,
      };
      setLessonPlans([acceptedLessonPlansData, unacceptedLessonPlansData]);
      const normalLessonPlans = lessonPlansToPresent.filter(
        (lessonPlan) => lessonPlan.type === "NORMAL"
      );
      const remedialLessonPlans = lessonPlansToPresent.filter(
        (lessonPlan) => lessonPlan.type === "REMEDIAL"
      );
      const normalLessonPlansData = {
        label: "Plan de Clase",
        value: normalLessonPlans.length,
      };
      const remedialLessonPlansData = {
        label: "Plan Remedial",
        value: remedialLessonPlans.length,
      };
      setTotalLessonPlans(lessonPlansToPresent.length);
      setLessonPlanTypes([normalLessonPlansData, remedialLessonPlansData]);
    };
    fetchLessonPlans();
  }, [periodId]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={6}>
        <UsersTop title="Usuarios" list={users} />
      </Grid>
      {subjects.length > 0 && (
        <Grid item xs={12} md={6} lg={6}>
          <SubjectsTop title="Materias" list={subjects} />
        </Grid>
      )}
      <Grid item xs={12} md={6} lg={6}>
        <LessonPlanTypeTotal
          title="Planes de Clases y Planes de Clases Remediales"
          total={totalLessonPlans}
          chart={{
            series: lessonPlanTypes,
          }}
        />
      </Grid>
      {subjects.length && (
        <Grid item xs={12} md={6} lg={6}>
          <AnalyticsLessonPlans
            title="Planes de clases del Periodo"
            chart={{
              series: currentLessonPlans,
              colors: [theme.palette.primary.main, theme.palette.info.main],
            }}
          />
        </Grid>
      )}
    </Grid>
  );
}

AppManagerSection.propTypes = {
  periodId: PropTypes.string,
};
