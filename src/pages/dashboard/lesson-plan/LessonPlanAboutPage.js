import { Container, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import { useAuthContext } from "../../../auth/useAuthContext";
import { useSettingsContext } from "../../../components/settings";
import { getAllUsers } from "../../../services/user";
import SubjectsTop from "../../../sections/dashboard/general/app/SubjectsTop";
import { getSubjects } from "../../../services/subject";
import AnalyticsLessonPlans from "../../../sections/dashboard/general/app/AnalyticsLessonPlans";
import UsersTop from "../../../sections/dashboard/general/app/UsersTop";
import { getLessonPlans } from "../../../services/lesson-plan";

export default function LessonPlanAboutPage () {

  const { themeLayout, themeStretch } = useSettingsContext();
  const [users, setUsers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [periodId, setPeriodId] = useState("9deb297b-2b2b-4177-a590-85955dfa9d79");
  const [currentLessonPlans, setLessonPlans] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchUsers = async () => {
      const currentUsers = await getAllUsers();
      const currentTeachers = [];
      const currentStudents = [];
      const currentManagers = [];
      for (const currentUser of currentUsers) {
        const { roles } = currentUser;
        const rolesName = roles.map((role) => role.name);
        if (rolesName.includes('STUDENT')) {
          currentStudents.push(currentUser);
        }

        if (rolesName.includes('MANAGER')) {
          currentManagers.push(currentUser);
        }

        if (rolesName.includes('TEACHER')) {
          currentTeachers.push(currentUser);
        }
      }
      const managers = {
        name: 'Directores',
        total: currentManagers.length
      };
      const teachers = {
        name: 'Docentes',
        total: currentTeachers.length
      };
      const students = {
        name: 'Estudiantes',
        total: currentStudents.length
      };

      const totalUsers = [managers, teachers, students];
      setUsers(totalUsers);
    }
    fetchUsers();
  }, []);

  useEffect(() => {
   const fetchSubjects = async () => {
    const currentSubjects = await getSubjects({periodId});
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
      }
      subjectsToPresent.push(subjectToPresent);
      totalSchedule = 0;
    }
    setSubjects(subjectsToPresent);
   }
   fetchSubjects();
  }, [periodId]);

  useEffect(() => {
    const fetchLessonPlans = async () => {
      const acceptedLessonPlans = [];
      const unacceptedLessonPlans = [];
      const lessonPlansToPresent = await getLessonPlans();
      for (const lessonPlanToPresent of lessonPlansToPresent) {
        const { hasQualified } = lessonPlanToPresent;
        if ( hasQualified ) {
          acceptedLessonPlans.push(lessonPlanToPresent);
        } else {
          unacceptedLessonPlans.push(lessonPlanToPresent);
        }
      }
      const acceptedLessonPlansData = {
        label: 'Aceptados',
        value: acceptedLessonPlans.length
      };
      const unacceptedLessonPlansData = {
        label: 'No Aceptados',
        value: unacceptedLessonPlans.length
      }
      setLessonPlans([acceptedLessonPlansData, unacceptedLessonPlansData]);
    };
    fetchLessonPlans();
  }, [periodId]);

  const { user } = useAuthContext();

  const currentRoles = user.roles.map((role) => role.name);

  return (
   <>
   {
      currentRoles.includes('MANAGER') &&  
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <div style={{padding: 10}}>
          <TextField
            fullWidth
            select
            label="period"
            value=""
            onChange={() => {}}
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
              textTransform: 'capitalize',
            }}
          />
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <UsersTop title="Top Users" list={users} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <SubjectsTop title="Subject List" list={subjects} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsLessonPlans
              title="Planes de clases"
              chart={{
                series: currentLessonPlans,
                colors: [
                  theme.palette.primary.main,
                  theme.palette.info.main,
                ],
              }}
            />
      </Grid>
        </Grid>
    </Container>
          }
   </>
  );
};
