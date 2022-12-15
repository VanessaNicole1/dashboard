import axios from "../utils/axios";

export const getRoles = async () => {
  try  {
    const { data: roles } = await axios.get('/role');
    return roles;
  } catch (error) {
    return {
      message: "Couldn't retrieve roles"
    }
  }
};