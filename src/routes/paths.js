
function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  fileManager: path(ROOTS_DASHBOARD, '/files-manager'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  blank: path(ROOTS_DASHBOARD, '/blank'),
  lessonPlan: {
    root: path(ROOTS_DASHBOARD, '/lesson-plan'),
    purpose: path(ROOTS_DASHBOARD, '/lesson-plan/about'),
    startProcess: path(ROOTS_DASHBOARD, '/lesson-plan/start-process'),
    create: path(ROOTS_DASHBOARD, '/lesson-plan/create'),
    listAllPlans: path(ROOTS_DASHBOARD, '/lesson-plan/all'),
    listTeacherPlans: path(ROOTS_DASHBOARD, '/lesson-plan/teacher/list'),
    listStudentPlans: path(ROOTS_DASHBOARD, '/lesson-plan/student/list'),
    studentValidate: path(ROOTS_DASHBOARD, '/lesson-plan/student/validate'),
    listProcesses: path(ROOTS_DASHBOARD, '/lesson-plan/process-list'),
    lessonPlanView: path(ROOTS_DASHBOARD, '/lesson-plan/teacher/view'),
    edit: (id) => path(ROOTS_DASHBOARD, `/lesson-plan/${id}/edit`),
  },
  remedialLessonPlan: {
    root: path(ROOTS_DASHBOARD, '/lesson-plan-remedial'),
    information: path(ROOTS_DASHBOARD, '/lesson-plan-remedial/about'),
    listStudentRemedialPlans: path(ROOTS_DASHBOARD, '/lesson-plan-remedial/student'),
    listTeacherRemedialPlans: path(ROOTS_DASHBOARD, '/lesson-plan-remedial/teacher'),
    listManagerRemedialPlans: path(ROOTS_DASHBOARD, '/lesson-plan-remedial/manager'),
    lessonPlanRemedialTracking: (id) => path(ROOTS_DASHBOARD, `/lesson-plan-remedial/manager/tracking/${id}`)
  },
  roles: {
    root: path(ROOTS_DASHBOARD, '/roles'),
    listRoles: path(ROOTS_DASHBOARD, '/roles/list'),
  },
  teachers: {
    root: path(ROOTS_DASHBOARD, '/teachers'),
    listTeachers: path(ROOTS_DASHBOARD,  '/teachers/list'),
    create: path(ROOTS_DASHBOARD, '/teachers/create')
  },
  students: {
    root: path(ROOTS_DASHBOARD, '/students'),
    listStudents: path(ROOTS_DASHBOARD, '/students/list'),
    create: path(ROOTS_DASHBOARD, '/students/create')
  },
  grades: {
    root: path(ROOTS_DASHBOARD, '/grades'),
    listGrades: path(ROOTS_DASHBOARD, '/grades/list'),
    create: path(ROOTS_DASHBOARD, '/grades/create')
  },
  degree: {
    root: path(ROOTS_DASHBOARD, '/degree'),
    view: path(ROOTS_DASHBOARD, '/degree/view'),
    create: path(ROOTS_DASHBOARD, '/degree/create')
  },
  subjects: {
    root: path(ROOTS_DASHBOARD, '/subjects'),
    listSubjects: path(ROOTS_DASHBOARD, '/subjects/list'),
    create: path(ROOTS_DASHBOARD, '/subjects/create')
  },
  schedule: {
    root: path(ROOTS_DASHBOARD, '/schedule'),
    view: path(ROOTS_DASHBOARD, '/schedule/view'),
    create: path(ROOTS_DASHBOARD, '/schedule/create')
  },
  reports: {
    root: path(ROOTS_DASHBOARD, '/reports')
  },
  settings: {
    root: path(ROOTS_DASHBOARD, '/settings'),
    settings: path(ROOTS_DASHBOARD, 'settings/'),
  },
  updatePassword: {
    root: path(ROOTS_DASHBOARD, '/update-password'),
    update: path(ROOTS_DASHBOARD, '/update-password/update')
  },
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
    file: path(ROOTS_DASHBOARD, '/file'),
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (id) => path(ROOTS_DASHBOARD, `/user/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
};
