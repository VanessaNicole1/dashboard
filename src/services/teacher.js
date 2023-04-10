import i18n from "../locales/i18n";
import axios from "../utils/axios";

const i18nTeacherServiceKey = 'services.teachers';

export const getTeachers = async () => {
  try  {
    const { data: teachers } = await axios.get('/teacher');
    return teachers;
  } catch (error) {
    return {
      message: "Couldn't retrieve teachers"
    }
  }
};

export const createTeacher = async (data) => {
  try {
    const {name, lastName, email} = data;
    const post = { name, lastName, email }
    const res = await axios.post('/teacher', post);
    return res.data;
  } catch (error) {
    return {
      message: "Couldn't create a new teacher"
    }
  }
}

export const validateTeachers = async (data) => {
  try {
    await axios.post('/teachers/validate', { teachers: data })
    const message = i18n.t(`${i18nTeacherServiceKey}.validateTeachers.successful`);
    return {
      message
    };
  } catch (error) {
    const { errorMessage } = error;
    return { errorMessage }
  }
};
