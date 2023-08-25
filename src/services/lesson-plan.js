import axios from "../utils/axios";
import { LessonPlanType } from "../common/constants/lessonPlanType";


export const getLessonPlans = async ({
  period,
  type = LessonPlanType.NORMAL,
  isValidatedByManager = undefined,
  userId = undefined
}) => {

  const additionalParams = {}

  if (isValidatedByManager !== undefined) {
    additionalParams.isValidatedByManager = isValidatedByManager;
  }

  if (userId) {
    additionalParams.userId = userId;
  }

  try  {
    const { data: lessonPlans } = await axios.get('/lesson-plans', {
      params: { period, type, ...additionalParams }
    });
    return lessonPlans;
  } catch (error) {
    return {
      message: "Couldn't retrieve lesson plans"
    }
  }
};

export const createLessonPlan = async (data, resources) => {
  try {
    const studentIds = data.students.map((student) => student.id);
    data = {
      ...data,
      students: studentIds
    }
    const formData = new FormData();
    resources.forEach(element => {
      formData.append('files', element);
    });
    delete data.resources;

    for (const key in data) {
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }
    await axios.post('/lesson-plans', formData);
    return {
      message: 'Lesson Plan created successfully'
    };
  } catch (error) {
    return { errorMessage: error.message }
  }
}

export const updateLessonPlan = async (lessonPlanId, data, resources) => {
  try {
    const studentsIds = data.students.map((student) => student.id);
    data = {
      ...data,
      students: studentsIds,
    }
    const formData = new FormData();
    resources.forEach(resource => {
      formData.append('files', resource);
    });
    delete data.resources;

    for (const key in data) {
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }
    await axios.patch(`/lesson-plans/${lessonPlanId}`, formData);
    return {
      message: 'Lesson Plan updated successfully'
    }
  } catch (error) {
    return { errorMessage: error.message }
  }
}

export const deleteLessonPlan = async (id) => {
  try {
    const data = await axios.delete(`/lesson-plans/${id}`)
    return data;
  } catch (error) {
    return { errorMessage: error.message }
  }
}

export const getLessonPlan = async (id) => {
  try {
    const {data: lessonPlan} = await axios.get(`/lesson-plans/${id}`);
    return lessonPlan;
  } catch (error) {
    return { errorMessage: error.message }
  }
}

export const removeResource = async (id, name) => {
  try {
    const data = await axios.post(`lesson-plans/resource/${id}`, {name});
    return data;
  } catch (error) {
    return { errorMessage: error.message }
  }
}


export const generateTeacherLessonPlanReport = async (userId, data) => {
  const { fromDate, toDate, period, subject, grade } = data;

  const baseReportParams = {
    from: fromDate.toISOString(),
    to: toDate.toISOString(),
    periodId: period,
  };

  if (subject) {
    baseReportParams.subjectId = subject
  }

  if (grade) {
    baseReportParams.gradeId = grade
  }

  try {
    const response = await axios.get(`/lesson-plans/report/${userId}`, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/pdf',
      },
      params: baseReportParams 
    });
    const pdfUrl = URL.createObjectURL(response.data);
    return pdfUrl;
  } catch (error) {
    return { errorMessage: 'No existen planes de clases con los parámetros especificados' }
  }
};

export const getLessonPlanById = async (id) => {
  try {
    const {data: lessonPlan} = await axios.get(`lesson-plans/${id}`);
    return lessonPlan;
  } catch (error) {
    return { errorMessage: error.message }
  }
}

export const getLessonPlanWithPeriod = async (id) => {
  try {
    const {data: lessonPlan} = await axios.get(`lesson-plans/period/${id}`);
    return lessonPlan;
  } catch (error) {
    return { errorMessage: error.message }
  }
}

export const generateLessonPlanReport = async (lessonPlanId) => {
  try {
    const response = await axios.get(`/lesson-plans/unique-report/${lessonPlanId}`, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/pdf',
      },
    });
    const pdfUrl = URL.createObjectURL(response.data);
    return pdfUrl;
  } catch (error) {
    return { errorMessage: 'No existen planes de clases con los parámetros especificados' }
  }
}

export const createRemedialPlan = async (data, resources) => {
  try {
    const studentIds = data.students.map((student) => student.id);
    data = {
      ...data,
      students: studentIds
    }
    const formData = new FormData();
    resources.forEach(element => {
      formData.append('files', element);
    });
    delete data.resources;

    for (const key in data) {
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }
    await axios.post('/lesson-plans/remedial-plan', formData);
    return {
      message: 'Plan de Clase Remedial creado con éxito',
    };
  } catch (error) {
    return { errorMessage: error.message }
  }
}

export const uploadSignedReportByTeacher = async (remedialPlanId, signedReport) => {
  try {
    const formData = new FormData();
    signedReport.forEach(element => {
      formData.append('file', element);
    });
    await axios.post(`/lesson-plans/signed-report-by-teacher/${remedialPlanId}`, formData);
    return {
      message: 'El reporte del Plan de Clase Remedial se ha subido con éxito',
    };
  } catch (error) {
    return { errorMessage: error.message }
  }

}
