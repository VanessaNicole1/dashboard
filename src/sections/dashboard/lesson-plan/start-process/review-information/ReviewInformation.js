import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Stack,
  Divider,
  Card,
  CardHeader,
  Typography,
  CardContent,
  Box,
  Alert,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import Scrollbar from '../../../../../components/scrollbar/Scrollbar';
import BudgeAnalytic from '../../../../../components/analytic/BudgeAnalytic';
import Iconify from '../../../../../components/iconify/Iconify';
import { useLocales } from '../../../../../locales';
import { getUser } from '../../../../../services/user';
import { validateGradesMatch } from '../../../../../services/grade';

ReviewInformation.propTypes = {
  generalInformation: PropTypes.object,
  students: PropTypes.array,
  teachers: PropTypes.array,
  onBackStep: PropTypes.func,
  onNextStep: PropTypes.func,
  onGoToStep: PropTypes.func,
};

export default function ReviewInformation({
  generalInformation,
  students,
  teachers,
  onBackStep,
  onNextStep,
  onGoToStep
}) {
  const [activateAlert, setActivateAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('')
  const [manager, setManager] = useState();
  const { startDate, endDate, manager: managerId, degree } = generalInformation;
  const { i18n, translate } = useLocales();
  const i18nReviewInformation = 'lesson_plan.start_process.review_information';
  const theme = useTheme();

  const formatDateOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const formatDate = (date) =>
    date.toLocaleString(i18n.language, formatDateOptions);
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  useEffect(() => {
    const validateGrades = async () => {
      const validateInformation = await validateGradesMatch(students, teachers);
      
      if (validateInformation?.errorMessage) {
        setActivateAlert(true);

        const errorMessage = `${validateInformation.errorMessage}`
        setAlertMessage(errorMessage);
      }
    };

    validateGrades();
  }, []);

  useEffect(() => {
    const fetchManagerInformation = async () => {
      const { displayName } = await getUser(managerId);
      setManager(displayName);
    };
    fetchManagerInformation();
  }, [managerId])

  return (
    <>
      <Card>
        {
          activateAlert && (
          <Alert severity="error" sx={{ whiteSpace: 'pre-line' }}>
            {alertMessage}
            <br/>
            {translate(`${i18nReviewInformation}.alert_message`)}
          </Alert>)
        }
        <CardHeader title={<Typography variant='h4'>{ translate(`${i18nReviewInformation}.title`) }</Typography>} />
        <CardContent>
          <Typography variant='body1' sx={{ marginBottom: '12px' }}>
            { translate(`${i18nReviewInformation}.description`) }
          </Typography>

          <Card sx={{ mb: 5, margin: '1px solid red' }}>
            <Scrollbar>
              <Stack
                direction='row'
                divider={
                  <Divider
                    orientation='vertical'
                    flexItem
                    sx={{ borderStyle: 'dashed' }}
                  />
                }
                sx={{ py: 2 }}
              >
                <BudgeAnalytic
                  title={translate(`${i18nReviewInformation}.period_budge.title`)}
                  handleClick={() => onGoToStep(0)}
                  content={
                    <Stack>
                      <div>
                        {`${translate(`${i18nReviewInformation}.period_budge.start`)}: `}
                        <Box
                          component='span'
                          sx={{ color: 'text.secondary', typography: 'body2' }}
                        >
                          {formattedStartDate}
                        </Box>
                      </div>
                      <div>
                      {`${translate(`${i18nReviewInformation}.period_budge.end`)}: `}
                        <Box
                          component='span'
                          sx={{ color: 'text.secondary', typography: 'body2' }}
                        >
                          {formattedEndDate}
                        </Box>
                      </div>
                    </Stack>
                  }
                  percent={100}
                  icon='ic:round-receipt'
                  color={theme.palette.info.main}
                />

                <BudgeAnalytic
                  title={translate(`${i18nReviewInformation}.manager`)}
                  handleClick={() => onGoToStep(0)}
                  percent={100}
                  icon='eos-icons:admin'
                  color={theme.palette.success.main}
                  content={
                    <Box
                    component='span'
                    sx={{ color: 'text.secondary', typography: 'body2' }}
                  >
                    { manager }
                  </Box>
                  }
                />

                <BudgeAnalytic
                  title={translate(`${i18nReviewInformation}.degree`)}
                  handleClick={() => onGoToStep(0)}
                  percent={100}
                  icon='fa6-solid:school-flag'
                  color={theme.palette.warning.main}
                  content={
                    <Box
                    component='span'
                    sx={{ color: 'text.secondary', typography: 'body2' }}
                  >
                    { degree }
                  </Box>
                  }
                />

                <BudgeAnalytic
                  title={translate(`${i18nReviewInformation}.students`)}
                  handleClick={() => onGoToStep(1)}
                  percent={100}
                  icon='material-symbols:school-rounded'
                  color={theme.palette.error.main}
                  content={
                    <div>
                      { `${students.length} `}
                      <Box
                          component='span'
                          sx={{ color: 'text.secondary', typography: 'body2' }}
                        >
                          {translate(`${i18nReviewInformation}.students`).toLowerCase()}
                        </Box>
                    </div>
                  }
                />

                <BudgeAnalytic
                  title={translate(`${i18nReviewInformation}.teachers`)}
                  handleClick={() => onGoToStep(2)}
                  percent={100}
                  icon='game-icons:teacher'
                  color={theme.palette.text.secondary}
                  content={
                    <div>
                      { `${teachers.length} `}
                      <Box
                          component='span'
                          sx={{ color: 'text.secondary', typography: 'body2' }}
                        >
                          {translate(`${i18nReviewInformation}.teachers`).toLowerCase()}
                        </Box>
                    </div>
                  }
                />

              </Stack>
            </Scrollbar>
          </Card>
        </CardContent>
      </Card>
      <Stack
        display='flex'
        direction='row'
        justifyContent='space-between'
        sx={{ mt: 3 }}
      >
        <Button
          size='small'
          color='inherit'
          onClick={onBackStep}
          startIcon={<Iconify icon='eva:arrow-ios-back-fill' />}
        >
          {translate(`${i18nReviewInformation}.back_step_button`)}
        </Button>

        <LoadingButton onClick={onNextStep} variant='contained' loading={false} disabled={activateAlert}>
          {translate(`${i18nReviewInformation}.next_step_button`)}
        </LoadingButton>
      </Stack>
    </>
  );
}
