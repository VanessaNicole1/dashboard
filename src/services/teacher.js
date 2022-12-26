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