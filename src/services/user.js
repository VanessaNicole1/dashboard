import axios from '../utils/axios';

export const getUsersWithManagerRole = async () => {
  try {
    const { data } = await axios.get('/users/managers');
    return data;
  } catch (error) {
    return {
      message: "Couldn't retrieve managers",
    };
  }
};
