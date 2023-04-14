// ----------------------------------------------------------------------

// IF THIS TRANSLATION IS INCORRECT PLEASE IGNORE THIS AS THIS TRANSLATION IS FOR DEMO PURPOSES ONLY
// We are happy if you can help improve the translation by sending an email to support@minimals.cc.

// ----------------------------------------------------------------------

const en = {
  demo: {
    title: `English`,
    introduction: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  },
  docs: {
    hi: `Hi`,
    description: `Need help? \n Please check our docs.`,
    documentation: `documentation`,
  },
  services: {
    teachers: {
      validateTeachers: {
        successful: 'Teachers CSV file is correctly structured.'
      }
    },
    students: {
      validateStudents: {
        successful: 'Students CSV file is correctly structured.'
      }
    }
  },
  lesson_plan: {
    start_process: {
      helmet: 'Lesson Plan - Start Process',
      breadcrumbs: {
        title: 'Start Process',
        lesson_plan: 'Lesson Plan',
        start_process: 'Start Process'
      },
      steps: {
        general_information: 'General Information',
        students: 'Students',
        teachers: 'Teachers',
        review_information: 'Review Information'
      },
      csv_errors: {
        has_errors: "CSV file has the following errors:",
        min_required: "CSV file is required",
        max_accepted: "Only one CSV file is allowed",
        empty: "CVS file does not contain records",
      },
      common: {
        back_button: "Back Step",
        next_button: "Next Step",
        create: "Create {{entity}}",
        alert: "CSV file format should be as follows:",
        validation_error: "The following errors have been found:",
        invalid_field:
          'The "{{header}}" field is not part of the CSV file format.',
        required_headers_amount: "The CSV file should have {{amount}} fields:",
        remove_csv_files: "Delete File",
        view_content: "View CSV Content",
        confirm_dialog:
          "Are you sure to remove <strong>{{amount}}</strong> records?",
        confirm_dialog_title: "Delete",
        form: {
          name: "Name",
          last_name: "Lastname",
          subject: "Subject",
          email: "Email",
          number_parallel: "Cycle",
          parallel: "Parallel",
          buttons: {
            cancel: "Cancel",
            edit: "Edit",
            create: "Create"
          },
          errors: {
            min_name: "{{entity}} name should have at least 3 characters",
            required_name: "{{entity}} name is required.",
            min_lastname:
              "{{entity}} last name should have at least 3 characters",
            required_lastname: "{{entity}} last name is required.",
            invalid_email: "Make sure it is a valid email.",
            required_email: "{{entity}} email is required.",
            max_number_parallel:
              "Cycle should not have more than 2 characters.",
            required_number_parallel: "{{entity}} cycle is required.",
            only_numbers: 'Cycle should have just numeric values.',
            max_parallel: "Parallel should not have more than 1 character.",
            required_parallel: "{{entity}} parallel is required.",
            min_subject: "Subject should have at least 3 characters.",
            required_subject: "{{entity}} subject is required.",
          },
        },
        table: {
          tooltip: "Delete",
          row: {
            tooltip: "Edit {{email}}",
          },
          headers: {
            name: "Name",
            lastname: "Last Name",
            email: "Email",
            subject: "Subject",
            grade: "Grade",
            actions: "Actions",
          },
        },
      },
      general_information: {
        title: "General Information",
        period_chip: "Period",
        degree_chip: "Degree",
        manager_chip: "Manager",
        next_step_button: "Next Step",
        form: {
          period: {
            start_date: "Start of Period",
            end_date: "End of Period",
          },
          degree: "Degree name",
          manager: "Select degree manager",
        },
        errors: {
          required_start_date: "Period start date is required.",
          required_end_date: "Period end date is required.",
          greater_end_date:
            "Period end date should be greater than period start date",
          required_manager: "Manager is required.",
          required_degree: "Degree is required.",
        },
      },
      students: {
        entity: "Student",
        header_title: "Students",
        info: "Please provide students CSV file",
        required_entity: "Students are required to continue with the process.",
        dialog_title_edit: "Edit Student",
        dialog_title_create: "Create Student",
      },
      teachers: {
        entity: "Teacher",
        header_title: "Teachers",
        info: "Please provide teachers CSV file",
        required_entity: "Teachers are required to continue with the process.",
        dialog_title_edit: "Edit Teacher",
        dialog_title_create: "Create Teacher",
      },
      review_information: {
        title: "Summary",
        description:
          "The following is a summary of all the information in order to start the process, to verify the information you can select each of the corresponding sections.",
        period_budge: {
          title: "Period",
          start: "Start",
          end: "End"
        },
        manager: 'Manager',
        degree: 'Degree',
        students: 'Students',
        teachers: 'Teachers',
        next_step_button: 'Start Process',
        back_step_button: 'Back Step',
        alert_message: 'Please, solve the errors to continue with the process.'
      },
    },
  },
  lesson_plan_list_page: {
    helmet: "Lesson Plan: List",
    heading: "Lesson Plans List",
    dashboard: "Dashboard",
    lesson_plan: "Lesson Plan",
    list: "List",
    table: {
      created_date: "Created Date",
      grade: "Grade",
      teacher: "Teacher",
      subject: "Subject",
      actions: "Actions",
    },
  },
  degree_create_page: {
    helmet: "Degree: Create a new degree",
    heading: "Create a new degree",
    link_degree: "Degree",
    link_create_degree: "New degree",
  },
  role_create_page: {
    helmet: "Role: Create a new role",
    heading: "Create a new role",
    link_degree: "Role",
    link_create_degree: "New role",
  },
  student_create_page: {
    helmet: "Student: Create a new estudent",
    heading: "Create a new student",
    link_student: "Student",
    link_create_student: "New student",
  },
  teacher_create_page: {
    helmet: "Teacher: Create a new teacher",
    heading: "Create a new teacher",
    link_teacher: "Teacher",
    link_create_teacher: "New teacher",
  },
  components: {
    table_pagination_custom: {
      form_control: {
        label: "Dense",
      },
    },
    table: {
      selected_action: "{{number}} selected",
    },
  },
  sections: {
    toolbar_custom: {
      search: "Search...",
      all_option: "All",
    },
    lesson_plan_toolbar: {
      grade: "Grade",
    },
    role_toolbar: {
      type: "Type",
    },
    teacher_toolbar: {
      teacher: "Period",
    },
    student_toolbar: {
      grade: "Grade",
    },
    grade_toolbar: {
      degree: "Degree",
    },
    degree_toolbar: {
      degree: "Degree",
    },
    students: {
      schema: {
        name: "Name is required",
      },
    },
  },
  lesson_plan_title: 'lesson plan',
  about: 'about',
  start_process: 'start process',
  all_plans: 'all plans',
  processes_list: 'processes',
  teacher_plans: `teacher's plans`,
  create: "create",
  list: "list",
  pending: "pending",
  roles_list_page: {
    helmet: "Roles | List",
    heading: "Role List",
    dashboard: "Dashboard",
    roles: "Roles",
    list: "List",
    table: {
      id: "ID",
      type: "Type",
      actions: "Actions",
    },
  },
  students_list_page: {
    helmet: "Students | List",
    heading: "Students List",
    dashboard: "Dashboard",
    roles: "Students",
    list: "List",
    table: {
      name: "Name",
      last: "Last Name",
      email: "Email",
      actions: "Actions",
      grade: "Grade",
    },
  },
  teachers_list_page: {
    helmet: "Teachers | List",
    heading: "Teachers List",
    dashboard: "Dashboard",
    teachers: "Teachers",
    list: "List",
    table: {
      name: "Name",
      last: "Last Name",
      email: "Email",
      actions: "Actions",
    },
  },
  grades_list_page: {
    helmet: "Grades | List",
    heading: "Grades List",
    dashboard: "Dashboard",
    grades: "Grades",
    list: "List",
    table: {
      grade: "Grade",
      parallel: "Parallel",
      degree: "Degree",
      actions: "Actions",
    },
  },
  subjects_list_page: {
    helmet: "Subjects | List",
    heading: "Subjects List",
    dashboard: "Dashboard",
    subjects: "Subjects",
    list: "List",
    table: {
      name: 'Name',
      grades: 'Grades',
      actions: 'Actions',
    },
  },
  degrees_list_page: {
    helmet: "Degrees | List",
    heading: "Degrees List",
    dashboard: "Dashboard",
    degrees: "Degrees",
    list: "List",
    table: {
      period: "Period",
      name: "Name",
      actions: "Actions",
    },
  },
  period_list_page: {
    helmet: 'Process | List',
    heading: 'Process List',
    dashboard: 'Dashboard',
    start_label: 'Start Date',
    end_label: 'End Date',
    manager_label: 'Manager',
    degree_label: 'Degree',
    status_label: 'Status'
  },
  users_list_page: {
    helmet: 'Users | List',
    heading: 'Users List',
    dashboard: 'Dashboard',
    roles: 'Users',
    list: 'List',
    table: {
      name: 'Name',
      last: 'Last Name',
      email: 'Email',
      actions: 'Actions',
      roles: 'Roles'
    }
  },
  degree_create_form: {
    button_create: "Create degree",
    input_name: "Degree name",
    name_schema: "Name is required",
  },
  role_create_form: {
    button_create: "Create role",
    input_name: "Role type",
    role_schema: "Type is required",
  },
  student_create_form: {
    button_create: "Create student",
    name_schema: "Name is required",
    last_name_schema: "Last Name is required",
    email_schema: "Email is required",
    grade_schema: "Grade is required",
    input_name: "Name",
    last_name_input: "Last Name",
    email_input: "Email",
    grade_input: "Grade",
  },
  teacher_create_form: {
    button_create: 'Create teacher',
    name_schema: 'Name is required',
    last_name_schema: 'Last Name is required',
    email_schema: 'Email is required',
    input_name: 'Name',
    last_name_input: 'Last Name',
    email_input: 'Email',
    button_update: 'Save changes'
  },
  subject_edit_form: {
    name: 'Name',
    button_edit: 'Update Subject'
  },
  app: `app`,
  user: `user`,
  edit: `edit`,
  shop: `shop`,
  blog: `blog`,
  post: `post`,
  mail: `mail`,
  chat: `chat`,
  cards: `cards`,
  posts: `posts`,
  kanban: `kanban`,
  general: `general`,
  banking: `banking`,
  booking: `booking`,
  profile: `profile`,
  account: `account`,
  product: `product`,
  invoice: `invoice`,
  details: `details`,
  checkout: `checkout`,
  calendar: `calendar`,
  analytics: `analytics`,
  ecommerce: `e-commerce`,
  management: `management`,
  menu_level: `menu level`,
  menu_level_2a: `menu level 2a`,
  menu_level_2b: `menu level 2b`,
  menu_level_3a: `menu level 3a`,
  menu_level_3b: `menu level 3b`,
  menu_level_4a: `menu level 4a`,
  menu_level_4b: `menu level 4b`,
  item_disabled: `item disabled`,
  item_label: `item label`,
  item_caption: `item caption`,
  item_external_link: `item external link`,
  description: `description`,
  other_cases: `other cases`,
  item_by_roles: `item by roles`,
  only_admin_can_see_this_item: `Only admin can see this item`,
};

export default en;
