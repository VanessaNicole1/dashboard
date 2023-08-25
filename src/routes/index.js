import { Navigate, useRoutes } from "react-router-dom";
import AuthGuard from "../auth/AuthGuard";
import GuestGuard from "../auth/GuestGuard";
import RoleBasedGuard from "../auth/RoleBasedGuard";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";
import { ROLES } from "../layouts/dashboard/nav/config-navigation";
import LessonPlanAboutPage from "../pages/dashboard/lesson-plan/LessonPlanAboutPage";
import LessonPlanCreatePage from "../pages/dashboard/lesson-plan/LessonPlanCreatePage";
import LessonPlanListPage from "../pages/dashboard/lesson-plan/LessonPlanListPage";
import LessonPlanListStudentPage from "../pages/dashboard/lesson-plan/LessonPlanListStudentPage";
import LessonPlanListTeacherPage from "../pages/dashboard/lesson-plan/LessonPlanListTeacherPage";
import LessonPlanProcessPage from "../pages/dashboard/lesson-plan/LessonPlanProcessPage";
import StudentsCreatePage from "../pages/dashboard/students/StudentsCreatePage";
import StudentsListPage from "../pages/dashboard/students/StudentsListPage";
import TeachersCreatePage from "../pages/dashboard/teachers/TeachersCreatePage";
import TeachersListPage from "../pages/dashboard/teachers/TeachersListPage";
import GradesCreatePage from "../pages/dashboard/grades/GradesCreatePage";

import { LoginPage } from "./elements";
import GradesListPage from "../pages/dashboard/grades/GradesListPage";
import DegreeViewPage from "../pages/dashboard/degree/DegreeViewPage";
import SubjectsListPage from "../pages/dashboard/subjects/SubjectsListPage";
import SubjectsCreatePage from "../pages/dashboard/subjects/SubjectsCreatePage";
import SchedulePage from "../pages/dashboard/schedule/SchedulePage";
import DegreesCreatePage from "../pages/dashboard/degree/DegreesCreatePage";
import ProcessesListPage from "../pages/dashboard/lesson-plan/ProcessesListPage";
import UserEditPage from "../pages/dashboard/user/UserEditPage";
import UsersListPage from "../pages/dashboard/user/UsersListPage";
import RegisterPage from "../pages/auth/RegisterPage";
import LessonPlanEditPage from "../pages/dashboard/lesson-plan/LessonPlanEditPage";
import { LessonPlanValidateStudentPage } from "../pages/dashboard/lesson-plan/LessonPlanValidateStudentPage";
import { LessonPlanTeacherViewPage } from "../pages/dashboard/lesson-plan/LessonPlanTeacherViewPage";
import ReportsPage from "../pages/dashboard/reports/ReportsPage";
import { RemedialTrackingPage } from "../pages/dashboard/lesson-plan/remedial/RemedialTrackingPage";
import { RemedialStudentPage } from "../pages/dashboard/lesson-plan/remedial/RemedialStudentPage";
import { RemedialTeacherPage } from "../pages/dashboard/lesson-plan/remedial/RemedialTeacherPage";
import { RemedialManagerPage } from "../pages/dashboard/lesson-plan/remedial/RemedialManagerPage";
import { RemedialLessonPlanAboutPage } from "../pages/dashboard/lesson-plan/remedial/RemedialLessonPlanAboutPage";
import RemedialPlanCreatePage from "../pages/dashboard/remedial-plan/RemedialPlanCreatePage";
import { RemedialplanTeacherViewPage } from "../pages/dashboard/remedial-plan/RemedialPlanTeacherViewPage";

