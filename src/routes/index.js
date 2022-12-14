import { Navigate, useRoutes } from "react-router-dom";
import AuthGuard from "../auth/AuthGuard";
import GuestGuard from '../auth/GuestGuard';
import RoleBasedGuard from "../auth/RoleBasedGuard";
// TODO: Check after if this is necessary.
import { PATH_AFTER_LOGIN } from "../config-global";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";
import { ROLES } from "../layouts/dashboard/nav/config-navigation";
import LessonPlanAboutPage from "../pages/dashboard/lesson-plan/LessonPlanAboutPage";
import LessonPlanCreatePage from "../pages/dashboard/lesson-plan/LessonPlanCreatePage";
import LessonPlanListPage from "../pages/dashboard/lesson-plan/LessonPlanListPage";
import LessonPlanListStudentPage from "../pages/dashboard/lesson-plan/LessonPlanListStudentPage";
import LessonPlanListStudentPendingsPage from "../pages/dashboard/lesson-plan/LessonPlanListStudentsPendingsPage";
import LessonPlanListTeacherPage from "../pages/dashboard/lesson-plan/LessonPlanListTeacherPage";
import LessonPlanProcessPage from "../pages/dashboard/lesson-plan/LessonPlanProcessPage";
import RolesCreatePage from "../pages/dashboard/roles/RolesCreatePage";
import RolesListPage from "../pages/dashboard/roles/RolesListPage";
import StudentsCreatePage from "../pages/dashboard/students/StudentsCreatePage";
import StudentsListPage from "../pages/dashboard/students/StudentsListPage";
import TeachersCreatePage from "../pages/dashboard/teachers/TeachersCreatePage";
import TeachersListPage from "../pages/dashboard/teachers/TeachersListPage";
import GradesCreatePage from "../pages/dashboard/grades/GradesCreatePage";



import {
  LoginPage
} from './elements';
import GradesListPage from "../pages/dashboard/grades/GradesListPage";
import DegreeViewPage from "../pages/dashboard/degree/DegreeViewPage";
import SubjectsListPage from "../pages/dashboard/subjects/SubjectsListPage";
import SubjectsCreatePage from "../pages/dashboard/subjects/SubjectsCreatePage";
import ScheduleViewPage from "../pages/dashboard/schedule/ScheduleViewPage";
import ScheduleCreatePage from "../pages/dashboard/schedule/ScheduleCreatePage";
import DegreesCreatePage from "../pages/dashboard/degree/DegreesCreatePage";

export default function Router () {

  const AuthRoutes = {
    path: 'auth',
    children: [
      {
        path: 'login',
        element: (
          <GuestGuard>
            <LoginPage />
          </GuestGuard>
        )
      }
    ]
  };

  const DashboardRoutes = {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      { 
        path: 'lesson-plan',
        children: [
          { element: <Navigate to='/dashboard/lesson-plan/about' replace />, index: true },
          { path: 'about', 
            element: <LessonPlanAboutPage />},
          { 
            path: 'start-process', 
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager]}>
                <LessonPlanProcessPage />
              </RoleBasedGuard>  
            )
          },
          { path: 'create', 
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.teacher]}>
                <LessonPlanCreatePage />
              </RoleBasedGuard>
            )
          },
          { path: 'all',
             element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager]}>
                <LessonPlanListPage />
              </RoleBasedGuard>
            )
          },
          { path: 'teacher/list', 
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.teacher]}>
                <LessonPlanListTeacherPage />
              </RoleBasedGuard>
            ) 
          },
          { path: 'student/list',
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager]}>
                <LessonPlanListStudentPage />
              </RoleBasedGuard>
            )
          },
          { path: 'student/pendings',
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.teacher, ROLES.student]}>
                <LessonPlanListStudentPendingsPage />
              </RoleBasedGuard>
            )
          },
        ]
      },
      { 
        path: 'roles',
        children: [
          { element: <Navigate to='/dashboard/roles/list' replace />, index: true },
          { path: 'list', element: (
            <RoleBasedGuard hasContent roles={[ROLES.manager]}>
               <RolesListPage />
            </RoleBasedGuard>
          )},
          {
            path: 'create', 
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager]}>
                <RolesCreatePage />
              </RoleBasedGuard>
            )},
        ]
      },
      { 
        path: 'teachers',
        children: [
          { element: <Navigate to='/dashboard/teachers/list' replace />, index: true },
          { path: 'list', element: (
            <RoleBasedGuard hasContent roles={[ROLES.manager]}>
               <TeachersListPage />
            </RoleBasedGuard>
          )},
          {
            path: 'create',
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager]}>
                <TeachersCreatePage />
              </RoleBasedGuard>
            )
          },
        ]
      },
      {
        path: 'students',
        children: [
          { element: <Navigate to='/dashboard/students/list' replace />, index: true },
          { path: 'list', 
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager]}>
                <StudentsListPage />
              </RoleBasedGuard>
            )
          },
          {
            path: 'create',
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager]}>
                <StudentsCreatePage />
              </RoleBasedGuard>
            )
          },
        ]
      },
      {
        path: 'grades',
        children: [
          { element: <Navigate to='/dashboard/grades/list' replace />, index: true },
          { path: 'list', 
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager, ROLES.teacher]}>
                <GradesListPage />
              </RoleBasedGuard>
          )},
          {
            path: 'create',
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager]}>
                <GradesCreatePage />
              </RoleBasedGuard>
            )
          },
        ]
      },
      {
        path: 'degree',
        children: [
          { element: <Navigate to='/dashboard/degree/view' replace />, index: true },
          { path: 'view',
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager]}>
                <DegreeViewPage />
              </RoleBasedGuard>
            )
          },
          {
            path: 'create',
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager]}>
                <DegreesCreatePage />
              </RoleBasedGuard>
            )
          },
        ]
      },
      {
        path: 'subjects',
        children: [
          { element: <Navigate to='/dashboard/subjects/list' replace />, index: true },
          { path: 'list',
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager, ROLES.teacher]}>
                <SubjectsListPage />
              </RoleBasedGuard>
          )},
          {
            path: 'create',
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager]}>
                <SubjectsCreatePage />
              </RoleBasedGuard>
            )
          },
        ]
      },
      {
        path: 'schedule',
        children: [
          { element: <Navigate to='/dashboard/schedule/view' replace />, index: true },
          { path: 'view', 
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.teacher]}>
                <ScheduleViewPage />
              </RoleBasedGuard>
          )},
          {
            path: 'create',
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.teacher]}>
                <ScheduleCreatePage />
              </RoleBasedGuard>
            )
          },
        ]
      },
    ]
  }
  return useRoutes([
    AuthRoutes,
    DashboardRoutes
  ])
}