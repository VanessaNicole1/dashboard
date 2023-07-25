import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { getLessonPlanWithPeriod } from "../../../services/lesson-plan";
import LessonPlanViewPage from "../../../sections/dashboard/lesson-plan/view/LessonPlanViewPage";

// TODO: Add i18n.
export const LessonPlanTeacherViewPage = () => {
  const { lessonPlanId } = useParams();
  const [lessonPlan, setLessonPlan] = useState();
  const [lessonPlanTracking, setLessonPlanTracking] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { 
    const fecthLessonPlan = async () => {
      const fetchedLessonPlanInfo = await getLessonPlanWithPeriod(lessonPlanId);
      setLessonPlan(fetchedLessonPlanInfo);
      setIsLoading(false);
      setLessonPlanTracking(fetchedLessonPlanInfo?.validationsTracking);
    }
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

            <LessonPlanViewPage 
              lessonPlan={lessonPlan}
              lessonPlanTracking={lessonPlanTracking}
            />
          </>
        )
      }
    </>
  );
  

}
