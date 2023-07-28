import axios from "../utils/axios";

export const getLessonPlans = async () => {
  try  {
    const { data: lessonPlans } = await axios.get('/lessonplan');
    // TODO: This should not be done, just a PATCH because the backend is not ready.
    const finalLessonPlans = lessonPlans;
    return finalLessonPlans;
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
  const reportParams = { 
    from: fromDate.toISOString(),
    to: toDate.toISOString(),
    periodId: period,
    subjectId: subject,
    gradeId: grade
  }
  
  try {
    const response = await axios.get(`/lesson-plans/report/${userId}`, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/pdf',
      },
      params: reportParams 
    });
    const pdfUrl = URL.createObjectURL(response.data);
    return pdfUrl;
  } catch (error) {
    return { errorMessage: 'No existen planes de clases con los parámetros especificados' }
  }
};

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
