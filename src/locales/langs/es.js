const en = {
  Reports: "Reportes",
  Schedule: "Calendario",
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
    },
    initial_process: {
      startProcess: {
        successful: 'Se ha iniciado el proceso con éxito'
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
        students_number_chip: "Número de estudiantes",
        next_step_button: 'Siguiente Paso',
        form: {
          period: {
            start_date: 'Inicio del Periodo',
            end_date: 'Fin del periodo'
          },
          degree: 'Nombre de la Carrera',
          manager: 'Seleccione el director de carrera',
          students_number: "Número mínimo de estudiantes que validarán el plan de clases"
        },
        errors: {  
          required_start_date: 'La fecha de inicio del periodo es requerida.',
          required_end_date: 'La fecha de fin del periodo es requerida',
          greater_end_date: 'La fecha de fin de periodo debe ser mayor a la fecha de inicio de periodo',
          required_manager: 'El director de carrera es requerido.',
          required_degree: 'La carrera es requerida.',
          required_students_number: "El número de estudiantes ha calificar es requerido."
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
  user_edit_page: {
    title: "Usuario - Editar Usuario",
    heading: "Editar Usuario",
    update_name: "Editar",
    users_name: "Usuarios",
  },
  user_edit_form: {
    name_required: "El nombre es requerido",
    email_required: "El correo es requerido",
    role_required: "El usuario debe tener por lo menos un rol",
    full_name: "Nombre",
    email: "Correo",
    phone_number: "Número celular",
    city: "Ciudad",
    identification: "Cédula",
    save_button: "Guardar",
    banner: "Cambiar estado",
    apply_disable: "Aplicar desactivar cuenta"
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
  lesson_plan_create_page: {
    title: "Plan de Clase: Nuevo Plan de Clases",
    heading: "Crear plan de clase",
    links: {
      dashboard: "Dashboard",
      plans: "Lista de plan de clases",
      create: "Crear"
    }
  },
  lesson_plan_update_page: {
    title: "Plan de clase | Actualizar",
    heading: "Actualizar plan de clase",
    links: {
      dashboard: "Dashboard",
      plans: "Lista de plan de clases",
      update: "Actualizar"
    }
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
      teacher: 'Periodo',
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
  process_list: 'procesos',
  teacher_plans: 'planes de clases',
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
    list: 'Estudiantes',
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
    list: 'Docentes',
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
    list: 'Grados',
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
    helmet: 'Procesos | Lista',
    heading: 'Lista de Procesos',
    dashboard: 'Dashboard',
    start_label: 'Fecha de Inicio',
    end_label: 'Fecha de Finalización',
    manager_label: 'Director',
    degree_label: 'Carrera',
    status_label: 'Estado',
    list: 'Procesos',
    list_name: 'Lista',
    active: 'activos',
    finished: 'finalizados',
    manager: "Director",
    search: "Buscar....",
    actions: "Acciones",
    delete: "Eliminar",
    view_students: "Ver estudiantes",
    view_teachers: "Ver docentes",
    view_grades: "Ver cursos",
    view_subjects: "Ver materias",
    content_delete: "¿Estás seguro de eliminar?",
    delete_button: "Eliminar",
    delete_title: "Eliminar"
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
      roles: 'Roles',
      status: 'Estado',
    }
  },
  teachers_lesson_plans: {
    helmet: "Planes de Clases | Lista",
    heading: "Lista de Plan de Clases",
    dashboard: "Dashboard",
    about: "Información",
    list: "Lista",
    date: "Fecha",
    table: {
      period: "Periodo",
      grade: "Grado",
      subject: "Materia",
      status: "Estado",
      actions: "Actiones"
    },
    toolbar: {
      period: "Periodo",
      search: "Buscar..."
    },
    validated: "validados",
    not_validated: "no validados",
    delete: "Eliminar",
    edit: "Editar",
    view: "Ver",
    delete_button: "Eliminar",
    delete_title: "Eliminar",
    content_delete: "¿Estás seguro de eliminar?"
  },
  subjects_list_page: {
    helmet: 'Materias | Lista',
    heading: 'Lista de Materias',
    dashboard: 'Dashboard',
    subjects: 'Materias',
    list: 'Materias',
    table: {
      name: 'Nombre',
      grades: 'Grados',
      actions: 'Acciones'
    }
  },
  validate_lesson_plan_page: {
    subject_title: "Materia",
    grade_title: "Curso"
  },
  degree_create_form: {
    button_create: 'Crear Carrera',
    input_name: 'Nombre de la carrera',
    name_schema: 'El nombre es requerido',
    button_update: 'Guardar cambios'
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
  },
  lesson_plans_create_form: {
    period: "Periodo",
    subject: "Materia",
    grade: "Grado",
    date: "Fecha",
    topic: "Tema",
    description: "Descripción",
    content: "Actividades",
    resources: "Recursos",
    students: "Estudiantes",
    purpose: "Propósito de la clase",
    biblio: "Bibliografía",
    materials: "Materiales",
    comments: "Observaciones",
    evaluation: "Evaluación de las actividades",
    notify_students: "Notificar a los estudiantes",
    notify_date: "Fecha de notificación",
    deadline: "Fecha límite de calificación",
    notify_now: "Notificar ahora",
    notify_after: "Notificar luego",
    save: "Guardar",
    period_required: 'El periodo es requerido',
    subject_required: 'La materia es requerida',
    grade_required: 'El grado es requerido',
    date_required: 'La fecha es requerida',
    topic_required: 'El tema es requerido',
    desc_required: 'La descripción es requerida',
    content_required: 'El contenido es requerido',
    students_required: "Al menos {{number}} estudiantes deben ser elegidos",
    purpose_required: 'El propósito de la clase es requerido',
    biblio_required: 'La bibliografía es requerida',
    materials_required: "Los materiales son requeridos",
    evaluation_required: "La evaluación de las actividades es requerida",
    comments_required: "Las observaciones son requeridas",
    notification_required: "La notificación es requerida",
    end_after_start: "La fecha de notificación debe ser posterior a la fecha de inicio",
    end_date_required: "La notificación es requerida"
  },
  lesson_plans_update_form: {
    period: "Periodo",
    subject: "Materia",
    grade: "Grado",
    date: "Fecha",
    topic: "Tema",
    description: "Descripción",
    content: "Contenido",
    resources: "Recursos compartidos",
    new_resources: "Recursos",
    students: "Estudiantes",
    change_deadline: "Extender la fecha de validación",
    purpose: "Propósito de la clase",
    biblio: "Bibliografía",
    deadline: "Fecha límite",
    change_no: "No",
    change_yes: "Si",
    save: "actualizar",
    period_required: 'El periodo es requerido',
    subject_required: 'La materia es requerida',
    grade_required: 'El grado es requerido',
    date_required: 'La fecha es requerida',
    topic_required: 'El tema es requerido',
    desc_required: 'La descripción es requerida',
    content_required: 'El contenido es requerido',
    students_required: 'Los estudiantes son requeridos',
    purpose_required: 'El propósito de la clase es requerido',
    biblio_required: 'La bibliografía es requerida'
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
  schedule: {
    helmet: {
      title: 'Carga académica - Plan de Clases'
    },
    handleSave: {
      success: 'Horario correctamente actualizado.',
      error: 'Hubo un error al actulizar el horario.'
    },
    breacrumb: {
      heading: 'Horario de Clases.',
      schedule_link: 'Horario de Clases',
      action_button: 'Actualizar horario'
    },
    select: {
      label: 'Periodo'
    },
    alert: {
      text: 'Estimado docente, usted no ha sido asignado a ninguna materia en los periodos activos.'
    },
    dialog: {
      title: 'Eliminar Evento'
    }
  },
  calendarForm: {
    event_schema: {
      required_title: 'El título es requerido.',
      required_day: 'El día es requerido.'
    },
    form: {
      title: {
        label: 'Titulo'
      },
      day: {
        label: 'Día'
      },
      start_date: {
        label: 'Hora de inicio'
      },
      end_date: {
        label: 'Hora de fin'
      }
    },
    dialog: {
      cancel_button: 'Cancelar',
      delete_button: 'Eliminar'
    }
  }
};

export default en;
