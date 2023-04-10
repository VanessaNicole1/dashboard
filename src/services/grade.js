import axios from "../utils/axios";

export const getGrades = async () => {
  try  {
    const { data: grades } = await axios.get('/grade');
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
}
