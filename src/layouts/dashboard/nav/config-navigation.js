// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
import SvgColor from '../../../components/svg-color';

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

export const ROLES = {
  manager: 'MANAGER',
  teacher: 'TEACHER',
  student: 'STUDENT'
}

const navConfig = [
  {
    subheader: 'general',
    items: [
      { 
        title: 'Lesson Plan',
        path: PATH_DASHBOARD.lessonPlan.root,
        icon: ICONS.file,
        roles: [ROLES.manager, ROLES.teacher, ROLES.student],
        children: [
          { title: 'about', path: PATH_DASHBOARD.lessonPlan.purpose, roles: [ROLES.manager, ROLES.teacher, ROLES.student] },
          { title: 'start_process', path: PATH_DASHBOARD.lessonPlan.startProcess, roles: [ROLES.manager] },
          { title: 'teacher_plans', path: PATH_DASHBOARD.lessonPlan.listTeacherPlans, roles: [ROLES.teacher] },
          { title: 'create', path: PATH_DASHBOARD.lessonPlan.create, roles: [ROLES.teacher] },
          { title: 'list', path: PATH_DASHBOARD.lessonPlan.listStudentPlans, roles: [ROLES.student] },
          { title: 'process_list', path: PATH_DASHBOARD.lessonPlan.listProcesses, roles: [ROLES.manager] },
        ]
      },
      // {
      //   title: 'Roles',
      //   path: PATH_DASHBOARD.roles.root,
      //   icon: ICONS.lock,
      //   roles: [ROLES.manager],
      //   children: [
      //     { title: 'list', path: PATH_DASHBOARD.roles.listRoles, roles: [ROLES.manager] },
          
      //   ]
      // },
      {
        title: 'Users',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        roles: [ROLES.manager],
        children: [
          { title: 'List', path: PATH_DASHBOARD.user.list, roles: [ROLES.manager] }
        ]
      },
      {
        title: 'Schedule',
        path: PATH_DASHBOARD.schedule.root,
        icon: ICONS.calendar,
        roles: [ROLES.teacher]
      },
      {
        title: 'Reports',
        path: PATH_DASHBOARD.reports.root,
        icon: ICONS.calendar,
        roles: [ROLES.manager]
      }
      // {
      //   title: 'Teachers',
      //   path: PATH_DASHBOARD.teachers.root,
      //   icon: ICONS.user,
      //   roles: [ROLES.manager],
      //   children: [
      //     { title: 'List', path: PATH_DASHBOARD.teachers.listTeachers, roles: [ROLES.manager] },
      //     { title: 'Create', path: PATH_DASHBOARD.teachers.create, roles: [ROLES.manager] },
          
      //   ]
      // },
      // {
      //   title: 'Students',
      //   path: PATH_DASHBOARD.students.root,
      //   icon: ICONS.user,
      //   roles: [ROLES.manager],
      //   children: [
      //     { title: 'List', path: PATH_DASHBOARD.students.listStudents, roles: [ROLES.manager] },
      //     { title: 'Create', path: PATH_DASHBOARD.students.create, roles: [ROLES.manager] },
          
      //   ]
      // },
      // {
      //   title: 'Grades',
      //   path: PATH_DASHBOARD.grades.root,
      //   icon: ICONS.user,
      //   roles: [ROLES.manager, ROLES.teacher],
      //   children: [
      //     { title: 'List', path: PATH_DASHBOARD.grades.listGrades, roles: [ROLES.manager, ROLES.teacher] },
      //     { title: 'Create', path: PATH_DASHBOARD.grades.create, roles: [ROLES.manager] },
          
      //   ]
      // },
      // {
      //   title: 'Degree',
      //   path: PATH_DASHBOARD.grades.root,
      //   icon: ICONS.user,
      //   roles: [ROLES.manager],
      //   children: [
      //     { title: 'View', path: PATH_DASHBOARD.degree.view, roles: [ROLES.manager] },
      //     { title: 'Create', path: PATH_DASHBOARD.degree.create, roles: [ROLES.manager] },
      //   ]
      // },
      // {
      //   title: 'Subjects',
      //   path: PATH_DASHBOARD.subjects.root,
      //   icon: ICONS.folder,
      //   roles: [ROLES.manager, ROLES.teacher],
      //   children: [
      //     { title: 'List', path: PATH_DASHBOARD.subjects.listSubjects, roles: [ROLES.manager, ROLES.teacher] },
      //     { title: 'Create', path: PATH_DASHBOARD.subjects.create, roles: [ROLES.manager] },
      //   ]
      // },
      // {
      //   title: 'Schedule',
      //   path: PATH_DASHBOARD.schedule.root,
      //   icon: ICONS.calendar,
      //   roles: [ROLES.teacher],
      //   children: [
      //     { title: 'View', path: PATH_DASHBOARD.schedule.view, roles: [ROLES.teacher] },
      //     { title: 'Create', path: PATH_DASHBOARD.schedule.create, roles: [ROLES.teacher] },
      //   ]
      // }
    ] 
  },
  // {
  //   subheader: 'settings',
  //   items: [
  //     {
  //       title: 'Update password',
  //       path: PATH_DASHBOARD.schedule.root,
  //       icon: ICONS.calendar,
  //       roles: [ROLES.manager, ROLES.teacher, ROLES.student],
  //       children: [
  //         { title: 'Update', path: PATH_DASHBOARD.updatePassword.update, roles: [ROLES.manager, ROLES.teacher, ROLES.student] },
  //       ]
  //     }
  //   ]
  // }
]

export default navConfig;
