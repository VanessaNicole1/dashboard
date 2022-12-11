import axios from "../utils/axios";

export const getGrades = async () => {
  try  {
    const { data: grades } = await axios.get('/grades');
    return grades;
  } catch (error) {
    return {
      message: "Couldn't retrieve grades"
    }
  }
};