import axios from "../utils/axios";


export const createDegree = async (data) => {
    try {
      const { name } = data;
      const post = { name };
      const res = await axios.post('/degree', post);
      return res.data;
    } catch (error) {
      return {
        message: "Couldn't create a new student"
      }
    }
  }