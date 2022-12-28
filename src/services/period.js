import axios from "../utils/axios";

export const createPeriod = async (period) => {
    try {
        const post = period;
        const res = await axios.post('/period', post);
        return res.data;
    } catch (error) {
      return {
        message: "Couldn't create a new period"
      }
    }
  }