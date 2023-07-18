import axios from "../utils/axios";

// TODO: Add i18n or handle correctly the message from the backend.
export const updateLessonPlanTracking = async (id, updatedData) => {
  try {
    const { data } = await axios.patch(`/lesson-plans-tracking/${id}`, updatedData);
    return data;
  } catch (error) {
    return {
      message: 'Something was wrong trying to update the Teacher Configuration event.'
    };
  }
};
