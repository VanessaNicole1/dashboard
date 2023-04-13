import axios from "../utils/axios";

export const getGrades = async (filterGrades) => {
  try  {
    if (!filterGrades) {
      const { data: grades } = await axios.post('/grades');
      return grades;
    }
    const { data: grades } = await axios.post('/grades', filterGrades);
    return grades;
  } catch (error) {
    return {
      message: "Couldn't retrieve grades"
    }
  }
};

export const validateGradesMatch = async (students, teachers) => {
  try {
    await axios.post('/grades/validate', { students, teachers });
  } catch (error) {
    return {
      errorMessage: error.message
    }
  }
};