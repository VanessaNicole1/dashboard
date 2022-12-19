import axios from "../utils/axios";

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