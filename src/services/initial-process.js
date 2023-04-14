import i18n from "../locales/i18n";
import axios from "../utils/axios";

const i18nInitialProcessServiceKey = 'services.initial_process';

export const startProcess = async(startProcessInformation) => {
  try {
    await axios.post('/initial-process', startProcessInformation);
    return {
      message: i18n.t(`${i18nInitialProcessServiceKey}.startProcess.successful`)
    };
  } catch (error) {
    return { errorMessage: error.message }
  }
};
