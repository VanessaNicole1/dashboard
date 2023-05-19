import axios from "../utils/axios";

const baseUserUrl = "/register-config";

export const updateRegisterToken = async (registeredToken) => {
  try {
    // TODO: Check if we can manage this information directly on the backend for security reasons.
    const body = {
      registerToken: null,
      isRegistered: true
    }
    const { data } = await axios.patch(`${baseUserUrl}/update-registered-token/${registeredToken}`, body);
    return data;
  } catch (error) {
    return { errorMessage: error.message };
  }
};
