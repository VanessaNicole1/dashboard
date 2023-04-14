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

export const getUsers = async (filterUser = {}) => {
  try  {
    const { data: users } = await axios.get('/users/managers', filterUser);
    return users;
  } catch (error) {
    return {
      message: "Couldn't retrieve users"
    }
  }
};

export const getUser = async (id) => {
  try {
    const { data: user } = await axios.get( `/users/${id}`);
    return user;
  } catch (error) {
    return {
      message: "Couldn't retrieve user"
    }
  }
};

export const updateUser = async (id, updateUserData) => {
  try {
    const { data: user } = await axios.patch( `/users/${id}`, updateUserData);
    return user;
  } catch (error) {
    return {
      message: "Couldn't update user"
    }
  }
};