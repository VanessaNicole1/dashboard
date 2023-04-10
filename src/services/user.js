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

export const getUser = async (id) => {
  try {
    const { data } = await axios.get(`users/${id}`);
    return data;
  } catch (error) {
    return {
      message: 'Something was wrong',
    };
  }
};
