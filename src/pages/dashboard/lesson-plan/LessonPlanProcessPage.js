import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Grid, Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useDispatch, useSelector } from '../../../redux/store';
import { useSettingsContext } from '../../../components/settings';
import {
  backStep,
  fillGeneralInformation,
  nextStep,
} from '../../../redux/slices/initialProcess';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import CreateStudents from '../../../sections/dashboard/lesson-plan/start-process/students/CreateStudents';
import FillGeneralInformation from '../../../sections/dashboard/lesson-plan/start-process/general-information/FillGeneralInformation';
import InitialProcessSteps from '../../../sections/dashboard/lesson-plan/start-process/InitialProcessSteps';
import CreateTeachers from '../../../sections/dashboard/lesson-plan/start-process/teachers/CreateTeachers';
import ReviewInformation from '../../../sections/dashboard/lesson-plan/start-process/review-information/ReviewInformation';

export default function CreateLessonPlanProcessPage() {
  const STEPS = [
    'General Information',
    'Students',
    'Teachers',
    'Review Information',
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { themeStretch } = useSettingsContext();
  const { initialProcess } = useSelector((state) => state.initial);
  const { activeStep, generalInformation } = initialProcess;
  const completed = activeStep === STEPS.length;

  const handleNextStep = () => {
    dispatch(nextStep());
  };

  const handleBackStep = () => {
    dispatch(backStep());
  };

  const handleFillGeneralInformation = (data) => {
    dispatch(fillGeneralInformation(data));
    dispatch(nextStep());
  };

  return (
    <>
      <Helmet>
        <title>Lesson Plan - Start Process</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading='Start Process'
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Lesson Plan',
              href: PATH_DASHBOARD.lessonPlan.root,
            },
            { name: 'Initial' },
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
              onNextStep={handleNextStep}
              onBackStep={handleBackStep}
            />
          )}
          {activeStep === 2 && <CreateTeachers onNextStep={handleNextStep} />}
          {activeStep === 3 && (
            <ReviewInformation onNextStep={handleNextStep} />
          )}
        </>
      </Container>
    </>
  );
}
