import i18n from "../locales/i18n";
import axios from "../utils/axios";

const i18nStudentsServiceKey = 'services.students';

export const getStudents = async () => {
  try  {
    const { data: students } = await axios.get('/student');
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
    const res = await axios.post('/student', post);
    return res.data;
  } catch (error) {
    return {
      message: "Couldn't create a new student"
    }
  }
}

export const validateStudents = async (data) => {
  try {
    await axios.post('/students/validate', { students: data })
    return {
      message: i18n.t(`${i18nStudentsServiceKey}.validateStudents.successful`)
    };
  } catch (error) {
    const { errorMessage } = error;
    return { errorMessage }
  }
};
