import axios from "../utils/axios";

const baseUserUrl = "/users";

export const getUsersWithManagerRole = async () => {
  try {
    const { data } = await axios.get("/users/managers");
    return data;
  } catch (error) {
    return {
      message: "Couldn't retrieve managers",
    };
  }
};

export const getUsers = async (filterUser = {}) => {
  try {
    const { data: users } = await axios.get("/users/managers", filterUser);
    return users;
  } catch (error) {
    return {
      message: "Couldn't retrieve users",
    };
  }
};

export const getUser = async (id) => {
  try {
    const { data: user } = await axios.get(`/users/${id}`);
    return user;
  } catch (error) {
    return {
      message: "Couldn't retrieve user",
    };
  }
};

export const updateUser = async (id, updateUserData) => {
  try {
    const { data: user } = await axios.patch(`/users/${id}`, updateUserData);
    return user;
  } catch (error) {
    return {
      message: "Couldn't update user",
    };
  }
};

export const getRegistedUser = async (registeredToken) => {
  try {
    const { data: user } = await axios.get(`${baseUserUrl}/registered/${registeredToken}`);
    return user;
  } catch (error) {
    return { errorMessage: error.message };
  }
};

export const updateUserPasswordByRegisteredToken = async (id, updatedPassword) => {
  try {
    const { data: user } = await axios.patch(`${baseUserUrl}/reset-password-by-registered-token/${id}`, { updatedPassword });
    return user;
  } catch (error) {
    return { errorMessage: error.message };
  } 
};
