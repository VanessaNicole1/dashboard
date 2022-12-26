import axios from "../utils/axios";

export const getSchedule = async (id) => {
  try  {
    const { data: schedule } = await axios.get( `/schedule/${id}`);
    return schedule;
  } catch (error) {
    return {
      message: "Couldn't retrieve schedule"
    }
  }
};