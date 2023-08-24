import { PATH_DASHBOARD } from '../../../routes/paths';
import SvgColor from '../../../components/svg-color';

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  file: icon('ic_file'),
  calendar: icon('ic_calendar'),
  reports: icon('ic_report'),
  remedial: icon('ic_remedial')
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
        title: 'Plan de Clase',
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
      { 
        title: 'Plan de Clase Remedial',
        path: PATH_DASHBOARD.remedialLessonPlan.root,
        icon: ICONS.remedial,
        roles: [ROLES.manager, ROLES.teacher, ROLES.student],
        children: [
          { title: 'Información', path: PATH_DASHBOARD.remedialLessonPlan.information, roles: [ROLES.manager, ROLES.teacher, ROLES.student] },
          { title: 'Listar', path: PATH_DASHBOARD.remedialLessonPlan.listStudentRemedialPlans, roles: [ROLES.student] },
          { title: 'Listar', path: PATH_DASHBOARD.remedialLessonPlan.listTeacherRemedialPlans, roles: [ROLES.teacher] },
          { title: 'Listar (Director)', path: PATH_DASHBOARD.remedialLessonPlan.listManagerRemedialPlans, roles: [ROLES.manager] },
          { title: 'create', path: PATH_DASHBOARD.remedialLessonPlan.create, roles: [ROLES.teacher] },
        ]
      },
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
        icon: ICONS.reports,
        roles: [ROLES.manager]
      }
    ] 
  }
]

export default navConfig;
