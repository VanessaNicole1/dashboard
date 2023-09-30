import axios from "../utils/axios";

export const updateEmailSettings = async (id, data) => {
  try {
    await axios.patch(`/email/${id}`, data);
    return {
      message: "Configuración actualizada con éxito",
    };
  } catch (error) {
    return { errorMessage: error.message };
  }
};

export const getEmailSettings = async () => {
  try {
    const { data } = await axios.get("/email");
    return data;
  } catch (error) {
    return { errorMessage: error.message };
  }
};
