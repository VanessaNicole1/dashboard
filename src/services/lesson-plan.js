import axios from "../utils/axios";

export const getLessonPlans = async () => {
  try  {
    const { data: lessonPlans } = await axios.get('/lessonplan');
    // TODO: This should not be done, just a PATCH because the backend is not ready.
    const finalLessonPlans = lessonPlans;
    return finalLessonPlans;
  } catch (error) {
    return {
      message: "Couldn't retrieve lesson plans"
    }
  }
};