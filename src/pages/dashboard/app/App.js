import { Box, Container, Grid, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useAuthContext } from "../../../auth/useAuthContext";
import { useSettingsContext } from "../../../components/settings";
import { getAllUsers } from "../../../services/user";
import SubjectsTop from "../../../sections/dashboard/general/app/SubjectsTop";
import { getSubjects } from "../../../services/subject";
import AnalyticsLessonPlans from "../../../sections/dashboard/general/app/AnalyticsLessonPlans";
import UsersTop from "../../../sections/dashboard/general/app/UsersTop";
import { getLessonPlansTypes } from "../../../services/lesson-plan";
import LessonPlanTypeTotal from "../../../sections/dashboard/general/app/LessonPlanTypeTotal";
import { getActivePeriods } from "../../../services/period";

export default function GeneralPage() {
  const { themeStretch } = useSettingsContext();
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [currentLessonPlans, setLessonPlans] = useState([]);
  const [totalLessonPlans, setTotalLessonPlans] = useState(0);
  const [lessonPlanTypes, setLessonPlanTypes] = useState([]);
  const [activePeriods, setActivePeriods] = useState([]);
  const [periodId, setPeriodId] = useState("");

  useEffect(() => {
    const fetchPeriods = async () => {
      const periods = await getActivePeriods();
      if (periods) {
        setPeriodId(periods[0].id);
      }
      setActivePeriods(periods);
    };
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
    fetchPeriods();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
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
    };

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
    fetchSubjects();
  }, [periodId]);

  const { user } = useAuthContext();

  const currentRoles = user.roles.map((role) => role.name);

  const hanldeFilterPeriod = async (event) => {
    console.log("EVENT", event.target.value);
  };

  return (
    <>
      {currentRoles.includes("MANAGER") && (
        <Container maxWidth={themeStretch ? false : "lg"}>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              select
              label="period"
              value={periodId}
              onChange={hanldeFilterPeriod}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    sx: {
                      maxHeight: 260,
                    },
                  },
                },
              }}
              sx={{
                maxWidth: { sm: 460 },
                textTransform: "capitalize",
              }}
            >
              {activePeriods.map((period) => (
                <MenuItem
                  key={period.id}
                  value={period.id}
                  sx={{
                    mx: 1,
                    borderRadius: 0.75,
                    typography: "body2",
                    textTransform: "capitalize",
                  }}
                >
                  {period.displayName}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <UsersTop title="Top Users" list={users} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <SubjectsTop title="Subject List" list={subjects} />
            </Grid>
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
        </Container>
      )}
    </>
  );
}
