import i18n from "../locales/i18n";
import axios from "../utils/axios";

const i18nTeacherServiceKey = 'services.teachers';

export const getTeachers = async (filterTeachers) => {
  try  {
    if (!filterTeachers) {
      const { data: teachers } = await axios.post('/teachers');
      return teachers;
    }
    const { data: teachers } = await axios.post('/teachers', filterTeachers);
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
    const res = await axios.post('/teachers', post);
    return res.data;
  } catch (error) {
    return {
      message: "Couldn't create a new teacher"
    }
  }
};

export const validateTeachers = async (data) => {
  try {
    await axios.post('/teachers/validate', { teachers: data })
    const message = i18n.t(`${i18nTeacherServiceKey}.validateTeachers.successful`);
    return {
      message
    };
  } catch (error) {
    return { errorMessage: error.message }
  }
};

export const getTeacherEvents = async (periodId, userId) => {
  try  {
    const { data } = await axios.get( `/teachers/events/`, { params: { userId, periodId } });
    return data;
  } catch (error) {
    return {
      message: "Couldn't retrieve schedule"
    }
  }
};

export const findTeacherActivePeriods = async (userId) => {
  try  {
    const { data } = await axios.get(`/teachers/${userId}/active-periods`);
    return data;
  } catch (error) {
    return {
      message: "Couldn't retrieve teacher active periods"
    }
  }
}

export const findTeacherPeriods = async (userId) => {
  try  {
    const { data } = await axios.get(`/teachers/${userId}/periods`);
    return data;
  } catch (error) {
    return {
      message: "Couldn't retrieve teacher active periods"
    }
  }
}