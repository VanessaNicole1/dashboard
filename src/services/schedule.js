import axios from "../utils/axios";

export const getSchedule = async (id) => {
  try  {
    const { data: schedule } = await axios.get( `/schedules/${id}`);
    return schedule;
  } catch (error) {
    return {
      message: "Couldn't retrieve schedule"
    }
  }
};

export const getSchedules = async (periodId, userId) => {
  try  {
    const { data } = await axios.get( `/schedules/period/${periodId}`, { params: { userId } });
    return data;
  } catch (error) {
    return {
      message: "Couldn't retrieve schedule"
    }
  }
};

export const updateSchedule = async (scheduleId, metadata) => {
  try {
    const { data } = await axios.patch(`/schedules/${scheduleId}`, { metadata });
    return data;
  } catch (error) {
    return {
      message: 'Something was wrong trying to update the schedule'
    };
  }
}

export const getSchedulesByTeacher = async (id) => {
  try {
    const { data: schedules } = await axios.get(`/schedules/teacher/${id}`);
    return schedules;
  } catch (error) {
    return {
      message: "Couldn't retrieve schedule"
    }
  }
}