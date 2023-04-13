import axios from "../utils/axios";

export const getRoles = async () => {
  try  {
    const { data: roles } = await axios.get('/roles');
    return roles;
  } catch (error) {
    return {
      message: "Couldn't retrieve roles"
    }
  }
};

export const createRole = async (role) => {
  try {
      const post = { name: role.name };
      const res = await axios.post('/roles', post);
      return res;
  } catch (error) {
    return error;
  }
};