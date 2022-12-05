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


import {
  LoginPage
} from './elements';

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
          { element: <Navigate to='/dashboard/lesson-plan/about' replace/>, index: true },
          { path: 'about', element: <LessonPlanAboutPage />},
          { 
            path: 'start-process', 
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager]}>
                <LessonPlanProcessPage />
              </RoleBasedGuard>  
            )
          },
          { path: 'create', element: <LessonPlanCreatePage />},
          { path: 'all', element: <LessonPlanListPage />},
          { path: 'teacher/list', element: <LessonPlanListTeacherPage />},
          { path: 'student/list', element: <LessonPlanListStudentPage />},
          { path: 'student/pendings', element: <LessonPlanListStudentPendingsPage />},
        ]
      }
    ]
  }


  return useRoutes([
    AuthRoutes,
    DashboardRoutes
  ])
}