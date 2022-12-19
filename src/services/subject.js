import axios from "../utils/axios";

export const getSubjects = async () => {
  try  {
    const { data: subjects } = await axios.get('/subject');
    return subjects;
  } catch (error) {
    return {
      message: "Couldn't retrieve subjects"
    }
  }
};