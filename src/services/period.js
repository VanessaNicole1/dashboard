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
};

export const getPeriods = async (filterPeriod) => {
  try  {
    const { data: periods } = await axios.get('/periods', filterPeriod);
    return periods;
  } catch (error) {
    return {
      message: "Couldn't retrieve periods"
    }
  }
};

export const getActivePeriods = async () => {
  try  {
    const { data: periods } = await axios.post('/periods',   {isActive: true});
    return periods;
  } catch (error) {
    return {
      message: "Couldn't retrieve periods"
    }
  }
};