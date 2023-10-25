import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Grid, Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useDispatch, useSelector } from '../../../redux/store';
import { useSettingsContext } from '../../../components/settings';
import {
  backStep,
  createStudents,
  createTeachers,
  fillGeneralInformation,
  nextStep,
  gotoStep,
  resetState
} from '../../../redux/slices/initialProcess';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import CreateStudents from '../../../sections/dashboard/lesson-plan/start-process/students/CreateStudents';
import FillGeneralInformation from '../../../sections/dashboard/lesson-plan/start-process/general-information/FillGeneralInformation';
import InitialProcessSteps from '../../../sections/dashboard/lesson-plan/start-process/InitialProcessSteps';
import CreateTeachers from '../../../sections/dashboard/lesson-plan/start-process/teachers/CreateTeachers';
import ReviewInformation from '../../../sections/dashboard/lesson-plan/start-process/review-information/ReviewInformation';
import { useLocales } from '../../../locales';
import { startProcess } from '../../../services/initial-process';
import { manualHideErrorSnackbarOptions } from '../../../utils/snackBar';
import { useSnackbar } from '../../../components/snackbar';

export default function CreateLessonPlanProcessPage() {
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const i18nStartProcess = 'lesson_plan.start_process';
  const STEPS = [
    translate(`${i18nStartProcess}.steps.general_information`),
    translate(`${i18nStartProcess}.steps.students`),
    translate(`${i18nStartProcess}.steps.teachers`),
    translate(`${i18nStartProcess}.steps.review_information`)
  ];
  const dispatch = useDispatch();
  const { themeStretch } = useSettingsContext();
  const { initialProcess } = useSelector((state) => state.initial);
  const { 
    activeStep,
    generalInformation,
    csvStudents,
    students,
    csvTeachers,
    teachers
  } = initialProcess;

  const handleStartProcess = async() => {
    const { startDate, endDate, manager, degree, studentsNumber } = generalInformation;
    const startProcessInformation = {
      period: {
        startDate,
        endDate
      },
      manager: {
        userId: manager
      },
      degree: {
        name: degree
      },
      minimumStudents: {
        minimumStudentsToEvaluate: studentsNumber
      },
      students,
      teachers
    };

    const startProcessResponse = await startProcess(startProcessInformation);

    if (startProcessResponse.errorMessage) {
      enqueueSnackbar(startProcess.errorMessage, manualHideErrorSnackbarOptions);
      dispatch(resetState());
    }

    navigate(PATH_DASHBOARD.lessonPlan.listProcesses);
    enqueueSnackbar(startProcessResponse.message, { variant: 'success', autoHideDuration: 5000 });
    dispatch(resetState());
  };

  const handleBackStep = () => {
    dispatch(backStep());
  };

  const handleFillGeneralInformation = (data) => {
    dispatch(fillGeneralInformation(data));
    dispatch(nextStep());
  };

  const handleCreateStudents = (data) => {
    dispatch(createStudents(data));
    dispatch(nextStep());
  };

  const handleCreateTeachers = (data) => {
    dispatch(createTeachers(data));
    dispatch(nextStep());
  }

  const handleGoToStep = (stepNumber) => {
    dispatch(gotoStep(stepNumber));
  }

  return (
    <>
      <Helmet>
        <title>{ translate(`${i18nStartProcess}.helmet`) }</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={translate(`${i18nStartProcess}.breadcrumbs.title`)}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: "Procesos",
              href: PATH_DASHBOARD.lessonPlan.listProcesses,
            },
            { name: translate(`${i18nStartProcess}.breadcrumbs.start_process`) },
          ]}
        />

        <Grid container justifyContent='center'>
          <Grid item xs={12} md={8} lg={12}>
            <InitialProcessSteps activeStep={activeStep} steps={STEPS} />
          </Grid>
        </Grid>

        <>
          {activeStep === 0 && (
            <FillGeneralInformation
              generalInformation={generalInformation}
              onFillGeneralInformation={handleFillGeneralInformation}
            />
          )}
          {activeStep === 1 && (
            <CreateStudents
              csv={csvStudents}
              students={students}
              onCreateStudents={handleCreateStudents}
              onBackStep={handleBackStep}
            />
          )}
          {activeStep === 2 && (
            <CreateTeachers
              csv={csvTeachers}
              teachers={teachers}
              onCreateTeachers={handleCreateTeachers}
              onBackStep={handleBackStep}
            />
          )}
          {activeStep === 3 && (
            <ReviewInformation
              generalInformation={generalInformation}
              students={students}
              teachers={teachers}
              onBackStep={handleBackStep}
              onNextStep={handleStartProcess}
              onGoToStep={handleGoToStep} />
          )} 
        </>
      </Container>
    </>
  );
}
