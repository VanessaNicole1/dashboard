import axios from "../utils/axios";

export const startProcess = async(startProcessInformation) => {
  try {
    const startProcessResponse = await axios.post('/initial-process', startProcessInformation);
    console.log(startProcessResponse);
  } catch (error) {
    console.log(error);
  }
};