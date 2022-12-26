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

export const createStudent = async (data) => {
  try {
    const {name, lastName, email, grade} = data;
    const post = { name, lastName, email, gradeId: grade }
    const res = await axios.post('/student', post);
    return res.data;
  } catch (error) {
    console.log('ERRORRRRR', error);
    return {
      message: "Couldn't create a new student"
    }
  }
}