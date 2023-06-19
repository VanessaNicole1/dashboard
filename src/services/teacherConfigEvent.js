import axios from "../utils/axios";

export const updateTeacherConfigEvent = async (teacherEventConfigId, metadata) => {
  try {
    const { data } = await axios.put(`/teachers/event-config/${teacherEventConfigId}`, { metadata });
    return data;
  } catch (error) {
    return {
      message: 'Something was wrong trying to update the Teacher Configuration event.'
    };
  }
}
