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
        successful: 'El archivo CSV de docentes está correctamente estructurado.'
      }
    },
    students: {
      validateStudents: {
        successful: 'El archivo CSV de estudiantes está correctamente estructurado.'
      }
    }
  },
  lesson_plan: {
    start_process: {
      helmet: 'Plan de clases - Iniciar Proceso',
      breadcrumbs: {
        title: 'Iniciar Proceso',
        lesson_plan: 'Plan de Clases',
        start_process: 'Iniciar Proceso'
      },
      steps: {
        general_information: 'Información General',
        students: 'Estudiantes',
        teachers: 'Docentes',
        review_information: 'Revisar Información'
      },
      csv_errors: {
        has_errors: 'El archivo CSV contiene los siguientes errores:',
        min_required: 'El archivo CSV es requerido.',
        max_accepted: 'Solamente es aceptado un archivo CSV.',
        empty: 'El archivo CSV no contiene registros.',
      },
      common: {
        back_button: 'Paso Anterior',
        next_button: 'Siguiente Paso',
        create: "Crear {{entity}}",
        alert: 'El formato del archivo csv debe ser el siguiente:',
        validation_error: 'Se han encontrado los siguientes errores:',
        invalid_field:
          'El campo "{{header}}" no forma parte del formato del archivo CSV.',
        required_headers_amount: 'El archivo CSV debe tener {{amount}} campos:',
        remove_csv_files: 'Eliminar archivo',
        view_content: 'Visualizar contenido',
        confirm_dialog: '¿Está seguro de eliminar <strong>{{amount}}</strong> registros?',
        confirm_dialog_title: 'Eliminar',
        form: {
          name: 'Nombre',
          last_name: 'Apellido',
          subject: 'Materia',
          email: 'Correo electrónico',
          number_parallel: 'Ciclo',
          parallel: 'Paralelo',
          buttons: {
            cancel: 'Cancelar',
            edit: 'Editar',
            create: "Crear"
          },
          errors: {
            min_name: 'El nombre del {{entity}} debe tener al menos 3 caracteres',
            required_name: 'El nombre del {{entity}} es requerido.',
            min_lastname: 'El apellido del {{entity}} debe tener al menos 3 caracteres',
            required_lastname: 'El apellido del {{entity}} es requerido.',
            invalid_email: 'Asegúrese que sea un correo válido.',
            required_email: 'El email del {{entity}} es requerido.',
            max_number_parallel: 'El ciclo no puede tener más de dos caracteres',
            required_number_parallel: 'El ciclo del {{entity}} es requerido.',
            only_numbers: 'El ciclo debe tener solamente valores númericos',
            max_parallel: 'El paralelo no puede tener más de un carácter',
            required_parallel: 'El paralelo del {{entity}} es requerido.',
            min_subject: 'La materia debe tener al menos 3 caracteres',
            required_subject: 'La materia del {{entity}} es requerida'
          }
        },
        table: {
          tooltip: 'Eliminar',
          row: {
            tooltip: 'Editar {{email}}'
          },
          headers: {
            name: 'Nombre',
            lastname: 'Apellidos',
            email: 'Correo Electrónico',
            subject: 'Materia',
            grade: 'Ciclo',
            actions: 'Acciones'
          }
        }
      },
      general_information: {
        title: 'Información General',
        period_chip: 'Periodo',
        degree_chip: 'Carrera',
        manager_chip: 'Director de Carrera',
        next_step_button: 'Siguiente Paso',
        form: {
          period: {
            start_date: 'Inicio del Periodo',
            end_date: 'Fin del periodo'
          },
          degree: 'Nombre de la Carrera',
          manager: 'Seleccione el director de carrera'
        },
        errors: {  
          required_start_date: 'La fecha de inicio del periodo es requerida.',
          required_end_date: 'La fecha de fin del periodo es requerida',
          greater_end_date: 'La fecha de fin de periodo debe ser mayor a la fecha de inicio de periodo',
          required_manager: 'El director de carrera es requerido.',
          required_degree: 'La carrera es requerida.'
        }
      },
      students: {
        entity: 'Estudiante',
        header_title: 'Estudiantes',
        info: 'Por favor proporcione el archivo CSV de estudiantes',
        required_entity: 'Los estudiantes son requeridos para continuar con el proceso.',
        dialog_title_edit: 'Editar Estudiante',
        dialog_title_create: 'Crear Estudiante'
      },
      teachers: {
        entity: 'Docente',
        header_title: 'Docentes',
        info: 'Por favor proporcione el archivo CSV de docentes',
        required_entity: 'Los docentes son requeridos para continuar con el proceso.',
        dialog_title_edit: 'Editar Docente',
        dialog_title_create: 'Crear Docente'
      },
      review_information: {
        title: "Resumen",
        description:
          "A continuación se presenta un resumen de toda la información para el inicio del proceso, para verificar la información puede seleccionar cada uno de los apartados correspondientes.",
        period_budge: {
          title: "Periodo",
          start: "Inicio",
          end: "Fin"
        },
        manager: 'Director de Carrera',
        degree: 'Carrera',
        students: 'Estudiantes',
        teachers: 'Docentes',
        next_step_button: 'Iniciar Proceso',
        back_step_button: 'Paso Anterior',
        alert_message: 'Por favor, solucione los errores para continuar con el proceso.'
      }
    },
  },
  lesson_plan_list_page: {
    helmet: 'Plan de Clases | Lista',
    heading: 'Listado de Plan de Clases',
    dashboard: 'Dashboard',
    lesson_plan: 'Plan de Clases',
    list: 'Listado',
    table: {
      created_date: 'Fecha de Creación',
      grade: 'Curso',
      teacher: 'Docente',
      subject: 'Materia',
      actions: 'Acciones',
    },
  },
  degree_create_page: {
    helmet: 'Carrera: Crear una nueva carrera',
    heading: 'Crear una nueva carrera',
    link_degree: 'Carrera',
    link_create_degree: 'Nueva Carrera',
  },
  role_create_page: {
    helmet: 'Rol: Crear una nuevo rol',
    heading: 'Crear un nuevo rol',
    link_degree: 'Rol',
    link_create_degree: 'Nuevo rol',
  },
  student_create_page: {
    helmet: 'Estudiante: Crear un nuevo estudiante',
    heading: 'Crear un nuevo estudiante',
    link_student: 'Estudiante',
    link_create_student: 'Nuevo estudiante',
  },
  teacher_create_page: {
    helmet: 'Docente: Crear nuevo docente',
    heading: 'Crear un nuevo docente',
    link_teacher: 'Docente',
    link_create_teacher: 'Docente nuevo',
  },
  components: {
    table_pagination_custom: {
      form_control: {
        label: 'Densidad',
      },
    },
    table: {
      selected_action: '{{number}} seleccionados'
    }
  },
  sections: {
    toolbar_custom: {
      search: 'Buscar...',
      all_option: 'Todos',
    },
    role_toolbar: {
      type: 'Tipo',
    },
    lesson_plan_toolbar: {
      grade: 'Curso',
    },
    teacher_toolbar: {
      period: 'Periodo',
    },
    student_toolbar: {
      grade: 'Curso',
    },
    grade_toolbar: {
      degree: 'Carrera',
    },
    students: {
      schema: {
        name: 'El nombre es requerido',
      },
    },
  },
  about: 'información',
  start_process: 'iniciar proceso',
  all_plans: 'planes de clase',
  processes_list: 'procesos',
  teacher_plans: 'planes de clase por docentes',
  create: 'crear',
  list: 'listar',
  pending: 'pendientes',
  roles_list_page: {
    helmet: 'Roles | Lista',
    heading: 'Listado de Roles',
    dashboard: 'Dashboard',
    roles: 'Roles',
    list: 'Listado',
    new: 'Nuevo Rol',
    table: {
      id: 'ID',
      type: 'Tipo',
      actions: 'Acciones',
    },
  },
  students_list_page: {
    helmet: 'Estudiantes | Lista',
    heading: 'Listado de Estudiantes',
    dashboard: 'Dashboard',
    roles: 'Estudiantes',
    list: 'Listado',
    table: {
      name: 'Nombre',
      last: 'Apellido',
      email: 'Correo Electrónico',
      actions: 'Acciones',
      grade: 'Curso',
    },
  },
  teachers_list_page: {
    helmet: 'Docentes | Lista',
    heading: 'Lista de Docentes',
    dashboard: 'Dashboard',
    roles: 'Docentes',
    list: 'Lista',
    table: {
      name: 'Nombre',
      last: 'Apellido',
      email: 'Correo Electrónico',
      actions: 'Acciones',
    },
  },
  grades_list_page: {
    helmet: 'Cursos | Lista',
    heading: 'Lista de Cursos',
    dashboard: 'Dashboard',
    grades: 'Cursos',
    list: 'Lista',
    table: {
      grade: 'Curso',
      parallel: 'Paralelo',
      degree: 'Carrera',
      actions: 'Acciones',
    },
  },
  degrees_list_page: {
    helmet: 'Carreras | Lista',
    heading: 'Lista de Carreras',
    dashboard: 'Dashboard',
    degrees: 'Carreras',
    list: 'Lista',
    table: {
      period: 'Periodo',
      name: 'Nombre',
      actions: 'Acciones',
    },
  },
  period_list_page: {
    helmet: 'Periodos | Lista',
    heading: 'Lista de Periodos',
    dashboard: 'Dashboard',
    start_label: 'Fecha de Inicio',
    end_label: 'Fecha de Finalización',
    manager_label: 'Director',
    degree_label: 'Carrera',
    status_label: 'Estado'
  },
  users_list_page: {
    helmet: 'Usuarios | Lista',
    heading: 'Lista de Usuarios',
    dashboard: 'Dashboard',
    roles: 'Usuarios',
    list: 'Lista',
    table: {
      name: 'Nombre',
      last: 'Apellido',
      email: 'Correo Electrónico',
      actions: 'Acciones',
      roles: 'Roles'
    }
  },
  subjects_list_page: {
    helmet: 'Materias | Lista',
    heading: 'Lista de Materias',
    dashboard: 'Dashboard',
    subjects: 'Materias',
    list: 'Lista',
    table: {
      name: 'Nombre',
      grades: 'Grados',
      actions: 'Acciones'
    }
  },
  degree_create_form: {
    button_create: 'Crear Carrera',
    input_name: 'Nombre de la carrera',
    name_schema: 'El nombre es requerido',
  },
  role_create_form: {
    button_create: 'Crear rol',
    input_name: 'Tipo de rol',
    role_schema: 'El rol es requerido',
  },
  student_create_form: {
    button_create: 'Crear estudiante',
    name_schema: 'El nombre es requerido',
    last_name_schema: 'El apellido es requerido',
    email_schema: 'El correo es requerido',
    grade_schema: 'El curso es requerido',
    input_name: 'Nombre',
    last_name_input: 'Apellido',
    email_input: 'Correo',
    grade_input: 'Curso',
  },
  teacher_create_form: {
    button_create: 'Crear docente',
    name_schema: 'El nombre es requerido',
    last_name_schema: 'El apellido es requerido',
    email_schema: 'El correo es requerido',
    input_name: 'Nombre',
    last_name_input: 'Apellido',
    email_input: 'Correo',
    button_update: 'Guardar cambios'
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
