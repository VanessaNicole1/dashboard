// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
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
          { title: 'all_plans', path: PATH_DASHBOARD.lessonPlan.listAllPlans, roles: [ROLES.manager] }, 
          { title: 'teacher_plans', path: PATH_DASHBOARD.lessonPlan.listTeacherPlans, roles: [ROLES.teacher] },
          { title: 'create', path: PATH_DASHBOARD.lessonPlan.create, roles: [ROLES.teacher] },
          { title: 'list', path: PATH_DASHBOARD.lessonPlan.listStudentPlans, roles: [ROLES.student] },
          { title: 'pending', path: PATH_DASHBOARD.lessonPlan.listStudentPendings, roles: [ROLES.student] },
          { title: 'process_list', path: PATH_DASHBOARD.lessonPlan.listProcesses, roles: [ROLES.manager] },
        ]
      },
      {
        title: 'Roles',
        path: PATH_DASHBOARD.roles.root,
        icon: ICONS.lock,
        roles: [ROLES.manager],
        children: [
          { title: 'list', path: PATH_DASHBOARD.roles.listRoles, roles: [ROLES.manager] },
          
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
  {
    subheader: 'settings',
    items: [
      {
        title: 'Update password',
        path: PATH_DASHBOARD.schedule.root,
        icon: ICONS.calendar,
        roles: [ROLES.manager, ROLES.teacher, ROLES.student],
        children: [
          { title: 'Update', path: PATH_DASHBOARD.updatePassword.update, roles: [ROLES.manager, ROLES.teacher, ROLES.student] },
        ]
      }
    ]
  }
]



const navConfig1 = [
  // GENERAL
  // ----------------------------------------------------------------------
  {    subheader: 'general',
    items: [
      { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard, roles: ['TEACHER'] },
      { title: 'configuración', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      { title: 'docentes', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      { title: 'estudiantes', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      { title: 'planes de clases', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
      { title: 'cursos', path: PATH_DASHBOARD.general.file, icon: ICONS.file },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // USER
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'profile', path: PATH_DASHBOARD.user.profile },
          { title: 'cards', path: PATH_DASHBOARD.user.cards },
          { title: 'list', path: PATH_DASHBOARD.user.list },
          { title: 'create', path: PATH_DASHBOARD.user.new },
          { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
          { title: 'account', path: PATH_DASHBOARD.user.account },
        ],
      },

      // E-COMMERCE
      {
        title: 'ecommerce',
        path: PATH_DASHBOARD.eCommerce.root,
        icon: ICONS.cart,
        children: [
          { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
          { title: 'product', path: PATH_DASHBOARD.eCommerce.demoView },
          { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
          { title: 'create', path: PATH_DASHBOARD.eCommerce.new },
          { title: 'edit', path: PATH_DASHBOARD.eCommerce.demoEdit },
          { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
        ],
      },

      // INVOICE
      {
        title: 'invoice',
        path: PATH_DASHBOARD.invoice.root,
        icon: ICONS.invoice,
        children: [
          { title: 'list', path: PATH_DASHBOARD.invoice.list },
          { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
          { title: 'create', path: PATH_DASHBOARD.invoice.new },
          { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
        ],
      },

      // BLOG
      {
        title: 'blog',
        path: PATH_DASHBOARD.blog.root,
        icon: ICONS.blog,
        children: [
          { title: 'posts', path: PATH_DASHBOARD.blog.posts },
          { title: 'post', path: PATH_DASHBOARD.blog.demoView },
          { title: 'create', path: PATH_DASHBOARD.blog.new },
        ],
      },
      {
        title: 'File manager',
        path: PATH_DASHBOARD.fileManager,
        icon: ICONS.folder,
      },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'app',
    items: [
      {
        title: 'mail',
        path: PATH_DASHBOARD.mail.root,
        icon: ICONS.mail,
        info: <Label color="error">+32</Label>,
      },
      {
        title: 'chat',
        path: PATH_DASHBOARD.chat.root,
        icon: ICONS.chat,
      },
      {
        title: 'calendar',
        path: PATH_DASHBOARD.calendar,
        icon: ICONS.calendar,
      },
      {
        title: 'kanban',
        path: PATH_DASHBOARD.kanban,
        icon: ICONS.kanban,
      },
    ],
  },

  // DEMO MENU STATES
  {
    subheader: 'Other cases',
    items: [
      {
        // default roles : All roles can see this entry.
        // roles: ['user'] Only users can see this item.
        // roles: ['admin'] Only admin can see this item.
        // roles: ['admin', 'manager'] Only admin/manager can see this item.
        // Reference from 'src/guards/RoleBasedGuard'.
        title: 'item_by_roles',
        path: PATH_DASHBOARD.permissionDenied,
        icon: ICONS.lock,
        roles: ['admin'],
        caption: 'only_admin_can_see_this_item',
      },
      {
        title: 'menu_level',
        path: '#/dashboard/menu_level',
        icon: ICONS.menuItem,
        children: [
          {
            title: 'menu_level_2a',
            path: '#/dashboard/menu_level/menu_level_2a',
          },
          {
            title: 'menu_level_2b',
            path: '#/dashboard/menu_level/menu_level_2b',
            children: [
              {
                title: 'menu_level_3a',
                path: '#/dashboard/menu_level/menu_level_2b/menu_level_3a',
              },
              {
                title: 'menu_level_3b',
                path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b',
                children: [
                  {
                    title: 'menu_level_4a',
                    path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b/menu_level_4a',
                  },
                  {
                    title: 'menu_level_4b',
                    path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b/menu_level_4b',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: 'item_disabled',
        path: '#disabled',
        icon: ICONS.disabled,
        disabled: true,
      },

      {
        title: 'item_label',
        path: '#label',
        icon: ICONS.label,
        info: (
          <Label color="info" startIcon={<Iconify icon="eva:email-fill" />}>
            NEW
          </Label>
        ),
      },
      {
        title: 'item_caption',
        path: '#caption',
        icon: ICONS.menuItem,
        caption:
          'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
      },
      {
        title: 'item_external_link',
        path: 'https://www.google.com/',
        icon: ICONS.external,
      },
      {
        title: 'blank',
        path: PATH_DASHBOARD.blank,
        icon: ICONS.blank,
      },
    ],
  },
];

export default navConfig;
