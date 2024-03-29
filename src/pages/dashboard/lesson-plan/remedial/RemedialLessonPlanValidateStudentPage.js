import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuthContext } from "../../../../auth/useAuthContext";
import { PATH_DASHBOARD } from "../../../../routes/paths";
import ValidateRemedialLessonPlanView from "../../../../sections/dashboard/lesson-plan/validate/ValidateRemedialLessonPlanView";
import { getStudentLessonPlanToValidate } from "../../../../services/student";

export const RemedialLessonPlanValidateStudentPage = () => {
  const { user } = useAuthContext();
  const { lessonPlanId } = useParams();
  const navigate = useNavigate();

  const [lessonPlan, setLessonPlan] = useState();
  const [lessonPlanTracking, setLessonPlanTracking] = useState();
  const [isLoading, setIsLoading] = useState(true);
  
  const fecthLessonPlan = async () => {
    const fetchedLessonPlanInfo = await getStudentLessonPlanToValidate(user.id, lessonPlanId);

    if (fetchedLessonPlanInfo.errorMessage) {
      navigate(PATH_DASHBOARD.lessonPlan.listStudentPlans);
    } else {
      setLessonPlanTracking(fetchedLessonPlanInfo.lessonPlanTracking);
      setLessonPlan(fetchedLessonPlanInfo.lessonPlan);
    }
    setIsLoading(false);
  }

  useEffect(() => { 
    fecthLessonPlan();
  }, []);

  
  return (
    <>
      {
        isLoading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}>
            <CircularProgress />
          </div>
        ):
        (
          <>
            <Helmet>
              <title> Dashboard: Validate Lesson Plan</title>
            </Helmet>

            <ValidateRemedialLessonPlanView 
              lessonPlan={lessonPlan}
              lessonPlanTracking={lessonPlanTracking}
              onUpdateLessonPlanTracking={fecthLessonPlan}
            />
          </>
        )
      }
    </>
  );
};
