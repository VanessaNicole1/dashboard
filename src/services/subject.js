import axios from "../utils/axios";

export const getSubjects = async (filterSubjects) => {
  try  {
    if (!filterSubjects) {
      const { data: subjects } = await axios.get('/subjects');
      return subjects;
    }
    const { data: subjects } = await axios.get('/subjects', { params: filterSubjects });
    return subjects;
  } catch (error) {
    return {
      message: "Couldn't retrieve subjects"
    }
  }
};

export const getSubject = async (id) => {
  try {
    const { data: subject } = await axios.get( `/subjects/${id}`);
    return subject;
  } catch (error) {
    return {
      message: "Couldn't retrieve subject",
    }
  }
};

export const updateSubject = async (id, updateSubjectData) => {
  try {
    const { data: subject } = await axios.patch(`/subjects/${id}`, updateSubjectData);
    return subject;
  } catch (error) {
    return error;
  }
};