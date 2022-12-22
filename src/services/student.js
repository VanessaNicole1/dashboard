import axios from "../utils/axios";

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