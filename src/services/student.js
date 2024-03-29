import i18n from "../locales/i18n";
import axios from "../utils/axios";

const i18nStudentsServiceKey = 'services.students';

export const getStudents = async (filterStudents) => {
  try  {
    if (!filterStudents) {
      const { data: students } = await axios.post('/students');
      return students;
    }
    const { data: students } = await axios.post('/students', filterStudents);
    return students;
  } catch (error) {
    return {
      message: "Couldn't retrieve students"
    }
  }
};

export const createStudent = async (data) => {
  try {
    const {name, lastName, email, grade} = data;
    const post = { name, lastName, email, gradeId: grade }
    const res = await axios.post('/students', post);
    return res.data;
  } catch (error) {
    return {
      message: "Couldn't create a new student"
    }
  }
}

export const findStudentActivePeriods = async (userId) => {
  try  {
    const { data } = await axios.get(`/students/${userId}/active-periods`);
    return data;
  } catch (error) {
    return {
      message: "Couldn't retrieve student active periods"
    }
  }
}

export const findStudentLessonPlans = async (isValidated, userId, periodId ) => {
  try  {
    const { data } = await axios.get(`/students/lesson-plans`, { params: { isValidated, userId, periodId } });
    return data;
  } catch (error) {
    return {
      message: "Couldn't retrieve student active periods"
    }
  }
}

export const getStudentLessonPlanToValidate = async (userId, lessonPlanId) => {
  try  {
    const { data } = await axios.get(`/students/${userId}/lesson-plan-to-validate`, { params: { lessonPlanId } });
    return data;
  } catch (error) {
    return {
      errorMessage: error.message
    }
  }
};

export const validateStudents = async (data) => {
  try {
    await axios.post('/students/validate', { students: data })
    return {
      message: i18n.t(`${i18nStudentsServiceKey}.validateStudents.successful`)
    };
  } catch (error) {
    return { errorMessage: error.message }
  }
};