export default function Router() {
  const AuthRoutes = {
    path: "auth",
    children: [
      {
        path: "login",
        element: (
          <GuestGuard>
            <LoginPage />
          </GuestGuard>
        ),
      },
      {
        path: "register/:registeredToken",
        element: (
          <GuestGuard>
            <RegisterPage />
          </GuestGuard>
        ),
      },
    ],
  };

  const DashboardRoutes = {
    path: "dashboard",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "lesson-plan",
        children: [
          {
            element: <Navigate to="/dashboard/lesson-plan/about" replace />,
            index: true,
          },
          { path: "about", element: <LessonPlanAboutPage /> },
          {
            path: "start-process",
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager]}>
                <LessonPlanProcessPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: "process-list",
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager]}>
                <ProcessesListPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: "create",
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.teacher]}>
                <LessonPlanCreatePage />
              </RoleBasedGuard>
            ),
          },
          {
            path: "all",
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager]}>
                <LessonPlanListPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: "teacher/list",
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.teacher]}>
                <LessonPlanListTeacherPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: ":id/edit",
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager, ROLES.teacher]}>
                <LessonPlanEditPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: "student/list",
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.student]}>
                <LessonPlanListStudentPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: "student/validate/:lessonPlanId",
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.student]}>
                <LessonPlanValidateStudentPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: "teacher/view/:lessonPlanId",
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.teacher]}>
                <LessonPlanTeacherViewPage />
              </RoleBasedGuard>
            ),
          },
        ],
      },
      {
        path: "lesson-plan-remedial",
        children: [
          {
            element: (
              <Navigate to="/dashboard/lesson-plan-remedial/about" replace />
            ),
            index: true,
          },
          { path: "about", element: <RemedialLessonPlanAboutPage /> },
          {
            path: "student",
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.student]}>
                <RemedialStudentPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: "teacher",
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.teacher]}>
                <RemedialTeacherPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: "manager",
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager]}>
                <RemedialManagerPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: "manager/tracking/:id",
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager]}>
                <RemedialTrackingPage />
              </RoleBasedGuard>
            ),
          },
          { path: 'create', 
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.teacher]}>
                <RemedialPlanCreatePage />
              </RoleBasedGuard>
            )
          },
          { path: 'teacher/remedial-plan/view/:remedialPlanId',
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.teacher]}>
                <RemedialplanTeacherViewPage />
              </RoleBasedGuard>
            )
          }
        ]
      },
      {
        path: "user",
        children: [
          {
            element: <Navigate to="/dashboard/user/list" replace />,
            index: true,
          },
          {
            path: "list",
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager]}>
                <UsersListPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: ":id/edit",
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager]}>
                <UserEditPage />
              </RoleBasedGuard>
            ),
          },
        ],
      },
      {
        path: "teachers",
        children: [
          {
            element: <Navigate to="/dashboard/teachers/list" replace />,
            index: true,
          },
          {
            path: "list",
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager]}>
                <TeachersListPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: "create",
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager]}>
                <TeachersCreatePage />
              </RoleBasedGuard>
            ),
          },
        ],
      },
      {
        path: "students",
        children: [
          {
            element: <Navigate to="/dashboard/students/list" replace />,
            index: true,
          },
          {
            path: "list",
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager]}>
                <StudentsListPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: "create",
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager]}>
                <StudentsCreatePage />
              </RoleBasedGuard>
            ),
          },
        ],
      },
      {
        path: "grades",
        children: [
          {
            element: <Navigate to="/dashboard/grades/list" replace />,
            index: true,
          },
          {
            path: "list",
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager, ROLES.teacher]}>
                <GradesListPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: "create",
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager]}>
                <GradesCreatePage />
              </RoleBasedGuard>
            ),
          },
        ],
      },
      {
        path: "degree",
        children: [
          {
            element: <Navigate to="/dashboard/degree/view" replace />,
            index: true,
          },
          {
            path: "view",
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager]}>
                <DegreeViewPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: "create",
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager]}>
                <DegreesCreatePage />
              </RoleBasedGuard>
            ),
          },
        ],
      },
      {
        path: "subjects",
        children: [
          {
            element: <Navigate to="/dashboard/subjects/list" replace />,
            index: true,
          },
          {
            path: "list",
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager, ROLES.teacher]}>
                <SubjectsListPage />
              </RoleBasedGuard>
            ),
          },
          {
            path: "create",
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager]}>
                <SubjectsCreatePage />
              </RoleBasedGuard>
            ),
          },
        ],
      },
      {
        path: "schedule",
        children: [
          {
            element: <Navigate to="/dashboard/schedule/view" replace />,
            index: true,
          },
          {
            path: "view",
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.teacher]}>
                <SchedulePage />
              </RoleBasedGuard>
            ),
          },
        ],
      },
      {
        path: "reports",
        children: [
          {
            path: "/dashboard/reports",
            element: (
              <RoleBasedGuard hasContent roles={[ROLES.manager]}>
                <ReportsPage />
              </RoleBasedGuard>
            ),
          },
        ],
      },
    ],
  };

  const DefaultRoute = {
    path: "*",
    element: <Navigate to="/dashboard/" replace />,
  };

  return useRoutes([AuthRoutes, DashboardRoutes, DefaultRoute]);
}
