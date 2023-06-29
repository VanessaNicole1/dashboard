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

export const createLessonPlan = async (data, resources) => {
  try {
    const formData = new FormData();
    resources.forEach(element => {
      formData.append('files', element);
    });
    delete data.resources;

    for (const key in data) {
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }
    await axios.post('/lesson-plans', formData);
    return {
      message: 'Lesson Plan created nice'
    };
  } catch (error) {
    return { errorMessage: error.message }
  }
}