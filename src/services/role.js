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
      const post = { type: role.role }
      const res = await axios.post('/roles', post);
      return res.data;
  } catch (error) {
    return {
      message: "Couldn't create a new role"
    }
  }
}